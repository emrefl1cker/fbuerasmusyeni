/* PARTNER KURUMLAR TABLOSU (öğrenci + personel sekmeleri, TR/EN)
   Veri: data/partners.js (öğrenci), data/partners-staff.js (personel), data/terms-en.js (İngilizce terimler)
   Sekmeler: partner-kurumlar.html#ogrenci  /  partner-kurumlar.html#personel
   Personel listesi boşsa sekme görünür ancak kayıt bekleniyor mesajı verilir. */
(function () {
    'use strict';
    try {

    const LANG = /^en/i.test(document.documentElement.lang) ? 'en' : 'tr';
    const TERMS = window.FBU_TERMS_EN || {};

    /* ---------- ARAYÜZ METİNLERİ ---------- */
    const STR = {
        tr: {
            locale: 'tr-TR',
            search: 'Üniversite, ülke, bölüm veya kod ara...',
            staffSearch: 'Üniversite, ülke, alan veya Erasmus kodu ara...',
            tabs: { student: 'Öğrenci Hareketliliği', staff: 'Personel Hareketliliği' },
            all: { faculty: 'Tüm Fakülteler', department: 'Tüm Bölümler', country: 'Tüm Ülkeler', type: 'Tüm Hareketlilik Türleri' },
            cols: { country: 'Ülke', institution: 'Üniversite ve Kod', facultyDept: 'Fakülte / Bölüm', dept: 'Bölüm / Alan', type: 'Hareketlilik Türü', quota: 'Kontenjan', condition: 'Dil Gereksinimi' },
            persons: 'Kişi',
            quotaLabel: 'Kontenjan:',
            empty: 'Aramanıza eşleşen anlaşma bulunamadı.',
            staffEmptyTitle: 'Personel kurum listesi henüz yayımlanmadı',
            staffEmptyText: 'Ders verme ve eğitim alma hareketliliğine ilişkin doğrulanmış kurum kayıtları bu alana eklenecek. Bilgi için Erasmus Ofisi ile iletişime geçebilirsiniz.',
            studentEmptyText: 'Öğrenci anlaşmaları şu anda listelenemiyor.',
            contact: 'Erasmus Ofisine e-posta gönder',
            staffNote: 'Personel anlaşmalarını inceleyebilirsiniz. Veritabanında ders verme/eğitim alma türü ayrıca belirtilmemişse liste genel Personel Hareketliliği olarak görünür. Eğitim alma için kurumlararası anlaşma zorunlu değildir.',
            copyTip: 'Kopyalamak için tıkla',
            copied: 'Kopyalandı: ',
            types: { teaching: 'Ders Verme', training: 'Eğitim Alma', both: 'Ders Verme / Eğitim Alma', staff: 'Personel Hareketliliği' }
        },
        en: {
            locale: 'en',
            search: 'Search university, country, department or code...',
            staffSearch: 'Search university, country, field or Erasmus code...',
            tabs: { student: 'Student Mobility', staff: 'Staff Mobility' },
            all: { faculty: 'All Faculties', department: 'All Departments', country: 'All Countries', type: 'All Mobility Types' },
            cols: { country: 'Country', institution: 'University & Code', facultyDept: 'Faculty / Department', dept: 'Department / Field', type: 'Mobility Type', quota: 'Quota', condition: 'Language Requirement' },
            persons: 'persons',
            quotaLabel: 'Quota:',
            empty: 'No agreements match your search.',
            staffEmptyTitle: 'Staff institution list is not yet published',
            staffEmptyText: 'Verified institutions for staff mobility for teaching and training will be added here. Please contact the Erasmus Office for details.',
            studentEmptyText: 'Student agreements are currently unavailable.',
            contact: 'Email the Erasmus Office',
            staffNote: 'Browse staff agreements. When the source does not specify teaching or training separately, records appear as general Staff Mobility. An inter-institutional agreement is not required for staff training.',
            copyTip: 'Click to copy',
            copied: 'Copied: ',
            types: { teaching: 'Teaching', training: 'Training', both: 'Teaching / Training', staff: 'Staff Mobility' }
        }
    }[LANG];

    /* ---------- STİL (CMS'in silmemesi için JS üzerinden enjekte) ---------- */
    const FBE_STYLES = `
      .fbe-agreements {
        --fbe-bg: #F8FAFC;
        --fbe-surface: #FFFFFF;
        --fbe-text: #0F172A;
        --fbe-text-muted: #64748B;
        --fbe-border: #E2E8F0;
        --fbe-primary: #1E293B;
        --fbe-accent: #0A3D7A; /* FBU Blue */
        --fbe-accent-light: #EFF6FF;
        --fbe-tag-bg: #F1F5F9;
        --fbe-cols: 130px minmax(220px, 1.5fr) minmax(200px, 1fr) 100px 140px;
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        background: var(--fbe-bg);
        color: var(--fbe-text);
        padding: 32px 20px;
        box-sizing: border-box;
        width: 100%;
        border-radius: 12px;
        border: 1px solid var(--border-color);
      }
      .fbe-agreements * { box-sizing: border-box; }
      .fbe-agreements [hidden] { display: none !important; }
      .fbe-agreements .fbe-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; border-bottom: 2px solid var(--fbe-border); }
      .fbe-agreements .fbe-tab { font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 20px; background: none; border: none; border-bottom: 3px solid transparent; margin-bottom: -2px; color: var(--fbe-text-muted); cursor: pointer; transition: all 0.2s ease; }
      .fbe-agreements .fbe-tab:hover { color: var(--fbe-accent); }
      .fbe-agreements .fbe-tab.fbe-tab-active { color: var(--fbe-accent); border-bottom-color: #FFC72C; }
      .fbe-agreements .fbe-toolbar { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
      .fbe-agreements .fbe-search-box { position: relative; width: 100%; }
      .fbe-agreements .fbe-search-box input { width: 100%; padding: 14px 16px; border: 1px solid var(--fbe-border); border-radius: 12px; background: var(--fbe-surface); font-family: inherit; font-size: 14.5px; color: var(--fbe-text); outline: none; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
      .fbe-agreements .fbe-search-box input:focus { border-color: var(--fbe-accent); box-shadow: 0 0 0 4px var(--fbe-accent-light); }
      .fbe-agreements .fbe-filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
      .fbe-agreements .fbe-select-wrapper { position: relative; width: 100%; }
      .fbe-agreements .fbe-select-wrapper select { width: 100%; padding: 12px 16px; border: 1px solid var(--fbe-border); border-radius: 12px; background: var(--fbe-surface); font-family: inherit; font-size: 13.5px; font-weight: 500; color: var(--fbe-text); outline: none; cursor: pointer; appearance: none; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
      .fbe-agreements .fbe-select-wrapper select:focus { border-color: var(--fbe-accent); box-shadow: 0 0 0 4px var(--fbe-accent-light); }
      .fbe-agreements .fbe-list { display: flex; flex-direction: column; gap: 8px; }
      .fbe-agreements .fbe-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
      @media(min-width: 960px) { .fbe-agreements .fbe-grid { grid-template-columns: var(--fbe-cols); gap: 16px; align-items: center; } }
      .fbe-agreements .fbe-list-header { padding: 0 18px 12px; font-size: 12px; font-weight: 700; color: var(--fbe-text-muted); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid var(--fbe-border); margin-bottom: 8px; }
      @media(max-width: 959px) { .fbe-agreements .fbe-list-header { display: none; } }
      .fbe-agreements .fbe-row { background: var(--fbe-surface); border: 1px solid var(--fbe-border); border-radius: 12px; padding: 14px 18px; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.01); }
      @media(min-width: 960px) { .fbe-agreements .fbe-row { padding: 12px 18px; } }
      .fbe-agreements .fbe-row:hover { border-color: #CBD5E1; box-shadow: 0 4px 12px rgba(0,0,0,0.04); transform: translateY(-1px); }
      .fbe-agreements .fbe-col-country { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--fbe-text-muted); }
      .fbe-agreements .fbe-col-inst { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
      .fbe-agreements .fbe-col-inst strong { font-weight: 600; font-size: 14.5px; color: var(--fbe-primary); }
      .fbe-agreements .fbe-code-badge { display: inline-flex; align-items: center; gap: 4px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; color: var(--fbe-text-muted); background: var(--fbe-tag-bg); padding: 2px 6px; border-radius: 4px; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; }
      .fbe-agreements .fbe-code-badge:hover { background: #FFC72C; color: var(--fbe-primary); border-color: #FFC72C; }
      .fbe-agreements .fbe-col-dept { font-size: 13px; color: var(--fbe-text-muted); display: flex; flex-direction: column; gap: 2px; }
      .fbe-agreements .fbe-col-dept span.fbe-faculty-tag { font-size: 11px; color: var(--fbe-accent); font-weight: 600; }
      .fbe-agreements .fbe-col-type { font-size: 12px; font-weight: 600; color: var(--fbe-accent); background: var(--fbe-accent-light); border: 1px solid #BFDBFE; padding: 6px 10px; border-radius: 8px; width: fit-content; }
      .fbe-agreements .fbe-col-quota { display: inline-flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: var(--fbe-primary); }
      .fbe-agreements .fbe-col-quota span { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--fbe-text-muted); }
      .fbe-agreements .fbe-col-cond { font-size: 12px; font-weight: 600; color: #B45309; background: #FEF3C7; border: 1px solid #FDE68A; padding: 6px 10px; border-radius: 8px; width: fit-content; }
      .fbe-agreements .fbe-empty { text-align: center; padding: 44px 24px; color: var(--fbe-text-muted); font-size: 14px; background: var(--fbe-surface); border-radius: 12px; border: 1px solid var(--fbe-border); display: none; }
      .fbe-agreements .fbe-empty strong { display: block; color: var(--fbe-text); font-size: 16px; margin-bottom: 10px; }
      .fbe-agreements .fbe-empty a { display: inline-block; margin-top: 16px; font-weight: 700; color: var(--fbe-accent); text-decoration: underline; text-underline-offset: 3px; }
      .fbe-agreements .fbe-context { padding: 12px 16px; margin: -6px 0 22px; background: #EFF6FF; border-left: 3px solid var(--fbe-accent); border-radius: 6px; font-size: 13px; line-height: 1.6; color: var(--fbe-primary); }
      .fbe-agreements .fbe-col-quota-breakdown { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--fbe-primary); }
      .fbe-agreements .fbe-col-quota-breakdown b { font-family: 'JetBrains Mono',monospace; font-size: 13px; }
      .fbe-agreements .fbe-col-cond:empty { display:none; }
      .fbe-agreements .fbe-mobile-label { display: none; }
      @media(max-width: 959px) {
        .fbe-agreements .fbe-row[data-mode="staff"] { gap: 12px; }
        .fbe-agreements .fbe-row[data-mode="staff"] .fbe-mobile-cell { padding: 0 0 10px; border-bottom: 1px solid var(--fbe-border); }
        .fbe-agreements .fbe-row[data-mode="staff"] .fbe-mobile-cell:last-child { border: none; padding-bottom: 0; }
        .fbe-agreements .fbe-row[data-mode="staff"] .fbe-mobile-label { display: block; margin-bottom: 5px; font-size: 10px; letter-spacing: .045em; text-transform: uppercase; font-weight: 700; color: var(--fbe-text-muted); }
      }
      .fbe-agreements .fbe-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px); background: var(--fbe-primary); color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; box-shadow: 0 10px 25px rgba(0,0,0,0.15); opacity: 0; pointer-events: none; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); z-index: 1000; }
      .fbe-agreements .fbe-toast.fbe-toast-show { opacity: 1; transform: translateX(-50%) translateY(0); }
      @media(max-width: 959px) { .fbe-agreements .fbe-col-quota::before { content: attr(data-label); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--fbe-text-muted); } }
    `;

    const styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode(FBE_STYLES));
    document.head.appendChild(styleEl);

    /* ---------- YARDIMCILAR ---------- */
    function toSearchable(str) {
        if (!str) return '';
        return String(str)
            .toLocaleLowerCase('tr-TR')
            .replace(/\u011f/g, 'g').replace(/\u00fc/g, 'u').replace(/\u015f/g, 's')
            .replace(/\u0131/g, 'i').replace(/\u00f6/g, 'o').replace(/\u00e7/g, 'c');
    }
    function el(tag, className, text) {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text !== undefined) e.textContent = text;
        return e;
    }

    /* Veri değerini görüntülenecek dile çevir (EN'de sözlükten; bulunamazsa Türkçe haliyle) */
    const DICT_KEY = { country: 'countries', faculty: 'faculties', department: 'departments' };
    function tCondition(s) {
        let out = (TERMS.phrases && TERMS.phrases[s]) || s;
        Object.keys(TERMS.languages || {}).forEach(function (k) { out = out.split(k).join(TERMS.languages[k]); });
        return out;
    }
    function show(kind, v) {
        if (v === undefined || v === null || v === '') return v;
        if (kind === 'type') return STR.types[v] || v;
        if (LANG !== 'en') return v;
        if (kind === 'condition') return tCondition(v);
        const dict = TERMS[DICT_KEY[kind]];
        return (dict && dict[v]) || v;
    }

    /* Yayımlanan CSV verileri TR ve EN değerlerini birlikte taşıyabilir.
       Eski records için sözlük tabanlı gösterim korunur. */
    function translated(kind, record) {
        const value = record[kind];
        const english = record[kind + 'En'];
        if (LANG === 'en' && english !== undefined && english !== null && english !== '') return english;
        return show(kind, value);
    }

    /* ---------- MODLAR (sekmeler) ---------- */
    const MODES = {
        student: {
            hash: 'ogrenci',
            rows: function () { return window.FBU_PARTNERS || []; },
            cols: '130px minmax(220px, 1.5fr) minmax(200px, 1fr) 100px 140px',
            columns: ['country', 'institution', 'facultyDept', 'quota', 'condition'],
            filters: [
                { field: 'faculty', kind: 'faculty' },
                { field: 'department', kind: 'department', parent: 'faculty' },
                { field: 'country', kind: 'country' }
            ],
            searchFields: ['institution', 'country', 'faculty', 'department', 'code']
        },
        staff: {
            hash: 'personel',
            rows: function () { return window.FBU_PARTNERS_STAFF || []; },
            cols: '110px minmax(205px, 1.4fr) minmax(145px, 1fr) 135px 130px 140px',
            columns: ['country', 'institution', 'dept', 'type', 'quota', 'condition'],
            filters: [
                { field: 'country', kind: 'country' },
                { field: 'type', kind: 'type', optional: true },
                { field: 'department', kind: 'department', optional: true }   // anlaşmada alan tanımlıysa
            ],
            searchFields: ['institution', 'country', 'faculty', 'department', 'code', 'type', 'condition']
        }
    };

    /* Sütun çizicileri */
    function makeColumns(showToast) {
        return {
            country: {
                head: STR.cols.country,
                cell: function (a) { return el('div', 'fbe-col-country', translated('country', a) || '—'); }
            },
            institution: {
                head: STR.cols.institution,
                cell: function (a) {
                    const col = el('div', 'fbe-col-inst');
                    col.appendChild(el('strong', '', a.institution));
                    if (a.code) {
                        const badge = el('button', 'fbe-code-badge', a.code);
                        badge.type = 'button';
                        badge.title = STR.copyTip;
                        badge.addEventListener('click', function () {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(a.code).then(function () {
                                    showToast(STR.copied + a.code);
                                }).catch(function () {});
                            }
                        });
                        col.appendChild(badge);
                    }
                    return col;
                }
            },
            facultyDept: {
                head: STR.cols.facultyDept,
                cell: function (a) {
                    const col = el('div', 'fbe-col-dept');
                    col.appendChild(el('span', 'fbe-faculty-tag', translated('faculty', a)));
                    col.appendChild(el('span', '', translated('department', a)));
                    return col;
                }
            },
            dept: {
                head: STR.cols.dept,
                cell: function (a) {
                    const col = el('div', 'fbe-col-dept');
                    if (a.faculty) col.appendChild(el('span', 'fbe-faculty-tag', translated('faculty', a)));
                    col.appendChild(el('span', '', a.department ? translated('department', a) : '—'));
                    return col;
                }
            },
            type: {
                head: STR.cols.type,
                cell: function (a) { return el('div', 'fbe-col-type', show('type', a.type) || '—'); }
            },
            quota: {
                head: STR.cols.quota,
                cell: function (a) {
                    const wrap = el('div');
                    const q = el('div', 'fbe-col-quota');
                    q.setAttribute('data-label', STR.quotaLabel + ' ');
                    // Personel satırlarında ders verme/eğitim alma kontenjanları birbirinden bağımsız olabilir.
                    // 0 gerçek bir değerdir; undefined/null ise bilinmeyen kontenjan anlamına gelir.
                    const isDefined = function (x) { return x !== undefined && x !== null && x !== ''; };
                    if (isDefined(a.teachingQuota) || isDefined(a.trainingQuota)) {
                        const breakdown = el('div', 'fbe-col-quota-breakdown');
                        [['teaching', a.teachingQuota], ['training', a.trainingQuota]].forEach(function (entry) {
                            if (!isDefined(entry[1])) return;
                            const line = el('div');
                            line.appendChild(document.createTextNode(STR.types[entry[0]] + ': '));
                            line.appendChild(el('b', '', String(entry[1])));
                            breakdown.appendChild(line);
                        });
                        wrap.appendChild(breakdown);
                    } else if (isDefined(a.quota)) {
                        q.appendChild(document.createTextNode(String(a.quota) + ' '));
                        q.appendChild(el('span', '', STR.persons));
                        wrap.appendChild(q);
                    } else {
                        wrap.textContent = '—';
                    }
                    return wrap;
                }
            },
            condition: {
                head: STR.cols.condition,
                cell: function (a) {
                    const wrap = el('div');
                    wrap.appendChild(el('div', 'fbe-col-cond', translated('condition', a) || '—'));
                    return wrap;
                }
            }
        };
    }

    /* ---------- ANA ÇALIŞMA ---------- */
    function run() {
        const rootEl = document.getElementById('fbeRoot');
        const tabsEl = document.getElementById('fbeTabs');
        const filtersEl = document.getElementById('fbeFilters');
        const headerEl = document.getElementById('fbeHeader');
        const listEl = document.getElementById('fbeList');
        const searchEl = document.getElementById('fbeSearch');
        const emptyEl = document.getElementById('fbeEmpty');
        const toastEl = document.getElementById('fbeToast');
        const contextEl = document.getElementById('fbeContext');
        const toolbarEl = rootEl.querySelector('.fbe-toolbar');
        if (!rootEl || !listEl || !tabsEl || !filtersEl || !headerEl || !searchEl || !emptyEl) return;

        searchEl.placeholder = STR.search;
        emptyEl.textContent = STR.empty;

        let toastTimer = null;
        function showToast(msg) {
            if (!toastEl) return;
            toastEl.textContent = msg;
            toastEl.className = 'fbe-toast fbe-toast-show';
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { toastEl.className = 'fbe-toast'; }, 1500);
        }
        const COLUMNS = makeColumns(showToast);

        // Her iki sekme de görünür. Personel listesi boş olsa bile boş durum gösterilir.
        const available = ['student', 'staff'];

        let mode = null;       // aktif mod adı
        let rows = [];         // aktif modun verisi
        let selects = {};      // field -> <select>
        let activeFilters = [];

        /* ---- Sekmeler ---- */
        function buildTabs() {
            tabsEl.textContent = '';
            available.forEach(function (m) {
                const b = el('button', 'fbe-tab', STR.tabs[m]);
                b.type = 'button';
                b.setAttribute('role', 'tab');
                b.setAttribute('aria-controls', 'fbeList');
                b.dataset.mode = m;
                b.addEventListener('click', function () {
                    // Hash doğrudan bağlantıları ve tarayıcı geri/ileri gezinmesini korur.
                    if (location.hash.replace('#', '') === MODES[m].hash) setMode(m);
                    else location.hash = MODES[m].hash;
                });
                b.addEventListener('keydown', function (event) {
                    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
                    event.preventDefault();
                    const pos = available.indexOf(m);
                    const next = event.key === 'Home' ? 0 : event.key === 'End' ? available.length - 1
                        : (pos + (event.key === 'ArrowRight' ? 1 : -1) + available.length) % available.length;
                    const nextButton = tabsEl.querySelector('[data-mode="' + available[next] + '"]');
                    if (nextButton) { nextButton.focus(); nextButton.click(); }
                });
                tabsEl.appendChild(b);
            });
        }
        function markTab() {
            Array.prototype.forEach.call(tabsEl.children, function (b) {
                const on = b.dataset.mode === mode;
                b.classList.toggle('fbe-tab-active', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
                b.tabIndex = on ? 0 : -1;
            });
        }
        function modeFromHash() {
            const h = location.hash.replace('#', '');
            return available.filter(function (m) { return MODES[m].hash === h; })[0] || available[0];
        }

        /* ---- Filtreler ---- */
        function displayOption(kind, value) {
            const entry = rows.find(function (r) { return r[kind] === value; });
            return entry ? translated(kind, entry) : show(kind, value);
        }
        function sortedUnique(values, kind) {
            const uniq = Array.from(new Set(values.filter(function (v) { return v !== undefined && v !== null && v !== ''; })));
            return uniq.sort(function (a, b) { return String(displayOption(kind, a)).localeCompare(String(displayOption(kind, b)), STR.locale); });
        }
        function optionsFor(f) {
            let pool = rows;
            if (f.parent && selects[f.parent] && selects[f.parent].value !== 'all') {
                const pv = selects[f.parent].value;
                pool = rows.filter(function (a) { return a[f.parent] === pv; });
            }
            if (f.field === 'type') {
                // 'both' satırı hem ders verme hem de eğitim alma filtrelerinde görünür.
                return ['teaching', 'training'].filter(function (t) {
                    return pool.some(function (a) { return a.type === t || a.type === 'both'; });
                });
            }
            return sortedUnique(pool.map(function (a) { return a[f.field]; }), f.kind);
        }
        function fillSelect(f) {
            const sel = selects[f.field];
            const keep = sel.value;
            sel.textContent = '';
            const all = el('option', '', STR.all[f.kind]);
            all.value = 'all';
            sel.appendChild(all);
            const opts = optionsFor(f);
            opts.forEach(function (v) {
                const o = el('option', '', displayOption(f.kind, v));
                o.value = v;
                sel.appendChild(o);
            });
            sel.value = opts.indexOf(keep) !== -1 ? keep : 'all';
        }
        function buildFilters() {
            filtersEl.textContent = '';
            selects = {};
            activeFilters = MODES[mode].filters.filter(function (f) {
                return !f.optional || rows.some(function (a) { return f.field === 'type' ? ['teaching', 'training', 'both'].includes(a.type) : Boolean(a[f.field]); });
            });
            activeFilters.forEach(function (f) {
                const wrap = el('div', 'fbe-select-wrapper');
                const sel = el('select');
                sel.setAttribute('aria-label', STR.all[f.kind]);
                selects[f.field] = sel;
                wrap.appendChild(sel);
                filtersEl.appendChild(wrap);
                sel.addEventListener('change', function () {
                    // bu filtreye bağlı (parent) filtreleri yenile
                    activeFilters.forEach(function (g) { if (g.parent === f.field) fillSelect(g); });
                    render();
                });
            });
            activeFilters.forEach(fillSelect);
        }

        /* ---- Başlık satırı ---- */
        function buildHeader() {
            headerEl.textContent = '';
            MODES[mode].columns.forEach(function (c) { headerEl.appendChild(el('div', '', COLUMNS[c].head)); });
            rootEl.style.setProperty('--fbe-cols', MODES[mode].cols);
        }

        /* ---- Liste ---- */
        function buildRow(a) {
            const row = el('div', 'fbe-row fbe-grid');
            row.dataset.mode = mode;
            MODES[mode].columns.forEach(function (c) {
                const cell = COLUMNS[c].cell(a);
                if (mode !== 'staff') { row.appendChild(cell); return; }
                const wrapper = el('div', 'fbe-mobile-cell');
                wrapper.appendChild(el('span', 'fbe-mobile-label', COLUMNS[c].head));
                wrapper.appendChild(cell);
                row.appendChild(wrapper);
            });
            return row;
        }
        function haystack(a) {
            const parts = [];
            MODES[mode].searchFields.forEach(function (k) {
                if (!a[k]) return;
                parts.push(a[k]);
                const kind = k === 'faculty' || k === 'department' || k === 'country' || k === 'type' ? k : null;
                if (kind) parts.push(translated(kind, a));
                if (a[k + 'En']) parts.push(a[k + 'En']);   // hem Türkçe hem İngilizce karşılığında aranabilsin
            });
            return toSearchable(parts.join(' '));
        }
        function render() {
            const q = toSearchable(searchEl.value.trim());
            const filtered = rows.filter(function (a) {
                for (let i = 0; i < activeFilters.length; i++) {
                    const f = activeFilters[i];
                    const v = selects[f.field].value;
                    if (v !== 'all' && a[f.field] !== v && !(f.field === 'type' && a.type === 'both')) return false;
                }
                return !q || haystack(a).indexOf(q) !== -1;
            });
            emptyEl.style.display = filtered.length ? 'none' : 'block';
            if (!rows.length) {
                emptyEl.textContent = '';
                emptyEl.appendChild(el('strong', '', mode === 'staff' ? STR.staffEmptyTitle : STR.studentEmptyText));
                if (mode === 'staff') {
                    emptyEl.appendChild(el('p', '', STR.staffEmptyText));
                    const contact = el('a', '', STR.contact);
                    contact.href = 'mailto:erasmus@fbu.edu.tr';
                    emptyEl.appendChild(contact);
                }
            } else {
                emptyEl.textContent = STR.empty;
            }
            listEl.textContent = '';
            const frag = document.createDocumentFragment();
            filtered.forEach(function (a) { frag.appendChild(buildRow(a)); });
            listEl.appendChild(frag);
        }

        /* ---- TR/EN geçişlerinde mevcut sekmeyi koru ---- */
        function preserveTabOnLanguageSwitch() {
            const hash = '#' + MODES[mode].hash;
            document.querySelectorAll('.lang-switch a[href]').forEach(function (link) {
                const href = link.getAttribute('href');
                link.setAttribute('href', href.split('#')[0] + hash);
            });
        }

        /* ---- Mod değiştir ---- */
        function setMode(m) {
            mode = m;
            rows = MODES[m].rows();
            searchEl.value = '';
            searchEl.placeholder = m === 'staff' ? STR.staffSearch : STR.search;
            if (contextEl) {
                contextEl.textContent = m === 'staff' ? STR.staffNote : '';
                contextEl.hidden = m !== 'staff';
            }
            toolbarEl.hidden = rows.length === 0;
            headerEl.hidden = rows.length === 0;
            buildFilters();
            buildHeader();
            markTab();
            preserveTabOnLanguageSwitch();
            render();
        }

        searchEl.addEventListener('input', render);
        window.addEventListener('hashchange', function () { setMode(modeFromHash()); });
        buildTabs();
        setMode(modeFromHash());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    } catch (err) {
        console.error('FBE Widget hatası:', err);
    }
})();
