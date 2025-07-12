const Favourites = require("../models/Favourites");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredhome]) => {
    res.render("store/index", {
      registeredhome: registeredhome,
      pageTitle: "index page",
      currentPage: "index",
    });
  });
};

exports.getHomelist = (req, res, next) => {
  Home.fetchAll().then(([registeredhome]) => {
    res.render("store/home-list", {
      registeredhome: registeredhome,
      pageTitle: "Registered Home",
      currentPage: "Homes",
    });
  });
};

exports.getbookings = (req, res, next) => {
  Home.fetchAll().then(([registeredhome]) => {
    res.render("store/bookings", {
      registeredhome: registeredhome,
      pageTitle: "Booked Homes",
      currentPage: "bookings",
    });
  });
};

exports.gethomedetails = (req, res, next) => {
  const homeid = req.params.homeID;
  Home.HomeByID(homeid).then(([home]) => {
    const homebyid = home[0]
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
  Favourites.getfavourite().then(([home]) => {
    Home.fetchAll().then(([registeredhome]) => {
      const favhome = home.map((homeid) => registeredhome.find((reghome) => reghome.id === homeid.id))
      res.render("store/favourite", {
        Favouritehome: favhome,
        pageTitle: "Favourites",
        currentPage: "favourite",
      });
  })
});
}

exports.postAddtoFavourites = (req, res, next) => {
  const homeid = req.body.id
  Favourites.addtofavourite(homeid).then(() => {
      res.redirect("/favourite");
  }).catch((error) => {
      console.log("Error occured during add to favourite", error);
  })
};

exports.postRemoveFavourites = (req, res, next) => {
  const homeid = req.body.id;
  Favourites.RemoveFavourite(homeid).then(() => {
      res.redirect("/favourite");
  }).catch((error) => {
      console.log("Error occured during Remove from favourite", error);
  })
}
