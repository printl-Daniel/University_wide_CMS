const express = require("express");
const model = require("../models/sentiment-model"); // Ensure the correct model path and casing

const sentiment = {
  index: (req, res) => {
    const inputText = req.body.text;
    const analysis = model.analyzeText(inputText);
    const categories = model.categorizeProblem(inputText); // Add this line

    res.render("sentiment/comment", {
      text: inputText, // Pass the input text
      analysis: analysis, // Pass the analysis result
      categories: categories, // Now this variable is defined
    });
  },

  analyzeText: (req, res) => {
    const text = req.body.text;
    const analysis = model.analyzeText(text);
    const categories = model.categorizeProblem(text);

    res.render("sentiment/comment", { analysis, categories, text });
  },
};

module.exports = sentiment;
