import pickle

def load_model(model_path):
    with open(model_path, 'rb') as model_file:
        return pickle.load(model_file)

flood_model = load_model('models/flood_model.pkl')
drought_model = load_model('models/drought_model.pkl')

def predict_flood(data):
    return flood_model.predict([data['features']])[0]

def predict_drought(data):
    return drought_model.predict([data['features']])[0]
