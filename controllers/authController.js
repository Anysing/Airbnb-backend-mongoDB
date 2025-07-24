const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/SignUp", {
    pageTitle: "SignUp",
    currentPage: "signup",
    isLoggedIn: false,
    errorMessage: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      userType: "",
    },
  });
};

exports.postSignup = [
  check("firstName")
    .notEmpty()
    .withMessage("FirstName is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("FirstName must be 2 character long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("FirstName can only contain letter"),

  check("lastName")
    .trim()
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("lastName can only contain letter"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/) // Special character
    .withMessage("Password must contain at least one special character"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("UserType is required")
    .isIn(["Host", "Guest"])
    .withMessage("userType must be either host or guest"),

  check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/SignUp", {
        pageTitle: "SignUp",
        currentPage: "signup",
        isLoggedIn: false,
        errorMessage: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          userType,
        },
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/SignUp", {
          pageTitle: "SignUp",
          currentPage: "signup",
          isLoggedIn: false,
          errorMessage: [
            "Email already exists, please use a different email or Go to login.",
          ],
          oldInput: {
            firstName,
            lastName,
            email,
            userType,
          },
        });
      });
  },
];

exports.postLogin = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/) // Special character
    .withMessage("Password must contain at least one special character"),
  (req, res, next) => {
    // res.cookie("isLoggedIn",true)
    req.session.isLoggedIn = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: true,
        errorMessage: errors.array().map((err) => err.msg),
        oldInput: {
          email: req.body.email,
        },
      });
    }
    res.redirect("/");
  },
];

exports.postlogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
