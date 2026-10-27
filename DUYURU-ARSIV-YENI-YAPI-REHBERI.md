# FBU Erasmus+ — Duyuru & Arşiv Yönetimi / 27.10.2026

Bu sürüm, Türkçe/İngilizce duyuru sitesinde iki ilan türünü destekler:

## A. Yeni format (2026 ve sonrası çağrılar)

Yerel `duyuru-yonetimi.html` aracında **Yeni format — kısa maddeli ilan + değerlendirme sonuçları** seçilir.

- Başlık, kısa özet, proje/akademik yıl, kontenjan, başvuru ve sonuç tarihleri girilir.
- **Kısa maddeler (TR)** ve **Key points (EN)** alanlarında *her satır bir madde* olur. Bu kısa maddeler `ilan.html` detayında kutucuklar içinde listelenir.
- TurnaPortal'daki ayrıntıların bağlantısı istenirse **Başvuru ve resmî ayrıntılar bağlantısı** alanına `https://turnaportal.ua.gov.tr/` girilir. Doğru resmî çağrı sayfası/derin bağlantı biliniyorsa o kullanılabilir.
- Sınav, ön değerlendirme, nihai sonuç ve ek duyurular **aynı ilan kaydına aşama** olarak eklenir; belge linkleri süreç çizelgesinde görünür.
- Eski `body` / `body_en` alanları varsa yeni formatta hâlâ okunur ve “Ek açıklamalar” olarak gösterilir. Kısaltmak istiyorsanız yönetici ekranından bunları düzenleyin; otomatik silme yapılmamıştır.

## B. Eski format (2022, 2023, 2024 projeleri)

Yerel `duyuru-yonetimi.html` aracında **Eski format — başlık + orijinal ilan ve sonuç bağlantıları** seçilir.

1. `İlan kimliği` için benzersiz, küçük harfli ve tireli bir değer kullanın: ör. `2023-ka131-ogrenim-1`.
2. Programı (KA131/KA171/Global), Öğrenci/Personel türünü, hareketliliği ve **akademik yılı** seçin.
3. Başlığı Türkçe ve İngilizce girin. İngilizce PDF bulunması şart değil; İngilizce başlık ve bağlantı etiketi yeterlidir.
4. Yayımlanma tarihi kesin olarak bilinmiyorsa boş bırakın; **Tamamlandı** durumunda, son başvuru tarihi zorunlu değildir.
5. Bağlantıları **Arşiv bağlantıları** alanına her satır aşağıdaki formatta ekleyin:

   `Orijinal ilan (TR) | Original call (Turkish) | https://...`

   `Ön değerlendirme sonuçları | Preliminary results (Turkish) | https://...`

   `Nihai sonuçlar | Final results (Turkish) | https://...`

   Eksik aşamaları yazmayın. Sadece tek bir orijinal ilan linki de yeterlidir. Türkçe ve İngilizce sitede aynı kayıt görüntülenir.
6. **Bu ilanı kaydet** > **Site için ilanlar.js indir**. Oluşan dosyayı sitenizde `data/ilanlar.js` üzerine yükleyin.

Eski ilanlarda `ilan.html` / `en/ilan.html` başlık, özet, `Tamamlandı` etiketi ve bağlantı kutularını görüntüler; yeni dönemin hibe/başvuru kriterleri eski duyuruya sonradan yansıtılmaz.

## Dosyalar ve uyumluluk

- Görüntüleme: `announcements.js`, `announcement.css`, `ilan.html`, `en/ilan.html`.
- Yönetim: Paket içindeki `duyuru-yonetimi.html` (yerel, bilgisayarda açılır).
- Veriler: `data/ilanlar.js` — hem Türkçe hem İngilizce aynı veri kaydından çalışır.
- Mevcut 10 kayıt değiştirilmedi; eski formatlı **gerçek** ilan eklenmedi çünkü URL'leri henüz sağlanmadı.
- Liste başına 8 ilan, arama ve filtreleme korunur. Eski kayıtlar `Tamamlananlar` filtresine dâhildir.
- Verilen eski bağlantılar gerçekten erişilebilir ve kalıcı olmalıdır. Eski site kapatılacaksa PDF'yi `assets/docs/ilanlar/` altına alıp bu konumu kullanın.
- `Taslak` görünümü `?preview=1` ile açılır ama bu bir erişim kontrol mekanizması değildir.
- HTML düzenleyici, CSV/Excel okuyucu değildir; `data/ilanlar.js` ya da JSON yedek alır ve JSON/JS çıktısı üretir.

### Önemli dağıtım sırası

**İlk kez:** Güncel tam site ZIP'i yayına alın. Ardından yönetim aracından alınan yeni `ilanlar.js` güncellemeleri tek başına kullanılabilir. Daha eski site sürümüne yalnızca yeni `ilanlar.js` konursa eski-format görünümü çalışmaz.
