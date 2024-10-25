const express = require("express");
const path = require("path");

const views = {
  index: (req, res) => {
    console.log("routing successfully");
  },
};

module.exports = views;
