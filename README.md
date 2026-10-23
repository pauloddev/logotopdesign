# Logotop Design — site oficial

Site estático (HTML, CSS e JavaScript puros, sem dependências externas) da **Logotop Design**: sites, landing pages, e-commerces e identidades visuais.

## Estrutura

```
index.html                    página principal (PT / EN / ES)
politica-de-privacidade.html  política de privacidade (LGPD)
assets/css/styles.css         estilos
assets/js/app.js              interações (carrosséis, idiomas, animações)
assets/fonts/                 fontes Orbitron e Manrope hospedadas no próprio site
videos/  verticais/           gravações dos sites (sem áudio)
case/  identidade/  img/      identidades visuais, logotipos e imagens
avaliacoes/  equipe/  flags/  fotos de avaliações, equipe e bandeiras
.htaccess                     segurança e cache para Apache (Hostinger, cPanel etc.)
_headers                      segurança para Netlify / Cloudflare Pages
vercel.json                   segurança para Vercel
```

## Como publicar

- **Hospedagem com cPanel / Hostinger:** envie todo o conteúdo desta pasta (inclusive o arquivo oculto `.htaccess`) para `public_html`.
- **Netlify, Vercel ou Cloudflare Pages:** conecte este repositório. Não há etapa de build; a pasta de publicação é a raiz.
- **GitHub Pages:** Settings → Pages → Branch `main` / pasta `/ (root)`.

Depois de apontar o domínio, ative o HTTPS na hospedagem.

## Segurança

- Content Security Policy rígida: só carrega scripts, estilos, fontes e mídia do próprio domínio (sem `eval`, sem scripts inline, sem terceiros).
- Cabeçalhos HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` e `Permissions-Policy` configurados.
- Sem formulários, cookies, rastreadores ou coleta de dados; links externos com `rel="noopener noreferrer"`.

## Editar conteúdo

- WhatsApp: constante `WHATS` no início de `assets/js/app.js`.
- Vídeos do carrossel horizontal: lista `SITES`; vídeos verticais: lista `VS`.
- Identidades visuais completas: objeto `CASES`; logotipos: `LOGOS_A` e `LOGOS_B`.
- Traduções: objeto `D` (português → [inglês, espanhol]).

© Logotop Design® — CNPJ 69.087.797/0001-02
