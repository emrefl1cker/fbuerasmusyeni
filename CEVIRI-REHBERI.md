# English website — translation status (23 October 2026)

## Completed and enabled (16 pages)

- en/index.html
- en/akran-danismanligi.html
- en/aktsnotdonusum.html
- en/degisim-komisyonu.html
- en/duyurular-haberler.html
- en/gelen-ogrenci.html
- en/gelen-personel.html
- en/icerme-destegi.html
- en/ogrenci-ogrenim.html
- en/ogrenci-staj.html
- en/partner-kurumlar.html
- en/personel-dersverme.html
- en/personel-egitimalma.html

Each completed page has an English `<title>` and visible English text, and is listed in `EN_READY` in `components.js`. The page-specific `noindex` tag has been removed. Shared menus, footer, data widgets, announcements and news already support English. No changes were made to the Turkish source pages.

## Three document pages enabled (TR / EN)

- `fbu-eche-belgesi.html` / `en/fbu-eche-belgesi.html`
- `fbu-politika-beyani.html` / `en/fbu-politika-beyani.html`
- `ogrenci-beyannamesi.html` / `en/ogrenci-beyannamesi.html`

All English pages now appear in `EN_READY`, and the translated page content and embedded PDFs have been checked. These three English pages no longer contain `noindex`.

## PDF file inventory (`assets/docs/`)

| Document | Turkish PDF | English PDF |
|---|---|---|
| Erasmus Charter for Higher Education (ECHE) | `fbu-erasmus-charter-2021-2027-tr.pdf` | `fbu-erasmus-charter-2021-2027-en.pdf` |
| Erasmus Student Charter | `erasmus-student-charter-2021-2027-tr.pdf` | `erasmus-student-charter-2021-2027-en.pdf` |
| FBU Erasmus Policy Statement (EPS) | **Not supplied / not available** | `fbu-erasmus-policy-statement-2021-2027-en.pdf` |

**Important:** The *previously linked* PDF on the Turkish EPS page was in English and renders identically to the newly supplied English EPS PDF. Do not relabel an English scan as a Turkish translation. The Turkish EPS webpage provides a Turkish summary of objectives and explicitly marks the linked document as English. Five official PDF files are retained in `assets/docs/`; the old root-level PDFs have been removed after paths were updated.

### Source basis for the EPS summary

The four scanned pages of the supplied EPS (printed pages 7–10) address international mobility, partnerships, capacity strengthening, transparent and inclusive procedures, language learning, digital transformation, environmental considerations and monitoring. The rewritten Turkish and English webpages summarise these themes; they do **not** modify or purport to translate the formal signed document.

## Items for the editorial/office review

1. Verify Erasmus+ funding figures, selection criteria and deadlines against the current project-year call documents. The English translation preserves source values; it does not independently verify them.
2. Review official English names of faculties, departments and positions in `data/terms-en.js`.
3. English banner created at `assets/img/partner-logos-en.png` and linked in `en/index.html`; confirm that the funder acknowledgement wording and logo composition are approved by the institution.
4. Announcements have placeholder `#` links; incoming student academic calendar, course catalogues and residence-permit guide require actual resources.
5. Staff partnership dataset (`data/partners-staff.js`) is currently empty; add records when available.

## Site structure

- Root directory: Turkish content.
- `en/`: English pages with the same filenames.
- `components.js`: shared menu/footer, language selector, and `EN_READY` publishing list.
- `data/terms-en.js`: translations for partner and grade-conversion data.
- `data/duyurular.js`: bilingual announcement and news fields.

All 16 English HTML pages are now listed in `EN_READY`. For future pages, add their HTML filenames to that list and review any attached materials before publication.
