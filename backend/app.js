import express from "express";
const app = express();
import dotenv from "dotenv";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
dotenv.config();
import { transcriptRoute, authRoute } from "./routes/index.js";
import { apiError, corsconnection } from "./utils/index.js";
import { User } from "./models/index.js";

app.use(express.json());
app.use(cookieParser());
app.use(corsconnection);

const mongoUrl = process.env.MONGODB_URI;

async function main() {
  mongoose.connect(mongoUrl);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const store = MongoStore.create({
  mongoUrl: mongoUrl,
  collectionName: "sessions",
  crypto: {
    secret: process.env.SESSION_SECRET_KEY,
  },
});

const sessionOptions = {
  store: store,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    expires: 60 * 60 * 1000 * 24 * 29,
    maxAge: 60 * 60 * 1000 * 24 * 29,
  },
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.EXTENTIONCLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4567/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        if (!profile.id) {
          const error = new apiError("No profile found", 401);
          return done(error);
        }
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
            isVerified: true,
            provider: "google",
          });
          await newUser.save();
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (err) {
        const error = new apiError("Authentication failed", 401);
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/transcript", transcriptRoute);
app.use("/auth", authRoute);
//404 page
app.use((req, res, next) => {
  const route = req.originalUrl;
  const error = new apiError(`${route} Route Not Found`, 404);
  next(error);
});

// error handling
app.use((err, req, res, next) => {
  const { status = 500, message = "Something happened went wrong" } = err;
  console.log(err);
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
