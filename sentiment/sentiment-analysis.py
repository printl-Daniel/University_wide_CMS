import sys
from textblob import TextBlob

if __name__ == "__main__":
    # Get the text from command-line arguments
    text = sys.argv[1]

    # Perform sentiment analysis
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity

    # Print the sentiment score (this output will be captured in Node.js)
    print(sentiment_score)
