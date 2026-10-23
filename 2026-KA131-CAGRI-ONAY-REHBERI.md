# 2026 KA131 / 2027–2028 Güz — Yayın Onayı ve Kullanım Rehberi

Bu sürüm, 23 Ekim 2026 tarihinde iletilen iki beş sayfalık öğrenim hareketliliği çağrı PDF'si esas alınarak hazırlanmıştır. **Kaynak metinlerin kendi aralarındaki uyuşmazlıklar, doğrulanmış kabul edilmedi.** Güncellenmiş Türkçe ve İngilizce içerikler değerlendirme amaçlı bir ilk sürümdür.

## 1. Yapılan içerik ayrımı

**Öğrenci Öğrenim Hareketliliği (TR/EN):** Uygunluk şartları, TurnaPortal/QR transkript başvurusu, seçim puanlaması, 2026 KA131 kaynaklı hibe ve seyahat tutarları, hareketlilik yol rehberi ve anlaşmalı kurum bağlantıları. Genel rehberdeki 2026 tablosu, _kaynak çağrı yılı_ açıkça belirtilerek sunulmaktadır; evrensel veya değişmez tutar olarak gösterilmemektedir.

**Çağrı detay sayfası (TR/EN):** 2026-1-TR01-KA131-HED-000410628 proje kodu, 2027–2028 akademik yılı güz dönemi, 1. çağrı, kaynaklarda belirtilen 10 hibeli kontenjan, fakülte önceliklendirmesi, başvuru/değerlendirme takvimi. Dil sınavı listeleri ve sonuçlar sonradan aynı ilanın süreç çizelgesine eklenebilir.

**Önceki ilanlar:** 7 ilan kaydı aynen korunmuştur. Yeni kayıt eklenmiştir, `draft: true` olduğundan normal liste ve ana sayfada görünmez.

## 2. Yayın öncesinde çözülmesi gerekenler

1. **Son başvuru tarihi:** Türkçe PDF (s. 2) 17 Kasım 2026 Salı, İngilizce PDF (s. 2) 18 Kasım 2026 yazmaktadır. Hangisi resmî son tarih? İlan kaydındaki `deadline` alanı bu nedenle boş bırakılmıştır.
2. **Nihai sonuç tarihi:** İki dosyada da 18 Ocak **2026** yazmaktadır. Bu tarih, Kasım–Aralık 2026 başvuru/değerlendirme takviminden öncedir. **18 Ocak 2027** olabileceği düşünülse de, teyit edilmeden sisteme yerleştirilmedi.
3. **Çağrı numarası ve kontenjan:** Başlıkta "1. çağrı" yazılıyken anlaşmalı kurumlar bölümünde "birinci çağrıda kontenjanı dolan kurumlar bu çağrıda tercih edilemez" ifadesi yer alıyor. Bu muhtemelen geçmiş çağrıdan kalan bir maddedir, doğrulanmalı.
4. **Hazırlık ve birinci sınıf:** Türkçe PDF (s. 1) hazırlık ve birinci sınıfların belirli not şartıyla başvurabileceğini söylüyor; eski site rehberi hazırlık öğrencilerinin başvuramayacağını ve en az bir dönem öğrenim görme şartını belirtiyordu. İngilizce PDF ise ayrıca en az bir dönem eğitim görme şartını içeriyor. Rehber, kesin hüküm vermeden çağrı koşuluna yönlendirecek şekilde düzenlendi.
5. **Lisansüstü CGPA İngilizce baskı hatası:** İngilizce PDF'de lisansüstü başlığı altında "2.50 at associate and undergraduate level" yazılmış. Türkçe metin ve başlık lisansüstü düzeyi gösteriyor. Rehberde 2.50 lisansüstü olarak kullanıldı.
6. **Yeşil seyahat için ayrı 50 € ifadesi:** Türkçe ve İngilizce PDF'de ayrıntılı mesafe-bandı seyahat hibeleri yanında ayrıca 50 € tek seferlik desteğe ilişkin bir ifade bulunuyor. Bunun mesafe-bandı uygulamasıyla ilişkisi teyit edilmeden güncel genel rehbere ayrı bir hak olarak eklenmedi.
7. **İlanın yayımlandığı tarih:** Paylaşılan PDF'lerde doğrulanabilir ilan yayımlama tarihi tespit edilmediği için taslakta `posted` boş bırakıldı. Başvuru başlangıcı 2 Kasım 2026 ayrı alanda kayıtlıdır.

Ek kontrol: İngilizce PDF, 18 Kasım 2026 gününü "Tuesday" olarak yazıyor; takvim günü Çarşamba'dır. İtiraz aralığı 28–29 Aralık 2026 olarak yer alır.

## 3. Taslak önizlemesi

Site klasöründe aşağıdaki bağlantıları açabilirsiniz:

- Türkçe: `ilan.html?id=2026-ka131-2027-2028-guz-ogrenim-cagri-1&preview=1`
- English: `en/ilan.html?id=2026-ka131-2027-2028-guz-ogrenim-cagri-1&preview=1`

`draft: true` ilanları normal duyuru listesinde ve ana sayfada gizler. **Bu bir erişim kontrolü değildir:** veri dosyası siteye yüklenirse teknik olarak kaynak dosyası ve tahmin edilebilir önizleme bağlantısı üzerinden incelenebilir. Henüz yayımlanması istenmeyen hassas veriler bu veri dosyasına eklenmemelidir.

## 4. Yayımlama adımları

1. Yerel Duyuru Yönetimini (`duyuru-yonetimi.html`) açın ve bu ZIP içindeki `data/ilanlar.js` dosyasını içeri alın.
2. Taslak ilanı seçin ve son başvuru tarihini, gerçek yayım tarihini, kesin nihai değerlendirme tarihini doğrulayarak ilgili alanlara girin.
3. `Son başvuru açıklaması (TR/EN)` ve `Nihai tarih açıklaması (TR/EN)` alanlarındaki doğrulama uyarılarını temizleyin. Gerekli tüm tarih farklarını asıl PDF/metin düzeyinde de düzelttiğinizden emin olun.
4. `Taslak` seçimini kaldırın, kaydedin, **ilanlar.js indir** ile oluşturulan dosyayı `data/ilanlar.js` konumuna yerleştirin.
5. Yalnızca duyurulmuş sonuç aşamalarını ekleyin. Bu sürümde geçmişe dönük yayımlanma tarihleri uydurulmadı.
6. Uygulama web sunucusundayken hem TR hem EN sürümünü ve mobil görünümü ayrıca kontrol edin.

## 5. Kaynaklar

İki orijinal PDF, değiştirilmeksizin şu klasörde saklandı:
`assets/docs/ilanlar/2026-ka131-2027-2028-guz/`

- `ogrenim-ilani-kaynak-tr.pdf`
- `ogrenim-ilani-kaynak-en.pdf`

Orijinal çağrı belgeleri sadece taslak önizleme ekranındaki iç kontrol bölümü üzerinden bağlantılandırılır. Bu dosyalar, ilgili çağrı koşullarının belgelenmesi için saklanır; güncel kural veya doğrulanmış tarih anlamına gelmez.
