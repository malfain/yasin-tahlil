// Perhitungan waktu sholat astronomis (gaya PrayTimes), parameter Kemenag RI:
// Subuh 20°, Isya 18°, Ashar Syafi'i, ihtiyat 2 menit, Imsak = Subuh − 10 menit.
import { pad } from './ui.js';

export const CITIES = [
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, tz: 7, zone: 'WIB' },
  { name: 'Bandung', lat: -6.9175, lng: 107.6191, tz: 7, zone: 'WIB' },
  { name: 'Semarang', lat: -6.9667, lng: 110.4167, tz: 7, zone: 'WIB' },
  { name: 'Purwokerto', lat: -7.4245, lng: 109.2302, tz: 7, zone: 'WIB' },
  { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695, tz: 7, zone: 'WIB' },
  { name: 'Surabaya', lat: -7.2575, lng: 112.7521, tz: 7, zone: 'WIB' },
  { name: 'Medan', lat: 3.5952, lng: 98.6722, tz: 7, zone: 'WIB' },
  { name: 'Denpasar', lat: -8.65, lng: 115.2167, tz: 8, zone: 'WITA' },
  { name: 'Makassar', lat: -5.1477, lng: 119.4327, tz: 8, zone: 'WITA' },
  { name: 'Jayapura', lat: -2.5337, lng: 140.7181, tz: 9, zone: 'WIT' }
];

// Hasil dalam menit sejak tengah malam (waktu lokal kota).
export function times(y, mo, d, c) {
  const rad = Math.PI / 180, deg = 180 / Math.PI;
  const sin = (x) => Math.sin(x * rad), cos = (x) => Math.cos(x * rad), tan = (x) => Math.tan(x * rad);
  const asin = (x) => Math.asin(x) * deg, acos = (x) => Math.acos(x) * deg, atan2 = (a, b) => Math.atan2(a, b) * deg;
  const fix = (a, b) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
  let Y = y, M = mo;
  if (M <= 2) { Y -= 1; M += 12; }
  const A = Math.floor(Y / 100), B = 2 - A + Math.floor(A / 4);
  const jd0 = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5 - c.lng / (15 * 24);
  const sun = (jd) => {
    const D = jd - 2451545.0;
    const g = fix(357.529 + 0.98560028 * D, 360), q = fix(280.459 + 0.98564736 * D, 360);
    const L = fix(q + 1.915 * sin(g) + 0.020 * sin(2 * g), 360);
    const e = 23.439 - 0.00000036 * D;
    const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
    return { decl: asin(sin(e) * sin(L)), eqt: q / 15 - fix(RA, 24) };
  };
  const mid = (t) => fix(12 - sun(jd0 + t).eqt, 24);
  const angleTime = (angle, t, ccw) => {
    const decl = sun(jd0 + t).decl, noon = mid(t);
    const tt = acos((-sin(angle) - sin(decl) * sin(c.lat)) / (cos(decl) * cos(c.lat))) / 15;
    return noon + (ccw ? -tt : tt);
  };
  const asr = (t) => {
    const decl = sun(jd0 + t).decl;
    const angle = -(Math.atan(1 / (1 + tan(Math.abs(c.lat - decl)))) * deg);
    return angleTime(angle, t);
  };
  const adj = c.tz - c.lng / 15;
  const subuh = angleTime(20, 5 / 24, true) + adj;
  const terbit = angleTime(0.833, 6 / 24, true) + adj;
  const dzuhur = mid(12 / 24) + adj;
  const ashar = asr(13 / 24) + adj;
  const maghrib = angleTime(0.833, 18 / 24) + adj;
  const isya = angleTime(18, 18 / 24) + adj;
  const m = (h, ih) => Math.ceil(h * 60 + ih);
  return {
    Imsak: m(subuh, 2) - 10, Subuh: m(subuh, 2), Terbit: m(terbit, -2), Dhuha: m(terbit, 18),
    Dzuhur: m(dzuhur, 2), Ashar: m(ashar, 2), Maghrib: m(maghrib, 2), Isya: m(isya, 2)
  };
}

export const hm = (x) => pad(Math.floor(x / 60) % 24) + ':' + pad(x % 60);

export const WAJIB = ['Imsak', 'Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
export const ORDER = ['Imsak', 'Subuh', 'Terbit', 'Dhuha', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

// Tanggal & menit saat ini menurut zona waktu kota (bukan zona perangkat).
export function cityNow(c, now = new Date()) {
  const shifted = new Date(now.getTime() + c.tz * 3600000);
  return {
    y: shifted.getUTCFullYear(), m: shifted.getUTCMonth() + 1, d: shifted.getUTCDate(),
    min: shifted.getUTCHours() * 60 + shifted.getUTCMinutes()
  };
}

// Waktu berikutnya di antara 6 waktu utama + hitung mundur.
export function nextPrayer(t, nowMin) {
  let name = WAJIB.find((k) => t[k] > nowMin);
  const tomorrow = !name;
  if (tomorrow) name = 'Imsak';
  const diff = t[name] - nowMin + (tomorrow ? 1440 : 0);
  const h = Math.floor(diff / 60), m = diff % 60;
  return { name, time: hm(t[name]), countdown: (h ? h + ' j ' : '') + m + ' m lagi' };
}

export function formatDate(date, opts, locale = 'id-ID') {
  try { return new Intl.DateTimeFormat(locale, opts).format(date); } catch (e) { return ''; }
}
export const masehi = (date) => formatDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const hijri = (date) => formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' }, 'id-ID-u-ca-islamic-umalqura');
