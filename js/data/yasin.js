// Data Surah Yasin: diambil dari equran.id saat runtime, di-cache ke localStorage.
// Bila gagal (offline) dan belum ada cache, pakai 7 ayat pertama dari desain.
import * as store from '../store.js';

export const TOTAL_AYAT = 83;
const API = 'https://equran.id/api/v2/surat/36';
const CACHE_KEY = 'yasin-cache-v1';

export const FALLBACK = [
  [1, 'يٰسۤ', 'Yā sīn.', 'Yā Sīn.'],
  [2, 'وَالْقُرْاٰنِ الْحَكِيْمِۙ', 'Wal-qur’ānil-ḥakīm.', 'Demi Al-Qur’an yang penuh hikmah,'],
  [3, 'اِنَّكَ لَمِنَ الْمُرْسَلِيْنَۙ', 'Innaka laminal-mursalīn.', 'sesungguhnya engkau (Nabi Muhammad) benar-benar salah seorang dari para rasul'],
  [4, 'عَلٰى صِرَاطٍ مُّسْتَقِيْمٍۗ', '‘Alā ṣirāṭim mustaqīm.', '(yang berada) di atas jalan yang lurus,'],
  [5, 'تَنْزِيْلَ الْعَزِيْزِ الرَّحِيْمِۙ', 'Tanzīlal-‘azīzir-raḥīm.', '(sebagai wahyu) yang diturunkan oleh (Allah) Yang Maha Perkasa lagi Maha Penyayang'],
  [6, 'لِتُنْذِرَ قَوْمًا مَّآ اُنْذِرَ اٰبَاۤؤُهُمْ فَهُمْ غٰفِلُوْنَ', 'Litunżira qaumam mā unżira ābā’uhum fahum gāfilūn.', 'agar engkau memberi peringatan kepada suatu kaum yang nenek moyangnya belum pernah diberi peringatan sehingga mereka lalai.'],
  [7, 'لَقَدْ حَقَّ الْقَوْلُ عَلٰٓى اَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُوْنَ', 'Laqad ḥaqqal-qaulu ‘alā akṡarihim fahum lā yu’minūn.', 'Sungguh, pasti berlaku perkataan (ketentuan Allah) terhadap kebanyakan mereka, karena mereka tidak beriman.']
].map(([no, arab, latin, arti]) => ({ no, arab, latin, arti }));

export function cached() {
  const c = store.get(CACHE_KEY, null);
  return Array.isArray(c) && c.length === TOTAL_AYAT ? c : null;
}

// Mengembalikan { ayat, complete }.
export async function loadYasin() {
  const hit = cached();
  if (hit) return { ayat: hit, complete: true };
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(API, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const list = (json && json.data && json.data.ayat) || [];
    const ayat = list.map((a) => ({
      no: Number(a.nomorAyat),
      arab: String(a.teksArab || '').trim(),
      latin: String(a.teksLatin || '').trim(),
      arti: String(a.teksIndonesia || '').trim()
    }));
    if (ayat.length !== TOTAL_AYAT) throw new Error('Data tidak lengkap');
    store.set(CACHE_KEY, ayat);
    return { ayat, complete: true };
  } catch (e) {
    return { ayat: FALLBACK, complete: false };
  }
}
