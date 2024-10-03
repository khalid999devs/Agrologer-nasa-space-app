from flask import current_app
from app import db
import pickle
import numpy as np

def predict_and_store():
    # Load models
    with open('models/drought_model.pkl', 'rb') as f:
        drought_model = pickle.load(f)
    with open('models/flood_model.pkl', 'rb') as f:
        flood_model = pickle.load(f)
    with open('models/groundwater_model.pkl', 'rb') as f:
        groundwater_model = pickle.load(f)
    with open('models/weather_model.pkl', 'rb') as f:
        weather_model = pickle.load(f)

    # Get user locations
    user_locations=[]
    # user_locations = db.session.execute("SELECT id, feature1, feature2 FROM user_locations").fetchall()

    predictions = []
    for loc in user_locations:
        features = np.array([[loc.feature1, loc.feature2]])
        
        # Predict using the loaded models
        drought_prediction = drought_model.predict(features)[0]
        flood_prediction = flood_model.predict(features)[0]
        groundwater_prediction = groundwater_model.predict(features)[0]
        weather_prediction = weather_model.predict(features)[0]

        # Store the predictions
        predictions.append({
            'user_id': loc.id,
            'drought': drought_prediction,
            'flood': flood_prediction,
            'groundwater': groundwater_prediction,
            'weather': weather_prediction
        })

    # Insert predictions into the database
    # for pred in predictions:
    #     db.session.execute(
    #         "INSERT INTO predictions (user_id, drought, flood, groundwater, weather) VALUES (:user_id, :drought, :flood, :groundwater, :weather)",
    #         pred
    #     )

    # db.session.commit()
    print(predictions)
    print("Predictions stored successfully.")
