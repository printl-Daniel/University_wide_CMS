const Feedback = require("../models/feedback");
const { analyzeSentiment } = require("../utils/sentimentAnalysis");

exports.saveFeedback = async (req, res) => {
  try {
    const feedbackArray = await Feedback.getFeedback();

    const feedbackResults = await Promise.all(
      feedbackArray.map(async (feedbackData) => {
        if (!feedbackData.feedback) {
          throw new Error("Feedback text is required");
        }

        const sentimentResult = await analyzeSentiment(feedbackData.feedback);
        const { sentiment, value } = sentimentResult;

        const feedbackAnalyzedData = {
          name: feedbackData.name,
          email: feedbackData.email,
          feedback: feedbackData.feedback,
          sentiment,
          value,
          submittedAt: feedbackData.submittedAt,
        };

        console.log("Saving feedback with ID:", feedbackData.id);
        if (
          !feedbackData.id ||
          typeof feedbackData.id !== "string" ||
          feedbackData.id.trim() === ""
        ) {
          throw new Error("Invalid or missing feedback ID");
        }

        await Feedback.saveAnalyzedFeedback(feedbackData, feedbackAnalyzedData);
        await Feedback.updateSavedStatus(feedbackData);
        return {
          id: feedbackData.id,
          feedback: feedbackData.feedback,
          sentiment,
          value,
          submittedAt: feedbackData.submittedAt,
        };
      })
    );

    res.status(200).json({
      message: "Feedback analysis complete for all entries",
      feedbackResults,
    });
  } catch (error) {
    console.error("Error processing feedback:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalyzeFeedback = async (req, res) => {
  try {
    const feedBack = await Feedback.getAnalyzedFeedback();
    res.status(200).json(feedBack);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
