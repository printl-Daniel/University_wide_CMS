const natural = require("natural");
const langdetect = require("langdetect");

let translate;

const loadTranslate = async () => {
  translate = await import("translate").then((module) => module.default);
};

loadTranslate();

const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

const SentimentModel = {
  detectLanguage(text) {
    return langdetect.detectOne(text)?.lang || "en";
  },

  async translateText(text, lang) {
    if (!translate) await loadTranslate();
    return lang === "en" ? text : await translate(text, "en");
  },

  async analyzeSentiment(text) {
    const lang = this.detectLanguage(text);
    const translatedText = await this.translateText(text, lang);
    const tokenizedText = tokenizer.tokenize(translatedText);
    return analyzer.getSentiment(tokenizedText);
  },
};

module.exports = SentimentModel;
