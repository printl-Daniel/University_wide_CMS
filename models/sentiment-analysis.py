from transformers import pipeline
import sys
import json
import os

# Disable symlink warning on Windows if symlinks are not supported
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

def analyze_sentiment(text):
    # Load a lighter, multilingual sentiment-analysis model
    sentiment_analyzer = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

    # Analyze sentiment
    analysis_results = sentiment_analyzer(text)
    
    # Process the output to gather sentiment scores and classification
    sentiments = []
    total_score = 0
    
    for result in analysis_results:
        label = result['label']
        score = result['score']
        
        if "5 stars" in label or "4 stars" in label:
            sentiments.append("Positive")
            total_score += score
        elif "1 star" in label or "2 stars" in label:
            sentiments.append("Negative")
            total_score -= score
        else:
            sentiments.append("Neutral")

    # Calculate the average sentiment score
    average_score = total_score / len(sentiments) if sentiments else 0

    # Determine final sentiment
    final_sentiment = "Positive" if average_score > 0.2 else "Negative" if average_score < -0.2 else "Neutral"

    # Output results in JSON format
    result = {
        "original_text": text,
        "sentiment_score": average_score,
        "sentiment": final_sentiment,
        "detailed_sentiments": analysis_results
    }
    print(json.dumps(result))

if __name__ == "__main__":
    # Read text input from Node.js via command-line arguments
    if len(sys.argv) > 1:
        text_input = sys.argv[1]
        analyze_sentiment(text_input)
