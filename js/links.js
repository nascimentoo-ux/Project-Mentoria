import { CONFIG, waLink } from './config.js';

export function initLinks() {
  document.querySelectorAll('.js-wa').forEach((el) => {
    el.href = waLink(el.getAttribute('data-msg') || `Olá, ${CONFIG.name}!`);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.querySelectorAll('.js-ig').forEach((el) => {
    el.href = CONFIG.instagram;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.querySelectorAll('.js-tt').forEach((el) => {
    el.href = CONFIG.tiktok;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
}
