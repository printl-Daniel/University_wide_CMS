const { spawn } = require("child_process");
const path = require("path");
const langdetect = require("langdetect");
const pythonScriptPath = path.join(__dirname, "sentiment-analysis.py");

const SentimentModel = {
  //ANALYZE SENTIMENT//
  async analyzeSentiment(text) {
    // Detect language
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [pythonScriptPath, text]);
      // Handle data from the Python script
      pythonProcess.stdout.on("data", (data) => {
        try {
          const result = JSON.parse(data.toString());
          resolve(result);
        } catch (error) {
          reject(`Error parsing data: ${error}`);
        }
      });

      pythonProcess.stderr.on("data", (error) => {
        reject(`Error in sentiment analysis: ${error}`);
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          reject(`Python process exited with code ${code}`);
        }
      });
    });
  },
};

module.exports = SentimentModel;
