// Beranda: jam live, tanggal Masehi + Hijriah, jadwal sholat ringkas, grid fitur, progres Yasin.
import { icon, ornament } from '../icons.js';
import { esc, pad, isDark, setDark, replay } from '../ui.js';
import * as store from '../store.js';
import { times, hm, WAJIB, cityNow, nextPrayer, masehi, hijri } from '../prayer.js';
import { currentLocation, detectStatus, EVENT as LOC_EVENT } from '../location.js';
import { isStandalone, isIOS, canPrompt, promptInstall, EVENT as INSTALL_EVENT } from '../install.js';
import { FEATURES } from '../data/features.js';
import { TOTAL_AYAT } from '../data/yasin.js';

export function mount(host) {
  let city = currentLocation();
  // Chip di Beranda cukup nama kota; nama lengkap (kecamatan, kota) ada di layar Jadwal.
  const shortName = (c) => c.name.split(', ').pop();
  const locLabel = (c) => {
    if (!c.fallback) return shortName(c);
    const st = detectStatus().state;
    return st === 'detecting' ? 'Mendeteksi…' : st === 'error' ? 'Aktifkan lokasi' : shortName(c);
  };
  const last = Math.max(0, Math.min(TOTAL_AYAT, Number(store.get('yasinLast', 0)) || 0));
  const pct = Math.round((last / TOTAL_AYAT) * 100);
  let readDesc = 'Surah Yasin · terakhir di ayat ' + last;
  let readCta = 'Lanjutkan ke ayat ' + (last + 1);
  let readHref = '#/yasin/' + (last + 1);
  if (last === 0) { readDesc = 'Surah Yasin · belum mulai dibaca'; readCta = 'Mulai membaca'; readHref = '#/yasin/1'; }
  if (last === TOTAL_AYAT) { readDesc = 'Surah Yasin · sudah selesai dibaca'; readCta = 'Baca lagi dari awal'; readHref = '#/yasin/1'; }

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <div class="scroll home-body">
    <div class="home-top">
      <a href="#/menu" class="btn btn-outline btn-icon" aria-label="Buka menu fitur">${icon('menu', 18, 2)}</a>
      <div class="home-title">
        <span class="muted-sm">Assalamu’alaikum</span>
        <h1 tabindex="-1">Yasin &amp; Tahlil</h1>
      </div>
      <button type="button" class="btn btn-outline btn-icon" data-act="theme"></button>
    </div>

    <section class="hero" aria-label="Jam, tanggal dan waktu sholat">
      ${ornament({ size: 190, cls: 'hero-ornament spin-slow' })}
      <div class="hero-inner">
        <div class="hero-row">
          <div class="hero-clock">
            <span role="timer" aria-label="Jam sekarang" class="clock" data-ref="clock">--:--:--</span>
            <span class="date-m" data-ref="masehi"></span>
            <span class="date-h" data-ref="hijri"></span>
          </div>
          <a href="#/jadwal" class="loc-chip" data-ref="loc" aria-label="Lokasi ${esc(city.name)}, lihat jadwal sholat">${icon('pin', 14)}<span data-ref="locName">${esc(locLabel(city))}</span></a>
        </div>
        <div class="next-box">
          <div class="next-text">
            <span class="hero-muted-sm">Waktu berikutnya</span>
            <span class="next-name" data-ref="next"></span>
          </div>
          <span class="pill-gold" data-ref="countdown"></span>
        </div>
        <div class="prayer-grid" data-ref="cells"></div>
        <a href="#/jadwal" class="hero-link">Jadwal sholat &amp; imsakiyah lengkap ${icon('arrowRight', 16, 2)}</a>
      </div>
    </section>

    <div class="bismillah">
      <span dir="rtl" lang="ar" class="arab">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
      <span class="muted-sm center">Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang</span>
    </div>

    <div data-ref="install"></div>

    <section aria-label="Bacaan" class="features">
      <div class="section-head">
        <h2>Bacaan</h2>
        <span class="muted-xs">16 menu</span>
      </div>
      <div class="feature-grid">
        ${FEATURES.map(([name, ic, href, hue, chroma = 1], i) => `
          <a href="${href}" class="feature stagger-item" style="--i:${i}">
            <span class="tile" style="--h:${hue}; --c:${chroma}">${icon(ic, 22)}</span>
            <span class="feature-name">${esc(name)}</span>
          </a>`).join('')}
      </div>
    </section>

    <div class="card">
      <div class="card-header has-action">
        <h3 class="card-title">Lanjutkan membaca</h3>
        <p class="card-desc">${esc(readDesc)}</p>
        <div class="card-action"><span class="badge badge-secondary">${pct}%</span></div>
      </div>
      <div class="card-content stack-14">
        <div class="progress" role="progressbar" aria-label="Progres Surah Yasin" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
          <div class="progress-fill" data-ref="yasinFill" style="width: 0%"></div>
        </div>
        <a href="${readHref}" class="btn btn-default btn-block">${esc(readCta)} ${icon('arrowRight', 16, 2)}</a>
      </div>
    </div>
  </div>

  <nav aria-label="Navigasi utama" class="bottom-nav">
    <a href="#/" aria-current="page">${icon('home', 20)}Beranda</a>
    <a href="#/yasin">${icon('book', 20)}Yasin</a>
    <a href="#/tahlil">${icon('beads', 20)}Tahlil</a>
  </nav>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const themeBtn = el.querySelector('[data-act="theme"]');
  const paintTheme = () => {
    const dark = isDark();
    themeBtn.innerHTML = dark ? icon('sun') : icon('moon');
    themeBtn.setAttribute('aria-label', dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  };
  paintTheme();
  themeBtn.addEventListener('click', () => { setDark(!isDark()); paintTheme(); });


  // Isi progres setelah frame pertama agar lebar bar beranimasi.
  requestAnimationFrame(() => requestAnimationFrame(() => { $('yasinFill').style.width = pct + '%'; }));

  let dayKey = '', t = null, lastNext = '';
  const tick = () => {
    const now = new Date();
    $('clock').textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    const cn = cityNow(city, now);
    const key = cn.y + '-' + cn.m + '-' + cn.d;
    if (key !== dayKey) {
      dayKey = key;
      t = times(cn.y, cn.m, cn.d, city);
      $('masehi').textContent = masehi(now);
      $('hijri').textContent = hijri(now);
      lastNext = '';
    }
    const nx = nextPrayer(t, cn.min);
    $('countdown').textContent = nx.countdown;
    if (nx.name !== lastNext) {
      lastNext = nx.name;
      $('next').textContent = nx.name + ' · ' + nx.time;
      $('cells').innerHTML = WAJIB.map((k) => `
        <div class="prayer-cell${k === nx.name ? ' is-next pulse' : ''}">
          <span class="pc-name">${k}</span><span class="pc-time">${hm(t[k])}</span>
        </div>`).join('');
    }
  };
  tick();
  const timer = setInterval(tick, 1000);

  // Lokasi terdeteksi/diperbarui otomatis: perbarui nama dan hitung ulang jadwal.
  const onLoc = () => {
    const prevKey = city.lat + ',' + city.lng + ',' + city.name;
    city = currentLocation();
    const label = locLabel(city);
    if ($('locName').textContent !== label) {
      $('locName').textContent = label;
      $('loc').setAttribute('aria-label', 'Lokasi ' + city.name + ', lihat jadwal sholat');
      replay($('loc'), 'loc-flash');
    }
    if (prevKey !== city.lat + ',' + city.lng + ',' + city.name) { dayKey = ''; tick(); }
  };
  window.addEventListener(LOC_EVENT, onLoc);

  // Kartu "Pasang aplikasi": Android memakai dialog instal bawaan, iPhone diberi langkah Safari.
  const paintInstall = () => {
    const box = $('install');
    if (isStandalone() || (!canPrompt() && !isIOS())) { box.innerHTML = ''; return; }
    box.innerHTML = `
      <div class="install-card">
        <span class="install-ic">${icon('phone', 22)}</span>
        <div class="install-text">
          <strong>Pasang di HP</strong>
          <span>${canPrompt() ? 'Buka langsung dari layar utama, seperti aplikasi biasa.' : 'Di Safari: ketuk tombol Bagikan, lalu pilih “Tambahkan ke Layar Utama”.'}</span>
        </div>
        ${canPrompt() ? '<button type="button" class="btn btn-default btn-sm" data-act="install">Pasang</button>' : ''}
      </div>`;
    const b = box.querySelector('[data-act="install"]');
    if (b) b.addEventListener('click', () => promptInstall().then(paintInstall));
  };
  paintInstall();
  window.addEventListener(INSTALL_EVENT, paintInstall);

  return { el, destroy: () => { clearInterval(timer); window.removeEventListener(LOC_EVENT, onLoc); window.removeEventListener(INSTALL_EVENT, paintInstall); } };
}
