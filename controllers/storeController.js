
const Home = require("../models/home");
const User = require("../models/User");

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("store/index", {
      registeredhome: registeredhome,
      pageTitle: "index page",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user : req.session.user,
    });
  });
};

exports.getHomelist = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("store/home-list", {
      registeredhome: registeredhome,
      pageTitle: "Registered Home",
      currentPage: "Homes",
      isLoggedIn: req.isLoggedIn,
      user : req.session.user,
    });
  });
};

exports.getbookings = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("store/bookings", {
      registeredhome: registeredhome,
      pageTitle: "Booked Homes",
      currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
      user : req.session.user,
    });
  });
};

exports.gethomedetails = (req, res, next) => {
  const homeid = req.params.homeID;
  Home.findById(homeid).then((homebyid) => {
    if (!homebyid) {
      res.redirect("/Home-list");
    } else {
      res.render("store/home-details", {
        home: homebyid,
        pageTitle: "Home details",
        currentPage: "Homes",
        isLoggedIn: req.isLoggedIn,
        user : req.session.user,
      });
    }
  });
};

exports.getfavourite = async (req, res, next) => {

  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite", {
        Favouritehome: user.favourites,
        pageTitle: "Favourites",
        currentPage: "favourite",
        isLoggedIn: req.isLoggedIn,
        user : req.session.user,
      });
};

exports.postAddtoFavourites = async (req, res, next) => {
  const homeid = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeid)) {
    user.favourites.push(homeid);
    await user.save()
  }
  res.redirect("/favourite");
};

exports.postRemoveFavourites = async (req, res, next) => {
  const homeid = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(user.favourites.includes(homeid)) {
    user.favourites = user.favourites.filter((fav) => fav != homeid);
    await user.save();
  }
  res.redirect("/favourite");
};
