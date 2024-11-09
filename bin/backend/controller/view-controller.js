const express = require("express");

const views = {
  index: (req, res) => {
    console.log("routing successfully");
  },

  feedback(req, res) {
    res.render("sentiment/feedback");
  },
};

module.exports = views;
