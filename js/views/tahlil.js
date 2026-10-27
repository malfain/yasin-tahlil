// Tahlil: 14 langkah bacaan dengan penghitung ketuk, reset, lanjut, progres, dan daftar urutan.
import { icon } from '../icons.js';
import { esc, replay, vibrate, toast, reducedMotion } from '../ui.js';
import * as store from '../store.js';
import { tahlilSteps } from '../data/tahlil.js';

export function mount(host) {
  let jumlah = store.get('tahlilJumlah', 100) === 33 ? 33 : 100;
  let list = tahlilSteps(jumlah);
  const saved = store.get('tahlil', { idx: 0, count: 0 }) || {};
  let idx = Math.max(0, Math.min(list.length - 1, Number(saved.idx) || 0));
  let count = Math.max(0, Math.min(list[idx].target, Number(saved.count) || 0));

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="plain-header">
    <div class="bar">
      <a href="#/" class="icon-link" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Tahlil</h1>
        <span class="muted-xs">Untuk: almarhum/almarhumah</span>
      </div>
      <span class="badge badge-secondary tnum" data-ref="stepLabel"></span>
    </div>
    <div class="progress" role="progressbar" aria-label="Progres bacaan tahlil" aria-valuemin="0" aria-valuemax="100" data-ref="bar">
      <div class="progress-fill" data-ref="fill" style="width: 0%"></div>
    </div>
  </header>

  <section aria-label="Bacaan saat ini" class="tahlil-current" data-ref="current">
    <div class="cur-body" data-ref="curBody">
      <span class="cur-name" data-ref="curName"></span>
      <p dir="rtl" lang="ar" class="cur-arab" data-ref="curArab"></p>
      <p class="cur-latin" data-ref="curLatin"></p>
    </div>
    <div class="counter" aria-live="polite">
      <span class="count tnum" data-ref="count"></span>
      <span class="count-target tnum" data-ref="target"></span>
      <span class="burst" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg"></i>`).join('')}</span>
    </div>
    <div class="tap-row">
      <button type="button" class="btn btn-outline btn-icon-lg" data-act="reset" aria-label="Ulangi hitungan">${icon('reset')}</button>
      <button type="button" class="btn btn-default btn-lg tap-btn" data-act="tap"><span data-ref="tapLabel"></span></button>
      <button type="button" class="btn btn-outline btn-icon-lg" data-act="next" aria-label="Bacaan berikutnya">${icon('chevRight')}</button>
    </div>
  </section>

  <main class="scroll tahlil-main">
    <div class="setting-row">
      <span class="label" id="lbl-jumlah">Jumlah bacaan tahlil</span>
      <div class="seg seg-sm" role="radiogroup" aria-labelledby="lbl-jumlah">
        ${[33, 100].map((n) => `<button type="button" role="radio" data-jumlah="${n}" aria-checked="${n === jumlah}">${n}×</button>`).join('')}
      </div>
    </div>
    <h2 class="list-title">Urutan bacaan</h2>
    <ol class="steps" data-ref="steps">
      ${list.map((s, i) => `
        <li class="stagger-item" style="--i:${i}">
          <button type="button" class="step" data-step="${i}">
            <span class="dot"></span>
            <span class="step-name">${esc(s.name)}</span>
            <span class="step-target tnum"></span>
          </button>
        </li>`).join('')}
    </ol>
    <button type="button" class="btn btn-outline btn-sm restart" data-act="restart">${icon('reset', 16)} Mulai ulang dari awal</button>
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const stepBtns = Array.from(el.querySelectorAll('[data-step]'));
  const isFinished = () => idx === list.length - 1 && count >= list[idx].target;
  const save = () => store.set('tahlil', { idx, count });

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
        dot.innerHTML = done ? `<span class="${animate ? 'check-pop' : ''}">${icon('check', 14, 2.4)}</span>` : String(i + 1);
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
    $('curArab').textContent = cur.arab;
    $('curLatin').textContent = cur.latin;
    $('count').textContent = String(count);
    $('target').textContent = '/ ' + cur.target + '×';
    $('tapLabel').textContent = finished ? 'Selesai — Alhamdulillah' : (count + 1 >= cur.target ? 'Hitung & lanjut' : 'Ketuk untuk menghitung');
    el.querySelector('[data-act="next"]').disabled = idx === list.length - 1;
    $('current').classList.toggle('is-finished', finished);
    if (stepChanged) {
      replay($('curBody'), 'swap-in');
      const btn = stepBtns[idx];
      if (btn) btn.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
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
    const x = e.clientX ? e.clientX - r.left : r.width / 2;
    const y = e.clientY ? e.clientY - r.top : r.height / 2;
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    tapBtn.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
    setTimeout(() => s.remove(), 800);
  };

  tapBtn.addEventListener('click', (e) => {
    if (isFinished()) return;
    ripple(e);
    const cur = list[idx];
    const n = count + 1;
    if (n >= cur.target && idx < list.length - 1) {
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
    paint();
  }));

  paint();
  // Mulai bar dari 0 agar lebarnya beranimasi saat layar dibuka.
  const fill = $('fill'), w = fill.style.width;
  fill.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = w; }));
  return { el, destroy: () => {} };
}
