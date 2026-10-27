// Asmaul Husna: daftar 99 nama dengan pencarian, dan mode hafalan berupa kartu yang dibalik.
import { icon } from '../icons.js';
import { esc, toast, vibrate, replay } from '../ui.js';
import * as store from '../store.js';
import { ASMA } from '../data/asma.js';

const TOTAL = ASMA.length;
const MODES = [['daftar', 'Daftar'], ['hafalan', 'Hafalan']];

// Lencana nomor berbentuk bintang delapan (dua persegi bertumpuk).
const starNo = (n) => `<span class="asma-no" aria-hidden="true"><svg viewBox="0 0 40 40"><g><rect x="8" y="8" width="24" height="24"></rect><rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)"></rect></g></svg><span>${n}</span></span>`;

export function mount(host) {
  let mode = store.get('asmaMode', 'daftar') === 'hafalan' ? 'hafalan' : 'daftar';
  let idx = Math.max(0, Math.min(TOTAL - 1, Number(store.get('asmaIdx', 0)) || 0));
  let hafal = new Set((store.get('asmaHafal', []) || []).filter((n) => n >= 1 && n <= TOTAL));
  let query = '';
  let flipped = false;

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Asmaul Husna</h1>
        <span class="hero-muted-sm">99 nama Allah yang indah</span>
      </div>
      <span class="asma-count" data-ref="count"></span>
    </div>
    <div role="tablist" aria-label="Mode" class="seg seg-hero">
      ${MODES.map(([v, label]) => `<button type="button" role="tab" data-mode="${v}" aria-selected="${v === mode}">${label}</button>`).join('')}
    </div>
  </header>

  <main class="scroll asma-main" data-ref="main"></main>`;
  host.appendChild(el);

  const $ = (r) => el.querySelector(`[data-ref="${r}"]`);
  const main = $('main');

  const save = () => {
    store.set('asmaIdx', idx);
    store.set('asmaHafal', [...hafal]);
  };
  const paintCount = () => { $('count').textContent = hafal.size + '/' + TOTAL + ' hafal'; };

  // ---------- Mode daftar ----------
  const renderList = () => {
    main.innerHTML = `
      <div class="asma-search">
        ${icon('search', 16, 2)}
        <input type="search" class="input" data-ref="q" placeholder="Cari nama, arti, atau nomor" aria-label="Cari Asmaul Husna" value="${esc(query)}">
      </div>
      <div class="asma-grid" data-ref="grid"></div>
      <p class="muted-sm center" data-ref="empty" hidden>Tidak ada nama yang cocok.</p>`;
    const q = $('q');
    q.addEventListener('input', () => { query = q.value; paintGrid(); });
    paintGrid();
  };

  const paintGrid = () => {
    const term = query.trim().toLowerCase();
    const items = ASMA.map((a, i) => ({ a, n: i + 1 })).filter(({ a, n }) =>
      !term || String(n) === term || a[1].toLowerCase().includes(term) || a[2].toLowerCase().includes(term));
    $('grid').innerHTML = items.map(({ a: [arab, latin, arti], n }, i) => `
      <button type="button" class="asma-card stagger-item${hafal.has(n) ? ' is-hafal' : ''}" data-n="${n}" style="--i:${Math.min(i, 20)}" aria-label="${n}. ${esc(latin)}, ${esc(arti)}">
        <span class="asma-card-top">${starNo(n)}${hafal.has(n) ? `<span class="asma-check">${icon('check', 14, 2.6)}</span>` : ''}</span>
        <span dir="rtl" lang="ar" class="asma-arab">${arab}</span>
        <span class="asma-latin">${esc(latin)}</span>
        <span class="asma-arti">${esc(arti)}</span>
      </button>`).join('');
    $('empty').hidden = items.length > 0;
  };

  main.addEventListener('click', (e) => {
    const card = e.target.closest('.asma-card');
    if (!card) return;
    // Ketuk kartu di daftar: buka nama itu di mode hafalan.
    idx = Number(card.dataset.n) - 1;
    flipped = true;
    setMode('hafalan');
  });

  // ---------- Mode hafalan ----------
  const renderFlash = () => {
    main.innerHTML = `
      <div class="flash-wrap">
        <div class="flash-meta">
          <span class="muted-sm tnum" data-ref="pos"></span>
          <button type="button" class="link-btn plain" data-act="shuffle">${icon('refresh', 14, 2)} Acak</button>
        </div>
        <div class="progress" aria-hidden="true"><div class="progress-fill" data-ref="fill"></div></div>
        <button type="button" class="flash" data-ref="card" aria-live="polite">
          <span class="flash-inner">
            <span class="flash-face front">
              <span data-ref="noF"></span>
              <span dir="rtl" lang="ar" class="flash-arab" data-ref="arabF"></span>
              <span class="flash-hint">Ketuk untuk melihat arti</span>
            </span>
            <span class="flash-face back">
              <span data-ref="noB"></span>
              <span dir="rtl" lang="ar" class="flash-arab sm" data-ref="arabB"></span>
              <span class="flash-latin" data-ref="latin"></span>
              <span class="flash-arti" data-ref="arti"></span>
            </span>
          </span>
        </button>
        <div class="flash-nav">
          <button type="button" class="btn btn-outline btn-icon-lg" data-act="prev" aria-label="Nama sebelumnya">${icon('chevLeft', 20, 2)}</button>
          <button type="button" class="btn btn-default flash-hafal" data-act="hafal"></button>
          <button type="button" class="btn btn-outline btn-icon-lg" data-act="next" aria-label="Nama berikutnya">${icon('chevRight', 20, 2)}</button>
        </div>
        <p class="muted-xs center">Geser kartu ke kiri/kanan untuk pindah nama.</p>
      </div>`;
    paintFlash(false);
    const card = $('card');
    card.addEventListener('click', () => { flipped = !flipped; card.classList.toggle('is-flipped', flipped); });
    // Geser (swipe) untuk pindah kartu.
    let sx = null;
    card.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    card.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    });
  };

  const paintFlash = (animateDir) => {
    const [arab, latin, arti] = ASMA[idx];
    const n = idx + 1;
    $('pos').textContent = 'Nama ke-' + n + ' dari ' + TOTAL;
    $('fill').style.width = (n / TOTAL) * 100 + '%';
    $('noF').innerHTML = starNo(n);
    $('noB').innerHTML = starNo(n);
    $('arabF').textContent = arab;
    $('arabB').textContent = arab;
    $('latin').textContent = latin;
    $('arti').textContent = arti;
    const card = $('card');
    card.classList.toggle('is-flipped', flipped);
    card.classList.toggle('is-hafal', hafal.has(n));
    card.setAttribute('aria-label', flipped ? n + '. ' + latin + ', ' + arti : 'Nama ke-' + n + ', ketuk untuk melihat arti');
    const hb = el.querySelector('[data-act="hafal"]');
    hb.innerHTML = hafal.has(n) ? icon('check', 16, 2.4) + ' Sudah hafal' : 'Tandai hafal';
    hb.classList.toggle('is-done', hafal.has(n));
    hb.setAttribute('aria-pressed', String(hafal.has(n)));
    if (animateDir) replay(card, animateDir > 0 ? 'slide-next' : 'slide-prev');
  };

  const go = (d) => {
    idx = (idx + d + TOTAL) % TOTAL;
    flipped = false;
    save();
    paintFlash(d);
  };

  el.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'prev') go(-1);
    else if (act === 'next') go(1);
    else if (act === 'shuffle') {
      let r = idx;
      while (TOTAL > 1 && r === idx) r = Math.floor(Math.random() * TOTAL);
      go(r - idx);
    } else if (act === 'hafal') {
      const n = idx + 1;
      if (hafal.has(n)) hafal.delete(n);
      else {
        hafal.add(n);
        vibrate(15);
        if (hafal.size === TOTAL) toast('MasyaAllah, 99 nama sudah hafal!');
      }
      save();
      paintCount();
      paintFlash(false);
      replay(el.querySelector('[data-act="hafal"]'), 'pop-once');
    }
  });

  // ---------- Ganti mode ----------
  const setMode = (m) => {
    mode = m;
    store.set('asmaMode', m);
    el.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.mode === m)));
    main.scrollTop = 0;
    if (m === 'daftar') renderList(); else renderFlash();
    replay(main, 'swap-in');
  };
  el.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.mode === 'hafalan') flipped = false;
    if (b.dataset.mode !== mode) setMode(b.dataset.mode);
  }));

  paintCount();
  if (mode === 'daftar') renderList(); else renderFlash();
  return { el, destroy: () => {} };
}
