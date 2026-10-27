// Kalkulator Zakat: Zakat Mal, Zakat Penghasilan, dan Zakat Fitrah.
// Harga emas & beras diisi pengguna; input terakhir tersimpan di perangkat.
import { icon } from '../icons.js';
import { esc, replay, reducedMotion } from '../ui.js';
import * as store from '../store.js';

const TABS = [['mal', 'Zakat Mal'], ['penghasilan', 'Penghasilan'], ['fitrah', 'Fitrah']];
const NISAB_GRAM = 85;
const KADAR = 0.025;
const FITRAH_KG = 2.5;
const FITRAH_LITER = 3.5;

const nf = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });
const rupiah = (n) => 'Rp ' + nf.format(Math.round(n));

// "1.250.000" → 1250000 ; "12,5" → 12.5
const parseNum = (s) => {
  const t = String(s ?? '').replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : 0;
};

// Format teks input dengan pemisah ribuan; bila decimal, izinkan satu koma.
const formatInput = (raw, decimal) => {
  let s = String(raw ?? '');
  if (decimal) {
    s = s.replace(/[^\d,]/g, '');
    const i = s.indexOf(',');
    let int = i < 0 ? s : s.slice(0, i);
    const frac = i < 0 ? null : s.slice(i + 1).replace(/,/g, '').slice(0, 3);
    int = int.replace(/^0+(?=\d)/, '');
    const intF = int ? nf.format(Number(int)) : (frac !== null ? '0' : '');
    return frac !== null ? intF + ',' + frac : intF;
  }
  s = s.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  return s ? nf.format(Number(s)) : '';
};

const DEFAULTS = {
  tab: 'mal',
  hargaEmas: '',
  mal: { tabungan: '', emas: '', investasi: '', piutang: '', utang: '', haul: true },
  penghasilan: { gaji: '', lain: '' },
  fitrah: { jiwa: 1, beras: '' }
};

