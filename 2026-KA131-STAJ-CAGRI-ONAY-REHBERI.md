# 2026 KA131 – 2026–2027 Öğrenci Staj Hareketliliği / Yayın Kontrolü

Bu sürüm, 20.10.2026 tarihli Türkçe ve İngilizce 5 sayfalık staj ilanlarından hazırlanmıştır. Kaynak PDF'ler değiştirilmedi. Öğrenim hareketliliği rehberinde uygulanan ayrım staja da uygulandı.

## İçerik mimarisi

- `ogrenci-staj.html` ve `en/ogrenci-staj.html`: Kalıcı staj rehberi, uygunluk, belge/kabul mektubu, değerlendirme, 2026 proje yılı belirtilmiş hibe ve seyahat tablosu, süreç, staj yeri arama.
- `ilan.html?id=2026-ka131-2026-2027-staj-cagri-1&preview=1` ve `en/ilan.html?id=2026-ka131-2026-2027-staj-cagri-1&preview=1`: Tek çağrı, kısa açıklama, tarihli aşamalar, rehbere link, orijinal PDF'ler.
- Kaynak belgeler: `assets/docs/ilanlar/2026-ka131-2026-2027-staj/`.
- Diğer ilan kayıtları ve genel site değişmeden korunur.

## Yayın öncesinde teyit edilmesi gerekenler

1. **Kabul mektubu son teslim:** İki PDF, s. 2, **12 Şubat 2026** diyor; 9–26 Kasım 2026 başvurusu ve 25 Aralık 2026 nihai sonucundan önce. Teyit edilmeden yeni `acceptanceDeadline` tarihi girilmedi. Taslak ilan bu belirsizlik nedeniyle herkese açık listede görünmez.
2. **Yeni lisansüstü adayların transkript yılı:** Türkçe PDF s. 2 **2025–2026 güz**, İngilizce PDF s. 2 **2024–2025 güz** diyor. Rehberde önceki transkriptin verilmesi anlatıldı, uyuşmayan yıl kesin bir koşul gibi yayımlanmadı.
3. **İngilizce kopyalama hataları:** İngilizce staj PDF'si s. 1 başvuru şartlarına 'mobility for studies' diyerek başlıyor; kayıt dondurma maddesi de 'study mobility' diyor. İngilizce sitede konu doğru biçimde 'traineeship mobility' olarak ifade edildi.
4. **Kontenjan artışı:** Türkçe PDF s. 3 yalnızca **10 hibeli kontenjan** diyor; İngilizce metin ayrıca bütçe ve başvuruya göre artırılabileceğini söylüyor. Ortak sitede yalnızca doğrulanmış 10 rakamı yer alıyor.
5. **Belgelendirme ve ek hibe:** Kriterleri, puanlamayı ve 2026 hibe tutarlarını yayıma almadan yetkili birimin resmî çağrı kontrolü önerilir. Buradaki tablolar kaynak çağrı yılıyla etiketlenmiştir.

## Taslak yayına alma

Yerel `duyuru-yonetimi.html` ile `data/ilanlar.js` içeri aktarılır; çağrı seçilir. `Kabul mektubu son teslim tarihi` teyit edilir ve tarih notları silinir. `Taslak` işareti kaldırılır, `ilanlar.js` yeniden indirilir, sitenin `data/ilanlar.js` dosyası değiştirilir. Kaynak PDF düzeyindeki düzeltmeler de resmî onaya tabi tutulmalıdır.

**Güvenlik notu:** `draft: true` normal duyuru listelerinde gizleme sağlar, yetki tabanlı bir gizlilik sistemi değildir. `preview=1` bağlantıları ve veri dosyası teknik olarak erişilebilir olabilir.
