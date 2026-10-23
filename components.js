/* ORTAK HEADER + FOOTER  (TR + EN)
   Menü, iletişim bilgisi veya dil metinleri değişecekse SADECE bu dosya güncellenir.
   Sayfalarda kullanım:  <script src="components.js" data-part="header"></script>
                         <script src="components.js" data-part="footer"></script>
   (/en/ klasöründeki sayfalarda yol:  ../components.js)

   DİL: <html lang="tr"> veya <html lang="en"> değerinden otomatik okunur.

   İNGİLİZCE SAYFA YAYINA ALMAK İÇİN:
     1) en/ klasöründeki sayfayı çevir, <meta name="robots" content="noindex"> satırını sil
     2) Dosya adını aşağıdaki EN_READY listesine ekle
   EN_READY'de olmayan sayfa İngilizce menüde görünmez, TR sayfadaki EN butonu o sayfaya gitmez. */
(function () {
    'use strict';
    const host = document.currentScript;
    const part = host && host.dataset.part;

    /* ---------- DİL ---------- */
    const LANG = /^en/i.test(document.documentElement.lang) ? 'en' : 'tr';
    const ROOT = LANG === 'en' ? '../' : '';   // /en/ içindeki sayfalar ortak dosyalara ../ ile ulaşır

    /* İngilizce sürümü HAZIR olan sayfalar (dosya adı olarak) */
    const EN_READY = [
        'index.html',
        'akran-danismanligi.html',
        'aktsnotdonusum.html',
        'degisim-komisyonu.html',
        'duyurular-haberler.html',
        'ilan.html',
        'fbu-eche-belgesi.html',
        'fbu-politika-beyani.html',
        'gelen-ogrenci.html',
        'gelen-personel.html',
        'icerme-destegi.html',
        'ogrenci-beyannamesi.html',
        'ogrenci-ogrenim.html',
        'ogrenci-staj.html',
        'partner-kurumlar.html',
        'personel-dersverme.html',
        'personel-egitimalma.html',
    ];

    /* ---------- MENÜ ---------- */
    const NAV = [
        { tr: 'Ana Sayfa', en: 'Home', href: 'index.html' },
        { tr: 'Erasmus+', en: 'Erasmus+', children: [
            { tr: 'ECHE (2021-2027)', en: 'ECHE (2021-2027)', href: 'fbu-eche-belgesi.html' },
            { tr: 'Öğrenci Beyannamesi', en: 'Erasmus Student Charter', href: 'ogrenci-beyannamesi.html' },
            { tr: 'Erasmus Politika Beyanı', en: 'Erasmus Policy Statement', href: 'fbu-politika-beyani.html' },
            { tr: 'İçerme Desteği', en: 'Inclusion Support', href: 'icerme-destegi.html' },
            { tr: 'AKTS Not Dönüşüm Tablosu', en: 'ECTS Grade Conversion Table', href: 'aktsnotdonusum.html' },
            { tr: 'Akran Danışmanlığı', en: 'Peer Mentoring', href: 'akran-danismanligi.html' },
            { tr: 'Değişim Programları Seçim Komisyonu', en: 'Exchange Programmes Selection Committee', href: 'degisim-komisyonu.html' }
        ]},
        { tr: 'Giden Yönlü Hareketlilik', en: 'Outgoing Mobility', children: [
            { tr: 'Öğrenci Öğrenim', en: 'Student Mobility for Studies', href: 'ogrenci-ogrenim.html' },
            { tr: 'Öğrenci Staj', en: 'Student Mobility for Traineeships', href: 'ogrenci-staj.html' },
            { tr: 'Personel Ders Verme', en: 'Staff Mobility for Teaching', href: 'personel-dersverme.html' },
            { tr: 'Personel Eğitim Alma', en: 'Staff Mobility for Training', href: 'personel-egitimalma.html' }
        ]},
        { tr: 'Gelen Yönlü Hareketlilik', en: 'Incoming Mobility', children: [
            { tr: 'Gelen Öğrenci', en: 'Incoming Students', href: 'gelen-ogrenci.html' },
            { tr: 'Gelen Personel', en: 'Incoming Staff', href: 'gelen-personel.html' }
        ]},
        { tr: 'Partner Kurumlar', en: 'Partner Institutions', href: 'partner-kurumlar.html' },
        { tr: 'Duyurular & Haberler', en: 'Announcements & News', href: 'duyurular-haberler.html' }
    ];

    /* ---------- HEADER / FOOTER METİNLERİ ---------- */
    const TEXT = {
        tr: {
            logoTop: 'FENERBAHÇE ÜNİVERSİTESİ',
            logoLines: ['ULUSLARARASI İŞ BİRLİKLERİ &amp;', 'DEĞİŞİM PROGRAMLARI'],
            logoAlt: 'FBU Logo',
            menuToggle: 'Menüyü aç/kapat',
            soon: 'Yakında',
            footTitles: ['İletişim Bilgileri', 'Bize Ulaşın', 'Çalışma Saatleri'],
            address: ['<strong>Fenerbahçe Üniversitesi</strong>', 'Uluslararası Ofis', 'Atatürk Mah. Ataşehir Bulvarı,', 'Ataşehir / İstanbul, Türkiye'],
            hours: ['Pazartesi - Cuma', '08:30 - 17:30'],
            copyright: 'Fenerbahçe Üniversitesi. Erasmus ve Değişim Programları. Tüm hakları saklıdır.'
        },
        en: {
            logoTop: 'FENERBAHÇE UNIVERSITY',
            logoLines: ['INTERNATIONAL COOPERATION &amp;', 'EXCHANGE PROGRAMMES'],
            logoAlt: 'FBU Logo',
            menuToggle: 'Toggle menu',
            soon: 'Coming soon',
            footTitles: ['Contact Information', 'Get in Touch', 'Working Hours'],
            address: ['<strong>Fenerbahçe University</strong>', 'International Office', 'Atatürk Mah. Ataşehir Bulvarı,', 'Ataşehir / Istanbul, Türkiye'],
            hours: ['Monday - Friday', '08:30 - 17:30'],
            copyright: 'Fenerbahçe University. Erasmus and Exchange Programmes. All rights reserved.'
        }
    };
    const TX = TEXT[LANG];
    const CONTACT = { email: 'erasmus@fbu.edu.tr', phone: '0216 910 19 07 / 1993' };

    /* ---------- YARDIMCILAR ---------- */
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    // Dosya adını normalize et: '' → index.html, 'sayfa' → 'sayfa.html' (uzantısız URL'lere karşı), #hash atılır
    const norm = p => {
        p = (p || '').split('#')[0].toLowerCase();
        return p === '' ? 'index.html' : (/\.html?$/.test(p) ? p : p + '.html');
    };
    const current = norm(location.pathname.split('/').pop());
    const isHere = item => item.href && norm(item.href) === current;
    // TR'de her şey görünür; EN'de yalnızca EN_READY'dekiler
    const available = item => LANG === 'tr' || EN_READY.includes(norm(item.href));

    const visibleNav = NAV
        .map(item => item.children ? Object.assign({}, item, { children: item.children.filter(available) }) : item)
        .filter(item => item.children ? item.children.length : available(item));

    /* ---------- DİL DEĞİŞTİRİCİ ---------- */
    function langSwitchHTML() {
        const na = code => `<span title="${TX.soon}" style="font-size:14px;font-weight:800;color:var(--text-light);opacity:.45;cursor:default;">${code}</span>`;
        const link = (code, href, active) =>
            `<a href="${href}" hreflang="${code.toLowerCase()}" lang="${code.toLowerCase()}"${active ? ' class="active" aria-current="true"' : ''}>${code}</a>`;

        const params = new URLSearchParams(location.search);
        const suffix = current === 'ilan.html' && params.has('id') ? '?id=' + encodeURIComponent(params.get('id')) :
                       current === 'duyurular-haberler.html' && params.get('tab') === 'news' ? '?tab=news' : '';
        let tr, en;
        if (LANG === 'tr') {
            tr = link('TR', current + suffix, true);
            const target = EN_READY.includes(current) ? current : (EN_READY.includes('index.html') ? 'index.html' : null);
            en = target ? link('EN', 'en/' + target + suffix, false) : na('EN');
        } else {
            tr = link('TR', '../' + current + suffix, false);
            en = link('EN', current + suffix, true);
        }
        return `<li class="nav-item lang-switch">${tr}<span style="color: var(--border-color);">|</span>${en}</li>`;
    }

    /* ---------- HEADER ---------- */
    function headerHTML() {
        const items = visibleNav.map(item => {
            if (!item.children) {
                return `<li class="nav-item"><a href="${item.href}" class="nav-link${isHere(item) ? ' active' : ''}">${esc(item[LANG])}</a></li>`;
            }
            const open = item.children.some(isHere);
            const kids = item.children.map(c =>
                `<a href="${c.href}" class="dropdown-item${isHere(c) ? ' active' : ''}">${esc(c[LANG])}</a>`).join('');
            return `<li class="nav-item"><a href="#" class="nav-link${open ? ' active' : ''}">${esc(item[LANG])} ▾</a><div class="dropdown-menu">${kids}</div></li>`;
        }).join('');

        return `<header>
        <a href="index.html" class="logo-area">
            <img src="${ROOT}assets/img/fbu-logo.png" alt="${TX.logoAlt}" class="header-logo">
            <div class="logo-separator"></div>
            <div class="logo-text">
                <span class="logo-title-top">${TX.logoTop}</span>
                <span class="logo-title-bottom">${TX.logoLines[0]}</span>
                <span class="logo-title-bottom">${TX.logoLines[1]}</span>
            </div>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="${TX.menuToggle}" aria-expanded="false">☰</button>
        <ul class="nav-list" id="navList">${items}
            ${langSwitchHTML()}
        </ul>
    </header>`;
    }

    /* ---------- FOOTER ---------- */
    function footerHTML() {
        const t = TX.footTitles;
        return `<footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-col">
                <h3>${t[0]}</h3>
                <p><span class="footer-icon">📍</span><span>${TX.address.join('<br>')}</span></p>
            </div>
            <div class="footer-col">
                <h3>${t[1]}</h3>
                <p><span class="footer-icon">✉️</span><span>${CONTACT.email}</span></p>
                <p><span class="footer-icon">📞</span><span>${CONTACT.phone}</span></p>
            </div>
            <div class="footer-col">
                <h3>${t[2]}</h3>
                <p><span class="footer-icon">🕒</span><span>${TX.hours.join('<br>')}</span></p>
            </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} ${TX.copyright}</div>
    </footer>`;
    }

    if (host && part === 'header') host.insertAdjacentHTML('afterend', headerHTML());
    if (host && part === 'footer') host.insertAdjacentHTML('afterend', footerHTML());
})();
