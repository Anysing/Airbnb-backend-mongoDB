const Favourites = require("../models/Favourites");
const Home = require("../models/home");

exports.getAddhomes = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home Page",
    currentPage: "add-home",
    editing: false,
  });
};

exports.postAddhomes = (req, res, next) => {
  const { housename, price, location, imageURL, description } = req.body;
  const home = new Home(housename, price, location, imageURL, description);
  home.save();
  res.redirect("/host/host-homes");
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredhome]) => {
    res.render("host/host-home-list", {
      registeredhome: registeredhome,
      pageTitle: "Host Homes",
      currentPage: "host-homes",
    });
  });
};

exports.getedithome = (req, res, next) => {
  const id = req.params.homeid;
  const editing = req.query.editing === "true";

  Home.HomeByID(id).then(([home]) => {
    const homebyid = home[0]
    if (!homebyid) {
      return res.redirect("/host/host-homes");
    }
    res.render("host/edit-home", {
      home: homebyid,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.postEdithomes = (req, res, next) => {
  const { id, housename, price, location, imageURL, description } = req.body;
  const home = new Home(housename, price, location, imageURL, description, id);
  home.save();
  res.redirect("/host/host-homes");
};

exports.postDeletehosthome = (req, res, next) => {
  const homeid = req.params.homeid;
  Home.deletehome(homeid).then( () => {
    Favourites.RemoveFavourite(homeid).then(() => {
      res.redirect("/host/host-homes");
    })
  }).catch(error => {
    console.log("Error occured during deleting home", error);
  })
};
