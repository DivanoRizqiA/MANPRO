import '../../../styles/welcome.css';

// Import gambar
const vectorImage = new URL('../../../public/images/Vector.png', import.meta.url);
const medItemsImage = new URL('../../../public/images/med-items.png', import.meta.url);

const WelcomePage = {
    render() {
        return `
        <div class="welcome-page">
        <div class="container">
            <div class="left-content">
                <div class="logo">
                    <img src="${vectorImage}" alt="Vector" class="vector-icon" />
                    <h1>Diateksi</h1>
                </div>

                <p class="greeting">Halo, Selamat Datang!</p>
                
                <h2 class="main-title">
                    Langkah Kecil Hari Ini,<br>
                    Hindari Diabetes Esok Hari.
                </h2>

                <p class="subtitle">
                    Say No to Over Gula, Say Yes to Sehat Selama-nya!<br>
                    Pantau Sekarang!
                </p>

                <div class="buttons">
                    <button class="btn btn-signup">Register</button>
                    <button class="btn btn-login">Login</button>
                </div>
            </div>

            <div class="right-content">
                <img src="${medItemsImage}" alt="Medical Items" class="med-items-image" />
            </div>
        </div>
        </div>
        `;
    },

    afterRender() {
        const signupBtn = document.querySelector('.btn-signup');
        const loginBtn = document.querySelector('.btn-login');
        
        signupBtn.addEventListener('click', () => {
            window.location.hash = '#/auth?mode=register';
        });
        
        loginBtn.addEventListener('click', () => {
            window.location.hash = '#/auth?mode=login';
        });
    }
};

export default WelcomePage;