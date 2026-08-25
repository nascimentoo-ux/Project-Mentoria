export function initScroll() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) window.scrollTo(0, 0);
  });

  function scrollToTop(smooth) {
    window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }

  document.querySelectorAll('a.brand, a[href="#hero"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTop(true);
    });
  });
}

export function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener(
    'scroll',
    () => {
      const h = document.documentElement;
      bar.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
    },
    { passive: true }
  );
}
