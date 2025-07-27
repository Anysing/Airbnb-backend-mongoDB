const Home = require("../models/home");
const fs = require("fs");

exports.getAddhomes = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home Page",
    currentPage: "add-home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user : req.session.user,
  });
};

exports.postAddhomes = (req, res, next) => {
  const { housename, price, location, description } = req.body;
  // console.log(housename, price, location, description);
  // console.log(req.file);
  const imageURL = req.file.path;
  const home = new Home({ housename, price, location, imageURL, description });
  home.save().then((result) => {
    console.log(result);
  });
  res.redirect("/host/host-homes");
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredhome) => {
    res.render("host/host-home-list", {
      registeredhome: registeredhome,
      pageTitle: "Host Homes",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user : req.session.user,
    });
  });
};

exports.getedithome = (req, res, next) => {
  const id = req.params.homeid;
  const editing = req.query.editing === "true";

  Home.findById(id).then((homebyid) => {
    if (!homebyid) {
      return res.redirect("/host/host-homes");
    }
    res.render("host/edit-home", {
      home: homebyid,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user : req.session.user,
    });
  });
};

exports.postEdithomes = (req, res, next) => {
  const { id, housename, price, location, description } = req.body;
  // const home = new Home({housename, price, location, imageURL, description, id});
  Home.findById(id)
    .then((home) => {
      home.housename = housename;
      home.price = price;
      home.location = location;
      home.description = description;

      if (req.file) {
        fs.unlink(home.imageURL, (err) => {
          if (err) {
            console.log(err);
          }
        });
        home.imageURL = req.file.path; 
      }
      home
        .save()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect("/host/host-homes");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeletehosthome = (req, res, next) => {
  const homeid = req.params.homeid;
  Home.findByIdAndDelete(homeid).then(() => {
    res.redirect("/host/host-homes");
  });
};
