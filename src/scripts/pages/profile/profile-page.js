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
			<div class="hero-container">
				<section class="profile-card">
					<div class="profile-header" style="margin-bottom:16px;">
						<div class="avatar-large">${initial}</div>
						<div class="profile-meta">
							<h2 class="profile-name">${name}</h2>
							<p class="profile-email">${email}</p>
						</div>
					</div>
					<h3 class="section-title">Informasi Akun</h3>
					<div style="display:grid;gap:12px;margin-bottom:16px;">
						<label class="input-label">Nama</label>
						<input class="form-input" type="text" value="${name}" disabled />
						<label class="input-label">Email</label>
						<input class="form-input" type="email" value="${email}" disabled />
					</div>

					<h3 class="section-title">Keamanan</h3>
					<div style="display:grid;gap:12px;margin-bottom:16px;">
						<label class="input-label">Kata Sandi</label>
						<input class="form-input" type="password" value="********" disabled />
						<button id="change-password" class="submit-button" type="button">Ubah Kata Sandi</button>
					</div>

          
				</section>

				<div class="profile-footer">
					<button id="logout-btn" class="danger-button" type="button">Logout</button>
				</div>
			</div>
		</div>`;
	}

	async afterRender() {
		const btn = document.getElementById('logout-btn');
		if (btn) {
			btn.addEventListener('click', () => {
				localStorage.removeItem('token');
				localStorage.removeItem('email');
				window.location.hash = '#/auth';
			});
		}

		const changePwd = document.getElementById('change-password');
		if (changePwd) {
			changePwd.addEventListener('click', () => {
				alert('Fitur ubah kata sandi akan tersedia segera.');
			});
		}

    
	}
}
