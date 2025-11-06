import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import passport from "passport";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/index.js";
import { apiError, wrapAsync } from "../utils/index.js";
dotenv.config();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/thankyou`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  })
);

router.get("/authenticate", async (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    const error = new apiError("Authentication failed", 401);
    return next(error);
  }
});

// SECURE: Use Authorization header
router.post(
  "/google/verify",
  wrapAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = new apiError("Invalid access token", 401);
      return next(error);
    }

    const userInfo = await response.json();

    let user = await User.findOne({ email: userInfo.email });
    if (user) {
      user.authToken = token;
      await user.save();
    }
    if (!user) {
      const newUser = new User({
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        provider: "google",
        authToken: token,
      });
      await newUser.save();
      user = newUser;
    }
    //passport login
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ data: user });
    });
  })
);
router.get("/google/success", (req, res) => {
  res.json({ user: req.user });
});

router.get("/google/failure", (req, res) => {
  res.json({ message: "Authentication failed" });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    // send minimal response; front-end decides where to navigate
      res.status(200).json({ loggedOut: true });
  });
});

export default router;
