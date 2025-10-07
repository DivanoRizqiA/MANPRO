# Laporan Proyek Machine Learning - Randy Censon

## Domain Proyek

Penyakit diabetes merupakan salah satu masalah kesehatan global yang terus meningkat setiap tahunnya. Deteksi dini terhadap risiko diabetes sangat penting untuk mencegah komplikasi serius dan meningkatkan kualitas hidup pasien. Dengan kemajuan teknologi, analisis data kesehatan menggunakan metode machine learning seperti logistic regression dapat membantu memprediksi kemungkinan seseorang menderita diabetes berdasarkan data medis mereka, seperti kadar glukosa, tekanan darah, dan indeks massa tubuh (BMI). Proyek ini bertujuan untuk membangun model prediksi diabetes berbasis regresi logistik yang mampu mengklasifikasikan pasien secara efektif berdasarkan data fitur kesehatan.

**Rubrik/Kriteria Tambahan (Opsional)**:

Diabetes adalah penyakit kronis yang berisiko fatal bagi penderitanya. Kondisi ini terjadi akibat kadar gula darah yang tinggi dalam tubuh. Glukosa sendiri merupakan sumber energi utama bagi sel-sel tubuh manusia. Namun, pada penderita diabetes, tubuh tidak mampu menyerap dan memanfaatkan glukosa secara optimal [1]. cara menyelesaikan masalah ini dengan memanfaatkan model Logistic Regression, serta melalui proses prapemrosesan seperti transformasi log dan normalisasi data, sistem ini dapat memprediksi kemungkinan seseorang mengidap diabetes. Model ini kemudian dievaluasi menggunakan metrik seperti akurasi dan confusion matrix, dan dapat digunakan untuk memprediksi pasien baru sebagai alat bantu keputusan dalam dunia medis.

referensi:
[1] A. YUSUP, I. M. ADITAMA dan R. NURSANIA, “IMPLEMENTASI ALGORITMA REGRESI LOGISTIK,” UNIVERSITAS NUSA PUTRA SUKABUMI , Sukabumi, 2024.

## Business Understanding

Problem Statements:

-   Banyak pasien diabetes tidak terdiagnosis sejak awal, sehingga mereka datang ke fasilitas kesehatan ketika kondisi sudah cukup parah dan memerlukan penanganan intensif. Hal ini memperburuk prognosis dan meningkatkan beban biaya pengobatan.

-   Tidak semua masyarakat memiliki akses langsung ke fasilitas medis berkualitas, sehingga deteksi dini diabetes menjadi sangat menantang terutama di wilayah terpencil atau kurang berkembang.

Goals:

-   Membuat model prediksi berbasis data yang dapat memperkirakan kemungkinan seseorang menderita diabetes berdasarkan data medis dasar seperti usia, kadar glukosa, tekanan darah, dan indeks massa tubuh.

-   Memberikan akses awal terhadap informasi risiko diabetes, terutama bagi masyarakat yang tidak memiliki akses mudah ke fasilitas kesehatan, sehingga dapat meningkatkan kesadaran dan pencegahan dini.

**Rubrik/Kriteria Tambahan (Opsional)**:

-   Melakukan eksperimen dengan beberapa algoritma lain seperti Random Forest dan XGBoost untuk membandingkan performa dan meningkatkan akurasi prediksi. Model dengan performa terbaik berdasarkan metrik evaluasi akan dipilih sebagai model final.

-   Melakukan hyperparameter tuning menggunakan GridSearchCV untuk mengoptimalkan performa model terbaik. Tuning ini bertujuan meningkatkan metrik evaluasi seperti recall untuk kelas diabetes, agar model lebih sensitif dalam mendeteksi kasus positif (penderita diabetes).

## Data Understanding

