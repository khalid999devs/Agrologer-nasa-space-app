import pandas as pd
import matplotlib.pyplot as plt

# Load data (replace with your dataset path)
data = pd.read_csv('../nasa_data/')

# Example data analysis
def analyze_data(data):
    print(data.head())  # Show the first few rows of the dataset

    # Summary statistics
    print(data.describe())

    # Plotting (example: histogram of a feature)
    data['feature_column'].hist(bins=30)
    plt.title('Distribution of Feature Column')
    plt.xlabel('Value')
    plt.ylabel('Frequency')
    plt.show()

if __name__ == "__main__":
    analyze_data(data)
