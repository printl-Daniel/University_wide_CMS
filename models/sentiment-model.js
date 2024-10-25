// models/SentimentModel.js
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const SentimentModel = {
  analyzeText(text) {
    const analysis = sentiment.analyze(text);
    let category = "neutral";

    if (analysis.score > 0) category = "positive";
    else if (analysis.score < 0) category = "negative";

    return { ...analysis, category };
  },

  categorizeProblem(text) {
    if (typeof text !== "string") return []; // Ensure text is a string
    // Simple keyword matching for common problem categories
    // Simple keyword matching for common patient feedback categories
    const problems = {
      "Appointment Issues": [
        "late",
        "reschedule",
        "cancellation",
        "appointment",
      ],
      "Staff Behavior": ["rude", "helpful", "friendly", "unprofessional"],
      "Facility Cleanliness": ["clean", "dirty", "hygiene", "messy"],
      "Treatment Satisfaction": [
        "effective",
        "pain",
        "relief",
        "satisfied",
        "dissatisfied",
      ],
      "Billing Concerns": ["bill", "charge", "payment", "insurance"],
    };

    let categories = [];
    for (let problem in problems) {
      if (problems[problem].some((keyword) => text.includes(keyword))) {
        categories.push(problem);
      }
    }

    return categories;
  },
};

module.exports = SentimentModel;
