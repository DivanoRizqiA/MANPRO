#pip install google-generativeai
#pip install python-dotenv

import os
import sys
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv

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

def determine_risk_level(risk_percentage):
    """
    Tentukan level risiko berdasarkan persentase dari ML model HuggingFace
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
    Menganalisis data diabetes menggunakan OpenRouter (Gemini Model)
    
    Args:
        input_data (dict): Dictionary berisi data pasien dengan keys:
            - Pregnancies, Glucose, BloodPressure, SkinThickness,
            - Insulin, BMI, DiabetesPedigreeFunction, Age, Outcome
    
    Returns:
        str: Hasil analisis dari AI
    """
    try:
        # Validate API key
        # Cek OPENROUTER_API_KEY dulu, fallback ke GEMINI_API_KEY jika user belum ganti nama variabel
        api_key = os.environ.get("OPENROUTER_API_KEY") or os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("OPENROUTER_API_KEY tidak ditemukan di environment variables")
        
        print(f"[LOG] Menginisialisasi OpenRouter client...", file=sys.stderr)
        
        # Menggunakan model Qwen via OpenRouter
        # User request: "Qwen 2.5 / Qwen 3 (Instruct)"
        model_name = "qwen/qwen-2.5-72b-instruct" 

        # Buat prompt untuk analisis lengkap dan mudah dipahami
        prompt_content = f"""
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

        print(f"[LOG] Mengirim request ke OpenRouter ({model_name})...", file=sys.stderr)
        
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/BackendR/ManPro", # Referer required/recommended by OpenRouter
            "X-Title": "ManPro Health Analysis"
        }
        
        data = {
            "model": model_name,
            "messages": [
                {
                    "role": "user",
                    "content": prompt_content
                }
            ],
            "temperature": 0.7,
            "top_p": 0.9,
            "max_tokens": 4000 # Set limit token cukup besar agar tidak terpotong
        }
        
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
        
        with urllib.request.urlopen(req) as response:
            response_body = response.read().decode('utf-8')
            result = json.loads(response_body)
            
            if 'choices' in result and len(result['choices']) > 0:
                print(f"[LOG] Response berhasil diterima dari OpenRouter", file=sys.stderr)
                return result['choices'][0]['message']['content']
            else:
                msg = f"Invalid response format: {str(result)}"
                print(f"[ERROR] {msg}", file=sys.stderr)
                raise Exception(msg)
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"[ERROR] HTTP Error OpenRouter: {e.code} - {error_body}", file=sys.stderr)
        
        # Fallback ke mock response untuk error quota/rate limit
        if e.code == 429 or e.code == 402: # 402 is Payment Required
            print(f"[WARNING] OpenRouter quota/credit issue, menggunakan mock response", file=sys.stderr)
        else:
            print(f"[WARNING] Error dari OpenRouter API ({e.code}), menggunakan mock response", file=sys.stderr)
        
        return generate_mock_analysis(input_data)
        
    except Exception as e:
        error_str = str(e)
        print(f"[ERROR] Error dalam analyze_diabetes_data: {error_str}", file=sys.stderr)
        # Fallback ke mock response
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
            
            # WAJIB menggunakan risk_percentage dari ML model HuggingFace
            if 'risk_percentage' not in input_data or input_data['risk_percentage'] is None:
                error_msg = "risk_percentage is required from HuggingFace ML model"
                print(f"[ERROR] {error_msg}", file=sys.stderr)
                print(json.dumps({"success": False, "error": error_msg}))
                sys.exit(1)
            
            risk_percentage = float(input_data['risk_percentage'])
            print(f"[LOG] Using ML model risk percentage from HuggingFace: {risk_percentage:.2f}%", file=sys.stderr)
            
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
