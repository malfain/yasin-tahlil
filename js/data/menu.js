// Grup menu fitur (drawer). Item ber-href membuka layar; item ber-subs adalah akordeon.
export const MENU = [
  { title: 'Al-Qur’an', items: [
    { id: 'yasin', name: 'Surat Yasin', href: '#/yasin' },
    { id: 'juz', name: 'Juz Amma & Surat Pilihan', subs: ['Juz Amma (An-Naba’ – An-Nas)', 'Al-Kahfi', 'Al-Waqi’ah', 'Al-Mulk', 'Ar-Rahman', 'As-Sajdah'] },
    { id: 'asma', name: 'Asmaul Husna', subs: ['99 nama & artinya', 'Mode hafalan', 'Audio lantunan'] }
  ]},
  { title: 'Amalan & dzikir', items: [
    { id: 'tahlil', name: 'Tahlilan', href: '#/tahlil' },
    { id: 'fasholatan', name: 'Fasholatan', subs: ['Niat shalat fardhu', 'Bacaan shalat lengkap', 'Shalat sunnah', 'Wudhu & tayamum'] },
    { id: 'dzikir', name: 'Dzikir dan Wirid', subs: ['Dzikir pagi', 'Dzikir petang', 'Wirid setelah shalat', 'Ratib Al-Haddad'] },
    { id: 'sholawat', name: 'Sholawat', subs: ['Sholawat Nariyah', 'Sholawat Munjiyat', 'Sholawat Badar', 'Sholawat Thibbil Qulub'] },
    { id: 'doa', name: 'Doa-doa Pilihan', subs: ['Doa harian', 'Doa untuk orang tua', 'Doa arwah', 'Doa khatam Al-Qur’an'] },
    { id: 'amalan', name: 'Amalan Pilihan', subs: ['Istighosah', 'Amalan malam Jumat', 'Amalan bulan Hijriah'] }
  ]},
  { title: 'Kitab & acara', items: [
    { id: 'maulid', name: 'Kitab Maulid', subs: ['Al-Barzanji', 'Simthud Durar', 'Ad-Diba’i', 'Syaraful Anam'] },
    { id: 'mc', name: 'Kumpulan MC', subs: ['MC tahlilan', 'MC pengajian', 'MC maulid nabi', 'MC walimah'] }
  ]},
  { title: 'Alat', items: [
    { id: 'jadwal', name: 'Jadwal Sholat & Imsak', href: '#/jadwal' },
    { id: 'alat', name: 'Alat Islami', subs: ['Arah kiblat', 'Tasbih digital', 'Kalender Hijriah', 'Hitung zakat'] }
  ]}
];
