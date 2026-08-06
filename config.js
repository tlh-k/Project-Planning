const APP_VERSION = "v3.2.0";

document.addEventListener("DOMContentLoaded", () => {
    const footers = document.querySelectorAll('.footer');
    footers.forEach(f => {
        f.innerHTML = `&copy; 2026 KYazılım - Sürüm ${APP_VERSION}`;
    });
});
