const Feedback = require("../models/feedback");
const { analyzeSentiment } = require("../utils/sentimentAnalysis");

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { feedbackText } = req.body;

    // Call the Django API for sentiment analysis
    const sentiment = await analyzeSentiment(feedbackText);

    // Create feedback record with analyzed sentiment
    const feedback = new Feedback({
      feedbackText,
      sentiment,
    });
    await feedback.save();

    res
      .status(201)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

