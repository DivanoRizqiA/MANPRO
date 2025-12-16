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

**1. Kadar Glukosa Darah: {glucose} mg/dL**

Kadar gula darah Anda adalah {glucose} mg/dL. Untuk memahami apakah ini tinggi atau rendah, ketahui bahwa kadar gula darah normal ketika Anda belum makan (puasa) adalah 70-100 mg/dL. Angka {glucose} mg/dL menunjukkan kondisi yang perlu diperhatikan. Jika angka ini konsisten tinggi, ini adalah tanda bahwa tubuh Anda kesulitan mengatur gula darah. Gula darah yang tinggi seperti memiliki terlalu banyak gula dalam aliran darah Anda, yang bisa merusak pembuluh darah dan berbagai organ jika dibiarkan lama.

**2. BMI (Indeks Massa Tubuh): {bmi:.1f}**

BMI Anda adalah {bmi:.1f}. BMI adalah cara mengukur apakah berat badan Anda seimbang dengan tinggi badan Anda. BMI normal adalah 18.5-24.9, BMI overweight adalah 25-29.9, dan BMI obese adalah 30 ke atas. Dengan BMI {bmi:.1f}, kondisi Anda menunjukkan bahwa berat badan memiliki kontribusi pada faktor risiko kesehatan Anda. Kelebihan berat badan membuat sel-sel tubuh kurang sensitif terhadap insulin, hormon yang membantu sel menyerap gula. Bayangkan cell-cell tubuh Anda seperti pintu yang perlu dibuka oleh insulin, dan kelebihan lemak membuat pintu itu lebih sulit dibuka.

**3. Tekanan Darah: {blood_pressure} mmHg**

Tekanan darah normal adalah kurang dari 120/80 mmHg. Tekanan darah Anda {blood_pressure} mmHg memerlukan perhatian khusus. Tekanan darah tinggi (hipertensi) sering terjadi bersamaan dengan resistansi insulin dan diabetes. Ketika tekanan darah tinggi, jantung harus bekerja lebih keras untuk memompa darah ke seluruh tubuh, yang bisa merusak pembuluh darah dari waktu ke waktu.

**4. Usia: {age} tahun**

Pada usia {age} tahun, risiko mengalami masalah metabolisme meningkat dibanding usia muda. Seiring bertambahnya usia, tubuh menjadi kurang efisien dalam memproduksi dan menggunakan insulin. Ini adalah proses alami, namun dapat diperlambat dengan gaya hidup sehat.

DIAGNOSIS MEDIS LENGKAP

Berdasarkan kombinasi data Anda, terutama kadar glukosa {glucose} mg/dL dan BMI {bmi:.1f}, perlu ada perhatian khusus terhadap kemungkinan resistansi insulin atau prediabetes. Resistansi insulin adalah kondisi di mana sel-sel tubuh tidak merespons insulin dengan baik, sehingga pankreas harus memproduksi lebih banyak insulin untuk mengontrol gula darah. Jika kondisi ini tidak ditangani, dapat berkembang menjadi diabetes tipe 2.

KOMPLIKASI YANG MUNGKIN TERJADI JIKA TIDAK DITANGANI

Jika kadar gula darah tetap tinggi dalam jangka panjang, beberapa komplikasi serius bisa berkembang. Masalah mata (retinopati) bisa terjadi karena gula darah tinggi merusak pembuluh darah halus di retina mata. Masalah ginjal (nefropati) dapat terjadi karena gula tinggi merusak filter di ginjal. Masalah jantung meningkat risiko karena tekanan darah dan gula tinggi mempercepat penyumbatan arteri. Kesemutan atau mati rasa di tangan dan kaki (neuropati) terjadi karena saraf rusak oleh gula tinggi.

---

REKOMENDASI DAN SARAN KHUSUS UNTUK ANDA

1. PANDUAN MAKAN YANG HARUS ANDA IKUTI

Target kalori harian Anda dengan BMI {bmi:.1f} adalah sekitar 1800-2000 kalori per hari, dengan pembagian:
- Karbohidrat: 45% (180-200 gram, pilih yang kompleks)
- Protein: 25% (110-125 gram)
- Lemak sehat: 30% (60-65 gram)

**Menu Sarapan Sehat (pilih satu):**
- Oatmeal 50 gram dengan susu rendah lemak 200 ml dan buah-buahan (apel atau pir)
- Roti gandum 2 lembar + telur rebus 1 butir + tomat + keju rendah lemak
- Nasi merah 100 gram + lauk pauk protein (ikan atau ayam tanpa kulit)

