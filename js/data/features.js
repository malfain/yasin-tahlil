// 16 fitur grid "Bacaan" di Beranda: [nama, ikon, rute, hue warna tile (oklch), chroma opsional].
// Setiap ikon dan warna unik; hue diatur agar tile yang bersebelahan kontras.
// Fitur tanpa layar sendiri membuka drawer Menu dengan grup terkait terbuka.
export const FEATURES = [
  ['Surat Yasin', 'book', '#/yasin', 157],
  ['Tahlilan', 'beads', '#/tahlil', 202],
  ['Jadwal Sholat', 'clock', '#/jadwal', 67],
  ['Juz Amma', 'bookClosed', '#/menu/juz', 112],
  ['Asmaul Husna', 'star', '#/menu/asma', 292],
  ['Fasholatan', 'mosque', '#/menu/fasholatan', 247],
  ['Dzikir & Wirid', 'heart', '#/menu/dzikir', 337],
  ['Sholawat', 'crescent', '#/menu/sholawat', 270],
  ['Doa Pilihan', 'hands', '#/menu/doa', 0],
  ['Amalan Pilihan', 'listCheck', '#/menu/amalan', 90],
  ['Kitab Maulid', 'scroll', '#/menu/maulid', 45],
  ['Kumpulan MC', 'mic', '#/menu/mc', 225],
  ['Arah Kiblat', 'compass', '#/menu/alat', 180],
  ['Tasbih Digital', 'counter', '#/menu/alat', 22],
  ['Kalender Hijriah', 'calendar', '#/menu/alat', 315],
  ['Semua Menu', 'grid', '#/menu', 250, 0.3]
];
