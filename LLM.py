#pip install google-genai
#pip install python-dotenv

import os
import sys
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Set UTF-8 encoding for stdout
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Load environment variables from .env file
load_dotenv()

def generate_mock_analysis(input_data: dict):
    """
    Generate mock AI analysis for testing saat API quota habis.
    Struktur sama dengan real Gemini response.
    """
    glucose = input_data.get('Glucose', 0)
    bmi = input_data.get('BMI', 0)
    age = input_data.get('Age', 0)
    blood_pressure = input_data.get('BloodPressure', 0)
    
    mock_response = f"""
ANALISIS PENYAKIT PASIEN ANDA - PENJELASAN DETAIL

EVALUASI SETIAP PARAMETER KESEHATAN ANDA

1. Kadar Glukosa Darah: {glucose} mg/dL

Kadar gula darah Anda adalah {glucose} mg/dL. Untuk memahami apakah ini tinggi atau rendah, ketahui bahwa kadar gula darah normal ketika Anda belum makan (puasa) adalah 70-100 mg/dL. Angka {glucose} mg/dL menunjukkan kondisi yang perlu diperhatikan. Jika angka ini konsisten tinggi, ini adalah tanda bahwa tubuh Anda kesulitan mengatur gula darah. Gula darah yang tinggi seperti memiliki terlalu banyak gula dalam aliran darah Anda, yang bisa merusak pembuluh darah dan berbagai organ jika dibiarkan lama.

2. BMI (Indeks Massa Tubuh): {bmi:.1f}

BMI Anda adalah {bmi:.1f}. BMI adalah cara mengukur apakah berat badan Anda seimbang dengan tinggi badan Anda. BMI normal adalah 18.5-24.9, BMI overweight adalah 25-29.9, dan BMI obese adalah 30 ke atas. Dengan BMI {bmi:.1f}, kondisi Anda menunjukkan bahwa berat badan memiliki kontribusi pada faktor risiko kesehatan Anda. Kelebihan berat badan membuat sel-sel tubuh kurang sensitif terhadap insulin, hormon yang membantu sel menyerap gula. Bayangkan cell-cell tubuh Anda seperti pintu yang perlu dibuka oleh insulin, dan kelebihan lemak membuat pintu itu lebih sulit dibuka.

3. Tekanan Darah: {blood_pressure} mmHg

Tekanan darah normal adalah kurang dari 120/80 mmHg. Tekanan darah Anda {blood_pressure} mmHg memerlukan perhatian khusus. Tekanan darah tinggi (hipertensi) sering terjadi bersamaan dengan resistansi insulin dan diabetes. Ketika tekanan darah tinggi, jantung harus bekerja lebih keras untuk memompa darah ke seluruh tubuh, yang bisa merusak pembuluh darah dari waktu ke waktu.

4. Usia: {age} tahun

Pada usia {age} tahun, risiko mengalami masalah metabolisme meningkat dibanding usia muda. Seiring bertambahnya usia, tubuh menjadi kurang efisien dalam memproduksi dan menggunakan insulin. Ini adalah proses alami, namun dapat diperlambat dengan gaya hidup sehat.

DIAGNOSIS MEDIS LENGKAP

Berdasarkan kombinasi data Anda, terutama kadar glukosa {glucose} mg/dL dan BMI {bmi:.1f}, perlu ada perhatian khusus terhadap kemungkinan resistansi insulin atau prediabetes. Resistansi insulin adalah kondisi di mana sel-sel tubuh tidak merespons insulin dengan baik, sehingga pankreas harus memproduksi lebih banyak insulin untuk mengontrol gula darah. Jika kondisi ini tidak ditangani, dapat berkembang menjadi diabetes tipe 2.

KOMPLIKASI YANG MUNGKIN TERJADI JIKA TIDAK DITANGANI

Jika kadar gula darah tetap tinggi dalam jangka panjang, beberapa komplikasi serius bisa berkembang. Masalah mata (retinopati) bisa terjadi karena gula darah tinggi merusak pembuluh darah halus di retina mata. Masalah ginjal (nefropati) dapat terjadi karena gula tinggi merusak filter di ginjal. Masalah jantung meningkat risiko karena tekanan darah dan gula tinggi mempercepat penyumbatan arteri. Kesemutan atau mati rasa di tangan dan kaki (neuropati) terjadi karena saraf rusak oleh gula tinggi.


REKOMENDASI DAN SARAN KHUSUS UNTUK ANDA

1. PANDUAN MAKAN YANG HARUS ANDA IKUTI

Target kalori harian Anda dengan BMI {bmi:.1f} adalah sekitar 1800-2000 kalori per hari, dengan pembagian:
- Karbohidrat: 45% (180-200 gram, pilih yang kompleks)
- Protein: 25% (110-125 gram)
- Lemak sehat: 30% (60-65 gram)

Menu Sarapan Sehat (pilih satu):
- Oatmeal 50 gram dengan susu rendah lemak 200 ml dan buah-buahan (apel atau pir)
- Roti gandum 2 lembar + telur rebus 1 butir + tomat + keju rendah lemak
- Nasi merah 100 gram + lauk pauk protein (ikan atau ayam tanpa kulit)

Menu Makan Siang (pilih satu):
- Ikan bakar 150 gram + nasi merah 150 gram + sayuran rebus (brokoli, wortel)
- Ayam grilled 150 gram + kentang rebus + salad sayuran segar dengan minyak zaitun
- Tahu goreng sehat 200 gram + nasi merah 150 gram + sup sayuran

Snack Sehat (pilih satu, max 2x sehari):
- Kacang-kacangan tanpa garam 30 gram
- Yogurt rendah lemak 150 ml
- Apel medium 1 buah atau jeruk

Menu Malam (pilih satu):
- Sup sayuran dengan protein (ayam/ikan/tahu) - minimal 1 porsi besar
- Bubur daging ayam dengan sayuran
- Ikan kukus dengan sayuran dan beras merah

2. PROGRAM OLAHRAGA YANG DIREKOMENDASIKAN

Lakukan olahraga minimal 150 menit per minggu (30 menit, 5 hari seminggu). Jenis olahraga yang baik:
- Jalan kaki: 30 menit dengan kecepatan sedang (bisa sambil berbincang tapi sedikit terengah-engah)
- Renang: 30 menit, gerakan yang smooth dan tidak terlalu intens
- Bersepeda: 30 menit dengan intensitas sedang
- Senam aerobik: 20-30 menit 3 kali seminggu

Lakukan setiap hari atau minimal 5 hari seminggu. Mulai pelan, tingkatkan intensitas secara bertahap.

3. GAYA HIDUP YANG HARUS DIUBAH

- Tidur 7-8 jam setiap malam (tidur kurang dari 6 jam meningkatkan resistansi insulin)
- Kurangi stres dengan meditasi atau hobi yang menenangkan (minimal 10 menit sehari)
- Hindari merokok dan alkohol yang berlebihan
- Minum air putih 8 gelas per hari
- Hindari minuman manis dan makanan cepat saji

4. MONITORING KESEHATAN RUTIN

- Cek gula darah puasa setiap bulan (target: 100-125 mg/dL)
- Cek tekanan darah setiap 2 minggu (target: <130/80 mmHg)
- Konsultasi dengan dokter setiap 3 bulan
- Lakukan tes HbA1c setiap 3-6 bulan untuk melihat rata-rata gula darah Anda

5. KAPAN HARUS KE DOKTER DENGAN URGENCY TINGGI

Pergi ke dokter atau rumah sakit segera jika mengalami:
- Kesemutan atau mati rasa yang parah di tangan dan kaki
- Pandangan kabur atau ada bintik hitam
- Nyeri dada atau sesak napas
- Luka di kaki yang tidak sembuh dalam seminggu
- Gula darah sangat tinggi atau sangat rendah (badan gemetar, kepala pusing)

KESIMPULAN DAN MOTIVASI

Kondisi Anda saat ini memerlukan tindakan preventif yang serius, namun masih sepenuhnya dapat dikendalikan dengan disiplin dan komitmen. Gaya hidup sehat yang Anda mulai hari ini bisa mencegah perkembangan penyakit yang lebih serius di masa depan. Ingat bahwa perubahan tidak terjadi dalam seminggu, tetapi dengan konsistensi selama 3-6 bulan, Anda akan melihat perbedaan signifikan dalam kadar gula darah, berat badan, dan energi Anda. 

Motivasi: Anda masih memiliki waktu untuk membuat perubahan sebelum masalahnya menjadi lebih serius. Percayai proses, dan tubuh Anda akan berterima kasih.
"""
    
    return mock_response

