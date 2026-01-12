#pip install google-generativeai
#pip install python-dotenv

import os
import sys
import json
from dotenv import load_dotenv
import google.generativeai as genai

# Set UTF-8 encoding for stdout
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Load environment variables from .env file
load_dotenv()

def analyze_diabetes_data(input_data: dict):
    """
    Menganalisis data diabetes menggunakan OpenRouter (Gemini Model)
    
    Args:
        input_data (dict): Dictionary berisi data pasien dengan keys:
            - Pregnancies, Glucose, BloodPressure, SkinThickness,
            - Insulin, BMI, DiabetesPedigreeFunction, Age, Outcome
    
    Returns:
        str: Hasil analisis dari Gemini AI
    """
    try:
        # Validate API key
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY tidak ditemukan di environment variables")
        
        print(f"[LOG] Menginisialisasi Gemini AI client...", file=sys.stderr)
        genai.configure(api_key=api_key)
        
        # Gunakan model Gemini 1.5 Flash
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Buat prompt untuk analisis lengkap dan mudah dipahami
        prompt = f"""
Anda adalah dokter spesialis berpengalaman 20 tahun. Tugas Anda adalah menjelaskan hasil tes medis kepada pasien awam dengan format POINT-PER-POINT yang sangat terstruktur.

DATA PASIEN:
- Glukosa: {input_data.get('Glucose', '-')}
- BMI: {input_data.get('BMI', '-')}
- Tekanan Darah: {input_data.get('BloodPressure', '-')}
- Insulin: {input_data.get('Insulin', '-')}
- Usia: {input_data.get('Age', '-')}
- Kehamilan: {input_data.get('Pregnancies', '-')}
- Ketebalan Kulit: {input_data.get('SkinThickness', '-')}
- Riwayat Keluarga (Pedigree): {input_data.get('DiabetesPedigreeFunction', '-')}
- Prediksi AI: {'BERISIKO DIABETES' if input_data.get('Outcome') == 1 else 'TIDAK BERISIKO DIABETES'}

INSTRUKSI FORMAT JAWABAN (WAJIB DIIKUTI):
Saya ingin Anda menganalisis SETIAP parameter satu per satu. Jangan gabungkan. Format output harus persis seperti ini:

1. **Glukosa** ({input_data.get('Glucose', '-')} mg/dL)
   [Analisis mendalam tentang nilai glukosa pasien ini. Apakah normal? Apa dampaknya? Gunakan analogi mudah.]

2. **BMI** ({input_data.get('BMI', '-')} kg/m²)
   [Analisis mendalam tentang BMI pasien ini. Apakah berat badan ideal? Apa resikonya?]

3. **Tekanan Darah** ({input_data.get('BloodPressure', '-')} mmHg)
   [Analisis mendalam tentang tekanan darah diastolik pasien ini.]

4. **Insulin** ({input_data.get('Insulin', '-')} mcU/mL)
   [Analisis level insulin serum pasien.]

5. **Usia** ({input_data.get('Age', '-')} tahun)
   [Analisis risiko berdasarkan usia.]

6. **Kehamilan** ({input_data.get('Pregnancies', '-')} kali)
   [Analisis pengaruh riwayat kehamilan terhadap risiko diabetes.]

7. **Ketebalan Kulit** ({input_data.get('SkinThickness', '-')} mm)
   [Analisis indikator lemak tubuh ini.]

8. **Riwayat Keluarga / Pedigree Function** ({input_data.get('DiabetesPedigreeFunction', '-')})
   [Analisis probabilitas genetik.]

---
**KESIMPULAN DAN REKOMENDASI TERPERINCI**
[Berikan kesimpulan diagnosa, lalu daftar rekomendasi yang SANGAT SPESIFIK untuk Menu Makanan (Pagi/Siang/Malam), Jadwal Olahraga, dan Kapan Harus ke Dokter]
"""

        print(f"[LOG] Mengirim request ke Gemini AI...", file=sys.stderr)
        
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.7,
                top_p=0.9,
                top_k=40,
                max_output_tokens=8000,
            )
        )
        
        print(f"[LOG] Response berhasil diterima dari Gemini AI", file=sys.stderr)
        return response.text
    
    except Exception as e:
        error_str = str(e)
        print(f"[ERROR] Error dalam analyze_diabetes_data: {error_str}", file=sys.stderr)
        raise e



if __name__ == "__main__":
    # Cek apakah ada argument dari command line
    if len(sys.argv) > 1:
        print(f"[LOG] Menerima data dari command line argument", file=sys.stderr)
        
        # Terima data JSON dari argument
        try:
            input_json = sys.argv[1]
            print(f"[LOG] Input JSON: {input_json}", file=sys.stderr)
            
            input_data = json.loads(input_json)
            print(f"[LOG] Data berhasil di-parse", file=sys.stderr)
            
            # WAJIB menggunakan risk_percentage dari ML model HuggingFace
            if 'risk_percentage' not in input_data or input_data['risk_percentage'] is None:
                error_msg = "risk_percentage is required from HuggingFace ML model"
                print(f"[ERROR] {error_msg}", file=sys.stderr)
                print(json.dumps({"success": False, "error": error_msg}))
                sys.exit(1)
            
            risk_percentage = float(input_data['risk_percentage'])
            print(f"[LOG] Using ML model risk percentage from HuggingFace: {risk_percentage:.2f}%", file=sys.stderr)
            
            print(f"[LOG] Risk Percentage: {risk_percentage:.1f}%", file=sys.stderr)
            
            # Call analyze_diabetes_data
            analysis = analyze_diabetes_data(input_data)
            
            # Return hasil sebagai JSON ke stdout
            output = json.dumps({
                "success": True,
                "analysis": analysis,
                "riskPercentage": round(risk_percentage, 1),
            }, ensure_ascii=False)
            print(output)
            
            # Exit dengan code 0 untuk success
            sys.exit(0)
            
        except json.JSONDecodeError as e:
            error_msg = f"JSON parsing error: {str(e)}"
            print(f"[ERROR] {error_msg}", file=sys.stderr)
            print(json.dumps({"success": False, "error": error_msg}))
            sys.exit(1)
            
        except KeyError as e:
            error_msg = f"Missing required field: {str(e)}"
            print(f"[ERROR] {error_msg}", file=sys.stderr)
            print(json.dumps({"success": False, "error": error_msg}))
            sys.exit(1)
            
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            print(f"[ERROR] {error_msg}", file=sys.stderr)
            print(json.dumps({"success": False, "error": error_msg}))
            sys.exit(1)
    else:
        print("[ERROR] Usage: python LLM.py '<json_data>'", file=sys.stderr)
        print("[ERROR] Example:", file=sys.stderr)
        print('[ERROR] python LLM.py \'{"Pregnancies":3,"Glucose":160,"BloodPressure":90,"SkinThickness":30,"Insulin":200,"BMI":35.2,"DiabetesPedigreeFunction":0.6,"Age":50,"Outcome":1}\'', file=sys.stderr)
        sys.exit(1)
