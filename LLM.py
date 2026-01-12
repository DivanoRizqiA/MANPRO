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
        
        print(f"[LOG] Menginisialisasi Gemini AI client", file=sys.stderr)
        genai.configure(api_key=api_key)
        
        # Daftar model prioritas (Fallback Strategy)
        models_to_try = [
            'gemini-2.0-flash-lite',
            'gemini-2.0-flash',
            'gemini-2.5-pro',
            'gemini-2.5-flash-lite',
            'gemini-2.5-flash',
            'gemini-3-flash-preview',
            'gemini-3-pro-preview'
        ]

        # Determine risk label based on percentage
        try:
            risk_pct = float(input_data.get('risk_percentage', 0))
            if risk_pct <= 30:
                risk_label = "RISIKO RENDAH"
            elif risk_pct <= 70:
                risk_label = "RISIKO SEDANG"
            else:
                risk_label = "RISIKO TINGGI"
        except:
            risk_label = 'RISIKO TINGGI' if input_data.get('Outcome') == 1 else 'RISIKO RENDAH'

        # Buat prompt untuk analisis lengkap dan mudah dipahami
        prompt = f"""
Bertindaklah sebagai Dokter Spesialis Endokrinologi Senior.
Lakukan analisis mendalam terhadap hasil screening kesehatan berikut dan jelaskan hasilnya kepada pasien awam.
Gunakan format profesional yang sopan, tenang, dan sangat mudah dipahami.
Hindari jargon medis tanpa penjelasan.
Fokus pada edukasi yang memberdayakan pasien.
JANGAN mengulangi instruksi ini dalam respon Anda.
Mulailah respon Anda dengan sapaan standar: Yth. Bapak/Ibu, berikut adalah hasil analisis kesehatan Anda yang telah saya pelajari.
HINDARI penggunaan karakter seperti tanda kutip ganda atau tanda bintang ganda atau emoji dalam respon Anda. Gunakan format plain text yang rapi.

DATA MEDIS PASIEN:
- Glukosa: {input_data.get('Glucose', '-')} mg/dL (Kadar Gula Darah)
- BMI (Body Mass Index): {input_data.get('BMI', '-')} kg/m²
- Tekanan Darah Diastolik: {input_data.get('BloodPressure', '-')} mmHg
- Insulin Serum: {input_data.get('Insulin', '-')} mcU/mL
- Usia: {input_data.get('Age', '-')} tahun
- Jumlah Kehamilan: {input_data.get('Pregnancies', '-')} 
- Ketebalan Lipatan Kulit (Skin Thickness): {input_data.get('SkinThickness', '-')} mm
- Skor Riwayat Keturunan (Pedigree): {input_data.get('DiabetesPedigreeFunction', '-')}
- PREDIKSI AI AWAL: {risk_label} DIABETES (Probabilitas: {input_data.get('risk_percentage', '-') }%)

PERMINTAAN ANALISIS POINT-BY-POINT (WAJIB IKUTI FORMAT INI):

1. Gula Darah (Glukosa)
   Status [NORMAL / WASPADA / TINGGI]
   Penjelasan [Jelaskan apakah angka ini aman. Gunakan analogi sederhana, misal: bensin dalam tangki.]

2. Berat Badan & BMI
   Status [KURUS / IDEAL / GEMUK / OBESITAS]
   Penjelasan [Jelaskan hubungan berat badan pasien ini dengan risiko kesehatan.]

3. Tekanan Darah
   Status [OPTIMAL / NORMAL / TINGGI]
   Penjelasan [Analisis tekanan darah diastolik pasien.]

4. Kadar Insulin
   Penjelasan [Jelaskan fungsi insulin sebagai kunci pembuka sel gula. Apakah kadar ini wajar?]

5. Faktor Risiko Lainnya
   Usia & Kehamilan [Analisis risiko kelompok umur dan riwayat kehamilan]
   Riwayat Keluarga [Jelaskan seberapa besar pengaruh genetik bagi pasien ini]
   Lainnya [Analisis indikator fisik lain jika ada]

---
KESIMPULAN DOKTER
[Berikan rangkuman diagnosa satu paragraf yang menenangkan namun jujur.]

RESEP GAYA HIDUP SEHAT (PERSONALIZED STARTER PACK)
Mohon berikan rekomendasi konkrit dan bisa langsung dipraktekkan besok:
1. Pola Makan [Saran menu pagi, siang, malam yang spesifik. Hindari apa?]
2. Aktivitas Fisik [Jenis olahraga ringan yang cocok dan durasinya]
3. Tindakan Medis [Kapan harus cek lab ulang atau ke Rumah Sakit?]
"""

        print(f"[LOG] Mengirim request ke Gemini AI via Loop Fallback", file=sys.stderr)
        
        last_exception = None
        
        # Loop fallback: coba setiap model berurutan jika yang sebelumnya gagal
        for model_name in models_to_try:
            try:
                print(f"[LOG] MENCOBA MODEL: {model_name}", file=sys.stderr)
                model = genai.GenerativeModel(model_name)
                
                response = model.generate_content(
                    prompt,
                    generation_config=genai.types.GenerationConfig(
                        temperature=0.7,
                        top_p=0.9,
                        top_k=40,
                        max_output_tokens=8000,
                    )
                )
                
                print(f"[LOG] BERHASIL: Response diterima dari {model_name}", file=sys.stderr)
                return response.text
                
            except Exception as e:
                print(f"[WARNING] GAGAL pada {model_name}: {str(e)}", file=sys.stderr)
                last_exception = e
                continue # Lanjut ke model berikutnya dalam list
        
        # Jika loop selesai tanpa return, berarti semua model gagal
        if last_exception:
            raise last_exception
        else:
            raise Exception("Semua model Gemini dalam daftar gagal merespons.")
    
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
            
            # Determine risk label for output
            if risk_percentage <= 30:
                risk_label = "RISIKO RENDAH"
            elif risk_percentage <= 70:
                risk_label = "RISIKO SEDANG"
            else:
                risk_label = "RISIKO TINGGI"

            # Call analyze_diabetes_data
            analysis = analyze_diabetes_data(input_data)
            
            # Return hasil sebagai JSON ke stdout
            output = json.dumps({
                "success": True,
                "analysis": analysis,
                "riskPercentage": round(risk_percentage, 1),
                "riskLevel": risk_label
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
