// Pembaca surat umum (#/surah/<nomor>): mode tampilan & ukuran huruf Arab seperti layar Yasin.
import { icon, ornament } from '../icons.js';
import { esc } from '../ui.js';
import * as store from '../store.js';
import { loadSurah, cachedSurah, JUZ_AMMA, PILIHAN } from '../data/quran.js';

const MODES = [['lengkap', 'Lengkap'], ['latin', 'Arab + Latin'], ['arab', 'Arab saja']];
const MIN_SIZE = 20, MAX_SIZE = 40;
const KNOWN = new Map([...JUZ_AMMA, ...PILIHAN].map(([n, name, count]) => [n, { name, count }]));
const BISMILLAH = 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ';

export function mount(host, params) {
  const n = Number(params[0]);
  const known = KNOWN.get(n);
  if (!known) { location.replace('#/surat'); return { el: document.createElement('div'), destroy: () => {} }; }
  let mode = store.get('yasinMode', 'lengkap');
  if (!MODES.some(([v]) => v === mode)) mode = 'lengkap';
  let size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Number(store.get('yasinSize', 26)) || 26));
  let alive = true;

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/surat" class="hero-icon-btn" aria-label="Kembali ke daftar surat">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">${esc(known.name)}</h1>
        <span class="hero-muted-sm" data-ref="sub">Surat ke-${n} · ${known.count} ayat</span>
      </div>
      <button type="button" class="hero-icon-btn bordered" data-act="smaller" aria-label="Perkecil huruf Arab">A−</button>
      <button type="button" class="hero-icon-btn bordered gold big" data-act="bigger" aria-label="Perbesar huruf Arab">A+</button>
    </div>
    <div role="tablist" aria-label="Tampilan bacaan" class="seg seg-hero">
      ${MODES.map(([v, label]) => `<button type="button" role="tab" data-mode="${v}" aria-selected="${v === mode}">${label}</button>`).join('')}
    </div>
  </header>
  <main class="scroll yasin-main mode-${mode}" style="--arab-size: ${size}px">
    <section aria-label="Pembuka surat" class="surah-opener">
      ${ornament({ size: 140, inner: false, cls: 'opener-orn left' })}
      ${ornament({ size: 140, inner: false, cls: 'opener-orn right' })}
      <span dir="rtl" lang="ar" class="opener-title" data-ref="nama">${esc(known.name)}</span>
      <span class="opener-sub" data-ref="arti">Surat ke-${n}</span>
      ${n === 9 ? '' : `<span dir="rtl" lang="ar" class="opener-bismillah">${BISMILLAH}</span>`}
    </section>
    <div class="ayat-list" data-ref="list" aria-busy="true"></div>
  </main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const main = el.querySelector('main');

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

  const show = ({ info, ayat }) => {
    if (!alive) return;
    document.title = known.name + ' · Yasin & Tahlil';
    $('nama').textContent = info.nama;
    $('arti').textContent = 'Surat ke-' + info.nomor + ' · ' + info.arti;
    $('sub').textContent = info.tempatTurun + ' · ' + info.jumlahAyat + ' ayat';
    $('list').innerHTML = ayat.map((a, i) => `
      <article class="ayat stagger-item${a.no % 2 ? '' : ' even'}" style="--i:${Math.min(i, 10)}">
        <div class="ayat-head">
          <span class="ayat-no">
            <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><g fill="var(--tile-gold)" stroke="var(--gold)" stroke-width="1.5" stroke-linejoin="round"><rect x="8" y="8" width="24" height="24"></rect><rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)"></rect></g></svg>
            <span>${a.no}</span>
          </span>
        </div>
        <p dir="rtl" lang="ar" class="ayat-arab">${esc(a.arab)}</p>
        <p class="ayat-latin">${esc(a.latin)}</p>
        <p class="ayat-arti">${esc(a.arti)}</p>
      </article>`).join('');
    $('list').setAttribute('aria-busy', 'false');
  };

  function load() {
    $('list').innerHTML = Array.from({ length: 4 }, () => `
      <div class="ayat skeleton-card" aria-hidden="true">
        <div class="sk sk-circle"></div><div class="sk sk-line w-90 right"></div>
        <div class="sk sk-line w-60 right"></div><div class="sk sk-line w-75"></div>
      </div>`).join('') + '<span class="sr-only">Memuat ayat…</span>';
    loadSurah(n).then(show).catch(() => {
      if (!alive) return;
      $('list').innerHTML = `
        <div class="offline-note" role="status">
          <span>Surat ini belum tersimpan dan perlu koneksi internet untuk dimuat pertama kali.</span>
          <button type="button" class="btn btn-outline btn-sm" data-act="retry">${icon('refresh', 16)} Coba lagi</button>
        </div>`;
      $('list').querySelector('[data-act="retry"]').addEventListener('click', load);
    });
  }
  const hit = cachedSurah(n);
  if (hit) show(hit); else load();

  return { el, destroy: () => { alive = false; } };
}
