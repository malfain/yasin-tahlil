// Tasbih digital: tombol ketuk besar dengan cincin progres, pilihan bacaan & target,
// hitungan putaran, reset dua-ketuk, tersimpan per bacaan.
import { icon } from '../icons.js';
import { esc, toast, vibrate, replay } from '../ui.js';
import * as store from '../store.js';

const DZIKIR = [
  { id: 'subhanallah', latin: 'Subhanallah', arab: 'سُبْحَانَ اللّٰهِ', arti: 'Maha Suci Allah' },
  { id: 'alhamdulillah', latin: 'Alhamdulillah', arab: 'اَلْحَمْدُ لِلّٰهِ', arti: 'Segala puji bagi Allah' },
  { id: 'allahuakbar', latin: 'Allahu akbar', arab: 'اَللّٰهُ أَكْبَرُ', arti: 'Allah Maha Besar' },
  { id: 'tahlil', latin: 'La ilaha illallah', arab: 'لَا إِلٰهَ إِلَّا اللّٰهُ', arti: 'Tiada Tuhan selain Allah' },
  { id: 'istighfar', latin: 'Astaghfirullah', arab: 'أَسْتَغْفِرُ اللّٰهَ', arti: 'Aku memohon ampun kepada Allah' },
  { id: 'sholawat', latin: 'Allahumma sholli ‘ala Muhammad', arab: 'اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ', arti: 'Ya Allah, limpahkan sholawat kepada Nabi Muhammad', short: 'Sholawat' }
];
const TARGETS = [[33, '33'], [99, '99'], [100, '100'], [0, '∞']];
const RING = 2 * Math.PI * 92; // keliling cincin progres (r = 92)

