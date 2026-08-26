export function initMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mmenu');
  if (!burger || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  };

  burger.addEventListener('click', toggle);
  burger.addEventListener('pointerup', (e) => {
    /* reforço em alguns WebViews móveis */
    if (e.pointerType === 'touch') toggle(e);
  }, { passive: false });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) setOpen(false);
  });
}
