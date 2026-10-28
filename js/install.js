// Pemasangan aplikasi (PWA): daftarkan service worker, tangkap prompt instal Android,
// dan deteksi iPhone/iPad (yang hanya bisa lewat Safari › Bagikan › Tambahkan ke Layar Utama).
export const EVENT = 'yt:install';

let deferred = null;
const emit = () => window.dispatchEvent(new CustomEvent(EVENT));

export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const canPrompt = () => !!deferred;

export function initInstall() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* tanpa SW aplikasi tetap jalan */ });
  }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; emit(); });
  window.addEventListener('appinstalled', () => { deferred = null; emit(); });
}

// Tampilkan dialog instal bawaan browser. Mengembalikan true bila pengguna menerima.
export async function promptInstall() {
  if (!deferred) return false;
  const e = deferred;
  deferred = null;
  e.prompt();
  const { outcome } = await e.userChoice;
  emit();
  return outcome === 'accepted';
}
