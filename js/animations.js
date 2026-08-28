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

  /* dispara animações após paint — também repete no F5/back-forward cache */
  requestAnimationFrame(() => {
    requestAnimationFrame(startEntrance);
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) startEntrance();
  });
}
