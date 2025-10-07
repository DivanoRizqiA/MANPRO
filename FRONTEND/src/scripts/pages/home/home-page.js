import { addCheck } from '../../data/api.js'; // pastikan ini tersedia
import { showRiskResult } from './home-presenter.js';

export default class HomePage {
  async render() {
    return `
    <div class="hero-background">
    <div class="hero-container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-icon">
          <svg
            class="hero-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
            />
          </svg>
        </div>
        <h1 class="hero-title">Diabetes Risk Checker</h1>
        <p class="hero-description">
          Dapatkan prediksi risiko terhadap risiko diabetes Anda berdasarkan
          indikator kesehatan. Alat kami menggunakan kriteria medis yang telah
          terbukti untuk memberikan wawasan berharga tentang kesehatan Anda.
        </p>
      </div>
  
  
  
  <!-- Features Grid -->
  <div class="features-grid">
      <!-- Feature Card 1 -->
      <div class="feature-card">
        <svg class="feature-icon blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
        <h3>Prediksi Akurat</h3>
        <p>Hasil prediksi berdasarkan algoritma <em>Machine Learning</em></p>
      </div>
    
      <!-- Feature Card 2 -->
      <div class="feature-card">
        <svg class="feature-icon green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3>Hasil Dalam Sekejap</h3>
        <p>Dapatkan hasil prediksi anda dengan cepat</p>
      </div>
    
      <!-- Feature Card 3 -->
      <div class="feature-card">
        <svg class="feature-icon purple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3>Menyimpan <em>History</em></h3>
        <p>Buat akun untuk menyimpan penilaian Anda dan melacak perubahan</p>
      </div>
    </div>
    
  
          <!-- Main Form -->
          <div
            style="
              background-color: rgb(255, 255, 255);
              border-color: rgb(226, 232, 240);
              border-radius: 8px;
              border-width: 0.666667px;
              box-shadow:
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
              font-weight: 400;
              pointer-events: auto;
            "
          >
            <!-- Form Header -->
            <div class="health-info-section">
              <h3 class="section-title">Informasi Kesehatan</h3>
              <p class="section-description">
                Masukkan data kesehatan untuk memprediksi risiko Anda terhadap
                diabetes. Semua kolom wajib diisi untuk penilaian yang akurat.
              </p>
            </div>
            
  
            <!-- Form Content -->
            <div style="padding: 24px">
              <form id="diabetes-form">
                <div
                  style="
                    display: grid;
                    gap: 16px;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                  "
                  class="sm-grid-cols-1"
                >
                  <!-- Personal Information -->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Umur</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="Masukkan umur Anda dalam tahun"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="age"
                          max="100"
                          required
                          placeholder="30"
                          class="form-input"
                        />
                        <span class="field-unit">tahun</span>
                      </div>
                    </div>
                    
                    
  
                  <!--Fungsi Keturunan Diabetes-->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Riwayat Diabetes Keluarga</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="Pilih anggota keluarga yang memiliki diabetes"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="diabetes-family-history" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
                        <div style="display: grid; gap: 8px;">
                          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;">
                            <input
                              type="checkbox"
                              name="diabetesHistory"
                              value="parent"
                              onchange="calculatePedigreeScore()"
                              style="width: 16px; height: 16px;"
                            />
                            Orang tua (ayah/ibu)
                          </label>
                          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;">
                            <input
                              type="checkbox"
                              name="diabetesHistory"
                              value="sibling"
                              onchange="calculatePedigreeScore()"
                              style="width: 16px; height: 16px;"
                            />
                            Saudara kandung
                          </label>
                          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;">
                            <input
                              type="checkbox"
                              name="diabetesHistory"
                              value="grandparent"
                              onchange="calculatePedigreeScore()"
                              style="width: 16px; height: 16px;"
                            />
                            Kakek/Nenek
                          </label>
                          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;">
                            <input
                              type="checkbox"
                              name="diabetesHistory"
                              value="aunt_uncle"
                              onchange="calculatePedigreeScore()"
                              style="width: 16px; height: 16px;"
                            />
                            Paman/Bibi
                          </label>
                        </div>
                        <input
                          type="hidden"
                          name="diabetesPedigree"
                          value="0"
                        />
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.875rem; color: #4b5563;">Skor Riwayat:</span>
                            <span id="pedigreeScore" style="font-weight: 600; color: #1f2937;">0.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    
          
                  <!-- Physical Measurements -->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Tinggi Badan</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="Tinggi badan dalam centimeter"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="height"
                          min="100"
                          max="250"
                          required
                          placeholder="170"
                          class="form-input"
                          oninput="calculateBMI()"
                        />
                        <span class="field-unit">cm</span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Berat Badan</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="Berat badan dalam kilogram"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="weight"
                          min="30"
                          max="200"
                          required
                          placeholder="65"
                          class="form-input"
                          oninput="calculateBMI()"
                        />
                        <span class="field-unit">kg</span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Indeks Massa Tubuh (BMI)</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="BMI dihitung otomatis dari tinggi dan berat badan"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="bmi"
                          readonly
                          class="form-input"
                          style="background-color: #f3f4f6;"
                        />
                        <span class="field-unit">kg/m²</span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Jumlah Kehamilan</label>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="pregnancies"
                          min="0"
                          max="100"
                          required
                          placeholder="0"
                          class="form-input"
                        />
                        <span class="field-unit">kali</span>
                      </div>
                    </div>
                    
  
                  <!-- Medical Measurements -->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Kadar Glukosa</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="help-icon"
                          title="Glukosa darah puasa"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="glucose"
                          min="70"
                          max="300"
                          required
                          placeholder="99"
                          class="form-input"
                        />
                        <span class="field-unit">mg/dL</span>
                      </div>
                      <p class="field-help-text">Normal: 70-99 mg/dL (puasa)</p>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Tekanan Darah Sistolik</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="help-icon"
                          title="Tekanan darah atas/sistolik"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="bloodPressure"
                          min="80"
                          max="200"
                          required
                          placeholder="120"
                          class="form-input"
                        />
                        <span class="field-unit">mmHg</span>
                      </div>
                      <p class="field-help-text">Normal: 90-120 mmHg</p>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Ketebalan kulit</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="help-icon"
                          title="Ketebalan lipatan kulit di triceps"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="skinThickness"
                          min="0"
                          max="99"
                          required
                          placeholder="20"
                          class="form-input"
                        />
                        <span class="field-unit">mm</span>
                      </div>
                      <p class="field-help-text">Diukur di bagian belakang lengan atas</p>
                    </div>
                    
  
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Kadar Insulin</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="help-icon"
                          title="Insulin serum 2 jam setelah makan"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="insulin"
                          min="0"
                          max="846"
                          required
                          placeholder="79"
                          class="form-input"
                        />
                        <span class="field-unit">μU/mL</span>
                      </div>
                      <p class="field-help-text">Normal: 2.6-24.9 μU/mL (puasa)</p>
                    </div>
                    
  
                <!-- Submit Button -->
                <div class="button-wrapper">
                  <button type="submit" class="submit-button">
                    Periksa Risiko Diabetes Saya
                  </button>
                </div>
              </form>
            </div>
          </div>
  
          <!-- Result Card (shown after assessment) -->
          <div class="result-container" style="display: none;">
              <!-- Result Header -->
              <div class="result-header">
                <h3 class="result-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="result-icon-green"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Penilaian Risiko Diabetes Anda</span>
                </h3>
              </div>
            
              <!-- Result Content -->
              <div class="result-content">

                <div class="result-summary">
                  <div class="result-percentage">25%</div>
                  <div class="result-risk-label">Risiko Rendah</div>
                </div>
            
                <!-- Important Notice -->
                <div class="important-notice">
                  <div class="notice-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="notice-icon-blue"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div class="notice-text">
                      <p>
                        <strong>Penting:</strong> Ini adalah penilaian risiko perkiraan berdasarkan data yang Anda masukkan. Silakan konsultasikan dengan profesional kesehatan untuk nasihat medis dan diagnosis yang tepat. Masuk untuk menyimpan hasil ini ke riwayat Anda.
                      </p>
                    </div>
                  </div>
                </div>
            
                <!-- Save Confirmation (if authenticated) -->
                <div class="save-confirmation">
                  <div class="confirmation-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="confirmation-icon-green"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="confirmation-text">
                      <p>
                        Penilaian ini telah disimpan ke riwayat Anda. Anda dapat melihat semua penilaian masa lalu di bagian Riwayat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div> <!--start of home page-->
    `;
  }

