const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../../controllers/google_auth/auth.controller");
const me_cookies = require("../../controllers/google_auth/me_cookies.controller");
const logout = require("../../controllers/google_auth/logout.controller");
const session = require("../../controllers/google_auth/session.controller");
const authorization = require("../../middlewares/authorization");
const authintication = require("../../middlewares/authintication");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.post("/logout", logout);

router.get("/me", me_cookies);

router.get("/session", authintication, authorization("admin"), session);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  auth
);

module.exports = router;
