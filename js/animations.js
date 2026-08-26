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

/** Cards 01–04 no mobile: cascata suave só após scroll (não no F5). */
function initHeroMethodScrollReveal() {
  const method = document.querySelector('.hero-method');
  if (!method) return;

  const mobile = window.matchMedia('(max-width: 899px)');
  if (!mobile.matches) return;

  let scrolled = false;

  const markScrolled = () => {
    scrolled = true;
  };

  window.addEventListener('scroll', markScrolled, { passive: true });
  window.addEventListener('touchmove', markScrolled, { passive: true });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !scrolled || method.classList.contains('method-scroll-in')) {
          return;
        }

        const items = method.querySelectorAll('li');
        items.forEach((li) => {
          li.style.opacity = '0';
          li.style.transform = 'translateY(14px)';
        });

        requestAnimationFrame(() => {
          method.classList.add('method-scroll-in');
          items.forEach((li) => {
            li.style.opacity = '';
            li.style.transform = '';
          });
        });

        io.disconnect();
        window.removeEventListener('scroll', markScrolled);
        window.removeEventListener('touchmove', markScrolled);
      });
    },
    { threshold: 0.22, rootMargin: '0px 0px -8% 0px' }
  );

  io.observe(method);
}
