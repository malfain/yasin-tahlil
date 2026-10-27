// Surat Al-Qur'an dari equran.id (teks Arab, latin, terjemahan Kemenag), di-cache per surat.
import * as store from '../store.js';

// [nomor, nama latin, jumlah ayat]
export const JUZ_AMMA = [
  [78, 'An-Naba’', 40], [79, 'An-Nazi‘at', 46], [80, '‘Abasa', 42], [81, 'At-Takwir', 29],
  [82, 'Al-Infithar', 19], [83, 'Al-Muthaffifin', 36], [84, 'Al-Insyiqaq', 25], [85, 'Al-Buruj', 22],
  [86, 'Ath-Thariq', 17], [87, 'Al-A‘la', 19], [88, 'Al-Ghasyiyah', 26], [89, 'Al-Fajr', 30],
  [90, 'Al-Balad', 20], [91, 'Asy-Syams', 15], [92, 'Al-Lail', 21], [93, 'Adh-Dhuha', 11],
  [94, 'Asy-Syarh', 8], [95, 'At-Tin', 8], [96, 'Al-‘Alaq', 19], [97, 'Al-Qadr', 5],
  [98, 'Al-Bayyinah', 8], [99, 'Az-Zalzalah', 8], [100, 'Al-‘Adiyat', 11], [101, 'Al-Qari‘ah', 11],
  [102, 'At-Takatsur', 8], [103, 'Al-‘Ashr', 3], [104, 'Al-Humazah', 9], [105, 'Al-Fil', 5],
  [106, 'Quraisy', 4], [107, 'Al-Ma‘un', 7], [108, 'Al-Kautsar', 3], [109, 'Al-Kafirun', 6],
  [110, 'An-Nashr', 3], [111, 'Al-Lahab', 5], [112, 'Al-Ikhlas', 4], [113, 'Al-Falaq', 5], [114, 'An-Nas', 6]
];
export const PILIHAN = [[18, 'Al-Kahfi', 110], [32, 'As-Sajdah', 30], [55, 'Ar-Rahman', 78], [56, 'Al-Waqi‘ah', 96], [67, 'Al-Mulk', 30]];

const key = (n) => 'surah-v1-' + n;

export function cachedSurah(n) {
  const c = store.get(key(n), null);
  return c && Array.isArray(c.ayat) && c.ayat.length === c.info.jumlahAyat ? c : null;
}

export async function loadSurah(n) {
  const hit = cachedSurah(n);
  if (hit) return hit;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  const res = await fetch('https://equran.id/api/v2/surat/' + n, { signal: ctrl.signal });
  clearTimeout(timer);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const d = (await res.json()).data;
  const data = {
    info: {
      nomor: d.nomor, nama: d.nama, namaLatin: d.namaLatin, arti: d.arti,
      jumlahAyat: d.jumlahAyat, tempatTurun: d.tempatTurun
    },
    ayat: d.ayat.map((a) => ({
      no: Number(a.nomorAyat), arab: String(a.teksArab || '').trim(),
      latin: String(a.teksLatin || '').trim(), arti: String(a.teksIndonesia || '').trim()
    }))
  };
  if (data.ayat.length !== data.info.jumlahAyat) throw new Error('Data tidak lengkap');
  store.set(key(n), data);
  return data;
}
