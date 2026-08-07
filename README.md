# PsicoTalk — Especial Dia do Psicólogo

Landing page estática e responsiva para o evento presencial de 27 de agosto de 2026.

## Editar

- Conteúdo principal: `index.html`
- Cores, tamanhos e layout: `styles.css`
- Data da contagem regressiva: `script.js`
- Logos e imagem: pasta `assets`

Os participantes, suas fotos e biografias ficam na seção `speaker-grid` do arquivo `index.html`.

## Visualizar

Abra esta pasta no VS Code e use uma extensão como Live Server no arquivo `index.html`, ou execute um servidor local na pasta.

## Publicação na Turbo Cloud

O arquivo `.cpanel.yml` envia o site para `public_html` pelo Git Version Control do cPanel.

Depois de cada atualização no GitHub:

1. Abra **Git Version Control** no cPanel.
2. Entre em **Manage** no repositório do PsicoTalk.
3. Clique em **Update from Remote**.
4. Clique em **Deploy HEAD Commit**.
