#pip install google-genai

import os
from google import genai
from google.genai import types

def analyze_diabetes_data(input_data: dict):
    """
    input_data example:
    {
        "Pregnancies": 2,
        "Glucose": 145,
        "BloodPressure": 82,
        "SkinThickness": 25,
        "Insulin": 130,
        "BMI": 32.5,
        "DiabetesPedigreeFunction": 0.45,
        "Age": 45,
        "Outcome": 1
    }
    """

    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

    # Buat prompt deskriptif untuk Gemini
    prompt = f"""
    Berikut adalah hasil pemeriksaan data pasien diabetes:

    - Pregnancies: {input_data['Pregnancies']}
    - Glucose: {input_data['Glucose']}
    - Blood Pressure: {input_data['BloodPressure']}
    - Skin Thickness: {input_data['SkinThickness']}
    - Insulin: {input_data['Insulin']}
    - BMI: {input_data['BMI']}
    - Diabetes Pedigree Function: {input_data['DiabetesPedigreeFunction']}
    - Age: {input_data['Age']}
    - Outcome: {input_data['Outcome']}

    Tolong analisis bagian mana yang terlihat tidak normal, 
    berikan penjelasan singkat medisnya, 
    serta berikan saran pola hidup yang dapat membantu memperbaiki kondisi pasien.
    Jawaban ringkas tapi informatif.
    """

    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(prompt)],
        )
    ]

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=contents
    )

    print(response.text)
    return response.text


if __name__ == "__main__":
    # Contoh data input (bisa diganti dari backend)
    sample_input = {
        "Pregnancies": 3,
        "Glucose": 160,
        "BloodPressure": 90,
        "SkinThickness": 30,
        "Insulin": 200,
        "BMI": 35.2,
        "DiabetesPedigreeFunction": 0.6,
        "Age": 50,
        "Outcome": 1
    }

    analyze_diabetes_data(sample_input)