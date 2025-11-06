import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import passport from "passport";
import { apiError } from "../utils/index.js";
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
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/authenticate", async (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ message: "Authentication failed" });
  }
});

router.get("/google/success", (req, res) => {
  res.json({ user: req.user });
});

router.get("/google/failure", (req, res) => {
  res.json({ message: "Authentication failed" });
});

router.get("/logout", (req, res) => {
  req.logout();
});

export default router;
