const APP_VERSION = "v3.3.0";

document.addEventListener("DOMContentLoaded", () => {
    const footers = document.querySelectorAll('.footer');
    footers.forEach(footer => {
        footer.innerHTML = `
            <style>
                .modern-footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    border-top: 1px solid #e2e8f0;
                    background-color: #ffffff;
                    color: #64748b;
                    font-size: 13px;
                    font-weight: 500;
                }
                .modern-footer-links {
                    display: flex;
                    gap: 20px;
                }
                .modern-footer-links a {
                    color: #64748b;
                    text-decoration: none;
                    transition: color 0.2s;
                    font-weight: 600;
                }
                .modern-footer-links a:hover {
                    color: #0f172a;
                }
                @media (max-width: 600px) {
                    .modern-footer-content {
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                    }
                }
            </style>
            <div class="modern-footer-content">
                <div>&copy; 2026 KYazılım - Sürüm ${APP_VERSION}</div>
                <div class="modern-footer-links">
                    <a href="dokumantasyon.html">Dökümantasyon</a>
                    <a href="iletisim.html">Geri Bildirim & İletişim</a>
                </div>
            </div>
        `;
    });
});
