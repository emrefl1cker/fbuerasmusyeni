/* PERSONEL HAREKETLİLİĞİ — KURUM KAYITLARI (TR/EN ortak veri)
   Yalnızca kurum tarafından DOĞRULANMIŞ bilgiler buraya girilmelidir.
   Öğrenci anlaşmaları personel anlaşması sayılmaz; otomatik aktarılmaz.

   Her satır bir kurum + varsa anlaşma kapsamı için tanımlanır:
   {
     country:      "Polonya",            // Ülke; data/terms-en.js üzerinden çevrilir
     code:         "PL ...",             // Erasmus kodu (varsa)
     institution:  "Kurumun resmî adı", // İngilizce/uluslararası özel ad korunur
     faculty:      "...",                // İSTEĞE BAĞLI: fakülte adı
     department:   "Tüm Alanlar",        // İSTEĞE BAĞLI: anlaşmanın kapsamı
     type:         "teaching",           // teaching = Ders Verme; training = Eğitim Alma; both = Her ikisi
     teachingQuota: 2,                  // İSTEĞE BAĞLI: ders verme için ayrı kişi kontenjanı
     trainingQuota: 1,                  // İSTEĞE BAĞLI: eğitim alma için ayrı kişi kontenjanı
     quota:         2,                  // ALTERNATİF: sadece TEK ortak kontenjan varsa; ayrı kontenjanlarla birlikte kullanma
     condition:     "B2 İngilizce"       // İSTEĞE BAĞLI: dil şartı
   }

   ÖNEMLİ:
   - Gerçek değer bilinmiyorsa ilgili alanı yazmayın; 0 girmek sıfır kontenjan anlamına gelir.
   - "both" kaydı Ders Verme ve Eğitim Alma filtrelerinde de görünür.
   - Eğitim Alma için kurumlararası anlaşma zorunlu değildir; bu sayfa tüm olası kurumları kapsamaz.
   - Gösterim hazırdır; doğrulanmış veri sağlanana kadar "liste henüz yayımlanmadı" mesajı görünür.
   - Örnek bilgiler temsili olduğu için listeye EKLENMEDİ.
*/
window.FBU_PARTNERS_STAFF = [
    // Kurumun onaylı personel hareketliliği kayıtlarını buraya ekleyin.
];