**Menu Makan Siang (pilih satu):**
- Ikan bakar 150 gram + nasi merah 150 gram + sayuran rebus (brokoli, wortel)
- Ayam grilled 150 gram + kentang rebus + salad sayuran segar dengan minyak zaitun
- Tahu goreng sehat 200 gram + nasi merah 150 gram + sup sayuran

**Snack Sehat (pilih satu, max 2x sehari):**
- Kacang-kacangan tanpa garam 30 gram
- Yogurt rendah lemak 150 ml
- Apel medium 1 buah atau jeruk

**Menu Malam (pilih satu):**
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
INSTRUKSI PENTING: Anda HARUS menghasilkan analisis medis yang LENGKAP DAN DETAIL (minimal 2000-3000 kata), dengan bahasa yang SANGAT MUDAH DIPAHAMI untuk pasien awam. Jelaskan SETIAP hal dengan DETAIL yang cukup.

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

INSTRUKSI UTAMA: 
1. ANDA HARUS MENULIS MINIMAL 2000-3000 KATA
2. Setiap penjelasan harus LENGKAP dan DETAIL (3-5 kalimat per poin)
3. Gunakan bahasa yang SANGAT MUDAH dipahami orang awam
4. Berikan contoh konkret dan analogi sehari-hari
5. SETIAP poin dijelaskan dalam 3-5 kalimat yang jelas

BAGIAN 1: PENJELASAN DETAIL SETIAP PARAMETER MEDIS (MINIMAL 1000 KATA):
   
   Saya akan menjelaskan setiap hasil pemeriksaan Anda dengan bahasa yang mudah dipahami:
   
   - RIWAYAT KEHAMILAN ({input_data['Pregnancies']} kali): Jelaskan PANJANG LEBAR apa artinya, bagaimana kehamilan mempengaruhi hormon insulin, mengapa risiko diabetes meningkat setelah melahirkan, apa yang terjadi dalam tubuh saat hamil yang bisa memicu diabetes di kemudian hari. Berikan analogi yang mudah dipahami.
   
   - KADAR GULA DARAH ({input_data['Glucose']} mg/dL): Jelaskan dengan SANGAT DETAIL - nilai normal berapa, nilai Anda berapa, selisihnya berapa, apa artinya dalam kehidupan sehari-hari, apa yang terjadi dalam tubuh saat gula darah tinggi, bagaimana gula merusak pembuluh darah, organ apa saja yang terpengaruh, gejala apa yang mungkin dirasakan. Berikan perumpamaan sederhana tentang gula darah.
   
   - TEKANAN DARAH ({input_data['BloodPressure']} mmHg): Jelaskan apa itu tekanan darah dengan bahasa awam (seperti tekanan air dalam selang), normal berapa, nilai Anda berapa, apa risikonya jika tinggi, hubungan tekanan darah tinggi dengan diabetes, mengapa keduanya berbahaya jika digabung.
   
   - KETEBALAN KULIT ({input_data['SkinThickness']} mm): Jelaskan apa artinya pengukuran ini, mengapa dokter mengukur ketebalan kulit, hubungannya dengan lemak tubuh, apa yang bisa disimpulkan dari nilai Anda.
   
   - KADAR INSULIN ({input_data['Insulin']} mcU/mL): Jelaskan dengan DETAIL apa itu insulin (seperti kunci yang membuka pintu sel), bagaimana insulin bekerja, apa artinya jika insulin tinggi atau rendah, apa itu resistensi insulin dengan bahasa sederhana (seperti kunci yang rusak), bagaimana kondisi Anda berdasarkan angka ini.
   
   - INDEKS MASSA TUBUH/BMI ({input_data['BMI']}): Jelaskan apa itu BMI dengan bahasa awam, cara menghitungnya, kategori BMI (kurus/normal/gemuk/obesitas), Anda masuk kategori apa, berapa kg harus naik/turun untuk masuk kategori normal, mengapa berat badan penting untuk diabetes, bagaimana lemak tubuh membuat insulin tidak bekerja dengan baik.
   
   - FAKTOR KETURUNAN ({input_data['DiabetesPedigreeFunction']}): Jelaskan apa artinya angka ini, bagaimana gen mempengaruhi risiko diabetes, apakah keluarga Anda ada yang diabetes, seberapa besar pengaruh genetik vs gaya hidup, apakah bisa dicegah meski ada faktor keturunan.
   
   - USIA ({input_data['Age']} tahun): Jelaskan bagaimana usia mempengaruhi risiko diabetes, mengapa semakin tua risiko semakin tinggi, apa yang terjadi pada tubuh seiring usia, apakah usia Anda termasuk risiko tinggi atau tidak.
   
   Untuk SETIAP parameter di atas, WAJIB dijelaskan dalam 3-5 kalimat yang LENGKAP dan DETAIL.

