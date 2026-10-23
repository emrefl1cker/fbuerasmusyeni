/* İNTİBAK ARŞİVİ — kurum + fakülte başına BİR örnek tablo.
   Yeni kayıt eklemek için bir blok kopyala, bilgileri değiştir:
   - faculties : tablonun geçerli olduğu fakülte(ler); aynı tablo iki fakülteye uyuyorsa ikisini de yaz
   - country / name : filtrede görünen ülke ve üniversite adı
   - head : başlık satırları. Hücre "metin" ya da ["metin", birleştirilecek_sütun_sayısı]
   - rows : tablo satırları. Üstteki hücreyle BİRLEŞTİRMEK için hücreyi boş bırak: ""
   - note : (isteğe bağlı) tablonun altında görünecek açıklama */
window.FBU_INTIBAK = [
    {
        faculties: ["Mühendislik ve Doğa Bilimleri Fakültesi"],
        country: "Almanya",
        name: "Hochschule Albstadt-Sigmaringen",
        head: [
            [["Karşı Kurum (Hochschule Albstadt-Sigmaringen) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 3]],
            ["Puan Oranı", "Değerlendirme", "Harf Notu", "Yüzlük", "Dörtlük"],
        ],
        rows: [
            ["1.0 - 1.5", "Very good", "AA", "90-100", "4,00"],
            ["1.6 - 2.5", "Good", "BA", "85-89", "3,50"],
            ["", "", "BB", "80-84", "3,00"],
            ["2.6 - 3.5", "Satisfactory", "CB", "70-79", "2,70"],
            ["", "", "CC", "60-69", "2,00"],
            ["3.6 - 4.0", "Sufficient", "DC", "55-59", "1,50"],
            ["", "", "DD", "50-54", "1,00"],
            ["From 4.1", "Fail", "FD", "40-49", "0,50"],
            ["", "", "FF", "0-39", "0,00"],
        ]
    },
    {
        faculties: ["Mühendislik ve Doğa Bilimleri Fakültesi", "Mimarlık ve Tasarım Fakültesi"],
        country: "Polonya",
        name: "University of Silesia in Katowice",
        head: [
            [["Karşı Kurum (University of Silesia in Katowice) Notu", 3], ["Fenerbahçe Üniversitesi Karşılığı", 3]],
            ["Puan Oranı", "Harf", "Değerlendirme", "Harf Notu", "Yüzlük", "Dörtlük"],
        ],
        rows: [
            ["5", "A", "Excellent", "AA", "90-100", "4,00"],
            ["4,5", "B", "Very Good", "BA", "85-89", "3,50"],
            ["", "", "", "BB", "80-84", "3,00"],
            ["4", "C", "Good", "CB", "70-79", "2,70"],
            ["", "", "", "CC", "60-69", "2,00"],
            ["3,5", "D", "Satisfactory", "DC", "55-59", "1,50"],
            ["3", "E", "Sufficient", "DD", "50-54", "1,00"],
            ["2", "F/FX", "Fail", "FD", "40-49", "0,50"],
            ["", "", "", "FF", "0-39", "0,00"],
        ]
    },
    {
        faculties: ["Sağlık Bilimleri Fakültesi"],
        country: "Polonya",
        name: "State University of Applied Sciences Wloclawek",
        head: [
            [["Karşı Kurum (State University of Applied Sciences Wloclawek) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 2]],
            ["Harf/Puan Notu", "FBU Dönüşüm Puanı", "FBU Harf Notu Karşılığı"],
        ],
        rows: [
            ["5 (A)", "4,75 - 5,00", "AA"],
            ["4.5 / 4+ (B)", "4,25 - 4,749", "BA"],
            ["4 (C)", "3,75 - 4,249", "BB"],
            ["3.5 / 3+ (D)", "3,25 - 3,749", "CC"],
            ["3 (E)", "3,00 - 3,249", "DD"],
            ["2 (F/FX)*", "0 - 2,99", "FF"],
        ]
    },
    {
        faculties: ["Sağlık Bilimleri Fakültesi"],
        country: "Polonya",
        name: "University of Lomza",
        head: [
            [["Karşı Kurum (University of Lomza) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 2]],
            ["Harf/Puan Notu", "FBU Dönüşüm Puanı", "FBU Harf Notu Karşılığı"],
        ],
        rows: [
            ["5 (A)", "4,75 - 5,00", "AA"],
            ["4.5 / 4+ (B)", "4,25 - 4,749", "BA"],
            ["4 (C)", "3,75 - 4,249", "BB"],
            ["3.5 / 3+ (D)", "3,25 - 3,749", "CC"],
            ["3 (E)", "3,00 - 3,249", "DD"],
            ["2 (F/FX)*", "0 - 2,99", "FF"],
        ]
    },
    {
        faculties: ["İletişim Fakültesi"],
        country: "Kuzey Makedonya",
        name: "International Balkan University",
        head: [
            [["Karşı Kurum (International Balkan University) Notu", 3], ["Fenerbahçe Üniversitesi Karşılığı", 3]],
            ["Harf Notu", "Yüzlük Aralık", "Durum", "Harf Notu", "Dörtlük", "Yüzlük Aralık"],
        ],
        rows: [
            ["A", "100-90", "Başarılı", "AA", "4,00", "100-90"],
            ["B", "89-80", "Başarılı", "BA", "3,50", "89-85"],
            ["", "", "Başarılı", "BB", "3,00", "84-80"],
            ["C", "79-70", "Başarılı", "CB", "2,70", "79-70"],
            ["D", "69-60", "Başarılı", "CC", "2,00", "69-60"],
            ["E", "59-50", "Başarılı", "DC", "1,50", "59-55"],
            ["", "", "Başarılı", "DD", "1,00", "54-50"],
            ["F", "< 50", "Başarısız", "FD", "0,50", "49-40"],
            ["", "", "Başarısız", "FF", "0,00", "39-0"],
        ]
    },
    {
        faculties: ["İktisadi, İdari ve Sosyal Bilimler Fakültesi"],
        country: "Polonya",
        name: "The John Paul II Catholic University of Lublin",
        head: [
            [["Karşı Kurum (The John Paul II Catholic University of Lublin) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 2]],
            ["Harf/Puan Notu", "FBU Dönüşüm Puanı", "FBU Harf Notu Karşılığı"],
        ],
        rows: [
            ["5 (A)", "4,75 - 5,00", "AA"],
            ["4+ (B)", "4,25 - 4,749", "BA"],
            ["4 (C)", "3,75 - 4,249", "BB"],
            ["3+ (D)", "3,25 - 3,749", "CC"],
            ["3 (E)", "3,00 - 3,249", "DD"],
            ["2 (FX/F)*", "2,99 - 0", "FF"],
        ]
    },
    {
        faculties: ["İktisadi, İdari ve Sosyal Bilimler Fakültesi"],
        country: "Slovakya",
        name: "Comenius University Bratislava",
        head: [
            [["Karşı Kurum (Comenius University Bratislava) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 2]],
            ["Harf/Puan Notu", "FBU Dönüşüm Puanı", "FBU Harf Notu Karşılığı"],
        ],
        rows: [
            ["1 (A)", "1,00 - 1,249", "AA"],
            ["1,5 (B)", "1,25 - 1,749", "BA"],
            ["2 (C)", "1,75 - 2,249", "BB"],
            ["2,5 (D)", "2,25 - 2,749", "CC"],
            ["3 (E)", "2,75 - 3,00", "DD"],
            ["4 (FX)", "3,01 - 4,00", "FF"],
        ]
    },
    {
        faculties: ["İktisadi, İdari ve Sosyal Bilimler Fakültesi"],
        country: "Polonya",
        name: "Uniwersytet w Siedlcach",
        head: [
            [["Karşı Kurum (Uniwersytet w Siedlcach) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 2]],
            ["Harf/Puan Notu", "FBU Dönüşüm Puanı", "FBU Harf Notu Karşılığı"],
        ],
        rows: [
            ["5 (A)", "4,75 - 5,00", "AA"],
            ["4+ (B)", "4,25 - 4,749", "BA"],
            ["4 (C)", "3,75 - 4,249", "BB"],
            ["3+ (D)", "3,25 - 3,749", "CC"],
            ["3 (E)", "3,00 - 3,249", "DD"],
            ["2 (FX/F)*", "2,99 - 0", "FF"],
        ]
    },
    {
        faculties: ["İktisadi, İdari ve Sosyal Bilimler Fakültesi"],
        country: "İspanya",
        name: "University of Deusto",
        head: [
            ["Karşı Kurum (University of Deusto) Not Ortalama Aralığı", "Fenerbahçe Üniversitesi Harf Notu Karşılığı"],
        ],
        rows: [
            ["9,0 - 10,0", "AA"],
            ["8,0 - 8,99", "BA"],
            ["7,0 - 7,99", "BB"],
            ["6,5 - 6,99", "CB"],
            ["6,0 - 6,49", "CC"],
            ["5,5 - 5,99", "DC"],
            ["5,0 - 5,49", "DD"],
            ["0,0 - 4,9", "FF"],
        ]
    },
    {
        faculties: ["İktisadi, İdari ve Sosyal Bilimler Fakültesi"],
        country: "Polonya",
        name: "University of Lodz",
        head: [
            [["Karşı Kurum (University of Lodz) Notu", 2], ["Fenerbahçe Üniversitesi Karşılığı", 2]],
            ["Harf/Puan Notu", "FBU Dönüşüm Puanı", "FBU Harf Notu Karşılığı"],
        ],
        rows: [
            ["5 (A)", "4,75 - 5,00", "AA"],
            ["4+ (B)", "4,25 - 4,749", "BA"],
            ["4 (C)", "3,75 - 4,249", "BB"],
            ["3+ (D)", "3,25 - 3,749", "CC"],
            ["3 (E)", "3,00 - 3,249", "DD"],
            ["2 (FX/F)*", "0 - 2,99", "FF"],
        ]
    },
];
