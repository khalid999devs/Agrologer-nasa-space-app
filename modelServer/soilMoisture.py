import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import pickle
import os

def load_and_prepare_data(data_path):
    # Load the CSV file while skipping the first row and using the second row as headers
    df = pd.read_csv(data_path, header=1)  # Skip the first row
    
    # Check if the 'date' column exists
    if 'date' not in df.columns:
        print("Error: 'date' column not found in the dataset")
        print(f"Columns available: {df.columns.tolist()}")
        return None, None
    
    # Convert the 'date' column to datetime format (MM/DD/YYYY)
    df['date'] = pd.to_datetime(df['date'], format='%m/%d/%Y')
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    df['day'] = df['date'].dt.day
    
    # Drop the original 'date' column
    df = df.drop(columns=['date'])
    df = df.dropna()
    
    # Features and target variable
    X = df[['year', 'month', 'day']]
    y = df['avg']
    return X, y

def train_and_save_model(data_path, model_filename='soil_moisture_model.pkl', test_size=0.2, random_seed=42):
    X, y = load_and_prepare_data(data_path)
    
    # If X or y is None, exit the function
    if X is None or y is None:
        return

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_seed)
    model = RandomForestRegressor(n_estimators=100, random_state=random_seed)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    
    print(f"Model Accuracy (R^2 Score): {accuracy * 100:.2f}%")
    print(f"Mean Absolute Error (MAE): {mae:.2f}")
    
    os.makedirs('models', exist_ok=True)
    model_path = os.path.join('models', model_filename)
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    print(f"Model trained and saved successfully at {model_path}.")

if __name__ == "__main__":
    data_path = 'nasa_data/csv/soilMostv1.csv'
    model_filename = 'soil_moisture_model_v1.pkl'
    train_and_save_model(data_path, model_filename)
