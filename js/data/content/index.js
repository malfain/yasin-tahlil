// Registri konten bacaan: key rute #/baca/<key> → grup menu (untuk tombol kembali).
// File konten: ./<key>.js (format di SCHEMA.md), dimuat saat dibuka.
export const CONTENT = {
  'niat-shalat': 'fasholatan', 'bacaan-shalat': 'fasholatan', 'shalat-sunnah': 'fasholatan', 'wudhu': 'fasholatan',
  'dzikir-pagi': 'dzikir', 'dzikir-petang': 'dzikir', 'wirid': 'dzikir', 'ratib-haddad': 'dzikir',
  'sholawat-nariyah': 'sholawat', 'sholawat-munjiyat': 'sholawat', 'sholawat-badar': 'sholawat', 'sholawat-thibbil-qulub': 'sholawat',
  'doa-harian': 'doa', 'doa-orang-tua': 'doa', 'doa-arwah': 'doa', 'doa-khatam': 'doa',
  'istighosah': 'amalan', 'amalan-malam-jumat': 'amalan', 'amalan-bulan-hijriah': 'amalan',
  'barzanji': 'maulid', 'simthud-durar': 'maulid', 'diba': 'maulid', 'syaraful-anam': 'maulid',
  'mc-tahlilan': 'mc', 'mc-pengajian': 'mc', 'mc-maulid': 'mc', 'mc-walimah': 'mc'
};

export const loadContent = (key) => import('./' + key + '.js').then((m) => m.default);
