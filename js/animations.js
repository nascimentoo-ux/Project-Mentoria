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
    initLogoReveal(true);
    return;
  }

  if (!('IntersectionObserver' in window)) {
    root.classList.add('anim-ready');
    scrollEls.forEach((el) => el.classList.add('in'));
    initLogoReveal(false);
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

  initLogoReveal(reduced);
}

function initLogoReveal(reduced) {
  const stage = document.querySelector('[data-logo-reveal]');
  if (!stage) return;

  const video = stage.querySelector('.close-mark-video');
  const still = stage.querySelector('.close-mark-still');

  const useStill = () => {
    stage.classList.remove('has-video');
    if (video) {
      video.pause();
      video.removeAttribute('src');
    }
    stage.classList.add('is-on');
  };

  const playVideo = () => {
    if (!video) return useStill();
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 1.55;
    const run = video.play();
    if (run && typeof run.then === 'function') {
      run.then(() => {
        stage.classList.add('has-video', 'is-on');
        if (still) still.setAttribute('alt', '');
      }).catch(useStill);
    } else {
      stage.classList.add('has-video', 'is-on');
    }
  };

  if (reduced) {
    if (still) {
      still.style.clipPath = 'none';
      still.style.transform = 'none';
      still.style.opacity = '1';
    }
    stage.classList.add('is-on');
    return;
  }

  const start = () => {
    if (!video) return useStill();
    video.addEventListener('error', useStill, { once: true });
    const kick = () => playVideo();
    if (video.readyState >= 2) {
      kick();
      return;
    }
    video.addEventListener('canplay', kick, { once: true });
    try { video.load(); } catch (_) { /* ignore */ }
    window.setTimeout(() => {
      if (!stage.classList.contains('is-on') && video.paused) useStill();
    }, 1400);
  };

  if (!('IntersectionObserver' in window)) {
    start();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        start();
        io.unobserve(stage);
      });
    },
    { threshold: 0.32, rootMargin: '0px 0px -8% 0px' }
  );
  io.observe(stage);
}
