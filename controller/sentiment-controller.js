const express = require("express");
const path = require("path");
const models = require("../models/sentiment-model");

const sentiment = {
  index: (req, res) => {
    res.render("sentiment/comment.ejs");
  },
};

module.exports = sentiment;
