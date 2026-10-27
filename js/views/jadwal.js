// Jadwal Sholat & Imsak: lokasi otomatis (GPS), navigasi hari, ringkasan imsak/berbuka, tabel sebulan.
import { icon, ornament } from '../icons.js';
import { esc } from '../ui.js';
import { times, hm, ORDER, cityNow, nextPrayer, masehi, hijri, formatDate } from '../prayer.js';
import { currentLocation, detect, detectStatus, EVENT as LOC_EVENT } from '../location.js';

export function mount(host) {
  let offset = 0;

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="plain-header">
    <div class="bar">
      <a href="#/" class="icon-link" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Jadwal Sholat &amp; Imsak</h1>
        <span class="muted-xs">Metode Kemenag RI · Subuh 20° · Isya 18°</span>
      </div>
    </div>
    <div class="loc-status" data-ref="locStatus" aria-live="polite"></div>
  </header>

  <main class="scroll jadwal-main">
    <section aria-label="Ringkasan hari ini" class="hero hero-compact">
      ${ornament({ size: 170, inner: false, cls: 'hero-ornament small spin-slow' })}
      <div class="day-nav">
        <button type="button" class="hero-icon-btn bordered" data-act="prev" aria-label="Hari sebelumnya">${icon('chevLeft', 16, 2)}</button>
        <div class="day-info" aria-live="polite">
          <span class="fw-600 fs-15" data-ref="masehi"></span>
          <span class="date-h" data-ref="hijri"></span>
          <span class="hero-muted-sm" data-ref="city"></span>
        </div>
        <button type="button" class="hero-icon-btn bordered" data-act="next" aria-label="Hari berikutnya">${icon('chevRight', 16, 2)}</button>
      </div>
      <div class="summary-grid">
        <div class="sum-box gold"><span class="fs-12 fw-500">Imsak</span><span class="sum-time tnum" data-ref="imsak"></span></div>
        <div class="sum-box soft"><span class="fs-12 hero-muted">Berbuka (Maghrib)</span><span class="sum-time tnum" data-ref="maghrib"></span></div>
      </div>
      <div class="next-line" data-ref="nextLine"></div>
    </section>

    <section aria-label="Waktu sholat hari ini" class="times-card" data-ref="rows"></section>

    <section aria-label="Jadwal imsakiyah sebulan" class="stack-8">
      <div class="section-head">
        <h2>Jadwal sebulan</h2>
        <span class="muted-xs" data-ref="month"></span>
      </div>
      <div class="table-wrap">
        <table class="month-table">
          <thead>
            <tr>
              <th scope="col" class="left">Tgl</th><th scope="col" class="key">Imsak</th><th scope="col">Subuh</th><th scope="col">Dzuhur</th>
              <th scope="col">Ashar</th><th scope="col" class="key">Maghrib</th><th scope="col">Isya</th>
            </tr>
          </thead>
          <tbody data-ref="tbody"></tbody>
        </table>
      </div>
      <p class="muted-xs">Dihitung otomatis (ihtiyat 2 menit, Imsak = Subuh − 10 menit). Selisih 1–2 menit dari jadwal resmi bisa terjadi.</p>
    </section>
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  let lastSig = '';

  const paint = (force) => {
    const c = currentLocation();
    const now = new Date();
    const cn = cityNow(c, now);
    const day = new Date(cn.y, cn.m - 1, cn.d + offset);
    const t = times(day.getFullYear(), day.getMonth() + 1, day.getDate(), c);
    const isToday = offset === 0;
    const nx = nextPrayer(t, cn.min);
    const sig = [c.name, c.lat, c.lng, offset, cn.y, cn.m, cn.d, nx.name].join('|');

    $('nextLine').innerHTML = isToday
      ? `<span class="hero-muted">Berikutnya: <strong>${nx.name} ${nx.time}</strong></span><span class="pill-gold tnum">${nx.countdown}</span>`
      : `<button type="button" class="link-btn" data-act="today">Kembali ke hari ini</button>`;
    if (!force && sig === lastSig) return;
    const dayChanged = !lastSig || lastSig.split('|').slice(0, 7).join('|') !== sig.split('|').slice(0, 7).join('|');
    lastSig = sig;

    $('masehi').textContent = masehi(day);
    $('hijri').textContent = hijri(day);
    $('city').textContent = c.name + ' · ' + c.zone;
    $('imsak').textContent = hm(t.Imsak);
    $('maghrib').textContent = hm(t.Maghrib);
    $('month').textContent = formatDate(day, { month: 'long', year: 'numeric' }) + ' · ' + c.name;

    $('rows').innerHTML = ORDER.map((k, i) => {
      const isNext = isToday && k === nx.name;
      const sunnah = k === 'Terbit' || k === 'Dhuha';
      return `<div class="time-row stagger-item${isNext ? ' is-next pulse-soft' : ''}${sunnah ? ' sunnah' : ''}${k === 'Imsak' ? ' imsak' : ''}" style="--i:${dayChanged ? i : 0}">
        <span class="dot"></span>
        <span class="time-name">${k}</span>
        ${isNext ? '<span class="badge badge-secondary">Berikutnya</span>' : ''}
        <span class="time-val tnum">${hm(t[k])}</span>
      </div>`;
    }).join('');

    if (dayChanged) {
      const daysIn = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
      let rows = '';
      for (let dd = 1; dd <= daysIn; dd++) {
        const x = times(day.getFullYear(), day.getMonth() + 1, dd, c);
        const sel = dd === day.getDate();
        rows += `<tr${sel ? ' class="is-selected" aria-current="date"' : ''}><th scope="row">${dd}</th><td class="key">${hm(x.Imsak)}</td><td>${hm(x.Subuh)}</td><td>${hm(x.Dzuhur)}</td><td>${hm(x.Ashar)}</td><td class="key">${hm(x.Maghrib)}</td><td>${hm(x.Isya)}</td></tr>`;
      }
      $('tbody').innerHTML = rows;
    }
  };

  // Baris status lokasi: nama + akurasi, sedang mendeteksi, atau pesan gagal + coba lagi.
  const paintLoc = () => {
    const c = currentLocation();
    const st = detectStatus();
    const acc = c.accuracy ? ' · akurasi ±' + (c.accuracy >= 1000 ? (c.accuracy / 1000).toFixed(1) + ' km' : c.accuracy + ' m') : '';
    let html;
    if (st.state === 'detecting') {
      html = `<span class="loc-pin is-loading">${icon('pin', 14, 2)}</span><span>Mendeteksi lokasi Anda…</span>`;
    } else if (st.state === 'error') {
      html = `<span class="loc-pin">${icon('pin', 14, 2)}</span><span class="loc-text"><strong>${esc(c.fallback ? 'Lokasi belum terdeteksi' : c.name)}</strong><span class="loc-err">${esc(st.message)}${c.fallback ? ' Sementara memakai Jakarta.' : ''}</span></span><button type="button" class="link-btn" data-act="retry">Coba lagi</button>`;
    } else if (st.state === 'approx' || c.approx) {
      html = `<span class="loc-pin">${icon('pin', 14, 2)}</span><span class="loc-text"><strong>${esc(c.name)}</strong><span class="loc-err">${esc(c.zone)} · perkiraan dari jaringan. Izinkan akses lokasi untuk hasil lebih akurat.</span></span><button type="button" class="link-btn" data-act="retry">Coba lagi</button>`;
    } else {
      html = `<span class="loc-pin">${icon('pin', 14, 2)}</span><span class="loc-text"><strong>${esc(c.name)}</strong><span class="muted-xs">${esc(c.zone)}${acc}</span></span>`;
    }
    $('locStatus').innerHTML = html;
  };
  $('locStatus').addEventListener('click', (e) => {
    if (e.target.closest('[data-act="retry"]')) detect().catch(() => {});
  });
  const onLoc = () => { paintLoc(); paint(true); };
  window.addEventListener(LOC_EVENT, onLoc);
  el.querySelector('[data-act="prev"]').addEventListener('click', () => { offset -= 1; paint(true); });
  el.querySelector('[data-act="next"]').addEventListener('click', () => { offset += 1; paint(true); });
  $('nextLine').addEventListener('click', (e) => {
    if (e.target.closest('[data-act="today"]')) { offset = 0; paint(true); }
  });

  paintLoc();
  paint(true);
  const timer = setInterval(() => paint(false), 30000);
  return { el, destroy: () => { clearInterval(timer); window.removeEventListener(LOC_EVENT, onLoc); } };
}
