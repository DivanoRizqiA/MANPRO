import { signIn,signUp } from "../../data/api";

export default class AuthPage {
    async render() {
      return `
      <div
        style="
          background-image: linear-gradient(
            to right bottom,
            rgb(239, 246, 255),
            rgb(224, 231, 255)
          );
          min-height: 100vh;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 48px 16px;
          "
          class="mobile-py-6"
        >
          <div style="max-width: 448px; width: 100%" class="mobile-full">
            <div style="text-align: center" class="fade-in">
              <a
                href="/"
                style="
                  display: inline-flex;
                  align-items: center;
                  color: rgb(37, 99, 235);
                  margin-bottom: 16px;
                  text-decoration: none;
                  transition: opacity 0.2s ease-in-out;
                "
                onmouseover="this.style.opacity='0.8'"
                onmouseout="this.style.opacity='1'"
              >
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
                  style="height: 16px; width: 16px; margin-right: 8px"
                >
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Risk Checker
              </a>
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
                style="
                  display: block;
                  color: rgb(37, 99, 235);
                  height: 48px;
                  width: 48px;
                  margin: 0 auto;
                "
                class="pulse"
              >
                <path
                  d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                />
              </svg>
              <h2
                style="
                  color: rgb(17, 24, 39);
                  font-size: 30px;
                  font-weight: 700;
                  line-height: 36px;
                  margin-top: 24px;
                "
                class="sm-text-2xl"
              >
                Welcome to Diateksi
              </h2>
              <p style="color: rgb(75, 85, 99); margin-top: 8px">
                Sign In untuk menyimpan penilaian risiko diabetes Anda dan melacak
                kesehatan Anda dari waktu ke waktu
              </p>
            </div>
  
            <div
              style="
                background-color: rgb(255, 255, 255);
                border: 1px solid rgb(226, 232, 240);
                border-radius: 8px;
                box-shadow:
                  rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
                  rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
                margin-top: 32px;
              "
              class="scale-in hover-shadow"
            >
              <div
                style="
                  background-color: rgb(241, 245, 249);
                  padding: 4px;
                  border-radius: 8px 8px 0 0;
                "
              >
                <div
                  style="
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 4px;
                  "
                >
                  <button
                    id="login-tab"
                    onclick="switchTab('login')"
                    style="
                      background-color: rgb(255, 255, 255);
                      color: rgb(31, 41, 55);
                      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
                      padding: 8px 16px;
                      font-size: 14px;
                      font-weight: 500;
                      border-radius: 6px;
                      border: none;
                      cursor: pointer;
                    "
                    class="tab-transition"
                    onmouseover="this.style.backgroundColor='rgb(249, 250, 251)'"
                    onmouseout="this.style.backgroundColor='rgb(255, 255, 255)'"
                  >
                    Login
                  </button>
                  <button
                    id="register-tab"
                    onclick="switchTab('register')"
                    style="
                      color: rgb(107, 114, 128);
                      background-color: transparent;
                      padding: 8px 16px;
                      font-size: 14px;
                      font-weight: 500;
                      border-radius: 6px;
                      border: none;
                      cursor: pointer;
                    "
                    class="tab-transition"
                    onmouseover="this.style.backgroundColor='rgba(107, 114, 128, 0.1)'"
                    onmouseout="this.style.backgroundColor='transparent'"
                  >
                    Register
                  </button>
                </div>
              </div>
  
              <div style="padding: 24px" class="sm-px-6">
                <div id="login-form" class="tab-content">
                  <h3
                    style="
                      font-size: 24px;
                      font-weight: 600;
                      letter-spacing: -0.6px;
                      color: rgb(17, 24, 39);
                      margin-bottom: 8px;
                    "
                  >
                    Sign In
                  </h3>
                  <p
                    style="
                      color: rgb(100, 116, 139);
                      font-size: 14px;
                      margin-bottom: 24px;
                    "
                  >
                    Masuk ke akun Anda untuk mengakses fitur lengkap
                  </p>
  
                  <form id="signin-form">
                    <div style="margin-bottom: 16px">
                      <label
                        style="
                          display: block;
                          font-size: 14px;
                          font-weight: 500;
                          color: rgb(75, 85, 99);
                          margin-bottom: 8px;
                        "
                      >
                        Alamat Email
                      </label>
                      <!--INI EMAIL SIGNIN-->
                      <div style="position: relative">
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          style="
                            width: 100%;
                            padding: 8px 12px;
                            padding-left: 40px;
                            border: 1px solid rgb(226, 232, 240);
                            border-radius: 6px;
                            font-size: 14px;
                            height: 40px;
                          "
                          class="form-input"
                        />
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
                          style="
                            position: absolute;
                            left: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 16px;
                            width: 16px;
                            color: rgb(107, 114, 128);
                          "
                          class="input-icon"
                        >
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                    </div>
  
                    <div style="margin-bottom: 16px">
                      <label
                        style="
                          display: block;
                          font-size: 14px;
                          font-weight: 500;
                          color: rgb(75, 85, 99);
                          margin-bottom: 8px;
                        "
                      >
                        Kata Sandi
                      </label>
                      <div style="position: relative">
                      <!--INI PASS SIGNIN-->
                        <input
                          type="password"
                          name="password"
                          required
                          placeholder="Masukkan kata sandi"
                          style="
                            width: 100%;
                            padding: 8px 12px;
                            padding-left: 40px;
                            padding-right: 40px;
                            border: 1px solid rgb(226, 232, 240);
                            border-radius: 6px;
                            font-size: 14px;
                            height: 40px;
                          "
                          class="form-input"
                        />
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
                          style="
                            position: absolute;
                            left: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 16px;
                            width: 16px;
                            color: rgb(107, 114, 128);
                          "
                          class="input-icon"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="12" cy="16" r="1" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <button
                          type="button"
                          class="toggle-password-visibility"
                          data-target="signin-form"
                          style="
                            position: absolute;
                            right: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            background: none;
                            border: none;
                            cursor: pointer;
                            color: rgb(107, 114, 128);
                          "
                        >
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
                            style="height: 16px; width: 16px"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
  
                    <button
                      type="submit"
                      id="signin-btn"
                      style="
                        width: 100%;
                        background-color: rgb(37, 99, 235);
                        color: rgb(255, 255, 255);
                        padding: 12px;
                        border-radius: 6px;
                        font-size: 14px;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.15s ease-in-out;
                      "
                      onmouseover="this.style.backgroundColor='rgb(29, 78, 216)'"
                      onmouseout="this.style.backgroundColor='rgb(37, 99, 235)'"
                    >
                      Masuk
                    </button>
                  </form>
  
                  <div style="margin-top: 24px; text-align: center">
                    <span style="font-size: 14px; color: rgb(107, 114, 128)">
                      Belum punya akun?
                    </span>
                    <button
                      onclick="switchTab('register')"
                      style="
                        background: none;
                        border: none;
                        color: rgb(37, 99, 235);
                        font-weight: 500;
                        font-size: 14px;
                        cursor: pointer;
                        margin-left: 4px;
                      "
                      onmouseover="this.style.textDecoration='underline'"
                      onmouseout="this.style.textDecoration='none'"
                    >
                      Daftar sekarang
                    </button>
                  </div>
                </div>
  
                <div id="register-form" class="tab-content hidden">
                  <h3
                    style="
                      font-size: 24px;
                      font-weight: 600;
                      letter-spacing: -0.6px;
                      color: rgb(17, 24, 39);
                      margin-bottom: 8px;
                    "
                  >
                    Create Account
                  </h3>
                  <p
                    style="
                      color: rgb(100, 116, 139);
                      font-size: 14px;
                      margin-bottom: 24px;
                    "
                  >
                    Buat akun untuk menyimpan dan melacak riwayat assessment Anda
                  </p>
  
                  <form id="signup-form">
                    <div style="margin-bottom: 16px">
                      <label
                        style="
                          display: block;
                          font-size: 14px;
                          font-weight: 500;
                          color: rgb(75, 85, 99);
                          margin-bottom: 8px;
                        "
                      >
                        Alamat Email
                      </label>
                      <div style="position: relative">
                      <!--INI EMAIL SIGNUP-->
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          style="
                            width: 100%;
                            padding: 8px 12px;
                            padding-left: 40px;
                            border: 1px solid rgb(226, 232, 240);
                            border-radius: 6px;
                            font-size: 14px;
                            height: 40px;
                          "
                          class="form-input"
                        />
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
                          style="
                            position: absolute;
                            left: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 16px;
                            width: 16px;
                            color: rgb(107, 114, 128);
                          "
                          class="input-icon"
                        >
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                    </div>
  
                    <div style="margin-bottom: 16px">
                      <label
                        style="
                          display: block;
                          font-size: 14px;
                          font-weight: 500;
                          color: rgb(75, 85, 99);
                          margin-bottom: 8px;
                        "
                      >
                        Kata Sandi
                      </label>
                      <div style="position: relative">
                      <!--INI PASS SIGNUP-->
                        <input
                          type="password"
                          name="password"
                          required
                          minlength="6"
                          placeholder="Pilih kata sandi (min 6 karakter)"
                          style="
                            width: 100%;
                            padding: 8px 12px;
                            padding-left: 40px;
                            padding-right: 40px;
                            border: 1px solid rgb(226, 232, 240);
                            border-radius: 6px;
                            font-size: 14px;
                            height: 40px;
                          "
                          class="form-input"
                        />
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
                          style="
                            position: absolute;
                            left: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 16px;
                            width: 16px;
                            color: rgb(107, 114, 128);
                          "
                          class="input-icon"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="12" cy="16" r="1" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <button
                          type="button"
                          class="toggle-password-visibility"
                          data-target="signup-form"
                          data-field="password"
                          style="
                            position: absolute;
                            right: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            background: none;
                            border: none;
                            cursor: pointer;
                            color: rgb(107, 114, 128);
                          "
                        >
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
                            style="height: 16px; width: 16px"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div id="password-strength" class="password-strength">
                        <div
                          id="password-strength-bar"
                          class="password-strength-bar"
                        ></div>
                      </div>
                      <p
                        id="password-strength-text"
                        style="
                          font-size: 12px;
                          color: rgb(107, 114, 128);
                          margin-top: 4px;
                        "
                      ></p>
                    </div>
  
                    <div style="margin-bottom: 16px">
                      <label
                        style="
                          display: block;
                          font-size: 14px;
                          font-weight: 500;
                          color: rgb(75, 85, 99);
                          margin-bottom: 8px;
                        "
                      >
                        Konfirmasi Kata Sandi
                      </label>
                      <div style="position: relative">
                      <!--INI CONFIRM PASS SIGNUP-->
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          minlength="6"
                          placeholder="Konfirmasi kata sandi"
                          style="
                            width: 100%;
                            padding: 8px 12px;
                            padding-left: 40px;
                            padding-right: 40px;
                            border: 1px solid rgb(226, 232, 240);
                            border-radius: 6px;
                            font-size: 14px;
                            height: 40px;
                          "
                          class="form-input"
                        />
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
                          style="
                            position: absolute;
                            left: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 16px;
                            width: 16px;
                            color: rgb(107, 114, 128);
                          "
                          class="input-icon"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="12" cy="16" r="1" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <button
                          type="button"
                          class="toggle-password-visibility"
                          data-target="signup-form"
                          data-field="confirmPassword"
                          style="
                            position: absolute;
                            right: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            background: none;
                            border: none;
                            cursor: pointer;
                            color: rgb(107, 114, 128);
                          "
                        >
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
                            style="height: 16px; width: 16px"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
  
                    <button
                      type="submit"
                      id="signup-btn"
                      style="
                        width: 100%;
                        background-color: rgb(37, 99, 235);
                        color: rgb(255, 255, 255);
                        padding: 12px;
                        border-radius: 6px;
                        font-size: 14px;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.15s ease-in-out;
                      "
                      onmouseover="this.style.backgroundColor='rgb(29, 78, 216)'"
                      onmouseout="this.style.backgroundColor='rgb(37, 99, 235)'"
                    >
                      Daftar Sekarang
                    </button>
                  </form>
  
                  <div style="margin-top: 24px; text-align: center">
                    <span style="font-size: 14px; color: rgb(107, 114, 128)">
                      Sudah punya akun?
                    </span>
                    <button
                      onclick="switchTab('login')"
                      style="
                        background: none;
                        border: none;
                        color: rgb(37, 99, 235);
                        font-weight: 500;
                        font-size: 14px;
                        cursor: pointer;
                        margin-left: 4px;
                      "
                      onmouseover="this.style.textDecoration='underline'"
                      onmouseout="this.style.textDecoration='none'"
                    >
                      Masuk sekarang
                    </button>
                  </div>
                </div>
  
                <div style="margin-top: 32px">
                  <div style="position: relative">
                    <div
                      style="
                        position: absolute;
                        inset: 0;
                        display: flex;
                        align-items: center;
                      "
                    >
                      <div
                        style="
                          width: 100%;
                          border-top: 1px solid rgb(229, 231, 235);
                        "
                      ></div>
                    </div>
                    <div
                      style="
                        position: relative;
                        display: flex;
                        justify-content: center;
                        font-size: 14px;
                      "
                    >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    } 
    async afterRender() {
      // --- Tab switching functionality ---
      window.switchTab = (tabName) => {
        const loginForm = document.getElementById("login-form");
        const registerForm = document.getElementById("register-form");
        const loginTab = document.getElementById("login-tab");
        const registerTab = document.getElementById("register-tab");
    
        if (tabName === "login") {
          loginForm.classList.remove("hidden");
          registerForm.classList.add("hidden");
          loginTab.style.backgroundColor = "rgb(255, 255, 255)";
          loginTab.style.color = "rgb(31, 41, 55)";
          loginTab.style.boxShadow = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";
          registerTab.style.backgroundColor = "transparent";
          registerTab.style.color = "rgb(107, 114, 128)";
          registerTab.style.boxShadow = "none";
        } else if (tabName === "register") {
          loginForm.classList.add("hidden");
          registerForm.classList.remove("hidden");
          registerTab.style.backgroundColor = "rgb(255, 255, 255)";
          registerTab.style.color = "rgb(31, 41, 55)";
          registerTab.style.boxShadow = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";
          loginTab.style.backgroundColor = "transparent";
          loginTab.style.color = "rgb(107, 114, 128)";
          loginTab.style.boxShadow = "none";
        }
      };
    
      window.switchTab('login'); // Set default tab
    
      // --- Password Visibility Toggle ---
      window.togglePasswordVisibility = (formId, fieldName = 'password') => {
        const form = document.getElementById(formId);
        const passwordInput = form.querySelector(`input[name="${fieldName}"]`);
        if (passwordInput) {
          const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
          passwordInput.setAttribute("type", type);
        }
      };
    
      const toggleButtons = document.querySelectorAll('.toggle-password-visibility');
      toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
          const formId = button.dataset.target;
          const fieldName = button.dataset.field || 'password';
          window.togglePasswordVisibility(formId, fieldName);
        });
      });
    
      // --- Password Strength Checker ---
      window.checkPasswordStrength = (password) => {
        const strengthBar = document.getElementById("password-strength-bar");
        const strengthText = document.getElementById("password-strength-text");
        let strength = 0;
    
        if (password.length >= 6) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
        strengthBar.style.width = `${strength}%`;
    
        let barColor = "transparent";
        let textContent = "";
        let textColor = "rgb(107, 114, 128)";
    
        if (strength <= 20) {
          barColor = "#ef4444"; textContent = "Sangat Lemah"; textColor = "#ef4444";
        } else if (strength <= 40) {
          barColor = "#f97316"; textContent = "Lemah"; textColor = "#f97316";
        } else if (strength <= 60) {
          barColor = "#eab308"; textContent = "Sedang"; textColor = "#eab308";
        } else if (strength <= 80) {
          barColor = "#22c55e"; textContent = "Kuat"; textColor = "#22c55e";
        } else {
          barColor = "#16a34a"; textContent = "Sangat Kuat"; textColor = "#16a34a";
        }
    
        strengthBar.style.backgroundColor = barColor;
        strengthText.textContent = textContent;
        strengthText.style.color = textColor;
    
        if (password.length === 0) {
          strengthBar.style.width = '0%';
          strengthBar.style.backgroundColor = 'transparent';
          strengthText.textContent = '';
        }
      };
    
      const signupPasswordInput = document.querySelector("#signup-form input[name='password']");
      if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', (event) => {
          window.checkPasswordStrength(event.target.value);
        });
      }
    
      // --- Password Match Checker ---
      window.checkPasswordMatch = () => {
        const password = document.querySelector("#signup-form input[name='password']").value;
        const confirmPassword = document.querySelector("#signup-form input[name='confirmPassword']").value;
        const confirmPasswordInput = document.querySelector("#signup-form input[name='confirmPassword']");
    
        if (password !== confirmPassword && confirmPassword.length > 0) {
          confirmPasswordInput.style.borderColor = "#ef4444";
          confirmPasswordInput.setCustomValidity("Kata sandi tidak cocok.");
        } else {
          confirmPasswordInput.style.borderColor = "rgb(226, 232, 240)";
          confirmPasswordInput.setCustomValidity("");
        }
      };
    
      const confirmPasswordInput = document.querySelector("#signup-form input[name='confirmPassword']");
      if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', window.checkPasswordMatch);
      }
    
      // --- Final Auth Form Submission ---
      const loginForm = document.querySelector('#signin-form');
      if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = loginForm.elements['email'].value;
          const password = loginForm.elements['password'].value;
    
          try {
            const response = await signIn(email, password);
            if (response.token) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('email', email);
              alert('Login successful!');
              window.location.hash = '/';
            } else {
              alert(response.message || 'Login failed');
            }
          } catch (err) {
            alert('Server error. Please try again later.');
          }
        });
      }
    
      const signupForm = document.querySelector('#signup-form');
      if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = signupForm.elements['email'].value;
          const password = signupForm.elements['password'].value;
          const confirmPassword = signupForm.elements['confirmPassword'].value;
    
          if (password !== confirmPassword) {
            alert("Kata sandi dan konfirmasi tidak cocok!");
            return;
          }
    
          try {
            const response = await signUp(email, password);
            console.log(response);
          
            if (response.token) {
              // ✅ Save token for authenticated requests
              localStorage.setItem('token', response.token);
              alert('Sign up successful! You are now logged in.');
              window.location.hash = '/';
            } else {
              alert(response.message || 'Sign up failed');
            }
          } catch (err) {
            alert('Server error. Please try again later.');
          }
          
        });
      }
    }
  }    