// Tahlil lengkap versi Kitab Majmu' Syarif (NU): teks penuh tiap langkah (Arab, latin, arti), penghitung ketuk yang menempel di
// bawah, mode tampilan & ukuran huruf seperti layar Yasin, serta daftar urutan bacaan.
import { icon } from '../icons.js';
import { esc, replay, vibrate, toast, reducedMotion } from '../ui.js';
import * as store from '../store.js';
import { tahlilSteps, JUMLAH_TAHLIL } from '../data/tahlil.js';

const MODES = [['lengkap', 'Lengkap'], ['latin', 'Arab-Latin'], ['arab', 'Arab saja']];
const MIN_SIZE = 20, MAX_SIZE = 40;

export function mount(host) {
  // Bawaan 160× sesuai Kitab Majmu' Syarif; pilihan lain tetap tersedia.
  let jumlah = Number(store.get('tahlilJumlah', 160));
  if (!JUMLAH_TAHLIL.includes(jumlah)) jumlah = 160;
  let list = tahlilSteps(jumlah);
  const saved = store.get('tahlil', { idx: 0, count: 0 }) || {};
  let idx = Math.max(0, Math.min(list.length - 1, Number(saved.idx) || 0));
  let count = Math.max(0, Math.min(list[idx].target, Number(saved.count) || 0));
  let mode = store.get('yasinMode', 'lengkap');
  if (!MODES.some(([v]) => v === mode)) mode = 'lengkap';
  let size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Number(store.get('yasinSize', 26)) || 26));

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="plain-header">
    <div class="bar">
      <a href="#/" class="icon-link" aria-label="Kembali ke beranda">${icon('back', 20)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Tahlil</h1>
        <span class="muted-xs">Untuk: almarhum/almarhumah</span>
      </div>
      <span class="badge badge-secondary tnum" data-ref="stepLabel"></span>
    </div>
    <div class="progress" role="progressbar" aria-label="Progres bacaan tahlil" aria-valuemin="0" aria-valuemax="100" data-ref="bar">
      <div class="progress-fill" data-ref="fill" style="width: 0%"></div>
    </div>
    <div class="tahlil-tools">
      <div role="tablist" aria-label="Tampilan bacaan" class="seg seg-sm">
        ${MODES.map(([v, label]) => `<button type="button" role="tab" data-mode="${v}" aria-selected="${v === mode}">${label}</button>`).join('')}
      </div>
      <button type="button" class="btn btn-outline btn-icon" data-act="smaller" aria-label="Perkecil huruf Arab">A−</button>
      <button type="button" class="btn btn-outline btn-icon" data-act="bigger" aria-label="Perbesar huruf Arab">A+</button>
    </div>
  </header>

  <main class="scroll tahlil-main mode-${mode}" style="--arab-size: ${size}px" data-ref="main">
    <section aria-label="Bacaan saat ini" class="tahlil-reading" data-ref="reading" aria-live="polite"></section>

    <div class="setting-row">
      <span class="label" id="lbl-jumlah">Jumlah bacaan tahlil</span>
      <div class="seg seg-sm" role="radiogroup" aria-labelledby="lbl-jumlah">
        ${JUMLAH_TAHLIL.map((n) => `<button type="button" role="radio" data-jumlah="${n}" aria-checked="${n === jumlah}">${n}×</button>`).join('')}
      </div>
    </div>
    <h2 class="list-title">Urutan bacaan</h2>
    <ol class="steps" data-ref="steps">
      ${list.map((s, i) => `
        <li class="stagger-item" style="--i:${Math.min(i, 14)}">
          <button type="button" class="step" data-step="${i}">
            <span class="dot"></span>
            <span class="step-name">${esc(s.name)}</span>
            <span class="step-target tnum"></span>
          </button>
        </li>`).join('')}
    </ol>
    <button type="button" class="btn btn-outline btn-sm restart" data-act="restart">${icon('reset', 16)} Mulai ulang dari awal</button>
  </main>

  <footer class="tahlil-current" data-ref="current">
    <div class="counter-row">
      <span class="cur-name" data-ref="curName"></span>
      <div class="counter">
        <span class="count tnum" data-ref="count"></span>
        <span class="count-target tnum" data-ref="target"></span>
        <span class="burst" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg"></i>`).join('')}</span>
      </div>
    </div>
    <div class="tap-row">
      <button type="button" class="btn btn-outline btn-icon-lg" data-act="reset" aria-label="Ulangi hitungan">${icon('reset')}</button>
      <button type="button" class="btn btn-default btn-lg tap-btn" data-act="tap"><span data-ref="tapLabel"></span></button>
      <button type="button" class="btn btn-outline btn-icon-lg" data-act="next" aria-label="Bacaan berikutnya">${icon('chevRight')}</button>
    </div>
  </footer>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const main = $('main');
  const stepBtns = Array.from(el.querySelectorAll('[data-step]'));
  const isFinished = () => idx === list.length - 1 && count >= list[idx].target;
  const save = () => store.set('tahlil', { idx, count });

  const renderReading = () => {
    const s = list[idx];
    $('reading').innerHTML = `
      <div class="reading-head">
        <span class="reading-no tnum">${idx + 1}</span>
        <div class="reading-title">
          <h2>${esc(s.name)}</h2>
          ${s.note ? `<p class="baca-note">${esc(s.note)}</p>` : ''}
        </div>
        <span class="badge badge-outline tnum">${s.target}×</span>
      </div>
      ${s.parts.map((p) => `
        <div class="reading-part">
          ${p.label ? `<span class="part-label">${esc(p.label)}</span>` : ''}
          <p dir="rtl" lang="ar" class="ayat-arab">${esc(p.arab)}</p>
          <p class="ayat-latin">${esc(p.latin)}</p>
          <p class="baca-arti">${esc(p.arti)}</p>
        </div>`).join('')}`;
  };

  const paintSteps = (animate) => {
    stepBtns.forEach((b, i) => {
      const done = i < idx || (i === idx && isFinished());
      const cur = i === idx;
      b.classList.toggle('is-current', cur);
      b.classList.toggle('is-done', done);
      if (cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      b.querySelector('.step-target').textContent = list[i].target + '×';
      const dot = b.querySelector('.dot');
      const state = done ? 'done' : 'todo';
      if (dot.dataset.state !== state) {
        dot.dataset.state = state;
        dot.innerHTML = done ? `<span class="${animate ? 'check-pop' : ''}">${icon('check', 14)}</span>` : String(i + 1);
      }
    });
  };

  const paint = ({ stepChanged = false, animate = false } = {}) => {
    const cur = list[idx];
    const finished = isFinished();
    $('stepLabel').textContent = (idx + 1) + ' dari ' + list.length;
    const overall = Math.round(((idx + count / cur.target) / list.length) * 100);
    $('bar').setAttribute('aria-valuenow', String(overall));
    $('fill').style.width = overall + '%';
    $('curName').textContent = cur.name;
    $('count').textContent = String(count);
    $('target').textContent = '/ ' + cur.target + '×';
    $('tapLabel').textContent = finished ? 'Selesai — Alhamdulillah' : (count + 1 >= cur.target ? 'Hitung & lanjut' : 'Ketuk untuk menghitung');
    el.querySelector('[data-act="next"]').disabled = idx === list.length - 1;
    $('current').classList.toggle('is-finished', finished);
    if (stepChanged) {
      renderReading();
      replay($('reading'), 'swap-in');
      main.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
    paintSteps(animate);
  };

  const go = (i, animate) => {
    idx = Math.max(0, Math.min(list.length - 1, i));
    count = 0;
    save();
    paint({ stepChanged: true, animate });
  };

  // Efek ripple pada tombol ketuk
  const tapBtn = el.querySelector('[data-act="tap"]');
  const ripple = (e) => {
    const r = tapBtn.getBoundingClientRect();
    const s = document.createElement('span');
    s.className = 'ripple';
    s.style.left = (e.clientX ? e.clientX - r.left : r.width / 2) + 'px';
    s.style.top = (e.clientY ? e.clientY - r.top : r.height / 2) + 'px';
    tapBtn.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
    setTimeout(() => s.remove(), 800);
  };

  tapBtn.addEventListener('click', (e) => {
    if (isFinished()) return;
    ripple(e);
    const n = count + 1;
    if (n >= list[idx].target && idx < list.length - 1) {
      vibrate([15, 40, 25]);
      go(idx + 1, true);
      return;
    }
    count = n;
    save();
    vibrate(12);
    replay($('count'), 'pop');
    paint({ animate: true });
    if (isFinished()) {
      vibrate([30, 60, 30, 60, 60]);
      replay($('current'), 'celebrate');
      toast('Alhamdulillah, bacaan tahlil selesai');
    }
  });

  el.querySelector('[data-act="reset"]').addEventListener('click', () => {
    count = 0;
    save();
    replay($('count'), 'pop');
    paint();
  });
  el.querySelector('[data-act="next"]').addEventListener('click', () => go(idx + 1, true));
  el.querySelector('[data-act="restart"]').addEventListener('click', () => go(0, false));
  stepBtns.forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.step), true)));

  el.querySelectorAll('[data-jumlah]').forEach((b) => b.addEventListener('click', () => {
    jumlah = Number(b.dataset.jumlah);
    store.set('tahlilJumlah', jumlah);
    el.querySelectorAll('[data-jumlah]').forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    list = tahlilSteps(jumlah);
    count = Math.min(count, list[idx].target);
    save();
    renderReading();
    paint();
  }));

  // Mode tampilan & ukuran huruf (disimpan bersama pengaturan layar Yasin)
  el.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    store.set('yasinMode', mode);
    el.querySelectorAll('[data-mode]').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    main.classList.remove('mode-lengkap', 'mode-latin', 'mode-arab');
    main.classList.add('mode-' + mode);
  }));
  const setSize = (s) => {
    size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, s));
    store.set('yasinSize', size);
    main.style.setProperty('--arab-size', size + 'px');
  };
  el.querySelector('[data-act="smaller"]').addEventListener('click', () => setSize(size - 2));
  el.querySelector('[data-act="bigger"]').addEventListener('click', () => setSize(size + 2));

  renderReading();
  paint();
  // Mulai bar dari 0 agar lebarnya beranimasi saat layar dibuka.
  const fill = $('fill'), w = fill.style.width;
  fill.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = w; }));
  return { el, destroy: () => {} };
}
