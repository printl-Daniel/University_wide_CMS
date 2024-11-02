const model = require("../models/sentiment-model");

const sentiment = {
  async analyzeSentiment(req, res) {
    try {
      let text = req.body.text;
      text = text.toLowerCase();
      const result = await model.analyzeSentiment(text);

      res.render("sentiment/feedbackReport", {
        originalText: result.original_text,
        translatedText: result.translated_text,
        sentimentScore: result.sentiment_score,
        sentiment: result.sentiment,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = sentiment;
