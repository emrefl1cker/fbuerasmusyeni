# Personel Hareketliliği – Partner Kurumlar Veri Giriş Rehberi

Bu sürümde **Personel Hareketliliği** sekmesi Türkçe ve İngilizce sayfalarda aktiftir. Ancak yüklenen proje dosyasında gerçek personel anlaşması kaydı bulunmadığından **hiçbir üniversite uydurulmamış veya öğrenci listesinden kopyalanmamıştır**. Kayıtlar `data/partners-staff.js` dosyasına eklenir.

## Gerekli bilgiler

- **Ülke**, **kurumun resmî adı**, **Erasmus kodu** (varsa)
- **Hareketlilik türü**: `teaching` (Ders Verme), `training` (Eğitim Alma), `both` (ikisi)
- **Kapsam**: Fakülte / bölüm / tüm alanlar (biliniyorsa)
- **Kontenjan**: Ders verme ve eğitim alma ayrı belirlenmişse `teachingQuota` ve `trainingQuota` (sayı). Sadece tek birleşik kontenjan verildiyse `quota`.
- **Dil şartı**: Belirtilmişse `condition`

## Kayıt ekleme biçimi (temsili; dosyaya ekli değildir)

```javascript
{
  country: "Polonya",
  code: "PL ORNEK00",
  institution: "ÖRNEK — RESMÎ KURUM ADI",
  department: "Tüm Alanlar",
  type: "both",
  teachingQuota: 2,
  trainingQuota: 1,
  condition: "B2 İngilizce"
}
```

**Uyarı:** Yukarıdaki satır tamamen şematiktir ve gerçek anlaşma değildir. Gerçek kurum bilgileri gelmeden listeyi doldurmayın. Bilinmeyen alanları atlayın; `0` girilmesi, **sıfır** kontenjan bulunduğunu ifade eder.

## Uygulama notları

1. Liste girişinde yalnızca `data/partners-staff.js` değiştirmeniz yeterli; TR/EN aynı kaydı kullanır.
2. `type: "both"` olan satırlar hem **Ders Verme** hem **Eğitim Alma** filtrelerinde çıkar.
3. Öğrenci anlaşmaları `data/partners.js` içinde kalır; birbirini etkilemez.
4. Yeni ülke, fakülte, bölüm/alan adı varsa `data/terms-en.js` sözlüğüne İngilizcesini ekleyin.
5. İki sayfanın bağlantıları: `partner-kurumlar.html#personel` ve `en/partner-kurumlar.html#personel`.
6. Eğitim Alma hareketliliğinde kurumlararası anlaşma zorunluluğu bulunmadığı için listeye girmeyen kurumlar da uygun olabilir; ilan ve kabul koşulları ayrıca değerlendirilir.
