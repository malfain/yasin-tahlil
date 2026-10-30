// Service worker: syarat "Instal aplikasi" di Android, dan agar aplikasi bisa dibuka tanpa internet.
// Strategi: file aplikasi diambil dari jaringan dulu (selalu versi terbaru saat online), cadangan
// dari cache saat offline. Font Google di-cache saat pertama dipakai. API (equran.id,
// BigDataCloud) tidak disentuh; aplikasi sudah menyimpan hasilnya sendiri.
const CACHE = 'yasin-tahlil-v2';
const PRECACHE = [
    './',
    'index.html',
    'manifest.webmanifest',
    'css/app.css',
    'css/theme.css',
    'css/tools.css',
    'icons/apple-touch-icon.png',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'icons/icon-maskable.svg',
    'icons/icon.svg',
    'icons/maskable-512.png',
    'js/app.js',
    'js/data/asma.js',
    'js/data/content/amalan-bulan-hijriah.js',
    'js/data/content/amalan-malam-jumat.js',
    'js/data/content/bacaan-shalat.js',
    'js/data/content/barzanji.js',
    'js/data/content/diba.js',
    'js/data/content/doa-arwah.js',
    'js/data/content/doa-harian.js',
    'js/data/content/doa-khatam.js',
    'js/data/content/doa-orang-tua.js',
    'js/data/content/dzikir-pagi.js',
    'js/data/content/dzikir-petang.js',
    'js/data/content/index.js',
    'js/data/content/istighosah.js',
    'js/data/content/mc-maulid.js',
    'js/data/content/mc-pengajian.js',
    'js/data/content/mc-tahlilan.js',
    'js/data/content/mc-walimah.js',
    'js/data/content/niat-shalat.js',
    'js/data/content/ratib-haddad.js',
    'js/data/content/shalat-sunnah.js',
    'js/data/content/sholawat-badar.js',
    'js/data/content/sholawat-munjiyat.js',
    'js/data/content/sholawat-nariyah.js',
    'js/data/content/sholawat-thibbil-qulub.js',
    'js/data/content/simthud-durar.js',
    'js/data/content/syaraful-anam.js',
    'js/data/content/wirid.js',
    'js/data/content/wudhu.js',
    'js/data/features.js',
    'js/data/menu.js',
    'js/data/quran.js',
    'js/data/tahlil.js',
    'js/data/yasin.js',
    'js/icons.js',
    'js/install.js',
    'js/location.js',
    'js/prayer.js',
    'js/store.js',
    'js/ui.js',
    'js/views/asma.js',
    'js/views/baca.js',
    'js/views/home.js',
    'js/views/jadwal.js',
    'js/views/kalender.js',
    'js/views/kiblat.js',
    'js/views/menu.js',
    'js/views/surah.js',
    'js/views/surat.js',
    'js/views/tahlil.js',
    'js/views/tasbih.js',
    'js/views/yasin.js',
    'js/views/zakat.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
    );
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }))
    );
  }
});
