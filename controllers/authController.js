exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  // res.cookie("isLoggedIn",true)
  req.session.isLoggedIn = true
  res.redirect("/");
};

exports.postlogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  })
};

