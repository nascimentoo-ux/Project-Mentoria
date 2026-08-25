# Elite40+ — Landing

Landing page da consultoria **Elite40+** (Marcos Aurílio).

## Ver em tempo real

```bash
npm install
npm run dev
```

Abra: [http://127.0.0.1:43123/index-v2.html](http://127.0.0.1:43123/index-v2.html)

O Vite recarrega automaticamente quando qualquer arquivo é salvo.

## Estrutura do projeto

```
index-v2.html      # HTML da página
css/
  main.css         # ponto de entrada (importa os demais)
  variables.css    # tokens de cor, tipografia e espaçamento
  base.css         # reset, tipografia e botões
  header.css       # barra de navegação e menu mobile
  hero.css         # seção principal e foto do personal
  animations.css   # entrada sincronizada e scroll reveal
  sections.css     # demais seções (planos, FAQ, etc.)
  utilities.css    # utilitários (skip link)
js/
  main.js          # inicialização
  config.js        # WhatsApp, Instagram e dados do site
  scroll.js        # scroll ao topo e barra de progresso
  links.js         # links dinâmicos
  images.js        # fallback de imagens
  menu.js          # menu mobile
  animations.js    # animações de entrada e scroll
assets/            # imagens
```

## Imagens necessárias

| Arquivo | Conteúdo | Onde aparece |
| --- | --- | --- |
| `assets/elite40-shield.png` | Escudo "Metodologia Elite40+" | header, legenda da foto, CTA final, rodapé |
| `assets/trainer-photo.png` | Foto do personal (retrato) | hero e seção Fundador |

- **Logo:** fallback automático para `assets/elite40-shield.svg` se o PNG não existir.
- **Foto:** marcador discreto no lugar se o arquivo não existir.
