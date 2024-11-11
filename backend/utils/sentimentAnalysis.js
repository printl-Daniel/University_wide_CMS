const axios = require("axios");

async function analyzeSentiment(text) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/analyze", {
      text,
    });
    return response.data.sentiment;
  } catch (error) {
    console.error("Error calling sentiment analysis API:", error);
    return "neutral";
  }
}

module.exports = { analyzeSentiment };
