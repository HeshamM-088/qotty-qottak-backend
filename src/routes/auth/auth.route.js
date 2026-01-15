const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../../controllers/google_auth/auth.controller");
const me_cookies = require("../../controllers/google_auth/me_cookies.controller");
const logout = require("../../controllers/google_auth/logout.controller");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.post("/logout", logout);

router.get("/me", me_cookies);

router.get("/google/callback", passport.authenticate("google"), auth);

module.exports = router;
