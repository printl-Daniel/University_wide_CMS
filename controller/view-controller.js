const express = require("express");

const views = {
  index: (req, res) => {
    console.log("routing successfully");
  },
};

module.exports = views;
