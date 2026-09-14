document.addEventListener("DOMContentLoaded", () => {
    // Mobil Menü İşlemleri
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });
    }

    // Başvuru Durumu Etiketleri Hesaplama (Ana sayfa için)
    document.querySelectorAll('.status-badge[data-deadline]').forEach(badge => {
        const deadline = new Date(badge.dataset.deadline + 'T23:59:59');
        const today = new Date();
        const isActive = deadline >= today;
        badge.classList.remove('active', 'expired');
        badge.classList.add(isActive ? 'active' : 'expired');
        badge.textContent = isActive ? 'Başvurular Devam Ediyor' : 'Başvuru Süresi Doldu';
    });
});