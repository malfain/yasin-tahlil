// Drawer menu fitur: panel geser dari kiri + backdrop, grup akordeon berisi tautan.
import { icon } from '../icons.js';
import { esc, reducedMotion } from '../ui.js';
import { MENU } from '../data/menu.js';

export function createDrawer(root, { onClose }) {
  root.innerHTML = `
  <button type="button" class="drawer-backdrop" data-act="close" aria-label="Tutup menu" tabindex="-1"></button>
  <nav class="drawer-panel" aria-label="Menu fitur" role="dialog" aria-modal="true">
    <div class="drawer-head">
      <div class="stack-2">
        <span class="drawer-title">Yasin &amp; Tahlil</span>
        <span class="hero-muted-sm">Semua bacaan &amp; amalan</span>
      </div>
      <button type="button" class="hero-icon-btn bordered" data-act="close" aria-label="Tutup menu">${icon('close', 18, 2)}</button>
    </div>
    <div class="drawer-body">
      ${MENU.map((g) => `
        <section class="menu-group">
          <h2>${esc(g.title)}</h2>
          ${g.items.map((it) => it.href ? `
            <a href="${it.href}" class="menu-row">
              <span class="initial primary">${esc(it.name.charAt(0))}</span>
              <span class="grow">${esc(it.name)}</span>
              <span class="badge badge-outline">Buka</span>
            </a>` : `
            <div class="acc" data-acc="${it.id}">
              <button type="button" class="menu-row" aria-expanded="false" aria-controls="acc-${it.id}" data-toggle="${it.id}">
                <span class="initial">${esc(it.name.charAt(0))}</span>
                <span class="grow left">${esc(it.name)}</span>
                <span class="muted-xs tnum">${it.subs.length}</span>
                <span class="chev">${icon('chevRight', 16, 2)}</span>
              </button>
              <div class="acc-panel" id="acc-${it.id}">
                <ul class="acc-inner">
                  ${it.subs.map(([name, href]) => `<li><a href="${href}" class="sub-item">${esc(name)}</a></li>`).join('')}
                </ul>
              </div>
            </div>`).join('')}
        </section>`).join('')}
    </div>
  </nav>`;

  const panel = root.querySelector('.drawer-panel');
  const body = root.querySelector('.drawer-body');
  let openId = null;
  let isOpen = false;
  let hideTimer;
  let returnFocus = null;

  const setAcc = (id, scroll) => {
    openId = id;
    root.querySelectorAll('[data-acc]').forEach((acc) => {
      const on = acc.dataset.acc === id;
      acc.classList.toggle('open', on);
      acc.querySelector('[data-toggle]').setAttribute('aria-expanded', String(on));
      acc.querySelectorAll('.sub-item').forEach((b) => { b.tabIndex = on ? 0 : -1; });
      if (on && scroll) {
        setTimeout(() => acc.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' }), 280);
      }
    });
  };
  setAcc(null);

  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-act="close"]')) { onClose(); return; }
    const tg = e.target.closest('[data-toggle]');
    if (tg) { setAcc(openId === tg.dataset.toggle ? null : tg.dataset.toggle); }
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key !== 'Tab') return;
    // Jebakan fokus sederhana di dalam panel
    const f = Array.from(panel.querySelectorAll('a[href], button:not([disabled])')).filter((x) => x.tabIndex >= 0 && x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  return {
    get isOpen() { return isOpen; },
    open(groupId) {
      clearTimeout(hideTimer);
      const exists = groupId && root.querySelector(`[data-acc="${groupId}"]`);
      if (!isOpen) {
        returnFocus = document.activeElement;
        root.hidden = false;
        body.scrollTop = 0;
        setAcc(exists ? groupId : null, false);
        void root.offsetWidth;
        root.classList.add('open');
        isOpen = true;
        setTimeout(() => {
          const t = exists ? root.querySelector(`[data-toggle="${groupId}"]`) : root.querySelector('.drawer-head [data-act="close"]');
          if (t) t.focus({ preventScroll: true });
          if (exists) setAcc(groupId, true);
        }, 60);
      } else if (exists) {
        setAcc(groupId, true);
      }
    },
    close() {
      if (!isOpen) return;
      isOpen = false;
      root.classList.remove('open');
      hideTimer = setTimeout(() => { root.hidden = true; }, reducedMotion() ? 0 : 300);
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    }
  };
}
