export function initAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const root = document.documentElement;

  function startEntrance() {
    root.classList.remove('anim-ready');
    void root.offsetWidth;
    requestAnimationFrame(() => {
      root.classList.add('anim-ready');
    });
  }

  if (reduced) {
    root.classList.add('anim-ready');
    scrollEls.forEach((el) => el.classList.add('in'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    root.classList.add('anim-ready');
    scrollEls.forEach((el) => el.classList.add('in'));
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

  scrollEls.forEach((el) => io.observe(el));

  initHeroMethodScrollReveal();

  /* dispara animações após paint — também repete no F5/back-forward cache */
  requestAnimationFrame(() => {
    requestAnimationFrame(startEntrance);
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) startEntrance();
  });
}

/** Cards 01–04 no mobile: efeito chamativo só após o usuário rolar a página (não no F5). */
function initHeroMethodScrollReveal() {
  const method = document.querySelector('.hero-method');
  if (!method) return;

  const mobile = window.matchMedia('(max-width: 899px)');
  if (!mobile.matches) return;

  let scrolled = false;
  let revealed = false;

  const reveal = () => {
    if (revealed || !scrolled) return;

    const rect = method.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh * 0.84 && rect.bottom > vh * 0.1) {
      revealed = true;
      method.classList.add('method-scroll-in');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
    }
  };

  const onScroll = () => {
    scrolled = true;
    reveal();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('touchmove', onScroll, { passive: true });
}
