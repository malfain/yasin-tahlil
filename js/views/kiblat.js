// Arah Kiblat: bearing great-circle ke Ka'bah dari lokasi otomatis, jarak ke Makkah,
// kompas visual yang berputar mengikuti arah HP bila sensor orientasi tersedia.
import { icon } from '../icons.js';
import { esc, toast, vibrate, replay } from '../ui.js';
import { currentLocation, detect, EVENT as LOC_EVENT } from '../location.js';

const KAABA = { lat: 21.4225, lng: 39.8262 };
const TOLERANCE = 5; // derajat dianggap "menghadap kiblat"

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const norm = (a) => ((a % 360) + 360) % 360;

export function qiblaBearing(lat, lng) {
  const p1 = rad(lat), p2 = rad(KAABA.lat), dl = rad(KAABA.lng - lng);
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return norm(deg(Math.atan2(y, x)));
}

export function distanceKm(lat, lng) {
  const p1 = rad(lat), p2 = rad(KAABA.lat);
  const dp = p2 - p1, dl = rad(KAABA.lng - lng);
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DIRS = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
const dirName = (b) => DIRS[Math.round(norm(b) / 45) % 8];
const fmtDeg = (n) => n.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtKm = (n) => Math.round(n).toLocaleString('id-ID');

// Ikon lokal (garis, currentColor).
const svgIcon = (body, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ICON_KAABA = '<path d="M4 7.5 12 4l8 3.5v10L12 21l-8-3.5z"></path><path d="M4 7.5 12 11l8-3.5"></path><path d="M12 11v10"></path><path d="M4 11l8 3.5 8-3.5"></path>';
const ICON_PHONE = '<rect x="7" y="2" width="10" height="20" rx="2.5"></rect><path d="M11 18h2"></path>';

// Piringan kompas: garis derajat, label U/T/S/B, dan penanda Ka'bah pada sudut kiblat.
function dialSvg() {
  let ticks = '';
  for (let a = 0; a < 360; a += 5) {
    const major = a % 30 === 0;
    const len = a % 90 === 0 ? 12 : major ? 8 : 4;
    ticks += `<line x1="100" y1="${8}" x2="100" y2="${8 + len}" transform="rotate(${a} 100 100)" class="kb-tick${major ? ' major' : ''}"></line>`;
  }
  let nums = '';
  for (let a = 30; a < 360; a += 30) {
    if (a % 90 === 0) continue;
    nums += `<text x="100" y="38" transform="rotate(${a} 100 100)" class="kb-num">${a}</text>`;
  }
  const card = [['U', 0, ' north'], ['T', 90, ''], ['S', 180, ''], ['B', 270, '']]
    .map(([t, a, c]) => `<text x="100" y="40" transform="rotate(${a} 100 100)" class="kb-card${c}">${t}</text>`).join('');
  return `<svg viewBox="0 0 200 200" class="kb-dial-svg" aria-hidden="true">
    <circle cx="100" cy="100" r="96" class="kb-face"></circle>
    <circle cx="100" cy="100" r="62" class="kb-inner"></circle>
    ${ticks}${nums}${card}
    <g class="kb-needle" data-ref="needle">
      <line x1="100" y1="100" x2="100" y2="34" class="kb-needle-line"></line>
      <path d="M100 22 l9 16 h-18 z" class="kb-needle-head"></path>
      <g transform="translate(88 2)" class="kb-kaaba"><rect x="2" y="2" width="20" height="18" rx="2"></rect><path d="M2 8h20" class="kb-kaaba-band"></path></g>
    </g>
    <circle cx="100" cy="100" r="6" class="kb-hub"></circle>
  </svg>`;
}

export function mount(host) {
  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Arah Kiblat</h1>
        <span class="hero-muted-sm" data-ref="place"></span>
      </div>
      <button type="button" class="hero-icon-btn" data-act="relocate" aria-label="Perbarui lokasi">${icon('pin', 18, 2)}</button>
    </div>
  </header>

  <main class="scroll tools-main kb-main">
    <section class="kb-stage" aria-label="Kompas kiblat">
      <div class="kb-compass" data-ref="compass">
        <span class="kb-pointer" aria-hidden="true"></span>
        <div class="kb-dial" data-ref="dial">${dialSvg()}</div>
        <span class="kb-glow" aria-hidden="true"></span>
      </div>
      <p class="kb-status" data-ref="status" aria-live="polite"></p>
      <button type="button" class="btn btn-default kb-enable" data-act="enable" hidden>${svgIcon(ICON_PHONE, 18)} Aktifkan kompas</button>
    </section>

    <section class="kb-stats" aria-label="Data kiblat">
      <div class="kb-stat">
        <span class="kb-stat-ic">${svgIcon(ICON_KAABA, 18)}</span>
        <span class="muted-xs">Arah kiblat</span>
        <strong class="kb-stat-val tnum" data-ref="bearing"></strong>
        <span class="muted-xs" data-ref="dir"></span>
      </div>
      <div class="kb-stat">
        <span class="kb-stat-ic">${icon('pin', 18, 2)}</span>
        <span class="muted-xs">Jarak ke Makkah</span>
        <strong class="kb-stat-val tnum" data-ref="dist"></strong>
        <span class="muted-xs">garis lurus (great-circle)</span>
      </div>
    </section>

    <section class="tools-card" aria-labelledby="kb-guide-title">
      <h2 id="kb-guide-title" class="tools-card-title">Panduan</h2>
      <p class="tools-text" data-ref="guide"></p>
      <ul class="tools-list">
        <li>Letakkan HP mendatar, jauhkan dari benda logam, magnet, atau perangkat elektronik.</li>
        <li>Bila arah terasa melenceng, kalibrasi kompas dengan menggerakkan HP membentuk angka 8.</li>
        <li>Tanpa sensor kompas, gunakan kompas biasa: hadapkan diri ke utara, lalu putar searah jarum jam sebesar derajat di atas.</li>
      </ul>
    </section>
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const dial = $('dial'), needle = $('needle'), compass = $('compass'), status = $('status');
  const enableBtn = el.querySelector('[data-act="enable"]');

  let bearing = 0;
  let heading = null;     // derajat dari utara, arah atas HP
  let dialRot = 0;        // rotasi kumulatif (tanpa lompatan 359→0)
  let aligned = false;
  let listening = false;
  let gotData = false;
  let probeTimer = 0;
  let frame = 0;

  const paintLocation = () => {
    const c = currentLocation();
    bearing = qiblaBearing(c.lat, c.lng);
    $('place').textContent = c.fallback ? 'Lokasi belum terdeteksi · memakai Jakarta' : c.name;
    $('bearing').textContent = fmtDeg(bearing) + '°';
    $('dir').textContent = 'dari utara · ' + dirName(bearing);
    $('dist').textContent = fmtKm(distanceKm(c.lat, c.lng)) + ' km';
    $('guide').innerHTML = `Dari <strong>${esc(c.name)}</strong>, kiblat berada <strong>${fmtDeg(bearing)}°</strong> dari arah utara searah jarum jam, yaitu ke arah <strong>${dirName(bearing)}</strong>.`;
    needle.setAttribute('transform', `rotate(${bearing.toFixed(2)} 100 100)`);
    compass.setAttribute('aria-label', 'Kiblat ' + fmtDeg(bearing) + ' derajat dari utara');
    paintHeading();
  };

  const paintHeading = () => {
    if (heading === null) {
      dial.style.transform = 'rotate(0deg)';
      compass.classList.remove('is-live', 'is-aligned');
      return;
    }
    // Rotasi terpendek dari posisi sebelumnya agar piringan tidak berputar balik.
    const target = -heading;
    const delta = ((target - dialRot) % 360 + 540) % 360 - 180;
    dialRot += delta;
    dial.style.transform = `rotate(${dialRot.toFixed(2)}deg)`;
    compass.classList.add('is-live');
    const diff = ((bearing - heading) % 360 + 540) % 360 - 180;
    const nowAligned = Math.abs(diff) <= TOLERANCE;
    if (nowAligned && !aligned) {
      vibrate([40, 50, 40]);
      replay(compass, 'kb-hit');
    }
    aligned = nowAligned;
    compass.classList.toggle('is-aligned', aligned);
    status.textContent = aligned
      ? 'Anda menghadap kiblat'
      : 'Putar ke ' + (diff > 0 ? 'kanan' : 'kiri') + ' ' + Math.round(Math.abs(diff)) + '°';
  };

  const screenAngle = () => {
    try { return (screen.orientation && screen.orientation.angle) || Number(window.orientation) || 0; } catch (e) { return 0; }
  };

  const onOrient = (e) => {
    let h = null;
    if (typeof e.webkitCompassHeading === 'number' && !Number.isNaN(e.webkitCompassHeading)) {
      h = e.webkitCompassHeading; // iOS: sudah relatif utara magnetik
    } else if ((e.absolute || e.type === 'deviceorientationabsolute') && typeof e.alpha === 'number') {
      h = 360 - e.alpha;
    }
    if (h === null) return;
    gotData = true;
    heading = norm(h + screenAngle());
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; paintHeading(); });
  };

  const evName = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation';
  const needsPermission = typeof window.DeviceOrientationEvent !== 'undefined' &&
    typeof window.DeviceOrientationEvent.requestPermission === 'function';

  const staticMode = (msg) => {
    heading = null;
    paintHeading();
    status.textContent = msg;
  };

  const startListening = () => {
    if (listening) return;
    listening = true;
    window.addEventListener(evName, onOrient, true);
    status.textContent = 'Mencari sensor kompas…';
    clearTimeout(probeTimer);
    probeTimer = setTimeout(() => {
      if (!gotData) staticMode('Sensor kompas tidak tersedia. Ikuti panduan derajat di bawah.');
    }, 3000);
  };

  const stopListening = () => {
    if (!listening) return;
    listening = false;
    window.removeEventListener(evName, onOrient, true);
  };

  enableBtn.addEventListener('click', async () => {
    try {
      const res = await window.DeviceOrientationEvent.requestPermission();
      if (res === 'granted') {
        enableBtn.hidden = true;
        startListening();
      } else {
        staticMode('Izin sensor ditolak. Ikuti panduan derajat di bawah.');
        toast('Izin kompas ditolak');
      }
    } catch (err) {
      staticMode('Kompas tidak dapat diaktifkan. Ikuti panduan derajat di bawah.');
    }
  });

  el.querySelector('[data-act="relocate"]').addEventListener('click', () => {
    toast('Memperbarui lokasi…');
    detect().catch(() => toast('Lokasi tidak dapat diperbarui'));
  });

  const onLoc = () => { paintLocation(); replay($('bearing'), 'tools-pop'); };
  window.addEventListener(LOC_EVENT, onLoc);

  paintLocation();
  if (!('DeviceOrientationEvent' in window)) {
    staticMode('Perangkat ini tidak memiliki sensor kompas. Ikuti panduan derajat di bawah.');
  } else if (needsPermission) {
    enableBtn.hidden = false;
    status.textContent = 'Ketuk “Aktifkan kompas” agar piringan mengikuti arah HP.';
  } else {
    startListening();
  }

  return {
    el,
    destroy: () => {
      stopListening();
      clearTimeout(probeTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener(LOC_EVENT, onLoc);
    }
  };
}
