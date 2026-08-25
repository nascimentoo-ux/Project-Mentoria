export function initAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollEls = document.querySelectorAll('.reveal, .reveal-stagger');

  function finishEntrance() {
    document.body.classList.add('is-ready');
    scrollEls.forEach((el) => {
      if (el.closest('#hero')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('in');
      }
    });
  }

  function showAll() {
    document.body.classList.add('is-ready');
    scrollEls.forEach((el) => el.classList.add('in'));
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
  );

  scrollEls.forEach((el) => {
    if (el.closest('#hero')) return;
    io.observe(el);
  });

  /* Aguarda paint + fontes antes de disparar a entrada — evita pular a animação */
  function startEntrance() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        finishEntrance();
      });
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(startEntrance).catch(startEntrance);
  } else {
    startEntrance();
  }
}
