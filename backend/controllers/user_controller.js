const User = require("../models/user");
const db = require("../config/mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports.createSession = function (req, res) {
  // console.log("inside create session");
  // return res.redirect('/users/profile');
  // res.render('user_profile');
  console.log("mai bol rha hu create session se");
  console.log(req.user);

  // return res.status(200).json({
  //   message: "Session created successfully",
  //   user: req.user,
  // });
  return;

  // setTimeout(() => {
  //   console.log("hello");
  //   return res.status(200).json({
  //     message: "Session created successfully",
  //     user: req.user,
  //   });
  // }, 0);
  // return res.redirect("http://localhost:3000/");

  // .then(() => {
  //   res.redirect("https://localhost:3000");
  // });
};

module.exports.destroySession = function (req, res) {
  // req.logout();

  // return res.redirect('/');
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out");

    res.redirect("/");
  });
};

module.exports.destroySession = function (req, res) {
  // req.logout();

  // return res.redirect('/');
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out");

    res.redirect("/");
  });
};
