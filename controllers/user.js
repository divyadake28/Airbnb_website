const User = require("../models/user");

module.exports.renderSignupForm =(req, res) => {
    res.render("user/singup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ email, username });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.logIn(registeredUser, (err) => {
        if (err) {
          return next(err);
        };
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/singup");
    };
};

module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out!");
      res.redirect("/listings");
    });
  };