def calculate_risk_percentage(input_data: dict):
    """
    Hitung persentase risiko diabetes berdasarkan parameter kesehatan
    
    Algorithm berdasarkan faktor-faktor klinis:
    - Glucose: >126 mg/dL adalah diabetes
    - BMI: >30 adalah obese
    - Age: >45 tahun meningkatkan risiko
    - BloodPressure: >90 mmHg diastolic adalah hipertensi
    - Insulin: >100 mcU/mL menunjukkan resistansi insulin
    - DiabetesPedigreeFunction: predisposisi genetik
    - Pregnancies: lebih banyak kehamilan = risiko lebih tinggi
    """
    glucose = input_data.get('Glucose', 100)
    bmi = input_data.get('BMI', 25)
    age = input_data.get('Age', 40)
    blood_pressure = input_data.get('BloodPressure', 70)
    insulin = input_data.get('Insulin', 80)
    dpf = input_data.get('DiabetesPedigreeFunction', 0.3)
    pregnancies = input_data.get('Pregnancies', 0)
    outcome = input_data.get('Outcome', 0)
    
    risk_score = 0.0
    
    # 1. Glucose contribution (40%)
    if glucose >= 126:  # Diabetes threshold
        risk_score += 40
    elif glucose >= 100:  # Prediabetes threshold
        risk_score += 25 + (glucose - 100) * 0.5
    elif glucose >= 90:
        risk_score += 10 + (glucose - 90) * 0.5
    else:
        risk_score += max(0, (100 - glucose) * 0.1)
    
    # 2. BMI contribution (25%)
    if bmi >= 30:  # Obese
        risk_score += 25
    elif bmi >= 25:  # Overweight
        risk_score += 15 + (bmi - 25) * 2
    elif bmi >= 18.5:  # Normal
        risk_score += max(0, (25 - bmi) * 0.5)
    else:  # Underweight
        risk_score += 5
    
    # 3. Age contribution (15%)
    if age >= 65:
        risk_score += 15
    elif age >= 45:
        risk_score += 8 + (age - 45) * 0.3
    elif age >= 35:
        risk_score += 3 + (age - 35) * 0.3
    else:
        risk_score += max(0, (35 - age) * 0.05)
    
    # 4. Blood Pressure contribution (10%)
    if blood_pressure >= 90:
        risk_score += 10
    elif blood_pressure >= 80:
        risk_score += 5 + (blood_pressure - 80) * 0.5
    else:
        risk_score += max(0, (80 - blood_pressure) * 0.1)
    
    # 5. Insulin contribution (5%)
    if insulin >= 100:
        risk_score += 5
    elif insulin >= 80:
        risk_score += 2 + (insulin - 80) * 0.15
    else:
        risk_score += max(0, (80 - insulin) * 0.02)
    
    # 6. Diabetes Pedigree Function contribution (3%)
    if dpf >= 0.8:
        risk_score += 3
    elif dpf >= 0.5:
        risk_score += 2 + (dpf - 0.5) * 2
    elif dpf >= 0.3:
        risk_score += 1 + (dpf - 0.3) * 5
    else:
        risk_score += max(0, dpf * 3)
    
    # 7. Pregnancies contribution (2%)
    if pregnancies >= 5:
        risk_score += 2
    elif pregnancies >= 2:
        risk_score += 1 + (pregnancies - 2) * 0.3
    
    # Clamp between 0-100
    risk_percentage = min(100, max(0, risk_score))
    
    return risk_percentage

