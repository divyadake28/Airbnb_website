const express = require("express");
const warpAsync = require("../utils/warpAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middelware.js");
const userController = require("../controllers/user.js");


router
.route("/singup")
.get(userController.renderSignupForm)
.post(warpAsync(userController.signup));


router
.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
