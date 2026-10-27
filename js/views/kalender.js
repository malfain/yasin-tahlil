// Kalender Hijriah: grid bulan Masehi dengan tanggal Hijriah (Umm al-Qura) di tiap sel,
// navigasi bulan, sorotan hari ini, detail hari terpilih, dan hari besar Islam bulan itu.
import { icon } from '../icons.js';
import { esc, replay } from '../ui.js';
import { formatDate } from '../prayer.js';

const H_MONTHS = ['Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 'Jumadil Awal', 'Jumadil Akhir',
  'Rajab', "Sya'ban", 'Ramadhan', 'Syawal', "Dzulqa'dah", 'Dzulhijjah'];
const DAYS = ['Ahad', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// [bulan Hijriah, tanggal, nama]
const EVENTS = [
  [1, 1, 'Tahun Baru Hijriah (1 Muharram)'],
  [1, 10, 'Hari Asyura (10 Muharram)'],
  [3, 12, 'Maulid Nabi Muhammad ﷺ'],
  [7, 27, "Isra' Mi'raj"],
  [8, 15, "Nisfu Sya'ban"],
  [9, 1, 'Awal Ramadhan'],
  [9, 17, "Nuzulul Qur'an"],
  [10, 1, 'Idul Fitri (1 Syawal)'],
  [12, 9, 'Hari Arafah (9 Dzulhijjah)'],
  [12, 10, 'Idul Adha (10 Dzulhijjah)']
];

let hFmt = null;
try { hFmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }); } catch (e) { hFmt = null; }

// Tanggal Hijriah { d, m, y } atau null bila Intl tidak mendukung kalender Islam.
function hijriOf(date) {
  if (!hFmt) return null;
  try {
    const p = {};
    hFmt.formatToParts(date).forEach(({ type, value }) => { p[type] = value; });
    const d = Number(p.day), m = Number(p.month), y = Number(p.year);
    return d && m && y ? { d, m, y } : null;
  } catch (e) {
    return null;
  }
}

const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const hLabel = (h) => h.d + ' ' + H_MONTHS[h.m - 1] + ' ' + h.y + ' H';

