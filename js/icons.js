// Ikon SVG dari desain (garis, currentColor).
const svg = (body, size = 18, sw = 1.8) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const PATHS = {
  menu: '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h10"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.9 4.9 1.4 1.4"></path><path d="m17.7 17.7 1.4 1.4"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.3 17.7-1.4 1.4"></path><path d="m19.1 4.9-1.4 1.4"></path>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>',
  pin: '<path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"></path><circle cx="12" cy="10" r="2.5"></circle>',
  arrowRight: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
  back: '<path d="M19 12H5"></path><path d="m11 6-6 6 6 6"></path>',
  chevLeft: '<path d="m15 6-6 6 6 6"></path>',
  chevRight: '<path d="m9 6 6 6-6 6"></path>',
  close: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  bookmark: '<path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path><path d="M3 3v5h5"></path>',
  check: '<path d="M20 6 9 17l-5-5"></path>',
  home: '<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"></path><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"></path>',
  beads: '<circle cx="12" cy="4" r="1.6"></circle><circle cx="18.2" cy="7.5" r="1.6"></circle><circle cx="18.2" cy="14.5" r="1.6"></circle><circle cx="12" cy="18" r="1.6"></circle><circle cx="5.8" cy="14.5" r="1.6"></circle><circle cx="5.8" cy="7.5" r="1.6"></circle><path d="M12 19.6V23"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  star: '<rect x="6" y="6" width="12" height="12"></rect><rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)"></rect>',
  hands: '<path d="M12 21c-4-2-7-5-7-9V5l4 3"></path><path d="M12 21c4-2 7-5 7-9V5l-4 3"></path><path d="M12 21V9"></path>',
  mosque: '<path d="M4 21V11a8 8 0 0 1 16 0v10"></path><path d="M2 21h20"></path><path d="M10 21v-4a2 2 0 0 1 4 0v4"></path><path d="M12 3V1"></path>',
  compass: '<circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2 5-5 2 2-5z"></path>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v4"></path>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
  bookClosed: '<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17H7.5A2.5 2.5 0 0 0 5 21.5z"></path><path d="M5 21.5A2.5 2.5 0 0 1 7.5 19H19v3H7.5"></path><path d="M12 6.5v6"></path><path d="M9 9.5h6"></path>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"></path><path d="M8 12h2l1-2 2 4 1-2h2"></path>',
  crescent: '<path d="M15 3.5A8.5 8.5 0 1 0 20.5 17 7 7 0 0 1 15 3.5z"></path><path d="m18 5 .7 1.6 1.8.2-1.3 1.2.4 1.8L18 8.9l-1.6.9.4-1.8-1.3-1.2 1.8-.2z"></path>',
  listCheck: '<path d="m4 6 1.5 1.5L8 5"></path><path d="m4 12 1.5 1.5L8 11"></path><path d="m4 18 1.5 1.5L8 17"></path><path d="M11 6h9"></path><path d="M11 12h9"></path><path d="M11 18h9"></path>',
  scroll: '<path d="M8 21h10a3 3 0 0 0 3-3v-1H11v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 0-3-3h13a3 3 0 0 1 3 3v11"></path><path d="M2 3a3 3 0 0 1 3 3v2H2z"></path><path d="M9 8h6"></path><path d="M9 12h6"></path>',
  counter: '<rect x="5" y="2" width="14" height="20" rx="7"></rect><rect x="8.5" y="6" width="7" height="4" rx="1"></rect><circle cx="12" cy="15.5" r="2.5"></circle>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M14.5 13.2a3 3 0 1 0 0 5.6 2.5 2.5 0 0 1 0-5.6z"></path>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"></path><path d="M21 3v5h-5"></path>'
};

export function icon(name, size, sw) {
  return svg(PATHS[name] || '', size, sw);
}

// Ornamen bintang delapan (geometri Islami) untuk kartu hero.
export function ornament({ size = 190, inner = true, cls = '' } = {}) {
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="var(--gold)" stroke-width="1.4"><rect x="22" y="22" width="56" height="56"></rect><rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)"></rect><circle cx="50" cy="50" r="15"></circle>${inner ? '<rect x="34" y="34" width="32" height="32"></rect><rect x="34" y="34" width="32" height="32" transform="rotate(45 50 50)"></rect>' : ''}</g></svg>`;
}