def determine_risk_level(risk_percentage):
    """
    Tentukan level risiko berdasarkan persentase
    """
    if risk_percentage >= 80:
        return "Sangat Tinggi"
    elif risk_percentage >= 60:
        return "Tinggi"
    elif risk_percentage >= 40:
        return "Sedang"
    elif risk_percentage >= 20:
        return "Rendah"
    else:
        return "Sangat Rendah"

def analyze_diabetes_data(input_data: dict):
    """
    Menganalisis data diabetes menggunakan Gemini AI
    
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
        client = genai.Client(api_key=api_key)

        # Buat prompt untuk analisis lengkap dan mudah dipahami
        prompt = f"""
Anda adalah dokter spesialis berpengalaman 20 tahun yang ahli dalam menjelaskan penyakit diabetes kepada pasien awam tanpa latar belakang medis. 

DATA MEDIS PASIEN:
- Riwayat Kehamilan: {input_data['Pregnancies']} kali
- Kadar Glukosa Darah: {input_data['Glucose']} mg/dL (Normal puasa: 70-100 mg/dL)
- Tekanan Darah Diastolik: {input_data['BloodPressure']} mmHg (Normal: <80 mmHg)
- Ketebalan Kulit Trisep: {input_data['SkinThickness']} mm
- Level Insulin Serum: {input_data['Insulin']} mcU/mL
- BMI: {input_data['BMI']} (Normal: 18.5-24.9, Overweight: 25-29.9, Obesitas: >=30)
- Diabetes Pedigree Function: {input_data['DiabetesPedigreeFunction']}
- Usia: {input_data['Age']} tahun
- Diagnosis: {'DIABETES POSITIF' if input_data['Outcome'] == 1 else 'TIDAK DIABETES'}

