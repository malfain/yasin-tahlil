// Daftar Juz Amma & surat pilihan; tiap surat membuka pembaca #/surah/<nomor>.
import { icon } from '../icons.js';
import { esc } from '../ui.js';
import { JUZ_AMMA, PILIHAN } from '../data/quran.js';

const row = ([n, name, count], i) => `
  <a href="#/surah/${n}" class="surah-row stagger-item" style="--i:${Math.min(i, 16)}">
    <span class="ayat-no" aria-hidden="true">
      <svg width="38" height="38" viewBox="0 0 40 40"><g fill="var(--tile-gold)" stroke="var(--gold)" stroke-width="1.5" stroke-linejoin="round"><rect x="8" y="8" width="24" height="24"></rect><rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)"></rect></g></svg>
      <span>${n}</span>
    </span>
    <span class="grow">
      <span class="surah-name">${esc(name)}</span>
      <span class="muted-xs">${count} ayat</span>
    </span>
    ${icon('chevRight', 16, 2)}
  </a>`;

export function mount(host) {
  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Juz Amma &amp; Surat Pilihan</h1>
        <span class="hero-muted-sm">Teks Arab, latin, dan terjemahan</span>
      </div>
    </div>
  </header>
  <main class="scroll list-main">
    <section class="stack-8" aria-label="Surat pilihan">
      <h2 class="list-head">Surat pilihan</h2>
      <div class="surah-list">${PILIHAN.map(row).join('')}</div>
    </section>
    <section class="stack-8" aria-label="Juz Amma">
      <h2 class="list-head">Juz Amma (Juz 30)</h2>
      <div class="surah-list">${JUZ_AMMA.map((s, i) => row(s, i + PILIHAN.length)).join('')}</div>
    </section>
  </main>`;
  host.appendChild(el);
  return { el, destroy: () => {} };
}
