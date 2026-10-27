# Format file konten bacaan (js/data/content/<key>.js)

Setiap file adalah ES module dengan satu `export default` objek:

```js
export default {
  title: 'Dzikir Pagi',                 // judul layar (wajib)
  subtitle: 'Dibaca setelah Subuh',     // satu baris di bawah judul (opsional)
  intro: 'Paragraf pengantar singkat.', // opsional
  source: 'HR. Abu Dawud …',            // sumber/rujukan umum (opsional)
  sections: [                           // wajib, minimal 1
    {
      heading: 'Pembuka',               // opsional
      items: [
        {
          title: 'Ayat Kursi',          // opsional
          arab: 'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَ ...', // opsional, teks Arab berharakat
          latin: 'Allāhu lā ilāha illā huw ...',   // opsional
          arti: 'Allah, tidak ada tuhan selain Dia ...', // opsional
          repeat: 3,                    // opsional: dibaca berapa kali
          note: 'HR. Bukhari',          // opsional: keterangan/sumber singkat
          text: 'Paragraf prosa ...'    // opsional: untuk naskah non-Arab (mis. MC); boleh berisi \n\n untuk paragraf
        }
      ]
    }
  ]
};
```

Aturan:
- Bahasa Indonesia untuk judul/arti/teks. Teks Arab memakai harakat lengkap, Unicode biasa.
- JANGAN mengarang dalil, hadis, atau teks Arab yang tidak yakin. Gunakan hanya teks yang masyhur dan Anda yakin benar. Lebih baik lebih sedikit tapi benar.
- Bila sebuah teks sangat panjang (mis. kitab maulid), sertakan bagian yang paling umum dibaca dan tulis di `intro` bahwa ini bagian pilihan.
- Tidak boleh ada placeholder, TODO, atau lorem ipsum.
- Escape tanda kutip tunggal di string JS dengan benar (pakai ’ untuk apostrof di teks latin/Indonesia).
