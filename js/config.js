export const CONFIG = {
  name: 'Marcos Aurílio',
  whatsappNumber: '5561999999999',
  instagram: 'https://instagram.com/seu_perfil',
};

export function waLink(msg) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
