# Elite40+ — Landing

Landing page da consultoria **Elite40+** (Marcos Aurílio).

## Ver em tempo real

```bash
npm install
npm run dev
```

Abra: [http://127.0.0.1:43123/index-v2.html](http://127.0.0.1:43123/index-v2.html)

O Vite recarrega a página automaticamente quando o `index-v2.html` é salvo.

## Arquivos principais

- `index-v2.html` — página completa (edite este)
- `assets/` — imagens da marca e do personal

## Imagens necessárias

Coloque os dois arquivos em `assets/` com estes nomes exatos:

| Arquivo | Conteúdo | Onde aparece |
| --- | --- | --- |
| `assets/elite40-shield.png` | Escudo "Metodologia Elite40+" | header, menu mobile, legenda da foto do hero, CTA final, rodapé, favicon, og:image |
| `assets/trainer-photo.png` | Foto do personal (retrato) | moldura do hero e seção Fundador |

Comportamento quando um arquivo não existe:

- **Logo:** o site cai automaticamente para `assets/elite40-shield.svg`, uma recriação em vetor do escudo. Ao adicionar o PNG oficial, ele passa a ser usado sem nenhuma mudança no código.
- **Foto do personal:** aparece um marcador discreto no lugar, em vez de um ícone de imagem quebrada.
