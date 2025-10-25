from flask import Flask, request, jsonify
import numpy as np
import joblib
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load Model & Scaler
model = load_model("final_model.h5")
scaler = joblib.load("scaler.pkl")

@app.route('/')
def home():
    return "API is up and running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            "Pregnancies","Glucose","BloodPressure","SkinThickness",
            "Insulin","BMI","DiabetesPedigreeFunction","Age"
        ]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Input JSON tidak lengkap"}), 400

        input_data = np.array([[
            data["Pregnancies"],
            data["Glucose"],
            data["BloodPressure"],
            data["SkinThickness"],
            data["Insulin"],
            data["BMI"],
            data["DiabetesPedigreeFunction"],
            data["Age"]
        ]])

        # Scaling
        input_scaled = scaler.transform(input_data)

        # Prediksi
        prob = float(model.predict(input_scaled)[0][0])
        pred = 1 if prob >= 0.5 else 0

        # ✅ Hanya probability & status
        result = {
            "probability": round(prob * 100, 2),
            "status": "Diabetes" if pred == 1 else "Tidak Diabetes"
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7860)
