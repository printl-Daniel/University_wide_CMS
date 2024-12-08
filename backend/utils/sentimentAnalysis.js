const axios = require("axios");

async function analyzeSentiment(text) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/analyze", {
      text,
    });
    return {
      sentiment: response.data.sentiment,
      value: response.data.value,
    };
  } catch (error) {
    console.error("Error calling sentiment analysis API:", error);
    return {
      sentiment: "neutral",
      value: "neutral",
    };
  }
}

module.exports = { analyzeSentiment };
