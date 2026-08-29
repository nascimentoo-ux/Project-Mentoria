export const CONFIG = {
  name: 'Marcos Aurílio',
  whatsappNumber: '5561999999999',
  instagram: 'https://www.instagram.com/treinador.marcosaurilio?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  tiktok: 'https://www.tiktok.com/@treinador.marcosaurilio',
};

export function waLink(msg) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
