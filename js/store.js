// Penyimpanan sederhana di localStorage; semua akses dibungkus try/catch
// agar aplikasi tetap jalan di mode privat atau saat penyimpanan diblokir.
const PREFIX = 'yt:';

export function get(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    /* penyimpanan tidak tersedia: abaikan */
  }
}
