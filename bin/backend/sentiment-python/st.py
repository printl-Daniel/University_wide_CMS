import pandas as pd

# Load your dataset
df = pd.read_csv("sentiment-python/twitter_training.csv")

# Display the first few rows of the DataFrame
print(df.head())

# Print the column names
print("Column names:", df.columns.tolist())
