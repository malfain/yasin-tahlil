// Surah Yasin: mode tampilan, ukuran huruf Arab, tandai terakhir dibaca, progres.
import { icon, ornament } from '../icons.js';
import { esc, reducedMotion } from '../ui.js';
import * as store from '../store.js';
import { loadYasin, cached, TOTAL_AYAT } from '../data/yasin.js';

const MODES = [['lengkap', 'Lengkap'], ['latin', 'Arab + Latin'], ['arab', 'Arab saja']];
const MIN_SIZE = 20, MAX_SIZE = 40;

export function mount(host, params) {
  let mode = store.get('yasinMode', 'lengkap');
  if (!MODES.some(([v]) => v === mode)) mode = 'lengkap';
  let size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Number(store.get('yasinSize', 26)) || 26));
  let last = Math.max(0, Math.min(TOTAL_AYAT, Number(store.get('yasinLast', 0)) || 0));
  const target = Number(params[0]) || 0;
  let alive = true;

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Surah Yasin</h1>
        <span class="hero-muted-sm">Makkiyah · 83 ayat · Juz 22–23</span>
      </div>
      <button type="button" class="hero-icon-btn bordered" data-act="smaller" aria-label="Perkecil huruf Arab">A−</button>
      <button type="button" class="hero-icon-btn bordered gold big" data-act="bigger" aria-label="Perbesar huruf Arab">A+</button>
    </div>
    <div role="tablist" aria-label="Tampilan bacaan" class="seg seg-hero">
      ${MODES.map(([v, label]) => `<button type="button" role="tab" data-mode="${v}" aria-selected="${v === mode}">${label}</button>`).join('')}
    </div>
  </header>

  <main class="scroll yasin-main mode-${mode}" style="--arab-size: ${size}px">
    <section aria-label="Pembuka surah" class="surah-opener">
      ${ornament({ size: 140, inner: false, cls: 'opener-orn left' })}
      ${ornament({ size: 140, inner: false, cls: 'opener-orn right' })}
      <span dir="rtl" lang="ar" class="opener-title">سُوْرَةُ يٰسۤ</span>
      <span class="opener-sub">Surah ke-36 · Jantung Al-Qur’an</span>
      <span dir="rtl" lang="ar" class="opener-bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
    </section>
    <div class="ayat-list" data-ref="list" aria-busy="true"></div>
    <div data-ref="note"></div>
  </main>

  <footer class="yasin-footer">
    <div class="footer-row">
      <span class="fw-500" data-ref="lastText"></span>
      <span class="muted tnum" data-ref="lastCount"></span>
    </div>
    <div class="progress" role="progressbar" aria-label="Progres membaca Surah Yasin" aria-valuemin="0" aria-valuemax="100" data-ref="bar">
      <div class="progress-fill" data-ref="fill" style="width: 0%"></div>
    </div>
  </footer>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const main = el.querySelector('main');
  const list = $('list');

  const paintFooter = () => {
    const pct = Math.round((last / TOTAL_AYAT) * 100);
    $('lastText').textContent = last ? 'Terakhir dibaca: ayat ' + last : 'Belum ada ayat ditandai';
    $('lastCount').textContent = last + ' / ' + TOTAL_AYAT;
    $('bar').setAttribute('aria-valuenow', String(pct));
    $('fill').style.width = pct + '%';
  };
  requestAnimationFrame(() => requestAnimationFrame(paintFooter));

  // Mode tampilan
  el.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    store.set('yasinMode', mode);
    el.querySelectorAll('[data-mode]').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    main.classList.remove('mode-lengkap', 'mode-latin', 'mode-arab');
    main.classList.add('mode-' + mode);
  }));

  // Ukuran huruf
  const setSize = (s) => {
    size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, s));
    store.set('yasinSize', size);
    main.style.setProperty('--arab-size', size + 'px');
  };
  el.querySelector('[data-act="smaller"]').addEventListener('click', () => setSize(size - 2));
  el.querySelector('[data-act="bigger"]').addEventListener('click', () => setSize(size + 2));

  // Tandai terakhir dibaca (klik lagi untuk menghapus tanda)
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-mark]');
    if (!btn) return;
    const n = Number(btn.dataset.mark);
    last = last === n ? 0 : n;
    store.set('yasinLast', last);
    list.querySelectorAll('.ayat').forEach((art) => {
      const isLast = Number(art.dataset.no) === last;
      art.classList.toggle('is-last', isLast);
      const b = art.querySelector('[data-mark]');
      b.setAttribute('aria-pressed', String(isLast));
    });
    paintFooter();
  });

  const renderAyat = (ayat) => ayat.map((a, i) => `
    <article class="ayat stagger-item${a.no === last ? ' is-last' : ''}${a.no % 2 ? '' : ' even'}" data-no="${a.no}" id="ayat-${a.no}" style="--i:${Math.min(i, 10)}">
      <div class="ayat-head">
        <span class="ayat-no">
          <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><g fill="var(--tile-gold)" stroke="var(--gold)" stroke-width="1.5" stroke-linejoin="round"><rect x="8" y="8" width="24" height="24"></rect><rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)"></rect></g></svg>
          <span>${a.no}</span>
        </span>
        <span class="badge badge-secondary last-badge">Terakhir dibaca</span>
        <button type="button" class="mark-btn" data-mark="${a.no}" aria-pressed="${a.no === last}" aria-label="Tandai ayat ${a.no} sebagai terakhir dibaca">${icon('bookmark')}</button>
      </div>
      <p dir="rtl" lang="ar" class="ayat-arab">${esc(a.arab)}</p>
      <p class="ayat-latin">${esc(a.latin)}</p>
      <p class="ayat-arti">${esc(a.arti)}</p>
    </article>`).join('');

  const scrollToTarget = () => {
    if (!target) return;
    const node = el.querySelector('#ayat-' + target) || list.lastElementChild;
    if (node) node.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  const show = ({ ayat, complete }) => {
    if (!alive) return;
    list.innerHTML = renderAyat(ayat);
    list.setAttribute('aria-busy', 'false');
    const note = $('note');
    if (complete) {
      note.innerHTML = '';
    } else {
      note.innerHTML = `
        <div class="offline-note" role="status">
          <span>Sedang luring: baru 7 ayat pertama yang tersedia. Ayat 8–83 akan dimuat saat tersambung internet.</span>
          <button type="button" class="btn btn-outline btn-sm" data-act="retry">${icon('refresh', 16)} Coba lagi</button>
        </div>`;
      note.querySelector('[data-act="retry"]').addEventListener('click', load);
    }
    requestAnimationFrame(scrollToTarget);
  };

  function load() {
    $('note').innerHTML = '';
    list.setAttribute('aria-busy', 'true');
    list.innerHTML = Array.from({ length: 4 }, () => `
      <div class="ayat skeleton-card" aria-hidden="true">
        <div class="sk sk-circle"></div>
        <div class="sk sk-line w-90 right"></div>
        <div class="sk sk-line w-60 right"></div>
        <div class="sk sk-line w-75"></div>
      </div>`).join('') + '<span class="sr-only">Memuat ayat…</span>';
    loadYasin().then(show);
  }

  const hit = cached();
  if (hit) show({ ayat: hit, complete: true });
  else load();

  return { el, destroy: () => { alive = false; } };
}
