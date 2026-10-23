# Gelen Öğrenci — fakülte bazlı İngilizce ders kataloğu yönetimi

Gelen Öğrenci sayfaları (`gelen-ogrenci.html` ve `en/gelen-ogrenci.html`) altı sekmeli yapıya dönüştürüldü. Giden öğrenci ve personel rehberleriyle aynı dikey menü ve içerik tasarımını kullanır.

## Ders kataloglarını nasıl yayımlarım?

1. Fakültenin **İngilizce olarak verilen derslerini** içeren Excel dosyasını hazırlayın (`.xlsx`). Dosyalar henüz bu pakette **yoktur**; boş/örnek dersler yayımlanmaz.
2. Dosyayı `assets/course-catalogs/` içine koyun. Dosya adı aşağıdaki listede belirtilen adla **birebir aynı** olmalıdır.
3. Web sitesinde gelen öğrenci sayfası yüklendiğinde sistem dosyanın mevcut olup olmadığını kontrol eder. Dosya varsa **Excel indir** bağlantısı otomatik görünür; yoksa **Hazırlanıyor** yazar.
4. Türkçe/İngilizce iki sayfa aynı Excel dosyasını kullanır; ikinci kopyaya gerek yoktur. İleride listeyi yenilemek için aynı isimli dosyanın üzerine yeni Excel'i koymanız yeterlidir.

| Fakülte | Yüklenecek dosya |
| --- | --- |
| İktisadi, İdari ve Sosyal Bilimler Fakültesi | `fbu-economics-administrative-social-sciences-english-courses.xlsx` |
| İletişim Fakültesi | `fbu-communication-english-courses.xlsx` |
| Mimarlık ve Tasarım Fakültesi | `fbu-architecture-design-english-courses.xlsx` |
| Mühendislik ve Doğa Bilimleri Fakültesi | `fbu-engineering-natural-sciences-english-courses.xlsx` |
| Sağlık Bilimleri Fakültesi | `fbu-health-sciences-english-courses.xlsx` |
| Spor Bilimleri Fakültesi | `fbu-sport-sciences-english-courses.xlsx` |
| Eczacılık Fakültesi | `fbu-pharmacy-english-courses.xlsx` |

Site dışında farklı bir barındırma kullanılıyorsa `HEAD` isteklerinin statik dosyalar için açık olması gerekir (çoğu standart statik barındırmada desteklenir). Yerel `file://` önizlemede güvenlik kısıtları nedeniyle indirme düğmesi görünmeyebilir; `python -m http.server 8000` gibi bir yerel HTTP sunucusuyla veya gerçek sunucuda kontrol edin.

**Önemli:** Bu mekanizma Excel'in içeriğini kendisi çevirmiyor veya derslerin eğitim dilini doğrulamıyor. Yayımladığınız dosyanın yalnızca ilgili fakültede İngilizce sunulan dersleri içermesi gerekiyor. Excel eklemeyene kadar "Hazırlanıyor" görünmesi bilinçli.

## Sayfadaki sabit bağlantılar

- Lisans düzeyi Akademik Bilgi Paketi: https://ois.fbu.edu.tr/bilgipaketi/eobsakts/akademik/tip/L/menu_id/3_17/ln/en
- Akademik Takvim: https://www.fbu.edu.tr/en/academic-calendar

**İkamet izni:** Uzun mevzuat özeti yerine Uluslararası İlişkiler Daire Başkanlığının üniversiteye gelen öğrencilere bilgi ve rehberlik sağlayacağı ifadesi yerleştirildi.

**Eski tarih ve genel bilgiler:** Önceki Gelen Öğrenci sayfasında yer alan güz/bahar adaylık ve başvuru tarihleri korunmuştur. Güncelliğini ofis içinde teyit ediniz.

**Fakülte dışındaki birimler:** Kullanıcı talebine uygun olarak 7 fakülteye ayrı kart açılmıştır. Sağlık Hizmetleri Meslek Yüksekokulu ya da lisansüstü birimler için ayrı katalog eklenecekse `data/incoming-course-catalogs.js` dosyasına bir satır eklenebilir.