  async afterRender() {
    const form = document.querySelector('#diabetes-form');
    if (!form) return;

    // Add BMI calculation function to window object
    window.calculateBMI = () => {
      const height = parseFloat(form.elements['height'].value);
      const weight = parseFloat(form.elements['weight'].value);
      const bmiInput = form.elements['bmi'];

      if (height && weight) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        bmiInput.value = bmi;
      } else {
        bmiInput.value = '';
      }
    };

    // Calculate diabetes pedigree score based on family history
    window.calculatePedigreeScore = () => {
      const checkboxes = form.querySelectorAll('input[name="diabetesHistory"]');
      const pedigreeInput = form.elements['diabetesPedigree'];
      const scoreDisplay = document.getElementById('pedigreeScore');
      
      let score = 0;
      
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          switch (checkbox.value) {
            case 'parent':
              score += 0.5; // Higher score for immediate family
              break;
            case 'sibling':
              score += 0.4; // High score for siblings
              break;
            case 'grandparent':
              score += 0.3; // Moderate score for grandparents
              break;
            case 'aunt_uncle':
              score += 0.2; // Lower score for extended family
              break;
          }
        }
      });
      
      // Ensure score doesn't exceed 1.0
      score = Math.min(score, 1.0);
      
      // Update hidden input and display
      pedigreeInput.value = score.toFixed(2);
      scoreDisplay.textContent = score.toFixed(2);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      // Get height and weight
      const height = Number(formData.get('height'));
      const weight = Number(formData.get('weight'));
      
      // Calculate BMI: weight / (height in meters)²
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

      const data = {
        Pregnancies: Number(formData.get('pregnancies')),
        Glucose: Number(formData.get('glucose')),
        BloodPressure: Number(formData.get('bloodPressure')),
        SkinThickness: Number(formData.get('skinThickness')),
        Insulin: Number(formData.get('insulin')),
        Height: height,
        Weight: weight,
        BMI: Number(bmi),
        DiabetesPedigreeFunction: Number(formData.get('diabetesPedigree')),
        Age: Number(formData.get('age')),
      };

      // Validasi cepat
      if (Object.values(data).some(value => isNaN(value))) {
        alert('Harap isi semua kolom dengan benar.');
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Login dahulu untuk mengecek");
          return;
        }
      
        const response = await addCheck(data);
        if (response.error) {
          throw new Error(response.error);
        }
        showRiskResult(response);
      } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Terjadi kesalahan saat mengirim data.');
      }
      
    });

    
  }
}