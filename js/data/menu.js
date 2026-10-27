// Grup menu fitur (drawer). Item ber-href membuka layar; item ber-subs adalah akordeon
// berisi tautan [nama, rute].
export const MENU = [
  { title: 'Al-Qur’an', items: [
    { id: 'yasin', name: 'Surat Yasin', href: '#/yasin' },
    { id: 'juz', name: 'Juz Amma & Surat Pilihan', subs: [
      ['Juz Amma (An-Naba’ – An-Nas)', '#/surat'], ['Al-Kahfi', '#/surah/18'], ['Al-Waqi’ah', '#/surah/56'],
      ['Al-Mulk', '#/surah/67'], ['Ar-Rahman', '#/surah/55'], ['As-Sajdah', '#/surah/32']] },
    { id: 'asma', name: 'Asmaul Husna', href: '#/asma' }
  ]},
  { title: 'Amalan & dzikir', items: [
    { id: 'tahlil', name: 'Tahlilan', href: '#/tahlil' },
    { id: 'fasholatan', name: 'Fasholatan', subs: [
      ['Niat shalat fardhu', '#/baca/niat-shalat'], ['Bacaan shalat lengkap', '#/baca/bacaan-shalat'],
      ['Shalat sunnah', '#/baca/shalat-sunnah'], ['Wudhu & tayamum', '#/baca/wudhu']] },
    { id: 'dzikir', name: 'Dzikir dan Wirid', subs: [
      ['Dzikir pagi', '#/baca/dzikir-pagi'], ['Dzikir petang', '#/baca/dzikir-petang'],
      ['Wirid setelah shalat', '#/baca/wirid'], ['Ratib Al-Haddad', '#/baca/ratib-haddad']] },
    { id: 'sholawat', name: 'Sholawat', subs: [
      ['Sholawat Nariyah', '#/baca/sholawat-nariyah'], ['Sholawat Munjiyat', '#/baca/sholawat-munjiyat'],
      ['Sholawat Badar', '#/baca/sholawat-badar'], ['Sholawat Thibbil Qulub', '#/baca/sholawat-thibbil-qulub']] },
    { id: 'doa', name: 'Doa-doa Pilihan', subs: [
      ['Doa harian', '#/baca/doa-harian'], ['Doa untuk orang tua', '#/baca/doa-orang-tua'],
      ['Doa arwah', '#/baca/doa-arwah'], ['Doa khatam Al-Qur’an', '#/baca/doa-khatam']] },
    { id: 'amalan', name: 'Amalan Pilihan', subs: [
      ['Istighosah', '#/baca/istighosah'], ['Amalan malam Jumat', '#/baca/amalan-malam-jumat'],
      ['Amalan bulan Hijriah', '#/baca/amalan-bulan-hijriah']] }
  ]},
  { title: 'Kitab & acara', items: [
    { id: 'maulid', name: 'Kitab Maulid', subs: [
      ['Al-Barzanji', '#/baca/barzanji'], ['Simthud Durar', '#/baca/simthud-durar'],
      ['Ad-Diba’i', '#/baca/diba'], ['Syaraful Anam', '#/baca/syaraful-anam']] },
    { id: 'mc', name: 'Kumpulan MC', subs: [
      ['MC tahlilan', '#/baca/mc-tahlilan'], ['MC pengajian', '#/baca/mc-pengajian'],
      ['MC maulid nabi', '#/baca/mc-maulid'], ['MC walimah', '#/baca/mc-walimah']] }
  ]},
  { title: 'Alat', items: [
    { id: 'jadwal', name: 'Jadwal Sholat & Imsak', href: '#/jadwal' },
    { id: 'alat', name: 'Alat Islami', subs: [
      ['Arah kiblat', '#/kiblat'], ['Tasbih digital', '#/tasbih'], ['Kalender Hijriah', '#/kalender'], ['Hitung zakat', '#/zakat']] }
  ]}
];
