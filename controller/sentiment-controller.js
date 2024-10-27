const express = require("express");
const model = require("../models/sentiment-model");

const sentiment = {
  async analyzeSentiment(req, res) {
    try {
      const { text } = req.body;
      const sentimentScore = await model.analyzeSentiment(text);
      res.render("sentiment/feedbackReport", {
        text,
        sentimentScore,
        sentiment:
          sentimentScore > 0
            ? "Positive"
            : sentimentScore < 0
            ? "Negative"
            : "Neutral",
      });
    } catch (error) {
      res.status(500).send("Error analyzing sentiment");
    }
  },
};

module.exports = sentiment;