Dataset Diabetes memuat informasi tentang individu yang didiagnosis menderita diabetes, mencakup atribut demografis, riwayat medis, dan hasil pengukuran klinis. Dataset ini menjadi sumber data yang berharga untuk mempelajari manajemen diabetes, faktor-faktor risiko, serta pembuatan model prediktif terhadap hasil penyakit.

[Diabetes] Link: [https://www.kaggle.com/datasets/ehababoelnaga/diabetes-dataset/data](https://www.kaggle.com/datasets/ehababoelnaga/diabetes-dataset/data).

### Variabel-variabel pada dataset adalah sebagai berikut:

-   Pregnancies: Jumlah kehamilan

-   Glucose Kadar: glukosa darah

-   BloodPressure: Tekanan darah diastolik

-   SkinThickness: Ketebalan lipatan kulit triceps

-   Insulin: Kadar insulin

-   BMI: Body Mass Index

-   DiabetesPedigreeFunction: Riwayat diabetes dalam keluarga

-   Age: Umur

-   Outcome: 0 = tidak diabetes, 1 = diabetes

**Rubrik/Kriteria Tambahan (Opsional)**:
Boxplot (Diagram Kotak)

-   Tujuan: Mengidentifikasi outlier dan melihat sebaran nilai fitur seperti Glucose, BMI, Insulin, dll.

-   Manfaat: Boxplot membantu melihat distribusi data, median, kuartil, serta nilai ekstrem (outlier) yang bisa memengaruhi performa model.

Heatmap Korelasi

-   Tujuan: Menunjukkan hubungan atau korelasi antar fitur numerik dalam dataset.

-   Manfaat: Dengan heatmap, kita dapat mengidentifikasi fitur-fitur yang memiliki korelasi tinggi terhadap Outcome (hasil diagnosis diabetes), sehingga bisa menjadi indikator penting untuk pemodelan.

Distribusi Data (Histogram atau KDE Plot)

-   Tujuan: Melihat apakah distribusi data normal atau tidak.

-   Manfaat: Informasi distribusi membantu dalam memilih teknik preprocessing (misalnya, normalisasi atau log transform) yang sesuai untuk meningkatkan kinerja model.

## Data Preparation dan Rubrik/Kriteria Tambahan

Pemeriksaan dan Penanganan Missing Value

-   Proses: Mengecek apakah ada nilai 0 atau kosong pada kolom seperti Glucose, BloodPressure, SkinThickness, Insulin, dan BMI.

-   Alasan: Kolom tersebut secara klinis tidak mungkin memiliki nilai nol (misalnya tekanan darah tidak mungkin 0), sehingga nilai tersebut dianggap sebagai missing value. Penanganan dilakukan dengan mengganti nilai 0 menggunakan median dari masing-masing kolom.

Transformasi Logaritmik

-   Proses: Menerapkan np.log1p() pada kolom Pregnancies, Insulin, DiabetesPedigreeFunction, dan Age.

-   Alasan: Untuk mengurangi skewness atau kemiringan distribusi data agar lebih mendekati distribusi normal, yang membantu algoritma logistic regression bekerja lebih optimal.

Feature Scaling dengan RobustScaler

-   Proses: Menerapkan RobustScaler untuk menyesuaikan semua fitur ke skala 0–1.

-   Alasan: Logistic regression sensitif terhadap skala fitur, sehingga normalisasi diperlukan agar fitur dengan rentang nilai besar tidak mendominasi model.

Split Data

-   Proses: Dataset dibagi menjadi data pelatihan dan data pengujian menggunakan train_test_split.

-   Alasan: Untuk menghindari overfitting dan menilai performa model terhadap data yang belum pernah dilihat sebelumnya.

## Modeling

Split Data:

-   Data dibagi menjadi data latih dan data uji dengan rasio 80:20 menggunakan train_test_split dari scikit-learn.

-   Tujuannya adalah untuk mengevaluasi performa model terhadap data yang tidak terlihat sebelumnya.

Pelatihan Model:

-   Model dilatih menggunakan LogisticRegression() dari library sklearn.linear_model.

## Evaluation

Model dievaluasi menggunakan metrik:

-   Accuracy

-   Confusion Matrix

-   Classification Report (precision, recall, f1-score)

hasil evaluasi:

Akurasi: 0.7838983050847458
[[152   7]
 [ 44  33]]
| Class | Precision | Recall | F1-Score | Support |
|----------|-----------|--------|----------|---------|
| 0 | 0.78 | 0.96 | 0.86 | 159 |
| 1 | 0.82 | 0.43 | 0.56 | 77 |
| Accuracy | | | 0.78 | 236 |

macro avg 0.80 0.69 0.71 236
weighted avg 0.79 0.78 0.76 236

penjelasan:
Akurasi pada Model memprediksi dengan benar sekitar 78% dari seluruh data uji.

penjelasan Confusion Matrix:

-   152: Benar prediksi tidak diabetes (True Negative)

-   33: Benar prediksi diabetes (True Positive)

-   7: Salah prediksi menjadi diabetes padahal tidak (False Positive)

-   44: Salah prediksi tidak diabetes padahal sebenarnya diabetes (False Negative)

penjelasan classification report:

Kelas 0 (Tidak Diabetes):

-   Precision: 0.78 → 78% dari prediksi "tidak diabetes" benar.

-   Recall: 0.96 → Hampir semua yang benar-benar tidak diabetes berhasil dikenali.

-   F1-Score: 0.86 → Keseimbangan precision & recall cukup baik.

Kelas 1 (Diabetes):

-   Precision: 0.82 → 82% dari prediksi "diabetes" benar.

-   Recall: 0.43 → Hanya 43% kasus diabetes yang berhasil terdeteksi (rendah).

-   F1-Score: 0.56 → Kinerja untuk deteksi diabetes masih kurang optimal.

mencoba input untuk prediksi:

-   data 1: {'Pregnancies': 3, 'Glucose': 78, 'BloodPressure': 50, 'SkinThickness': 32, 'Insulin': 88, 'BMI': 31.0, 'DiabetesPedigreeFunction': 0.848, 'Age': 26},

-   data 2: {'Pregnancies': 1, 'Glucose': 165, 'BloodPressure': 69, 'SkinThickness': 8, 'Insulin': 68, 'BMI': 23.9, 'DiabetesPedigreeFunction': 0.66, 'Age': 22},

-   data 3: {'Pregnancies': 5, 'Glucose': 115, 'BloodPressure': 72, 'SkinThickness': 35, 'Insulin': 130, 'BMI': 36.2, 'DiabetesPedigreeFunction': 0.35, 'Age': 40},

-   data 4: {'Pregnancies': 0, 'Glucose': 92, 'BloodPressure': 60, 'SkinThickness': 28, 'Insulin': 0, 'BMI': 28.5, 'DiabetesPedigreeFunction': 0.2, 'Age': 19},

-   data 5: {'Pregnancies': 4, 'Glucose': 180, 'BloodPressure': 85, 'SkinThickness': 29, 'Insulin': 150, 'BMI': 34.3, 'DiabetesPedigreeFunction': 1.2, 'Age': 33},

Hasil prediksi:

-   Data ke-1 -> Probabilitas Tidak Diabetes (0): 90.72%, Diabetes (1): 9.28%

-   Data ke-2 -> Probabilitas Tidak Diabetes (0): 75.47%, Diabetes (1): 24.53%

-   Data ke-3 -> Probabilitas Tidak Diabetes (0): 56.93%, Diabetes (1): 43.07%

-   Data ke-4 -> Probabilitas Tidak Diabetes (0): 99.03%, Diabetes (1): 0.97%

-   Data ke-5 -> Probabilitas Tidak Diabetes (0): 13.32%, Diabetes (1): 86.68%
    **---Ini adalah bagian akhir laporan---**