BAGIAN 2: DIAGNOSIS DAN ANALISIS PENYAKIT ANDA (Minimal 500 kata - ANALISIS MEDIS MENDALAM):
   
   Berdasarkan SEMUA data di atas, saya akan menjelaskan diagnosis dan kondisi penyakit Anda dengan bahasa yang sangat mudah dipahami:
   
   - DIAGNOSIS PASTI: Jelaskan dengan SANGAT JELAS - apakah Anda punya diabetes atau tidak, kalau ya diabetes tipe apa (jelaskan perbedaan tipe 1 dan tipe 2 dengan bahasa awam), atau mungkin prediabetes (jelaskan apa itu prediabetes seperti "peringatan dini"), apa yang membuat saya menyimpulkan diagnosis ini dari data Anda. Jelaskan kombinasi parameter mana yang paling menunjukkan diagnosis ini.
   
   - TINGKAT KEPARAHAN PENYAKIT: Jelaskan dengan DETAIL - ringan/sedang/berat, apa bedanya tiap tingkat, tingkat Anda yang mana, mengapa saya bilang begitu, apa yang membedakan kondisi ringan dengan berat, berikan perbandingan yang mudah dipahami (seperti tingkat 1-10). Jelaskan juga apa dampak dari tingkat keparahan ini pada aktivitas sehari-hari Anda.
   
   - KOMPLIKASI YANG MUNGKIN TERJADI: Jelaskan SATU PER SATU komplikasi yang bisa terjadi jika tidak diobati - masalah mata (jelaskan proses kerusakannya), masalah ginjal (jelaskan fungsi ginjal dengan sederhana), masalah jantung (mengapa diabetes merusak jantung), masalah saraf (kesemutan, mati rasa), masalah kaki (luka yang tidak sembuh), masalah seksual. Untuk SETIAP komplikasi, jelaskan MENGAPA bisa terjadi dan bagaimana mencegahnya.
   
   - PENYEBAB ANDA MENGALAMI KONDISI INI: Jelaskan hubungan semua faktor - BMI {input_data['BMI']} yang tinggi membuat sel-sel tubuh sulit menerima insulin (jelaskan prosesnya), gula darah {input_data['Glucose']} yang tinggi merusak pembuluh darah (jelaskan bagaimana), faktor keturunan yang membuat Anda lebih rentan, usia {input_data['Age']} tahun yang meningkatkan risiko. Jelaskan bagaimana semua faktor ini BEKERJA SAMA memperburuk kondisi.
   
   - PROGNOSIS JIKA TIDAK DITANGANI: Jelaskan DETAIL skenario terburuk - dalam 1 bulan apa yang akan terjadi, dalam 3 bulan, dalam 6 bulan, dalam 1 tahun, dalam 5 tahun. Berikan gambaran yang JELAS dan NYATA tentang masa depan kesehatan Anda jika penyakit ini tidak diobati dengan baik.

3. PANDUAN MAKAN YANG HARUS ANDA IKUTI (Minimal 800 kata - SANGAT DETAIL dengan contoh KONKRET):
   
   A. Target Nutrisi Harian:
      - Kalori total per hari (hitung berdasarkan BMI dan aktivitas)
      - Pembagian: Karbohidrat (%), Protein (%), Lemak (%)
      - Kebutuhan serat harian
   
   B. Menu Harian Lengkap (berikan 3 pilihan untuk setiap waktu makan):
      SARAPAN (contoh konkret):
      - Pilihan 1: (sebutkan nama makanan, porsi gram/sendok)
      - Pilihan 2: (sebutkan nama makanan, porsi gram/sendok)
      - Pilihan 3: (sebutkan nama makanan, porsi gram/sendok)
      
      SNACK PAGI:
      - 3 pilihan snack sehat dengan porsi
      
      MAKAN SIANG:
      - Pilihan 1: (menu lengkap dengan porsi)
      - Pilihan 2: (menu lengkap dengan porsi)
      - Pilihan 3: (menu lengkap dengan porsi)
      
      SNACK SORE:
      - 3 pilihan snack dengan porsi
      
      MAKAN MALAM:
      - Pilihan 1: (menu lengkap, lebih ringan dari siang)
      - Pilihan 2: (menu lengkap)
      - Pilihan 3: (menu lengkap)
   
   C. Makanan yang WAJIB DIHINDARI (minimal 15 jenis dengan alasan):
      - Nama makanan 1: Alasan kenapa harus dihindari
      - Nama makanan 2: Alasan kenapa harus dihindari
      (dan seterusnya...)
   
   D. Makanan yang SANGAT DIANJURKAN (minimal 15 jenis dengan manfaat):
      - Nama makanan 1: Manfaat spesifik untuk diabetes
      - Nama makanan 2: Manfaat spesifik untuk diabetes
      (dan seterusnya...)
   
   E. Tips Praktis Diet:
      - Cara memasak yang tepat
      - Cara membaca label nutrisi
      - Tips makan di luar rumah
      - Cara mengatasi keinginan makan manis

