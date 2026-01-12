import CONFIG from '../../config.js';
import Auth from '../../data/auth.js';

const API_BASE = CONFIG.BASE_URL;

export default class ProfilePage {
	async render() {
		const email = localStorage.getItem('email') || 'user@email.com';
		const name = (email.split('@')[0] || 'User')
			.split(/[._-]/)
			.map(w => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
		const initial = name.charAt(0).toUpperCase();

		return `
		<div class="hero-background">
			<div class="hero-container" id="profile-top">
				<!-- Info Section Header -->
				<div class="health-info-section" style="margin-bottom:16px">
					<h3 class="section-title">Profil Pengguna Anda</h3>
					<p class="section-description">Lihat dan kelola informasi akun Anda. Data ini digunakan untuk personalisasi pengalaman Anda di Diateksi.</p>
				</div>

				<!-- Profile Card with Avatar -->
				<div class="risk-form-card">
					<div class="risk-form-card-inner">
						<!-- Avatar Section -->
						<div class="profile-header-top" style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e5e7eb;">
							<div class="avatar" style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg, #4da3ff 0%, #7ec8ff 100%);display:flex;align-items:center;justify-content:center;color:#ffffff;font-weight:800;font-size:24px;flex-shrink:0;">${initial}</div>
							<div style="flex:1;">
								<h2 class="profile-name" style="margin:0;font-size:20px;font-weight:700;color:#0f172a;">${name}</h2>
								<p class="profile-email" style="margin:4px 0 0;font-size:14px;color:#64748b;">${email}</p>
							</div>
						</div>

						<!-- Account Information Section -->
						<h3 class="section-title" style="margin-top:0;margin-bottom:12px;">Informasi Akun</h3>
						<div class="profile-grid" style="margin-bottom:20px;">
							<div>
								<label class="input-label">Nama</label>
								<input id="profile-name-input" class="form-input" type="text" value="${name}" disabled />
							</div>
							<div>
								<label class="input-label">Email</label>
								<input id="profile-email-input" class="form-input" type="email" value="${email}" disabled />
							</div>
						</div>
						<button id="edit-profile-btn" class="btn-primary" type="button" style="width:100%;margin-bottom:16px;">Edit Informasi</button>

						<!-- Security Section -->
						<h3 class="section-title" style="margin-bottom:12px;">Keamanan</h3>
						<div class="profile-grid" style="margin-bottom:0;align-items:end;">
							<div>
								<label class="input-label">Kata Sandi</label>
								<input id="profile-password-input" class="form-input" type="password" value="••••••••" disabled />
							</div>
							<div>
								<button id="change-password-btn" class="btn-primary" type="button" style="width:100%;">Ubah Kata Sandi</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Logout Button -->
				<div class="risk-submit-cta"><button id="logout-btn" class="danger-button" type="button">Logout</button></div>
			</div>
		</div>`;
	}

	async afterRender() {
		const logoutBtn = document.getElementById('logout-btn');
		const editProfileBtn = document.getElementById('edit-profile-btn');
		const changePasswordBtn = document.getElementById('change-password-btn');
		const nameInput = document.getElementById('profile-name-input');
		const emailInput = document.getElementById('profile-email-input');

		// Logout handler
		if (logoutBtn) {
			logoutBtn.addEventListener('click', () => {
				localStorage.removeItem('token');
				localStorage.removeItem('email');
				window.location.hash = '#/auth';
			});
		}

		// Edit profile handler
		if (editProfileBtn) {
			editProfileBtn.addEventListener('click', async () => {
				const nameValue = nameInput.value.trim();
				const emailValue = emailInput.value.trim();

				if (!nameValue || !emailValue) {
					alert('Nama dan email tidak boleh kosong');
					return;
				}

				try {
					const token = Auth.getToken();
					console.log('Update profile with token:', token ? 'present' : 'missing');
					const response = await fetch(`${API_BASE}/auth/profile`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({
							name: nameValue,
							email: emailValue
						})
					});

					console.log('Response status:', response.status);
					const textContent = await response.text();
					console.log('Response content type:', response.headers.get('content-type'));
					console.log('Response text:', textContent.substring(0, 500));
					
					let data;
					try {
						data = JSON.parse(textContent);
					} catch (parseErr) {
						console.error('Failed to parse JSON:', parseErr);
						alert('Server returned invalid response. Check console for details.');
						return;
					}
					
					if (data.success) {
						localStorage.setItem('email', emailValue);
						alert('Profil berhasil diperbarui');
						window.location.hash = '#/profile';
					} else {
						alert(data.msg || 'Gagal update profil');
					}
				} catch (err) {
					console.error('Update profile error:', err);
					alert('Error saat update profil: ' + err.message);
				}
			});
		}

		// Change password handler
		if (changePasswordBtn) {
			changePasswordBtn.addEventListener('click', () => {
				showChangePasswordModal();
			});
		}

		// Make inputs editable on focus (optional visual feedback)
		[nameInput, emailInput].forEach(input => {
			if (input) {
				input.addEventListener('focus', function() {
					if (this.disabled) {
						alert('Klik tombol "Edit Informasi" untuk mengubah data');
						this.blur();
					}
				});
			}
		});

		// Add edit mode toggle
		if (editProfileBtn) {
			let isEditMode = false;
			const originalText = editProfileBtn.textContent;

			editProfileBtn.addEventListener('click', function(e) {
				isEditMode = !isEditMode;

				if (isEditMode) {
					nameInput.disabled = false;
					emailInput.disabled = false;
					editProfileBtn.textContent = 'Simpan Perubahan';
					editProfileBtn.style.background = '#22c55e';
					nameInput.focus();
					e.preventDefault();
				} else {
					// Save mode akan handle di atas
					editProfileBtn.textContent = originalText;
					editProfileBtn.style.background = '';
				}
			});
		}
	}
}

