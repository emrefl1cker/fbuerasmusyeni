/* İNTİBAK ARŞİVİ SAYFASI: Fakülte → Ülke → Üniversite filtresi + tablo çizimi. (TR/EN)
   Veri: data/intibak.js   İngilizce terimler: data/terms-en.js
   EN sayfada tablo başlıkları ve ülke/fakülte adları sözlükten çevrilir; not için kayda note_en ekle. */
(function () {
    'use strict';
    const LANG = /^en/i.test(document.documentElement.lang) ? 'en' : 'tr';
    const TERMS = window.FBU_TERMS_EN || {};
    const S = {
        tr: {
            locale: 'tr-TR',
            empty: 'Not dönüşüm tablosunu görüntülemek için yukarıdan seçimlerinizi tamamlayınız.',
            selFaculty: '-- Fakülte Seçin --', firstFaculty: '-- Önce Fakülte Seçin --',
            selCountry: '-- Ülke Seçin --', firstCountry: '-- Önce Ülke Seçin --',
            selUni: '-- Üniversite Seçin --'
        },
        en: {
            locale: 'en',
            empty: 'Complete the selections above to view the grade conversion table.',
            selFaculty: '-- Select Faculty --', firstFaculty: '-- Select Faculty First --',
            selCountry: '-- Select Country --', firstCountry: '-- Select Country First --',
            selUni: '-- Select University --'
        }
    }[LANG];

    // Sözlük çevirisi (EN'de; bulunamazsa Türkçe haliyle bırakır)
    const term = (kind, v) => (LANG === 'en' && TERMS[kind] && TERMS[kind][v]) || v;
    function head(text) {
        if (LANG !== 'en') return text;
        if (TERMS.headers && TERMS.headers[text]) return TERMS.headers[text];
        // "Karşı Kurum (X) Notu" kalıbı: kurum adı korunur, kalıp çevrilir
        const m = text.match(/^(Karşı Kurum) \((.+)\) (.+)$/);
        if (m) {
            const pre = (TERMS.headerPrefix || {})[m[1]] || m[1];
            const suf = (TERMS.headerSuffix || {})[m[3]] || m[3];
            return pre + ' (' + m[2] + ') ' + suf;
        }
        return text;
    }
    const DB = window.FBU_INTIBAK || [];
    const facSel = document.getElementById('facultySelect');
    const ctrSel = document.getElementById('countrySelect');
    const uniSel = document.getElementById('uniSelect');
    const table = document.getElementById('conversionTable');
    const noteEl = document.getElementById('conversionNote');
    if (!facSel || !ctrSel || !uniSel || !table) return;

    const tr = (a, b) => a.localeCompare(b, S.locale);

    function fill(select, items, placeholder) {
        select.innerHTML = '';
        const first = document.createElement('option');
        first.value = ''; first.textContent = placeholder;
        select.append(first);
        items.forEach(([value, label]) => {
            const o = document.createElement('option');
            o.value = value; o.textContent = label;
            select.append(o);
        });
    }

    function showEmpty() {
        table.innerHTML = '';
        const td = document.createElement('td');
        td.style.border = 'none';
        const div = document.createElement('div');
        div.className = 'empty-state'; div.textContent = S.empty;
        td.append(div);
        table.createTBody().insertRow().append(td);
        noteEl.textContent = '';
    }

    function drawTable(rec) {
        table.innerHTML = '';
        const thead = table.createTHead();
        rec.head.forEach(row => {
            const tr_ = thead.insertRow();
            row.forEach(c => {
                const th = document.createElement('th');
                const [text, span] = Array.isArray(c) ? c : [c, 1];
                th.textContent = head(text);
                if (span > 1) th.colSpan = span;
                tr_.append(th);
            });
        });
        const tbody = table.createTBody();
        const anchors = [];                    // her sütunda son dolu hücre (birleştirme için)
        rec.rows.forEach(row => {
            const tr_ = tbody.insertRow();
            row.forEach((val, col) => {
                const up = anchors[col];
                if (val === '' && up) { up.rowSpan += 1; return; }   // boş = üstteki hücreyle birleş
                const td = tr_.insertCell();
                td.textContent = term('cells', val);
                anchors[col] = td;
            });
        });
        noteEl.textContent = (LANG === 'en' ? rec.note_en : rec.note) || '';
    }

    // Kayıtları fakülte bazında aç (bir kayıt birden fazla fakülteye bağlanabilir)
    const entries = [];
    DB.forEach(rec => rec.faculties.forEach(f => entries.push({ faculty: f, rec })));

    const faculties = [...new Set(entries.map(e => e.faculty))]
        .map(f => [f, term('faculties', f)]).sort((a, b) => tr(a[1], b[1]));
    fill(facSel, faculties, S.selFaculty);

    facSel.addEventListener('change', () => {
        showEmpty();
        fill(uniSel, [], S.firstCountry); uniSel.disabled = true;
        if (!facSel.value) { fill(ctrSel, [], S.firstFaculty); ctrSel.disabled = true; return; }
        const countries = [...new Set(entries.filter(e => e.faculty === facSel.value).map(e => e.rec.country))]
            .map(c => [c, term('countries', c)]).sort((a, b) => tr(a[1], b[1]));
        fill(ctrSel, countries, S.selCountry);
        ctrSel.disabled = false;
    });

    ctrSel.addEventListener('change', () => {
        showEmpty();
        if (!ctrSel.value) { fill(uniSel, [], S.firstCountry); uniSel.disabled = true; return; }
        const unis = entries.filter(e => e.faculty === facSel.value && e.rec.country === ctrSel.value)
            .map(e => e.rec).sort((a, b) => tr(a.name, b.name));
        fill(uniSel, unis.map(r => [String(DB.indexOf(r)), r.name]), S.selUni);
        uniSel.disabled = false;
    });

    uniSel.addEventListener('change', () => {
        if (uniSel.value === '') return showEmpty();
        drawTable(DB[Number(uniSel.value)]);
    });
})();