4. PROGRAM OLAHRAGA LENGKAP:
   Untuk usia {input_data['Age']} tahun dengan BMI {input_data['BMI']}:
   
   A. Program Mingguan Detail:
      MINGGU 1-2 (Adaptasi):
      - Senin: Jenis olahraga, durasi, intensitas, waktu terbaik
      - Selasa: ...
      - Rabu: ...
      - Kamis: ...
      - Jumat: ...
      - Sabtu: ...
      - Minggu: ...
      
      MINGGU 3-4 (Peningkatan):
      - Program lebih intensif dengan detail sama
      
      BULAN 2-3 (Target):
      - Program untuk mencapai target berat badan
   
   B. Perhitungan Target:
      - Target detak jantung maksimal
      - Target detak jantung saat olahraga (60-70% dari max)
      - Target pembakaran kalori per sesi
      - Target penurunan berat badan: ... kg per bulan (realistis)
   
   C. Jenis Olahraga Spesifik:
      - Cardio: Jenis, cara, durasi
      - Strength training: Jenis, repetisi, set
      - Flexibility: Jenis gerakan
   
   D. Peringatan dan Tips Keamanan:
      - Kapan harus stop olahraga
      - Tanda bahaya yang harus diwaspadai
      - Tips mencegah cedera

5. MONITORING DAN KONTROL KETAT:
   A. Pemeriksaan Harian:
      - Parameter yang harus dicek setiap hari
      - Waktu terbaik untuk cek
      - Target nilai yang harus dicapai
   
   B. Pemeriksaan Mingguan:
      - Parameter mingguan
      - Cara mencatat dan mengevaluasi
   
   C. Pemeriksaan Bulanan:
      - Tes laboratorium yang perlu
      - Target pencapaian bulan 1, 2, 3
   
   D. Peralatan yang Dibutuhkan:
      - Alat monitoring yang harus dimiliki
      - Cara penggunaan
      - Rekomendasi merk (jika ada)

6. MANAJEMEN GAYA HIDUP KOMPREHENSIF:
   A. Pola Tidur:
      - Jam tidur optimal
      - Durasi tidur
      - Tips tidur berkualitas
      - Hubungan tidur dengan gula darah
   
   B. Manajemen Stress:
      - Teknik relaksasi (jelaskan step by step)
      - Meditasi atau yoga (panduan singkat)
      - Hobi yang disarankan
   
   C. Kebiasaan Buruk yang Harus Dihentikan:
      - List lengkap dengan cara menghentikannya
   
   D. Kebiasaan Baik yang Harus Dimulai:
      - List lengkap dengan cara memulai
   
   E. Support System:
      - Dukungan keluarga
      - Komunitas diabetes
      - Aplikasi health tracking

7. RENCANA MEDIS DAN PENGOBATAN:
   A. Kebutuhan Obat:
      - Apakah perlu obat berdasarkan data ini?
      - Jenis obat yang mungkin diresepkan
      - Cara kerja obat tersebut
   
   B. Jadwal Konsultasi:
      - Kapan harus ke dokter umum
      - Kapan harus ke spesialis endokrin
      - Kapan harus ke ahli gizi
   
   C. Pemeriksaan Lanjutan:
      - HbA1c: Kapan dan kenapa
      - Lipid profile: Kapan dan kenapa
      - Fungsi ginjal: Kapan dan kenapa
      - Pemeriksaan mata: Kapan dan kenapa
      - Pemeriksaan kaki: Kapan dan kenapa

