from flask import Blueprint, request, jsonify
from app.services.model_train import predict_flood, predict_drought

bp = Blueprint('prediction', __name__)

@bp.route('/predict/flood', methods=['POST'])
def flood_prediction():
    data = request.json
    result = predict_flood(data)
    return jsonify(result)

@bp.route('/predict/drought', methods=['POST'])
def drought_prediction():
    data = request.json
    result = predict_drought(data)
    return jsonify(result)
