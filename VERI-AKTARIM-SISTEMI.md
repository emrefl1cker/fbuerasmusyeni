# Fenerbahçe Üniversitesi — Partner Kurumlar veri aktarım sistemi

Bu sürümde **öğrenci ve personel anlaşmaları tek bir yayımlanabilir veri dosyasıyla** güncellenir. Ana sayfa değiştirilmedi. Mevcut anlaşmalar `data/partners.js` ve `data/partners-staff.js` içinde durur; `data/agreements-public.js` dosyası doluysa onların yerine geçer.

## Her güncellemede yapılacaklar

1. Yerel araç paketindeki `veri-yonetimi.html` dosyasını bilgisayarında aç.
2. Veritabanını `.xlsx` (Excel) veya `.csv` (UTF-8) olarak seç. Access `.accdb` ise önce Excel'e aktar.
3. Öğrenci ve personel sayıları ile kontrol mesajlarını incele. Hatalar varsa Excel'de düzeltip tekrar aç.
4. `agreements-public.js` dosyasını indir.
5. Sitenin yayınlandığı sunucuda **tek dosyayı** değiştir: `data/agreements-public.js`.
6. `partner-kurumlar.html#ogrenci`, `partner-kurumlar.html#personel` ve `en/partner-kurumlar.html` adreslerinde kontrol et. Eski önbellek varsa Ctrl+F5 ile yenile.

HTML dosyalarını, öğrenci/personel `partners*.js` dosyalarını veya İngilizce sözlüğü **her güncellemede düzenlemene gerek yoktur**. Veri dönüştürücü yerel araçtır; **siteye veya herkese açık alana yükleme**. Yalnızca ürettiği `agreements-public.js` dosyasını yayınla.

## Kaynak Excel/CSV sütunları

**Kullanılanlar:** `Country`, `Erasmus Code`, `Institution`, `Hareketlilik Türü`, `Quota`, `Department`, `Bölüm`, `Faculty`, `Fakülte`, `Special Condition`.

**Kullanılmayanlar — çıktı dosyasına kopyalanmaz:** `E-mail`, `Paper-based`, `ISCED`, `Level of Study`, `Date of Signature`.

**İsteğe bağlı ek çeviri sütunları:** `Country TR` (ülke yeni ve sözlükte yoksa), `Special Condition TR` (özel koşul otomatik çevrilemeyen serbest metinse). Diğer sütunlar göz ardı edilir.

- `Country` İngilizce; Türkçesi mevcut ülke sözlüğünden türetilir. Tanınmayan ülkede `Country TR` istenir.
- `Faculty` ve `Department` İngilizce, `Fakülte` ve `Bölüm` Türkçedir. Bir taraf eksikse bilinen sözlük değerleri kullanılır; ikisi de bulunamıyorsa aktarım engellenir.
- `Special Condition` İngilizce girilir. Örn. `B2 English` ifadesi `B2 İngilizce` olarak çevrilir. Serbest metinler için yanlış çeviri üretmek yerine `Special Condition TR` istenir.
- `Hareketlilik Türü` sütunu `Student` ise öğrenci sekmesine, `Staff` ise personel sekmesine aktarılır. Açıkça `Staff Teaching`/`STA` veya `Staff Training`/`STT` denmişse ilgili personel türü gösterilir. Yalnızca `Staff` yazıyorsa ders verme/eğitim alma türü **tahmin edilmez**; `Personel Hareketliliği` olarak gösterilir.
- `Quota` boşsa belirsizdir ve `—` gösterilir. `0` sıfırdır. Her anlaşma satırı ayrı tutulur.

## Güvenlik ve doğruluk

Araç tamamen tarayıcı içinde çalışır; veritabanını ağ üzerinden gönderen herhangi bir yükleme isteği yapmaz. Excel/CSV, diskteki kaynak dosyasının yanında kalır ve tarayıcıda yalnızca önizleme için okunur. Çıktı alanları **izin verilen alan listesinden** tek tek oluşturulur, kaynak satırın tamamı kopyalanmaz. Bu, e-posta ve diğer iç kayıt alanlarının kamuya açık sitenin JS dosyasına girmesini önler.

Araç bilerek boş sunulur; **hiçbir kullanıcı veri satırı eklenmedi**. İlk aktarım yapılana kadar eski öğrenci listesi korunur ve personel listesi boştur.

Bu sistem otomatik **dönüştürme ve iki dilde yayımlama** sağlar; ancak statik sitenin barındırıldığı sunucuya dosyayı bir kez manuel koymak gerekir. Sunucuya otomatik yazma isteyen kurumlarda ayrıca yetkili ve kimlik doğrulamalı sunucu uygulaması gerekir.
