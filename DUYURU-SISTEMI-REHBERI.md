# Duyuru ve İlan Takip Sistemi — FBU

## Genel mimari

- `duyurular-haberler.html` ve `en/duyurular-haberler.html`: **Tüm ilanlar, başvurusu açık, değerlendirmede/kapalı, tamamlananlar** filtreleri; öğrenci/personel, program, hareketlilik türü, akademik yıl ve metin araması; 8 kayıtlık sayfalar; ayrı Haberler sekmesi.
- `ilan.html?id=<ilan-id>` ve `en/ilan.html?id=<ilan-id>`: her ilana ait tek detay adresi; ilk ilan, dil sınavı, ön değerlendirme, nihai sonuç, itiraz/düzeltme ve ek duyurular tek bir zaman çizelgesinde.
- `data/ilanlar.js`: Türkçe ve İngilizceyi birlikte besleyen **tek ilan veri dosyası**. `data/duyurular.js` yalnızca **haber** verisi tutar.
- `announcements.js` ve `announcement.css`: duyuru arayüzü ve sayfalama.
- Anasayfa: sadece başvurusu açık veya açıkça 'değerlendirmede' işaretli güncel ilanlar. Tamamlanan veya yalnızca son başvuru süresi dolanlar arşivde korunur.

## Veri güncelleme — siz yapabilirsiniz

1. Ayrı teslim edilen yerel duyuru yöneticisini açın: `duyuru-yonetimi.html`.
2. **İlanlar dosyasını yükle** alanından web sitesinin `data/ilanlar.js` dosyasını seçin. Eski ilanları düzenleyin veya yeni ilan oluşturun.
3. Türkçe ve İngilizce başlıkları yazın; bölüm ve sonuç aşamalarını *ayrı tarihli adımlar* olarak ekleyin. Örneğin *Başvuru ilanı*, *Dil sınavına girecek öğrencilerin listesi*, *Ön değerlendirme sonuçları*, *Nihai değerlendirme sonuçları*. Personel için gereksiz aşamalar kullanılmaz.
4. Maskeli sonuç PDF'lerini `assets/docs/ilanlar/<ilan-kimligi>/` altına yükleyin. Yönetim aracına göreli yollarını girin. Örnek: `assets/docs/ilanlar/2025-ka131-ogrenim/nihai-sonuclar.pdf`. Bir aşamaya birden çok belge bağlanabilir.
5. Kaydet → **Site için ilanlar.js indir** → sunucudaki `data/ilanlar.js` dosyasının üzerine yükleyin. Her iki dil otomatik güncellenir. Dosya üretimi/indirimi yerel yapılır; sunucuyla otomatik senkronizasyon yoktur.
6. JSON yedeği de alın. İlan kimliğini yayımlandıktan sonra değiştirmeyin; kalıcı bağlantı bu ID'ye bağlıdır.

## Durumlar

- `auto`: Son başvuru tarihi gelmediyse **Başvurular Açık**, geçtiyse **Başvurular Kapandı**. **Otomatik tamamlandı diye etiketlenmez.**
- `evaluation`: **Değerlendirme Sürüyor**.
- `completed`: **Tamamlandı**. Sadece süreç gerçekten sonlandığında seçin.

## Kaynak veri ve doğrulama

Önceki sitedeki **7 mevcut ilan kaydı** yeni biçime aktarılmıştır; başlık ve tarihler saklanmıştır. Bu kayıtlarda henüz özgün ilan metinleri, sonuç dosyaları veya doğrulanmış süreç durumları olmadığı için **uydurma belge ya da sonuç eklenmemiştir**. Önceki kayıtların gerçek yayımlanmış ilanlarla tutarlılığını yayın öncesinde ofis içinde kontrol edin. Haberlerdeki mevcut **3 kayıt** korunmuştur.

Yeni ilanları yönetirken kişisel veri içeren sonuç dosyalarını kurumunuzun yayımlama kontrollerinden geçirmeye devam edin. Araç PDF içeriğini değiştirmez, maskelemez veya internetten çekmez.

## Hızlı test

- `duyurular-haberler.html` → kayıtlar görüntülenir; arama ve filtreler çalışır.
- 8'den fazla ilan eklendiğinde sayfa numaraları otomatik oluşur.
- `ilan.html?id=<kimlik>` → her aşama yayımlanma tarihine göre sıralanır.
- Dil değişimi aynı ilanın `en/ilan.html?id=<kimlik>` bağlantısını açar.
- Haberler ana sayfada korunur; haber arşivine `duyurular-haberler.html?tab=news` ile geçilir.
