import { signUp } from "../../data/api";

export default class RegisterPage {
    async render() {
      return `
      <div
        style="
          background: rgb(239, 246, 255);
          height: 100vh;
          display: flex;
          align-items: stretch;
          overflow: hidden;
        "
      >
        <div
          style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 48px;
            overflow-y: auto;
          "
          class="mobile-py-6"
        >
          <div style="max-width: 448px; width: 100%" class="mobile-full">
            <div style="margin-bottom: 24px" class="fade-in">
              <img src="/images/logo.png" alt="Diateksi" style="height: 40px; margin-bottom: 32px;">
              <h2
                style="
                  color: rgb(17, 24, 39);
                  font-size: 30px;
                  font-weight: 700;
                  line-height: 36px;
                "
                class="sm-text-2xl"
              >
                Sign Up
              </h2>
              <p style="color: rgb(75, 85, 99); margin-top: 8px">
                Create an account to save and track your assessment history.
              </p>
            </div>

            <div
              style="
                background-color: rgb(255, 255, 255);
                border-radius: 8px;
                margin-top: 24px;
              "
              class="scale-in hover-shadow"
            >
              <div style="padding: 24px" class="sm-px-6">
                <form id="signup-form">
                  <div style="margin-bottom: 16px">
                    <label
                      style="
                        display: block;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgb(17, 24, 39);
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
                        font-weight: 400;
                        color: rgb(17, 24, 39);
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
                          padding: 12px;
                          padding-left: 40px;
                          padding-right: 40px;
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <circle cx="12" cy="16" r="1" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <button
                        type="button"
                        class="toggle-password-visibility"
                        data-target="password"
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

                  <div style="margin-bottom: 24px">
                    <label
                      style="
                        display: block;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgb(17, 24, 39);
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
                          padding: 12px;
                          padding-left: 40px;
                          padding-right: 40px;
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <circle cx="12" cy="16" r="1" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <button
                        type="button"
                        class="toggle-password-visibility"
                        data-target="confirmPassword"
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
                      padding: 14px;
                      border-radius: 4px;
                      font-size: 14px;
                      font-weight: 500;
                      border: none;
                      cursor: pointer;
                      transition: background-color 0.15s ease-in-out;
                      height: 48px;
                    "
                  >
                    Sign up
                  </button>

                  <div style="margin-top: 24px; text-align: center">
                    <span style="font-size: 14px; color: rgb(107, 114, 128)">
                      Already have an account?
                    </span>
                    <a
                      href="#/auth"
                      style="
                        background: none;
                        border: none;
                        color: rgb(37, 99, 235);
                        font-weight: 500;
                        font-size: 14px;
                        cursor: pointer;
                        margin-left: 4px;
                        text-decoration: none;
                      "
                      onmouseover="this.style.textDecoration='underline'"
                      onmouseout="this.style.textDecoration='none'"
                    >
                      Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div 
          style="
            flex: 1;
            background: rgb(239, 246, 255);
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
              max-width: 90%;
              max-height: 90vh;
              object-fit: contain;
            "
          >
        </div>
      </div>
      `;
    }

    async afterRender() {
      const form = document.querySelector('#signup-form');
      if (form) {
        // Password visibility toggle
        const toggleButtons = document.querySelectorAll('.toggle-password-visibility');
        toggleButtons.forEach(button => {
          button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const input = form.querySelector(`input[name="${targetId}"]`);
            if (input) {
              const type = input.getAttribute("type") === "password" ? "text" : "password";
              input.setAttribute("type", type);
            }
          });
        });

        // Password strength checker
        const passwordInput = form.querySelector('input[name="password"]');
        const strengthBar = document.getElementById("password-strength-bar");
        const strengthText = document.getElementById("password-strength-text");

        if (passwordInput && strengthBar && strengthText) {
          passwordInput.addEventListener('input', (event) => {
            const password = event.target.value;
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
              barColor = "#ef4444"; textContent = "Very Weak"; textColor = "#ef4444";
            } else if (strength <= 40) {
              barColor = "#f97316"; textContent = "Weak"; textColor = "#f97316";
            } else if (strength <= 60) {
              barColor = "#eab308"; textContent = "Medium"; textColor = "#eab308";
            } else if (strength <= 80) {
              barColor = "#22c55e"; textContent = "Strong"; textColor = "#22c55e";
            } else {
              barColor = "#16a34a"; textContent = "Very Strong"; textColor = "#16a34a";
            }

            strengthBar.style.backgroundColor = barColor;
            strengthText.textContent = textContent;
            strengthText.style.color = textColor;

            if (password.length === 0) {
              strengthBar.style.width = '0%';
              strengthBar.style.backgroundColor = 'transparent';
              strengthText.textContent = '';
            }
          });
        }

        // Password match checker
        const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
        if (confirmPasswordInput) {
          const checkPasswordMatch = () => {
            const password = form.querySelector('input[name="password"]').value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword && confirmPassword.length > 0) {
              confirmPasswordInput.style.borderColor = "#ef4444";
              confirmPasswordInput.setCustomValidity("Passwords do not match.");
            } else {
              confirmPasswordInput.style.borderColor = "rgb(226, 232, 240)";
              confirmPasswordInput.setCustomValidity("");
            }
          };

          confirmPasswordInput.addEventListener('input', checkPasswordMatch);
        }

        // Form submission
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = form.elements['email'].value;
          const password = form.elements['password'].value;
          const confirmPassword = form.elements['confirmPassword'].value;

          if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
          }

          try {
            const response = await signUp(email, password);
            if (response.token) {
              localStorage.setItem('token', response.token);
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