export function mount(host) {
  const saved = store.get('tasbih', {}) || {};
  let sel = DZIKIR.some((d) => d.id === saved.sel) ? saved.sel : DZIKIR[0].id;
  let target = TARGETS.some(([t]) => t === saved.target) ? saved.target : 33;
  const counts = {};
  DZIKIR.forEach((d) => {
    const c = (saved.counts && saved.counts[d.id]) || {};
    counts[d.id] = {
      count: Math.max(0, Number(c.count) || 0),
      rounds: Math.max(0, Number(c.rounds) || 0),
      total: Math.max(0, Number(c.total) || 0)
    };
  });
  let resetArmed = false;
  let resetTimer = 0;

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Tasbih Digital</h1>
        <span class="hero-muted-sm">Ketuk tombol besar untuk menghitung</span>
      </div>
    </div>
    <div role="radiogroup" aria-label="Target hitungan" class="seg seg-hero">
      ${TARGETS.map(([t, label]) => `<button type="button" role="radio" data-target="${t}" aria-checked="${t === target}" aria-label="${t ? 'Target ' + t : 'Tanpa batas'}">${label}</button>`).join('')}
    </div>
  </header>

  <main class="scroll tools-main tb-main">
    <div class="chips tb-chips" role="group" aria-label="Pilihan bacaan">
      ${DZIKIR.map((d) => `<button type="button" class="chip" data-dzikir="${d.id}" aria-pressed="${d.id === sel}">${esc(d.short || d.latin)}</button>`).join('')}
    </div>

    <section class="tb-reading" data-ref="reading" aria-live="polite">
      <p dir="rtl" lang="ar" class="tb-arab" data-ref="arab"></p>
      <p class="tb-latin" data-ref="latin"></p>
      <p class="muted-xs center" data-ref="arti"></p>
    </section>

    <div class="tb-stage" data-ref="stage">
      <button type="button" class="tb-tap" data-act="tap">
        <svg class="tb-ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="92" class="tb-ring-bg"></circle>
          <circle cx="100" cy="100" r="92" class="tb-ring-fill" data-ref="ring" stroke-dasharray="${RING.toFixed(2)}" stroke-dashoffset="${RING.toFixed(2)}"></circle>
        </svg>
        <span class="tb-tap-inner">
          <span class="tb-count tnum" data-ref="count">0</span>
          <span class="tb-target tnum" data-ref="target"></span>
        </span>
        <span class="burst tb-burst" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => `<i style="--a:${i * 30}deg"></i>`).join('')}</span>
      </button>
    </div>
    <p class="sr-only" aria-live="assertive" data-ref="announce"></p>

    <div class="tb-stats">
      <div class="tb-stat"><span class="muted-xs">Putaran</span><strong class="tnum" data-ref="rounds">0</strong></div>
      <div class="tb-stat"><span class="muted-xs">Total bacaan ini</span><strong class="tnum" data-ref="total">0</strong></div>
    </div>

    <button type="button" class="btn btn-outline tb-reset" data-act="reset">${icon('reset', 16, 2)} <span data-ref="resetLabel">Reset hitungan</span></button>
    <p class="muted-xs center">Tombol bisa ditekan dengan Spasi atau Enter saat terfokus.</p>
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const tapBtn = el.querySelector('[data-act="tap"]');
  const resetBtn = el.querySelector('[data-act="reset"]');
  const fmt = (n) => n.toLocaleString('id-ID');
  const cur = () => counts[sel];
  const dz = () => DZIKIR.find((d) => d.id === sel);

  const save = () => store.set('tasbih', { sel, target, counts });

  const paint = () => {
    const c = cur();
    const d = dz();
    $('arab').textContent = d.arab;
    $('latin').textContent = d.latin;
    $('arti').textContent = d.arti;
    $('count').textContent = fmt(c.count);
    $('target').textContent = target ? '/ ' + target : 'tanpa batas';
    $('rounds').textContent = fmt(c.rounds);
    $('total').textContent = fmt(c.total);
    const frac = target ? Math.min(1, c.count / target) : (c.count % 100) / 100;
    $('ring').style.strokeDashoffset = String(RING * (1 - frac));
    tapBtn.setAttribute('aria-label', 'Hitung ' + d.latin + ', ' + c.count + (target ? ' dari ' + target : '') + ', putaran ' + c.rounds);
    $('stage').classList.toggle('is-full', !!target && c.count >= target);
  };

  const ripple = (e) => {
    const r = tapBtn.getBoundingClientRect();
    const s = document.createElement('span');
    s.className = 'ripple';
    const pointer = e && e.detail > 0 && e.clientX;
    s.style.left = (pointer ? e.clientX - r.left : r.width / 2) + 'px';
    s.style.top = (pointer ? e.clientY - r.top : r.height / 2) + 'px';
    tapBtn.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
    setTimeout(() => s.remove(), 800);
  };

  tapBtn.addEventListener('click', (e) => {
    const c = cur();
    // Setelah target tercapai, ketukan berikutnya memulai putaran baru dari 1.
    if (target && c.count >= target) c.count = 0;
    c.count += 1;
    c.total += 1;
    ripple(e);
    replay($('count'), 'pop');
    if (target && c.count === target) {
      c.rounds += 1;
      vibrate([40, 60, 40, 60, 80]);
      replay($('stage'), 'celebrate');
      $('announce').textContent = 'Target ' + target + ' tercapai. Putaran ' + c.rounds + '.';
      toast('MasyaAllah, ' + target + '× ' + dz().latin + ' selesai');
    } else if (!target && c.count % 100 === 0) {
      c.rounds += 1;
      vibrate([30, 50, 30]);
      replay($('stage'), 'celebrate');
    } else {
      vibrate(12);
    }
    save();
    paint();
  });
  // Tahan Enter tidak boleh menghitung beruntun.
  tapBtn.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.repeat) e.preventDefault();
  });

  const disarm = () => {
    resetArmed = false;
    clearTimeout(resetTimer);
    resetBtn.classList.remove('is-armed');
    $('resetLabel').textContent = 'Reset hitungan';
  };
  resetBtn.addEventListener('click', () => {
    if (!resetArmed) {
      resetArmed = true;
      resetBtn.classList.add('is-armed');
      $('resetLabel').textContent = 'Ketuk lagi untuk reset';
      resetTimer = setTimeout(disarm, 3000);
      return;
    }
    disarm();
    counts[sel] = { count: 0, rounds: 0, total: 0 };
    save();
    paint();
    replay($('count'), 'pop');
    toast('Hitungan ' + dz().latin + ' direset');
  });

  el.querySelectorAll('[data-target]').forEach((b) => b.addEventListener('click', () => {
    target = Number(b.dataset.target);
    el.querySelectorAll('[data-target]').forEach((x) => {
      x.setAttribute('aria-checked', String(x === b));
    });
    if (target && cur().count > target) cur().count = cur().count % target;
    save();
    paint();
  }));

  el.querySelectorAll('[data-dzikir]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.dzikir === sel) return;
    sel = b.dataset.dzikir;
    el.querySelectorAll('[data-dzikir]').forEach((x) => {
      x.setAttribute('aria-pressed', String(x === b));
    });
    disarm();
    save();
    paint();
    replay($('reading'), 'swap-in');
  }));

  paint();
  return { el, destroy: () => clearTimeout(resetTimer) };
}
