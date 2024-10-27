from textblob import TextBlob
from googletrans import Translator
import sys
import json


# Mapping of Tagalog words to their English equivalents
translation_map = {
    "pogi": "handsome",
    "maganda": "beautiful",
    "mabait": "kind",
    "tanga": "stupid",
}


def analyze_sentiment(text):
    # Translate the text from Tagalog to English
    translator = Translator()
    text_translate = translator.translate(text, dest='en').text

        # Check and replace words based on the translation map
    for tagalog_word, english_word in translation_map.items():
        if tagalog_word in text:
            text_translate = text_translate.replace(tagalog_word, english_word)

    # Analyze sentiment using the translated text
    blob = TextBlob(text_translate)
    sentiment_score = blob.sentiment.polarity
   
    if sentiment_score > 0:
        sentiment = "Positive"
    elif sentiment_score < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    # Output results in JSON format
    result = {
        "original_text": text,
        "translated_text": text_translate,
        "sentiment_score": sentiment_score,
        "sentiment": sentiment
    }
    print(json.dumps(result))

if __name__ == "__main__":
    # Read text input from Node.js via command-line arguments
    text_input = sys.argv[1]
    analyze_sentiment(text_input)
