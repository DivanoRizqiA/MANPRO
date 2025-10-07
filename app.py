from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import joblib
import os
from tensorflow.keras.models import load_model

# Load model dan scaler
model = load_model(os.path.join("saved_model", "cnn_model.h5"))
scaler = joblib.load(os.path.join("saved_model", "cnn_scaler.pkl"))

# Kolom yang harus dilog-transform
LOG_COLS = ["Insulin", "DiabetesPedigreeFunction", "Age", "Pregnancies"]

# Urutan kolom sesuai training
ORDERED_COLUMNS = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin',
                   'BMI', 'DiabetesPedigreeFunction', 'Age', 'dummy_0']

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df_input = pd.DataFrame([data])

        # Log transform
        for col in LOG_COLS:
            if col in df_input:
                df_input[col] = np.log1p(df_input[col])

        # Tambahkan dummy_0 jika tidak ada
        if 'dummy_0' not in df_input.columns:
            df_input['dummy_0'] = 0

        # Pastikan kolom sesuai urutan yang benar
        df_input = df_input[ORDERED_COLUMNS]

        # Scaling
        input_scaled = scaler.transform(df_input)

        # Reshape untuk CNN (batch_size, 3, 3, 1)
        input_reshaped = input_scaled.reshape(-1, 3, 3, 1)

        # Prediksi
        prediction = model.predict(input_reshaped)[0][0]
        
        return jsonify({
            "prediction": int(prediction >= 0.5),
            "risk_percentage": round(prediction * 100, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
