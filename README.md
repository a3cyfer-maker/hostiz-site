# Hostiz

Código do site da Hostiz. Os arquivos ficam em `dist/`.

## Validação

```sh
node scripts/validate-static-site.mjs
node --check dist/script.js
```

## Publicação

Consulte `DEPLOY.md` para configurar a hospedagem FTP e os segredos no GitHub. O fluxo FTP depende dessa configuração e não atualiza o endereço `chatgpt.site`; a cópia no Sites é publicada separadamente.
