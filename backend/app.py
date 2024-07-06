from flask import Flask, request, jsonify
import joblib
import pandas as pd
import traceback

app = Flask(__name__)

# Load the model and scaler
model = joblib.load('../backend/model.pkl')
scaler = joblib.load('../backend/scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json(force=True)
        data_df = pd.DataFrame(data, index=[0])

        # Ensure the feature names are consistent
        expected_features = scaler.feature_names_in_
        missing_features = set(expected_features) - set(data_df.columns)
        if missing_features:
            return jsonify({'error': f'Missing features: {missing_features}'}), 400
        
        # Transform the data
        data_scaled = scaler.transform(data_df[expected_features])

        # Make prediction
        prediction = model.predict(data_scaled)
        
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e), 'trace': traceback.format_exc()}), 500

if __name__ == '__main__':
    app.run(debug=True)
