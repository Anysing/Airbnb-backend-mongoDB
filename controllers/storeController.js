const Favourites = require("../models/Favourites");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("store/index", {
      registeredhome: registeredhome,
      pageTitle: "index page",
      currentPage: "index",
    });
  });
};

exports.getHomelist = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("store/home-list", {
      registeredhome: registeredhome,
      pageTitle: "Registered Home",
      currentPage: "Homes",
    });
  });
};

exports.getbookings = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("store/bookings", {
      registeredhome: registeredhome,
      pageTitle: "Booked Homes",
      currentPage: "bookings",
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
      });
    }
  });
};

exports.getfavourite = (req, res, next) => {
  Favourites.find()
    .populate("houseid")
    .then((favourites) => {
      const favouriteshomes = favourites.map((fav) => fav.houseid);
      res.render("store/favourite", {
        Favouritehome: favouriteshomes,
        pageTitle: "Favourites",
        currentPage: "favourite",
      });
    });
};

exports.postAddtoFavourites = (req, res, next) => {
  const homeid = req.body.id;
  Favourites.findOne({ houseid: homeid })
    .then((existingfav) => {
      if (existingfav) {
        return res.redirect("/favourite");
      } else {
        const fav = new Favourites({ houseid: homeid });
        return fav.save();
      }
    })
    .then(() => {
      return res.redirect("/favourite");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRemoveFavourites = (req, res, next) => {
  const homeid = req.body.id;
  Favourites.findOneAndDelete({houseid : homeid})
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("Error occured during Remove from favourite", error);
    })
    .finally(() => {
      res.redirect("/favourite");
    });
};
