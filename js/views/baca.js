// Pembaca konten bacaan (#/baca/<key>): doa, dzikir, sholawat, amalan, kitab maulid, naskah MC.
import { icon } from '../icons.js';
import { esc, replay, vibrate } from '../ui.js';
import * as store from '../store.js';
import { CONTENT, loadContent } from '../data/content/index.js';

const MIN_SIZE = 20, MAX_SIZE = 40;
const paras = (t) => String(t).split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');

function itemHtml(it, k) {
  const counter = it.repeat > 1
    ? `<button type="button" class="rep-btn" data-rep="${it.repeat}" data-count="0" aria-label="Hitung bacaan, target ${it.repeat} kali"><span class="rep-n">0</span>/${it.repeat}×</button>`
    : '';
  return `
    <article class="baca-item stagger-item" style="--i:${Math.min(k, 10)}">
      ${it.title || counter ? `<div class="baca-item-head">${it.title ? `<h3>${esc(it.title)}</h3>` : '<span></span>'}${counter}</div>` : ''}
      ${it.arab ? `<p dir="rtl" lang="ar" class="ayat-arab">${esc(it.arab)}</p>` : ''}
      ${it.latin ? `<p class="ayat-latin">${esc(it.latin)}</p>` : ''}
      ${it.arti ? `<p class="baca-arti">${esc(it.arti)}</p>` : ''}
      ${it.text ? `<div class="baca-text">${paras(it.text)}</div>` : ''}
      ${it.note ? `<p class="baca-note">${esc(it.note)}</p>` : ''}
    </article>`;
}

export function mount(host, params) {
  const key = params[0];
  const group = CONTENT[key];
  if (!group) { location.replace('#/'); return { el: document.createElement('div'), destroy: () => {} }; }
  let size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Number(store.get('yasinSize', 26)) || 26));
  let alive = true;

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/menu/${group}" class="hero-icon-btn" aria-label="Kembali ke menu">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1" data-ref="title">Memuat…</h1>
        <span class="hero-muted-sm" data-ref="sub"></span>
      </div>
      <button type="button" class="hero-icon-btn bordered" data-act="smaller" aria-label="Perkecil huruf Arab">A−</button>
      <button type="button" class="hero-icon-btn bordered gold big" data-act="bigger" aria-label="Perbesar huruf Arab">A+</button>
    </div>
  </header>
  <main class="scroll yasin-main baca-main" style="--arab-size: ${size}px" data-ref="main" aria-busy="true">
    ${Array.from({ length: 3 }, () => `<div class="ayat skeleton-card" aria-hidden="true"><div class="sk sk-line w-60"></div><div class="sk sk-line w-90 right"></div><div class="sk sk-line w-75"></div></div>`).join('')}
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const main = $('main');
  const setSize = (s) => {
    size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, s));
    store.set('yasinSize', size);
    main.style.setProperty('--arab-size', size + 'px');
  };
  el.querySelector('[data-act="smaller"]').addEventListener('click', () => setSize(size - 2));
  el.querySelector('[data-act="bigger"]').addEventListener('click', () => setSize(size + 2));

  // Penghitung bacaan berulang: ketuk untuk menambah, selesai → tanda centang.
  main.addEventListener('click', (e) => {
    const b = e.target.closest('[data-rep]');
    if (!b) return;
    const target = Number(b.dataset.rep);
    let c = Number(b.dataset.count) + 1;
    if (c > target) c = 0;
    b.dataset.count = String(c);
    b.querySelector('.rep-n').textContent = String(c);
    b.classList.toggle('is-done', c === target);
    vibrate(c === target ? [20, 40, 20] : 10);
    replay(b, 'pop-once');
  });

  loadContent(key).then((doc) => {
    if (!alive) return;
    document.title = doc.title + ' · Yasin & Tahlil';
    $('title').textContent = doc.title;
    $('sub').textContent = doc.subtitle || '';
    let k = 0;
    main.innerHTML = `
      ${doc.intro ? `<div class="baca-intro">${paras(doc.intro)}${doc.source ? `<p class="baca-note">${esc(doc.source)}</p>` : ''}</div>` : ''}
      ${doc.sections.map((s) => `
        <section class="baca-section">
          ${s.heading ? `<h2 class="list-head">${esc(s.heading)}</h2>` : ''}
          ${s.items.map((it) => itemHtml(it, k++)).join('')}
        </section>`).join('')}`;
    main.setAttribute('aria-busy', 'false');
  }).catch(() => {
    if (!alive) return;
    main.innerHTML = `<div class="offline-note" role="status"><span>Bacaan gagal dimuat. Periksa koneksi lalu buka lagi.</span></div>`;
    main.setAttribute('aria-busy', 'false');
  });

  return { el, destroy: () => { alive = false; } };
}
