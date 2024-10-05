import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import StandardScaler
import pickle
import os

class WeatherModelTrainer:
    def __init__(self, data_path):
        self.data_path = data_path
        self.models_dir = 'models'
        os.makedirs(self.models_dir, exist_ok=True)

    def load_and_prepare_data(self):
        df = pd.read_csv(self.data_path, delimiter=';')  # Assuming semicolon delimiter
        df.dropna(inplace=True)
        print("Data Loaded. Columns:", df.columns.tolist())
        return df

    def train_and_save_model(self, X, y, model_filename):
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Standardization
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        # Model initialization with GridSearchCV for hyperparameter tuning
        model = RandomForestRegressor(random_state=42)
        param_grid = {
            'n_estimators': [50, 100, 150],
            'max_depth': [None, 10, 20],
            'min_samples_split': [2, 5, 10]
        }
        grid_search = GridSearchCV(model, param_grid, cv=5, scoring='neg_mean_absolute_error', n_jobs=-1)
        grid_search.fit(X_train_scaled, y_train)

        best_model = grid_search.best_estimator_
        y_pred = best_model.predict(X_test_scaled)
        mae = mean_absolute_error(y_test, y_pred)

        # Saving the model
        with open(os.path.join(self.models_dir, model_filename), 'wb') as f:
            pickle.dump(best_model, f)

        print(f"Model '{model_filename}' trained with MAE: {mae:.2f}")
        return mae

    def train_models(self):
        df = self.load_and_prepare_data()

        # Predicting Temperature
        if 'T2M' in df.columns and 'PRECTOTCORR' in df.columns:
            X_temp = df.drop(columns=['T2M', 'PRECTOTCORR'])
            y_temp = df['T2M']
            self.train_and_save_model(X_temp, y_temp, 'temperature_model.pkl')

            # Predicting Precipitation
            X_precip = df.drop(columns=['PRECTOTCORR', 'T2M'])
            y_precip = df['PRECTOTCORR']
            self.train_and_save_model(X_precip, y_precip, 'precipitation_model.pkl')

            # Combined Model
            X_combined = df.drop(columns=['T2M', 'PRECTOTCORR'])
            y_combined = df[['T2M', 'PRECTOTCORR']]
            self.train_and_save_model(X_combined, y_combined, 'combined_weather_model.pkl')
        else:
            print("Error: Required columns are missing in the dataset.")

if __name__ == "__main__":
    data_path = 'nasa_data/csv/tempWindHumv1.csv'  # Update with your actual file path
    trainer = WeatherModelTrainer(data_path)
    trainer.train_models()