// Modal untuk change password
function showChangePasswordModal() {
	const overlay = document.createElement('div');
	overlay.id = 'password-modal-overlay';
	overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:9999;';

	const modal = document.createElement('div');
	modal.style.cssText = 'width:100%;max-width:420px;background:#fff;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,0.15);padding:24px;';
	modal.innerHTML = `
		<h3 style="margin:0 0 8px;font-size:18px;color:#111827">Ubah Kata Sandi</h3>
		<p style="margin:0 0 16px;color:#4b5563;font-size:14px">Masukkan kata sandi lama dan baru Anda</p>
		
		<div style="margin-bottom:16px;">
			<label style="display:block;font-size:14px;font-weight:500;color:#374151;margin-bottom:8px;">Kata Sandi Lama</label>
			<input id="old-password" type="password" placeholder="Masukkan kata sandi lama" style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;box-sizing:border-box;">
		</div>
		
		<div style="margin-bottom:16px;">
			<label style="display:block;font-size:14px;font-weight:500;color:#374151;margin-bottom:8px;">Kata Sandi Baru</label>
			<input id="new-password" type="password" placeholder="Minimal 6 karakter" style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;box-sizing:border-box;">
		</div>
		
		<div style="margin-bottom:20px;">
			<label style="display:block;font-size:14px;font-weight:500;color:#374151;margin-bottom:8px;">Konfirmasi Kata Sandi Baru</label>
			<input id="confirm-password" type="password" placeholder="Ulangi kata sandi baru" style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;box-sizing:border-box;">
		</div>

		<div style="display:flex;gap:12px;justify-content:flex-end;">
			<button id="password-cancel-btn" style="padding:10px 14px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;font-size:14px;color:#111827">Batal</button>
			<button id="password-confirm-btn" style="padding:10px 14px;border:none;border-radius:8px;background:#2563eb;color:#fff;cursor:pointer;font-size:14px;font-weight:600;">Ubah Password</button>
		</div>
	`;

	overlay.appendChild(modal);
	document.body.appendChild(overlay);

	const oldPwdInput = modal.querySelector('#old-password');
	const newPwdInput = modal.querySelector('#new-password');
	const confirmPwdInput = modal.querySelector('#confirm-password');
	const cancelBtn = modal.querySelector('#password-cancel-btn');
	const confirmBtn = modal.querySelector('#password-confirm-btn');

	const cleanup = () => {
		if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
	};

	cancelBtn.addEventListener('click', cleanup);

	confirmBtn.addEventListener('click', async () => {
		const oldPassword = oldPwdInput.value.trim();
		const newPassword = newPwdInput.value.trim();
		const confirmPassword = confirmPwdInput.value.trim();

		if (!oldPassword || !newPassword || !confirmPassword) {
			alert('Semua field harus diisi');
			return;
		}

		if (newPassword.length < 6) {
			alert('Kata sandi baru minimal 6 karakter');
			return;
		}

		if (newPassword !== confirmPassword) {
			alert('Kata sandi baru tidak cocok');
			return;
		}

		try {
			const token = Auth.getToken();
			console.log('Change password with token:', token ? 'present' : 'missing');
			const response = await fetch(`${API_BASE}/auth/change-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					oldPassword,
					newPassword
				})
			});

			console.log('Change password response status:', response.status);
			const textContent = await response.text();
			console.log('Response content type:', response.headers.get('content-type'));
			console.log('Response text:', textContent.substring(0, 500));
			
			let data;
			try {
				data = JSON.parse(textContent);
			} catch (parseErr) {
				console.error('Failed to parse JSON:', parseErr);
				alert('Server returned invalid response. Check console for details.');
				return;
			}
			
			if (data.success) {
				alert('Kata sandi berhasil diubah');
				cleanup();
			} else {
				alert(data.msg || 'Gagal mengubah kata sandi');
			}
		} catch (err) {
			console.error('Change password error:', err);
			alert('Error: ' + err.message);
		}
	});
}
