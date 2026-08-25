function markBroken(img) {
  const alt = img.getAttribute('data-fallback-src');
  if (alt && !img.src.includes(alt)) {
    img.src = alt;
    return;
  }
  img.style.display = 'none';
  const ph = img.parentElement?.querySelector('.ph-empty');
  if (ph) ph.hidden = false;
}

export function initImages() {
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => markBroken(img));
    if (img.complete && img.naturalWidth === 0) markBroken(img);
  });
}
