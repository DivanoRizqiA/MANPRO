import { signIn,signUp } from "../../data/api";

export default class AuthPage {
    async render() {
        return `
        <div
          style="
            background: linear-gradient(180deg, #b8d4f1 0%, #c8ddf3 50%, #e8f0f9 100%);
            height: 100vh;
            display: flex;
            align-items: stretch;
            position: relative;
            overflow: hidden;
          "
        >
          <!-- Header full-width at top center -->
          <div style="position:absolute; top: 16px; left: 0; right: 0; text-align: center; z-index: 2;">
  <a href="#/" style="display:inline-block; text-decoration:none; color:inherit;">
    <img src="/images/Vector.png" alt="Diateksi" style="height:40px;margin-bottom:12px">
    <h2 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 6px">Selamat Datang di Diateksi</h2>
    <p style="color:#6b7280;margin:0">Masuk atau daftar untuk memulai</p>
  </a>
</div>
          <div
            style="
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 96px 48px 0 48px;
              overflow-y: auto;
            "
            class="mobile-py-6"
          >
            <div style="max-width: 448px; width: 100%" class="mobile-full">
              <div style="background:#fff;border-radius:8px;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)">
                <div style="padding:16px;border-bottom:1px solid #e5e7eb">
                  <div id="tab-container" style="position:relative;display:flex;align-items:center;background:#e0f2fe;padding:6px;border-radius:14px;width:100%;">
                    <div id="tab-indicator" style="position:absolute;top:6px;bottom:6px;left:6px;width:calc(50% - 6px);background:#ffffff;border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,0.06);transition:left .25s ease, transform .15s ease;"></div>
                    <button
                      id="login-tab"
                      onclick="window.switchTab('login')"
                      style="
                        flex:1;
                        padding:8px 16px;
                        font-size:14px;
                        font-weight:600;
                        border-radius:8px;
                        cursor:pointer;
                        background:transparent;
                        color:#111827;
                        border:none;
                        position:relative;
                        z-index:1;
                        transition:color .15s ease, transform .1s ease;
                      "
                    >
                      Login
                    </button>
                    <button
                      id="register-tab"
                      onclick="window.switchTab('register')"
                      style="
                        flex:1;
                        padding:8px 16px;
                        font-size:14px;
                        font-weight:500;
                        border-radius:8px;
                        cursor:pointer;
                        background:transparent;
                        color:#475569;
                        border:none;
                        position:relative;
                        z-index:1;
                        transition:color .15s ease, transform .1s ease;
                      "
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                <div style="padding:24px">
                  <div id="login-form" class="tab-content">
  
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
                          padding: 12px;
                          padding-left: 40px;
                          border: 1px solid rgb(226, 232, 240);
                          border-radius: 4px;
                          font-size: 14px;
                          height: 48px;
                          background: rgb(247, 248, 249);
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
                        Password
                      </label>
                      <div style="position: relative">
                      <!--INI PASS SIGNIN-->
                        <input
                          type="password"
                          name="password"
                          required
                          placeholder="Password"
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

                    <div style="text-align: right; margin: 0 0 24px 0">
                      <a href="#/forgot-password" style="font-size: 14px; color: rgb(37, 99, 235); text-decoration: none">Lupa kata sandi?</a>
                    </div>

                    <button
                      type="submit"
                      id="signin-btn"
                      style="
                        width: 100%;
                        background-color: rgba(0, 0, 0, 1);
                        color: rgb(255, 255, 255);
                        padding: 14px;
                        border-radius: 4px;
                        font-size: 14px;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.15s ease-in-out;
                        height: 48px;
                      "
                      onmouseover="this.style.backgroundColor='rgba(41, 41, 41, 1)'"
                      onmouseout="this.style.backgroundColor='rgba(0, 0, 0, 1)'"
                    >
                      Masuk
                    </button>
                  </form>
  
                </div>

                <div id="register-form" class="tab-content hidden">
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
                        Email
                      </label>
                      <div style="position: relative">
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="example@mail.com"
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
                        Password
                      </label>
                      <div style="position: relative">
                        <input
                          type="password"
                          name="password"
                          required
                          minlength="6"
                          placeholder="Password"
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
                          style="
                            width: 0%;
                            height: 4px;
                            margin-top: 8px;
                            border-radius: 2px;
                            transition: all 0.2s;
                          "
                        ></div>
                      </div>
                      <p
                        id="password-strength-text"
                        style="
                          font-size: 12px;
                          margin-top: 4px;
                        "
                      ></p>
                    </div>

                    <div style="margin-bottom: 24px">
                      <label
                        style="
                          display: block;
                          font-size: 14px;
                          font-weight: 500;
                          color: rgb(75, 85, 99);
                          margin-bottom: 8px;
                        "
                      >
                        Confirm Password
                      </label>
                      <div style="position: relative">
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          minlength="6"
                          placeholder="Confirm password"
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
                        background-color: rgba(0, 0, 0, 1);
                        color: rgb(255, 255, 255);
                        padding: 8px 16px;
                        border-radius: 6px;
                        font-size: 14px;
                        font-weight: 500;
                        height: 40px;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.15s ease-in-out;
                      "
                      onmouseover="this.style.backgroundColor='rgba(41, 41, 41, 1)'"
                      onmouseout="this.style.backgroundColor='rgba(0, 0, 0, 1)'"
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          style="
            flex: 1;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          "
        >
          <img 
            src="/images/nurse.png" 
            alt="Medical Professional" 
            style="
              max-width: 75%;
              max-height: 75vh;
              object-fit: contain;
            "
          >
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
        const indicator = document.getElementById("tab-indicator");
    
        if (tabName === "login") {
          loginForm.classList.remove("hidden");
          registerForm.classList.add("hidden");
          // Active styles
          loginTab.style.color = "#111827";
          loginTab.style.fontWeight = "600";
          // Inactive styles
          registerTab.style.color = "#475569";
          registerTab.style.fontWeight = "500";
          if (indicator) indicator.style.left = "6px";
        } else if (tabName === "register") {
          loginForm.classList.add("hidden");
          registerForm.classList.remove("hidden");
          // Active styles
          registerTab.style.color = "#000000ff";
          registerTab.style.fontWeight = "600";
          // Inactive styles
          loginTab.style.color = "#475569";
          loginTab.style.fontWeight = "500";
          if (indicator) indicator.style.left = "calc(50% + 6px)";
        }
      };

      // Button press micro-animation
      const addPressAnim = (btn) => {
        if (!btn) return;
        btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.98)'; });
        const reset = () => { btn.style.transform = 'scale(1)'; };
        btn.addEventListener('mouseup', reset);
        btn.addEventListener('mouseleave', reset);
      };
      addPressAnim(document.getElementById('login-tab'));
      addPressAnim(document.getElementById('register-tab'));
    
      // Set default tab based on URL hash query (?mode=...)
      try {
        const hash = window.location.hash || '';
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const params = new URLSearchParams(queryString);
        const mode = (params.get('mode') || 'login').toLowerCase();
        if (mode === 'register' || mode === 'signup') {
          window.switchTab('register');
        } else {
          window.switchTab('login');
        }
      } catch (e) {
        window.switchTab('login');
      }
    
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
              // Set flash message to be displayed on landing after navigation
              localStorage.setItem('flash', JSON.stringify({ message: 'Login berhasil. Selamat datang kembali!', type: 'success' }));
              window.location.hash = '/';
            } else {
              alert(response.message || 'Login failed');
            }
          } catch (err) {
            console.error('Login error:', err);
            alert(err.message || 'Server error. Please try again later.');
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
              // ✅ Also persist email so sidebar profile shows up
              localStorage.setItem('email', email);
              // Optional flash message for consistency
              localStorage.setItem('flash', JSON.stringify({ message: 'Pendaftaran berhasil. Selamat datang!', type: 'success' }));
              alert('Sign up successful! You are now logged in.');
              window.location.hash = '/';
            } else {
              alert(response.message || 'Sign up failed');
            }
          } catch (err) {
            console.error('Signup error:', err);
            alert(err.message || 'Server error. Please try again later.');
          }
          
        });
      }
    }
  }