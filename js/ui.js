// Utilitas UI bersama: escape HTML, toast, tema, deteksi reduced-motion.
import * as store from './store.js';

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export const reducedMotion = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
};

export const pad = (n) => String(n).padStart(2, '0');

let toastTimer;
export function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// Jalankan ulang animasi CSS pada sebuah elemen dengan melepas lalu memasang kelas.
export function replay(el, cls) {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

export const isDark = () => document.documentElement.classList.contains('dark');

// Ganti tema dengan transisi warna halus (kelas sementara theme-anim).
export function setDark(dark) {
  const root = document.documentElement;
  if (!reducedMotion()) {
    root.classList.add('theme-anim');
    clearTimeout(setDark.t);
    setDark.t = setTimeout(() => root.classList.remove('theme-anim'), 450);
  }
  root.classList.toggle('dark', dark);
  store.set('dark', dark);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#16302a' : '#1f5a46');
}

export function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* tidak didukung */ }
}