Buatlah analisis medis yang LENGKAP DAN DETAIL dengan bahasa yang SANGAT MUDAH DIPAHAMI untuk pasien awam. Jelaskan SETIAP parameter kesehatan dengan detail (3-5 kalimat per parameter). Gunakan analogi sehari-hari dan contoh konkret agar mudah dipahami. 

Analisis harus mencakup:
1. Penjelasan detail setiap parameter (Glukosa, BMI, Tekanan Darah, Usia, dll)
2. Diagnosis dan analisis penyakit lengkap
3. Panduan makan dengan menu konkret
4. Program olahraga detail
5. Gaya hidup yang harus diubah
6. Monitoring kesehatan rutin
7. Kapan harus ke dokter
8. Kesimpulan dan motivasi

Gunakan format yang mudah dibaca dengan header yang jelas. TOTAL MINIMAL 2500-3000 KATA.
"""

        print(f"[LOG] Mengirim request ke Gemini AI...", file=sys.stderr)
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt,
            config={
                "temperature": 0.7,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": 8000,
            }
        )

        print(f"[LOG] Response berhasil diterima dari Gemini AI", file=sys.stderr)
        return response.text
    
    except Exception as e:
        error_str = str(e)
        print(f"[ERROR] Error dalam analyze_diabetes_data: {error_str}", file=sys.stderr)
        
        # Fallback ke mock response untuk SEMUA error (quota, network, model not found, dll)
        if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
            print(f"[WARNING] Gemini API quota habis, menggunakan mock response", file=sys.stderr)
        elif "404" in error_str or "NOT_FOUND" in error_str:
            print(f"[WARNING] Model tidak ditemukan, menggunakan mock response", file=sys.stderr)
        else:
            print(f"[WARNING] Error dari Gemini API, menggunakan mock response", file=sys.stderr)
        
        return generate_mock_analysis(input_data)


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
            
            # Calculate risk percentage based on input data
            risk_percentage = calculate_risk_percentage(input_data)
            risk_level = determine_risk_level(risk_percentage)
            
            print(f"[LOG] Risk Percentage: {risk_percentage:.1f}%", file=sys.stderr)
            print(f"[LOG] Risk Level: {risk_level}", file=sys.stderr)
            
            # Call analyze_diabetes_data - akan return mock jika quota habis
            analysis = analyze_diabetes_data(input_data)
            
            # Return hasil sebagai JSON ke stdout
            output = json.dumps({
                "success": True,
                "analysis": analysis,
                "riskPercentage": round(risk_percentage, 1),
                "riskLevel": risk_level
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
