// Router hash sederhana: #/, #/yasin[/ayat], #/tahlil, #/jadwal, #/menu[/grup].
// Menu tampil sebagai drawer di atas layar yang sedang aktif.
import * as home from './views/home.js';
import * as yasin from './views/yasin.js';
import * as tahlil from './views/tahlil.js';
import * as jadwal from './views/jadwal.js';
import { createDrawer } from './views/menu.js';
import { autoDetect } from './location.js';

const VIEWS = { '': home, yasin, tahlil, jadwal };
const TITLES = { '': 'Yasin & Tahlil', yasin: 'Surah Yasin', tahlil: 'Tahlil', jadwal: 'Jadwal Sholat & Imsak' };

const host = document.getElementById('screen-host');
const drawerEl = document.getElementById('drawer');

let current = null;      // { key, destroy }
let baseHash = '#/';     // rute layar di bawah drawer
let menuFromApp = false; // drawer dibuka dari dalam aplikasi → tutup dengan history.back()

const drawer = createDrawer(drawerEl, { onClose: closeMenu });

function closeMenu() {
  if (menuFromApp) history.back();
  else location.replace(baseHash);
}

const parse = () => location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);

function mountView(name, params, animate) {
  const key = '#/' + [name, ...params].filter(Boolean).join('/');
  if (current && current.key === key) return;
  if (current) {
    current.destroy();
    current.el.remove();
  }
  const view = VIEWS[name];
  const inst = view.mount(host, params);
  current = { key, el: inst.el, destroy: inst.destroy };
  baseHash = key;
  document.title = name ? TITLES[name] + ' · Yasin & Tahlil' : TITLES[''];
  if (animate) {
    inst.el.classList.add('screen-enter');
    inst.el.addEventListener('animationend', () => inst.el.classList.remove('screen-enter'), { once: true });
    const h1 = inst.el.querySelector('h1');
    if (h1) h1.focus({ preventScroll: true });
  } else {
    inst.el.classList.add('screen-first');
  }
}

function route() {
  const parts = parse();
  const first = !current;
  if (parts[0] === 'menu') {
    if (!drawer.isOpen) menuFromApp = !first;
    if (first) mountView('', [], false);
    host.inert = true;
    drawer.open(parts[1] || null);
    return;
  }
  host.inert = false;
  drawer.close();
  const name = Object.prototype.hasOwnProperty.call(VIEWS, parts[0] || '') ? (parts[0] || '') : '';
  const params = name === 'yasin' ? parts.slice(1, 2) : [];
  if (!name && parts.length) { location.replace('#/'); return; }
  mountView(name, params, !first);
}

window.addEventListener('hashchange', route);
route();
autoDetect();