export function mount(host) {
  const today = new Date();
  let view = new Date(today.getFullYear(), today.getMonth(), 1, 12);
  let selected = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Kalender Hijriah</h1>
        <span class="hero-muted-sm">Perhitungan Umm al-Qura</span>
      </div>
      <button type="button" class="hero-icon-btn" data-act="today" aria-label="Ke bulan ini">${icon('calendar', 18, 2)}</button>
    </div>
    <div class="kl-nav">
      <button type="button" class="hero-icon-btn bordered" data-act="prev" aria-label="Bulan sebelumnya">${icon('chevLeft', 18, 2)}</button>
      <div class="kl-title" aria-live="polite">
        <span class="kl-month" data-ref="month"></span>
        <span class="date-h" data-ref="hrange"></span>
      </div>
      <button type="button" class="hero-icon-btn bordered" data-act="next" aria-label="Bulan berikutnya">${icon('chevRight', 18, 2)}</button>
    </div>
  </header>

  <main class="scroll tools-main kl-main">
    <section class="kl-cal" aria-label="Kalender bulan" data-ref="cal">
      <div class="kl-week" aria-hidden="true">${DAYS.map((d, i) => `<span${i === 5 ? ' class="is-jumat"' : ''}>${d}</span>`).join('')}</div>
      <div class="kl-grid" data-ref="grid"></div>
    </section>

    <section class="tools-card kl-detail" data-ref="detail" aria-live="polite"></section>

    <section class="tools-card" aria-labelledby="kl-ev-title">
      <h2 id="kl-ev-title" class="tools-card-title">Hari besar Islam bulan ini</h2>
      <ul class="kl-events" data-ref="events"></ul>
      <p class="muted-xs">Tanggal Hijriah dihitung dengan kalender Umm al-Qura dan bisa berbeda ±1 hari dengan penetapan pemerintah (sidang isbat Kementerian Agama RI) atau ormas Islam.</p>
    </section>
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);

  const eventOf = (h) => {
    if (!h) return null;
    const e = EVENTS.find(([m, d]) => m === h.m && d === h.d);
    return e ? e[2] : null;
  };

  const paintDetail = () => {
    const h = hijriOf(selected);
    const ev = eventOf(h);
    $('detail').innerHTML = `
      <span class="muted-xs">${sameDay(selected, today) ? 'Hari ini' : 'Tanggal terpilih'}</span>
      <strong class="kl-detail-m">${esc(formatDate(selected, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}</strong>
      <span class="kl-detail-h">${h ? esc(hLabel(h)) : 'Kalender Hijriah tidak didukung browser ini'}</span>
      ${ev ? `<span class="kl-badge">${esc(ev)}</span>` : ''}`;
  };

  const paint = (dir) => {
    const y = view.getFullYear(), m = view.getMonth();
    const days = new Date(y, m + 1, 0).getDate();
    const lead = new Date(y, m, 1).getDay();
    $('month').textContent = formatDate(view, { month: 'long', year: 'numeric' });

    const first = hijriOf(new Date(y, m, 1, 12));
    const last = hijriOf(new Date(y, m, days, 12));
    if (first && last) {
      $('hrange').textContent = first.y === last.y
        ? (first.m === last.m ? H_MONTHS[first.m - 1] : H_MONTHS[first.m - 1] + ' – ' + H_MONTHS[last.m - 1]) + ' ' + first.y + ' H'
        : H_MONTHS[first.m - 1] + ' ' + first.y + ' – ' + H_MONTHS[last.m - 1] + ' ' + last.y + ' H';
    } else {
      $('hrange').textContent = '';
    }

    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<span class="kl-cell is-empty" aria-hidden="true"></span>';
    const events = [];
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d, 12);
      const h = hijriOf(date);
      const ev = eventOf(h);
      if (ev) events.push({ d, date, h, ev });
      const isToday = sameDay(date, today);
      const isSel = sameDay(date, selected);
      const cls = ['kl-cell', isToday && 'is-today', isSel && 'is-selected', ev && 'has-event', date.getDay() === 5 && 'is-jumat',
        h && h.d === 1 && 'is-hstart'].filter(Boolean).join(' ');
      const label = formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' }) + (h ? ', ' + hLabel(h) : '') + (ev ? ', ' + ev : '') + (isToday ? ', hari ini' : '');
      cells += `<button type="button" class="${cls}" data-day="${d}" aria-label="${esc(label)}"${isSel ? ' aria-pressed="true"' : ' aria-pressed="false"'}${isToday ? ' aria-current="date"' : ''}>
        <span class="kl-d tnum">${d}</span>
        <span class="kl-h tnum">${h ? h.d : ''}</span>
        ${ev ? '<span class="kl-dot" aria-hidden="true"></span>' : ''}
      </button>`;
    }
    $('grid').innerHTML = cells;

    $('events').innerHTML = events.length
      ? events.map(({ d, date, h, ev }, i) => `
        <li class="stagger-item" style="--i:${i}">
          <button type="button" class="kl-ev" data-day="${d}">
            <span class="kl-ev-date"><strong class="tnum">${d}</strong><span>${esc(formatDate(date, { weekday: 'short' }))}</span></span>
            <span class="kl-ev-text"><span class="kl-ev-name">${esc(ev)}</span><span class="muted-xs">${esc(hLabel(h))}</span></span>
          </button>
        </li>`).join('')
      : '<li class="muted-sm">Tidak ada hari besar Islam pada bulan ini.</li>';

    paintDetail();
    if (dir) replay($('cal'), dir > 0 ? 'kl-slide-next' : 'kl-slide-prev');
  };

  const shift = (n) => {
    view = new Date(view.getFullYear(), view.getMonth() + n, 1, 12);
    paint(n);
  };

  const pick = (d) => {
    selected = new Date(view.getFullYear(), view.getMonth(), d, 12);
    el.querySelectorAll('.kl-cell[data-day]').forEach((c) => {
      const on = Number(c.dataset.day) === d;
      c.classList.toggle('is-selected', on);
      c.setAttribute('aria-pressed', String(on));
    });
    paintDetail();
    replay($('detail'), 'swap-in');
  };

  el.querySelector('[data-act="prev"]').addEventListener('click', () => shift(-1));
  el.querySelector('[data-act="next"]').addEventListener('click', () => shift(1));
  el.querySelector('[data-act="today"]').addEventListener('click', () => {
    const dir = Math.sign((today.getFullYear() - view.getFullYear()) * 12 + today.getMonth() - view.getMonth());
    view = new Date(today.getFullYear(), today.getMonth(), 1, 12);
    selected = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
    paint(dir);
  });
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-day]');
    if (b) pick(Number(b.dataset.day));
  });

  // Geser kiri/kanan pada kalender untuk ganti bulan.
  const cal = $('cal');
  let sx = null, sy = null;
  cal.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  cal.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) shift(dx < 0 ? 1 : -1);
  });

  paint(0);
  return { el, destroy: () => {} };
}
