import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle
import os

# Function to generate synthetic data
def generate_data(num_samples=1000):
    np.random.seed(42)
    X = np.random.rand(num_samples, 5)  # Features
    y_drought = X[:, 0] * 0.3 + X[:, 1] * 0.5 + np.random.rand(num_samples) * 0.1  # Drought levels
    y_flood = X[:, 0] * 0.2 + X[:, 1] * 0.7 + np.random.rand(num_samples) * 0.2  # Flood levels
    y_groundwater = X[:, 0] * 0.4 + X[:, 1] * 0.6 + np.random.rand(num_samples) * 0.15  # Groundwater levels
    y_weather = X[:, 0] * 0.1 + X[:, 1] * 0.9 + np.random.rand(num_samples) * 0.05  # Weather index
    return X, y_drought, y_flood, y_groundwater, y_weather


def train_and_save_models(raw_data_path=None, processed_data_path=None):
    X = None
    y_drought = None
    y_flood = None
    y_groundwater = None
    y_weather = None

    if not raw_data_path and not processed_data_path:
        X, y_drought, y_flood, y_groundwater, y_weather = generate_data()
    else:
        if processed_data_path:
            df = pd.read_csv(processed_data_path)
        elif raw_data_path:
            df = pd.read_csv(raw_data_path)

        # Extracting features and target variables
        X = df.iloc[:, :-1].values  
        y_drought = df['drought'].values  
        y_flood = df['flood'].values 
        y_groundwater = df['groundwater'].values 
        y_weather = df['weather'].values 

    if X is None or y_drought is None or y_flood is None or y_groundwater is None or y_weather is None:
        raise ValueError("No valid data available for training.")


    X_train, X_test, y_train_drought, y_test_drought = train_test_split(X, y_drought, test_size=0.2, random_state=42)
    _, _, y_train_flood, y_test_flood = train_test_split(X, y_flood, test_size=0.2, random_state=42)
    _, _, y_train_groundwater, y_test_groundwater = train_test_split(X, y_groundwater, test_size=0.2, random_state=42)
    _, _, y_train_weather, y_test_weather = train_test_split(X, y_weather, test_size=0.2, random_state=42)

    # Train models
    drought_model = RandomForestRegressor(n_estimators=100, random_state=42)
    flood_model = RandomForestRegressor(n_estimators=100, random_state=42)
    groundwater_model = RandomForestRegressor(n_estimators=100, random_state=42)
    weather_model = RandomForestRegressor(n_estimators=100, random_state=42)

    drought_model.fit(X_train, y_train_drought)
    flood_model.fit(X_train, y_train_flood)
    groundwater_model.fit(X_train, y_train_groundwater)
    weather_model.fit(X_train, y_train_weather)


    os.makedirs('models', exist_ok=True)

    # Save models as pickle files
    with open('models/drought_model.pkl', 'wb') as f:
        pickle.dump(drought_model, f)

    with open('models/flood_model.pkl', 'wb') as f:
        pickle.dump(flood_model, f)

    with open('models/groundwater_model.pkl', 'wb') as f:
        pickle.dump(groundwater_model, f)

    with open('models/weather_model.pkl', 'wb') as f:
        pickle.dump(weather_model, f)

    print("Models trained and saved successfully.")

if __name__ == "__main__":
    train_and_save_models()