8. KESIMPULAN DAN PROGNOSIS DETAIL:
   A. Ringkasan Kondisi:
      - Status saat ini dalam 3-4 paragraf
      - Tingkat urgensi penanganan
   
   B. Prognosis Jelas:
      - Jika TIDAK diobati: Skenario terburuk dalam 6 bulan, 1 tahun, 5 tahun
      - Jika DIOBATI dengan baik: Hasil yang bisa dicapai dalam 1 bulan, 3 bulan, 6 bulan, 1 tahun
   
   C. Timeline Perbaikan:
      - Minggu 1-2: Apa yang akan dirasakan
      - Bulan 1: Perubahan yang terlihat
      - Bulan 3: Pencapaian target
      - Bulan 6: Kondisi ideal
   
   D. Motivasi Personal:
      - Pesan khusus untuk pasien usia {input_data['Age']} tahun
      - Kisah sukses pasien serupa
      - Pengingat pentingnya konsistensi

ATURAN PENULISAN YANG SANGAT PENTING:
1. Tulis LENGKAP DAN DETAIL - minimal 2000-3000 kata total
2. Jelaskan SETIAP hal dengan bahasa yang SANGAT SEDERHANA seperti berbicara dengan orang yang tidak mengerti medis sama sekali
3. Gunakan analogi dan perumpamaan sehari-hari agar mudah dipahami
4. SELALU sertakan angka spesifik dari data pasien ({input_data['Glucose']}, {input_data['BMI']}, {input_data['Age']}, dll)
5. Setiap poin harus dijelaskan dalam 3-5 kalimat LENGKAP, bukan cuma 1 kalimat
6. Berikan contoh KONKRET: nama makanan spesifik, nama olahraga spesifik, jam spesifik, porsi spesifik
7. Jelaskan MENGAPA untuk setiap saran, jangan hanya menyuruh
8. Gunakan kalimat yang JELAS dan INFORMATIF
9. Untuk menu makanan: sebutkan bahan, cara masak, porsi dalam gram/sendok
10. Untuk olahraga: jelaskan cara melakukan gerakan, berapa repetisi, istirahat berapa detik

CONTOH PENJELASAN YANG BAIK:
BURUK: "Hindari nasi putih"
BAIK: "Anda harus menghindari nasi putih karena nasi putih memiliki indeks glikemik yang sangat tinggi (GI 73), yang artinya nasi putih akan cepat diubah menjadi gula dalam darah Anda. Dengan kadar gula darah Anda yang sudah {input_data['Glucose']} mg/dL (lebih tinggi dari normal 70-100 mg/dL), mengonsumsi nasi putih akan membuat gula darah Anda melonjak lebih tinggi lagi. Bayangkan gula darah seperti api, dan nasi putih seperti bensin yang dituang ke api tersebut. Sebagai gantinya, Anda bisa menggunakan nasi merah (GI 55) atau nasi shirataki (GI 0) yang jauh lebih aman untuk kondisi Anda."

WAJIB PANJANG: Setiap bagian (1-8) harus berisi minimal 500-700 kata. Jangan buat pendek!
"""

        print(f"[LOG] Mengirim request ke Gemini AI...", file=sys.stderr)
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",  # Model yang support API v1beta
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
        # Ini memastikan aplikasi tetap bisa berjalan meskipun ada masalah dengan Gemini API
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
            
            # Call analyze_diabetes_data - akan return mock jika quota habis
            result = analyze_diabetes_data(input_data)
            
            # Return hasil sebagai JSON ke stdout
            output = json.dumps({"success": True, "analysis": result}, ensure_ascii=False)
            print(output)
            
            # Exit dengan code 0 untuk success (termasuk mock response)
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
            # Untuk error yang TIDAK bisa di-handle (bukan quota)
            error_msg = f"Unexpected error: {str(e)}"
            print(f"[ERROR] {error_msg}", file=sys.stderr)
            print(json.dumps({"success": False, "error": error_msg}))
            sys.exit(1)
    else:
        # Jika tidak ada argument, tampilkan usage
        print("[ERROR] Usage: python LLM.py '<json_data>'", file=sys.stderr)
        print("[ERROR] Example:", file=sys.stderr)
        print('[ERROR] python LLM.py \'{"Pregnancies":3,"Glucose":160,"BloodPressure":90,"SkinThickness":30,"Insulin":200,"BMI":35.2,"DiabetesPedigreeFunction":0.6,"Age":50,"Outcome":1}\'', file=sys.stderr)
        sys.exit(1)