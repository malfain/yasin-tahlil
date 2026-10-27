// Lokasi pengguna, selalu otomatis: GPS (navigator.geolocation) akurasi tinggi, nama daerah
// lewat reverse geocoding, zona waktu dari perangkat. Tidak ada pilihan kota manual.
import * as store from './store.js';

export const EVENT = 'yt:location';

// Dipakai hanya sampai lokasi pertama berhasil terdeteksi.
const FALLBACK = { name: 'Jakarta', lat: -6.2088, lng: 106.8456, tz: 7, zone: 'WIB', fallback: true };

export function zoneName(tz) {
  if (tz === 7) return 'WIB';
  if (tz === 8) return 'WITA';
  if (tz === 9) return 'WIT';
  const sign = tz < 0 ? '−' : '+';
  const a = Math.abs(tz), h = Math.floor(a), m = Math.round((a - h) * 60);
  return 'UTC' + sign + h + (m ? ':' + String(m).padStart(2, '0') : '');
}

const deviceTz = () => -new Date().getTimezoneOffset() / 60;

// Status deteksi: 'idle' | 'detecting' | 'ok' | 'approx' (perkiraan jaringan) | 'error';
// message berisi alasan GPS gagal.
let status = { state: 'idle', message: '' };
export const detectStatus = () => status;
const emit = () => window.dispatchEvent(new CustomEvent(EVENT));
const setStatus = (state, message = '') => { status = { state, message }; emit(); };

export function currentLocation() {
  const g = store.get('gpsLoc', null);
  if (!g || !Number.isFinite(g.lat) || !Number.isFinite(g.lng)) return FALLBACK;
  // Zona waktu selalu mengikuti perangkat saat ini (mis. setelah pindah WIB → WITA).
  const tz = deviceTz();
  return { ...g, tz, zone: zoneName(tz) };
}

async function placeName(lat, lng) {
  // Koordinat dibulatkan (~100 m) sebelum dikirim: cukup untuk nama kecamatan/kota.
  const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
    lat.toFixed(3) + '&longitude=' + lng.toFixed(3) + '&localityLanguage=id';
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const j = await res.json();
    const city = (j.city || '').trim();
    const local = (j.locality || '').trim();
    if (local && city && !city.toLowerCase().includes(local.toLowerCase())) return local + ', ' + city;
    return city || local || (j.principalSubdivision || '').trim() || null;
  } catch (e) {
    return null;
  }
}

const isMac = /Macintosh|Mac OS X/.test(navigator.userAgent) && !('ontouchend' in document);
const ERRORS = {
  1: 'Izin lokasi diblokir. Ketuk ikon gembok/info di sebelah alamat situs, ubah Lokasi menjadi Izinkan, lalu Coba lagi.',
  2: isMac
    ? 'Lokasi tidak tersedia. Aktifkan Layanan Lokasi untuk browser ini di Pengaturan Sistem › Privasi & Keamanan › Layanan Lokasi, dan pastikan Wi-Fi menyala.'
    : 'Lokasi tidak tersedia. Pastikan GPS/Layanan Lokasi di HP aktif dan browser diizinkan memakainya.',
  3: 'Mencari lokasi terlalu lama. Pastikan GPS aktif lalu coba lagi.'
};

// Cadangan saat GPS gagal/ditolak: perkiraan lokasi dari jaringan internet (tingkat kota).
// Ditolak bila tidak cocok dengan zona waktu perangkat, karena perkiraan IP sering meleset.
async function ipLocation() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=id', { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const j = await res.json();
    const lat = Number(j.latitude), lng = Number(j.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return null;
    if (Math.abs(lng / 15 - deviceTz()) > 0.75) return null;
    const name = (j.city || j.locality || j.principalSubdivision || '').trim();
    return name ? { name, lat, lng, approx: true, at: Date.now() } : null;
  } catch (e) {
    return null;
  }
}

const position = (opts) => new Promise((resolve, reject) =>
  navigator.geolocation.getCurrentPosition(resolve, reject, opts));

let pending = null;

export function detect() {
  if (pending) return pending;
  pending = (async () => {
    if (!window.isSecureContext) {
      throw new Error('Browser hanya mengizinkan lokasi di alamat https:// atau http://localhost. Buka aplikasi lewat salah satunya.');
    }
    setStatus('detecting');
    let pos;
    try {
      if (!('geolocation' in navigator)) throw new Error('Perangkat ini tidak mendukung deteksi lokasi.');
      pos = await gps();
    } catch (e) {
      // GPS gagal: pakai perkiraan jaringan, tapi jangan timpa lokasi GPS asli yang sudah ada.
      const prev = store.get('gpsLoc', null);
      if (prev && !prev.approx) { setStatus('error', e.message); return currentLocation(); }
      const ip = await ipLocation();
      if (!ip) throw e;
      store.set('gpsLoc', ip);
      setStatus('approx', e.message);
      return currentLocation();
    }
    const { latitude: lat, longitude: lng, accuracy } = pos.coords;
    const prev = store.get('gpsLoc', null);
    const moved = !prev || prev.approx || !prev.name || Math.abs(prev.lat - lat) > 0.005 || Math.abs(prev.lng - lng) > 0.005;
    const name = (moved ? await placeName(lat, lng) : prev.name) || 'Lokasi Anda';
    const loc = { name, lat, lng, accuracy: Math.round(accuracy || 0), at: Date.now() };
    store.set('gpsLoc', loc);
    setStatus('ok');
    return currentLocation();
  })().catch((e) => { setStatus('error', e.message); throw e; })
    .finally(() => { pending = null; });
  return pending;
}

async function gps() {
  try {
    // Utamakan GPS presisi; bila gagal/terlalu lama, coba sekali lagi dengan posisi jaringan.
    return await position({ enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
  } catch (err) {
    if (err.code === 1) throw new Error(ERRORS[1]);
    try {
      return await position({ enableHighAccuracy: false, timeout: 15000, maximumAge: 5 * 60 * 1000 });
    } catch (err2) {
      throw new Error(ERRORS[err2.code] || 'Lokasi tidak bisa dideteksi.');
    }
  }
}

// Deteksi saat aplikasi dibuka dan setiap kali kembali dibuka (tab/aplikasi aktif lagi).
export function autoDetect() {
  const run = () => detect().catch(() => { /* status 'error' sudah diumumkan */ });
  run();
  let lastRun = Date.now();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Date.now() - lastRun > 60 * 1000) {
      lastRun = Date.now();
      run();
    }
  });
}