export function mount(host) {
  const saved = store.get('zakat', {}) || {};
  const st = {
    tab: TABS.some(([t]) => t === saved.tab) ? saved.tab : 'mal',
    hargaEmas: typeof saved.hargaEmas === 'string' ? saved.hargaEmas : '',
    mal: { ...DEFAULTS.mal, ...(saved.mal || {}) },
    penghasilan: { ...DEFAULTS.penghasilan, ...(saved.penghasilan || {}) },
    fitrah: { ...DEFAULTS.fitrah, ...(saved.fitrah || {}) }
  };
  st.fitrah.jiwa = Math.max(1, Math.min(99, Math.round(Number(st.fitrah.jiwa) || 1)));

  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = `
  <header class="yasin-header">
    <div class="bar">
      <a href="#/" class="hero-icon-btn" aria-label="Kembali ke beranda">${icon('back', 20, 2)}</a>
      <div class="bar-title">
        <h1 tabindex="-1">Kalkulator Zakat</h1>
        <span class="hero-muted-sm">Mengacu ketentuan BAZNAS</span>
      </div>
    </div>
    <div role="tablist" aria-label="Jenis zakat" class="seg seg-hero">
      ${TABS.map(([v, label]) => `<button type="button" role="tab" id="zk-tab-${v}" aria-controls="zk-panel" data-tab="${v}" aria-selected="${v === st.tab}">${label}</button>`).join('')}
    </div>
  </header>

  <main class="scroll tools-main zk-main">
    <div id="zk-panel" role="tabpanel" data-ref="panel" class="zk-panel"></div>
  </main>`;
  host.appendChild(el);

  const panel = el.querySelector('[data-ref="panel"]');
  const anims = new Set();
  const save = () => store.set('zakat', st);

  const field = (group, key, label, opts = {}) => {
    const value = group ? st[group][key] : st[key];
    const id = 'zk-' + (group || 'g') + '-' + key;
    return `<div class="zk-field">
      <label for="${id}" class="label">${esc(label)}</label>
      <div class="zk-input-wrap${opts.prefix ? ' has-prefix' : ''}${opts.suffix ? ' has-suffix' : ''}">
        ${opts.prefix ? `<span class="zk-affix" aria-hidden="true">${opts.prefix}</span>` : ''}
        <input id="${id}" class="input tnum" type="text" inputmode="${opts.decimal ? 'decimal' : 'numeric'}" autocomplete="off"
          data-group="${group || ''}" data-key="${key}"${opts.decimal ? ' data-decimal="1"' : ''}
          value="${esc(value)}" placeholder="${opts.placeholder || '0'}"${opts.hint ? ` aria-describedby="${id}-hint"` : ''}>
        ${opts.suffix ? `<span class="zk-affix" aria-hidden="true">${opts.suffix}</span>` : ''}
      </div>
      ${opts.hint ? `<span id="${id}-hint" class="muted-xs">${esc(opts.hint)}</span>` : ''}
    </div>`;
  };

  const goldField = () => field(null, 'hargaEmas', 'Harga emas per gram', {
    prefix: 'Rp', hint: 'Isi dengan harga emas murni (24 karat) hari ini dari sumber tepercaya.'
  });

  const resultCard = () => `
    <section class="zk-result" data-ref="result" aria-label="Hasil perhitungan">
      <span class="zk-result-label" data-ref="rLabel"></span>
      <strong class="zk-result-val tnum" data-ref="rVal">Rp 0</strong>
      <span class="zk-result-status" data-ref="rStatus" role="status"></span>
      <dl class="zk-rows" data-ref="rRows"></dl>
    </section>`;

  const NOTES = {
    mal: [
      'Nisab zakat mal setara 85 gram emas murni; kadar zakat 2,5%.',
      'Wajib bila harta bersih (setelah dikurangi utang jatuh tempo) mencapai nisab dan telah dimiliki selama satu tahun Hijriah (haul).',
      'Harta yang dihitung: tabungan/deposito, emas & perak simpanan, investasi (saham, reksa dana, dll.), dan piutang lancar.'
    ],
    penghasilan: [
      'Nisab zakat penghasilan setara 85 gram emas per tahun, atau 85 gram ÷ 12 per bulan; kadar 2,5%.',
      'Dihitung dari penghasilan bruto setiap kali diterima (bulanan), tanpa menunggu haul.'
    ],
    fitrah: [
      'Zakat fitrah wajib bagi setiap jiwa Muslim yang mampu: 2,5 kg (setara ±3,5 liter) beras atau makanan pokok.',
      'Bila dibayar dengan uang, besarannya mengikuti harga beras yang biasa dikonsumsi; BAZNAS/pemerintah daerah biasanya menetapkan nilainya tiap tahun.',
      'Ditunaikan paling lambat sebelum sholat Idul Fitri.'
    ]
  };

  const notes = (tab) => `
    <section class="tools-card zk-notes" aria-labelledby="zk-notes-title">
      <h2 id="zk-notes-title" class="tools-card-title">Dasar perhitungan</h2>
      <ul class="tools-list">${NOTES[tab].map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
      <p class="muted-xs">Hasil ini perkiraan. Untuk kepastian, konsultasikan dengan amil zakat atau BAZNAS setempat.</p>
    </section>`;

  const render = () => {
    anims.forEach(cancelAnimationFrame);
    anims.clear();
    let body = '';
    if (st.tab === 'mal') {
      body = `
      <section class="tools-card zk-form" aria-label="Data harta">
        ${goldField()}
        ${field('mal', 'tabungan', 'Tabungan, deposito & uang tunai', { prefix: 'Rp' })}
        ${field('mal', 'emas', 'Emas simpanan', { suffix: 'gram', decimal: true })}
        ${field('mal', 'investasi', 'Investasi (saham, reksa dana, dll.)', { prefix: 'Rp' })}
        ${field('mal', 'piutang', 'Piutang lancar', { prefix: 'Rp' })}
        ${field('mal', 'utang', 'Utang jatuh tempo', { prefix: 'Rp', hint: 'Mengurangi total harta.' })}
        <label class="zk-check">
          <input type="checkbox" data-group="mal" data-key="haul"${st.mal.haul ? ' checked' : ''}>
          <span>Harta sudah dimiliki selama 1 tahun Hijriah (haul)</span>
        </label>
      </section>`;
    } else if (st.tab === 'penghasilan') {
      body = `
      <section class="tools-card zk-form" aria-label="Data penghasilan">
        ${goldField()}
        ${field('penghasilan', 'gaji', 'Penghasilan per bulan', { prefix: 'Rp', hint: 'Gaji/honor bruto sebelum dipotong.' })}
        ${field('penghasilan', 'lain', 'Penghasilan lain per bulan (opsional)', { prefix: 'Rp' })}
      </section>`;
    } else {
      body = `
      <section class="tools-card zk-form" aria-label="Data zakat fitrah">
        <div class="zk-field">
          <span class="label" id="zk-jiwa-label">Jumlah jiwa</span>
          <div class="zk-stepper" role="group" aria-labelledby="zk-jiwa-label">
            <button type="button" class="btn btn-outline btn-icon" data-step="-1" aria-label="Kurangi jiwa">−</button>
            <output class="zk-jiwa tnum" data-ref="jiwa" aria-live="polite">${st.fitrah.jiwa}</output>
            <button type="button" class="btn btn-outline btn-icon" data-step="1" aria-label="Tambah jiwa">+</button>
          </div>
        </div>
        ${field('fitrah', 'beras', 'Harga beras per kg (opsional)', { prefix: 'Rp', hint: 'Isi untuk menghitung nilai dalam rupiah.' })}
      </section>`;
    }
    panel.setAttribute('aria-labelledby', 'zk-tab-' + st.tab);
    panel.innerHTML = body + resultCard() + notes(st.tab);
    replay(panel, 'swap-in');
    compute(false);
  };

  const $ = (r) => panel.querySelector(`[data-ref="${r}"]`);

  const animateTo = (node, to, animate) => {
    const from = Number(node.dataset.v) || 0;
    node.dataset.v = String(to);
    if (!animate || reducedMotion() || from === to) { node.textContent = rupiah(to); return; }
    const start = performance.now(), dur = 600;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      node.textContent = rupiah(from + (to - from) * e);
      if (t < 1) { const id = requestAnimationFrame(step); anims.add(id); }
    };
    anims.add(requestAnimationFrame(step));
  };

  const rows = (list) => list.map(([k, v]) => `<div class="zk-row"><dt>${esc(k)}</dt><dd class="tnum">${esc(v)}</dd></div>`).join('');

  const setStatus = (text, kind) => {
    const s = $('rStatus');
    s.textContent = text;
    s.className = 'zk-result-status' + (kind ? ' is-' + kind : '');
    $('result').classList.toggle('is-wajib', kind === 'ok');
  };

  const compute = (animate = true) => {
    const harga = parseNum(st.hargaEmas);
    const val = $('rVal');
    if (st.tab === 'mal') {
      const m = st.mal;
      const emasRp = parseNum(m.emas) * harga;
      const bruto = parseNum(m.tabungan) + emasRp + parseNum(m.investasi) + parseNum(m.piutang);
      const bersih = Math.max(0, bruto - parseNum(m.utang));
      const nisab = NISAB_GRAM * harga;
      const wajib = harga > 0 && bersih >= nisab && bersih > 0 && m.haul;
      $('rLabel').textContent = 'Zakat mal yang dibayarkan';
      animateTo(val, wajib ? bersih * KADAR : 0, animate);
      if (!harga) setStatus('Isi harga emas per gram untuk menghitung nisab.', 'warn');
      else if (bersih < nisab) setStatus('Belum mencapai nisab — belum wajib zakat mal.', '');
      else if (!m.haul) setStatus('Sudah mencapai nisab, tetapi belum haul (1 tahun).', 'warn');
      else setStatus('Wajib zakat: harta mencapai nisab dan sudah haul.', 'ok');
      $('rRows').innerHTML = rows([
        ['Nilai emas simpanan', rupiah(emasRp)],
        ['Harta bersih', rupiah(bersih)],
        ['Nisab (85 g emas)', harga ? rupiah(nisab) : '—']
      ]);
    } else if (st.tab === 'penghasilan') {
      const p = st.penghasilan;
      const total = parseNum(p.gaji) + parseNum(p.lain);
      const nisab = (NISAB_GRAM * harga) / 12;
      const wajib = harga > 0 && total > 0 && total >= nisab;
      $('rLabel').textContent = 'Zakat penghasilan per bulan';
      animateTo(val, wajib ? total * KADAR : 0, animate);
      if (!harga) setStatus('Isi harga emas per gram untuk menghitung nisab.', 'warn');
      else if (!wajib) setStatus('Penghasilan belum mencapai nisab bulanan.', '');
      else setStatus('Wajib zakat penghasilan bulan ini.', 'ok');
      $('rRows').innerHTML = rows([
        ['Total penghasilan per bulan', rupiah(total)],
        ['Nisab per bulan (85 g ÷ 12)', harga ? rupiah(nisab) : '—'],
        ['Perkiraan per tahun', rupiah(wajib ? total * KADAR * 12 : 0)]
      ]);
    } else {
      const f = st.fitrah;
      const harga = parseNum(f.beras);
      const kg = f.jiwa * FITRAH_KG;
      $('rLabel').textContent = harga ? 'Zakat fitrah dalam rupiah' : 'Zakat fitrah dalam beras';
      if (harga) animateTo(val, kg * harga, animate);
      else { val.dataset.v = '0'; val.textContent = nf2.format(kg) + ' kg beras'; }
      setStatus(f.jiwa + ' jiwa × ' + nf2.format(FITRAH_KG) + ' kg', 'ok');
      $('rRows').innerHTML = rows([
        ['Beras (2,5 kg/jiwa)', nf2.format(kg) + ' kg'],
        ['Setara takaran (3,5 liter/jiwa)', nf2.format(f.jiwa * FITRAH_LITER) + ' liter'],
        ['Nilai uang', harga ? rupiah(kg * harga) : 'Isi harga beras']
      ]);
    }
  };

  // Input angka: format ribuan sambil menjaga posisi kursor.
  panel.addEventListener('input', (e) => {
    const inp = e.target;
    if (!inp.dataset || !inp.dataset.key) return;
    const group = inp.dataset.group;
    if (inp.type === 'checkbox') {
      st[group][inp.dataset.key] = inp.checked;
    } else {
      const decimal = !!inp.dataset.decimal;
      const caret = inp.selectionStart ?? inp.value.length;
      const keepRe = decimal ? /[\d,]/ : /\d/;
      const before = inp.value.slice(0, caret).split('').filter((c) => keepRe.test(c)).length;
      const next = formatInput(inp.value, decimal);
      inp.value = next;
      let pos = 0, seen = 0;
      while (pos < next.length && seen < before) { if (keepRe.test(next[pos])) seen++; pos++; }
      try { inp.setSelectionRange(pos, pos); } catch (err) { /* jenis input tidak mendukung */ }
      if (group) st[group][inp.dataset.key] = next; else st[inp.dataset.key] = next;
    }
    save();
    compute(true);
  });

  panel.addEventListener('click', (e) => {
    const b = e.target.closest('[data-step]');
    if (!b) return;
    st.fitrah.jiwa = Math.max(1, Math.min(99, st.fitrah.jiwa + Number(b.dataset.step)));
    const out = $('jiwa');
    out.textContent = String(st.fitrah.jiwa);
    replay(out, 'tools-pop');
    save();
    compute(true);
  });

  el.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.tab === st.tab) return;
    st.tab = b.dataset.tab;
    el.querySelectorAll('[data-tab]').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    save();
    render();
  }));

  render();
  return { el, destroy: () => { anims.forEach(cancelAnimationFrame); anims.clear(); } };
}
