# Publicacao automatica da Hostiz

O arquivo `.github/workflows/deploy-ftp.yml` valida e publica automaticamente o conteudo de `dist/` sempre que houver um `push` na branch `main` que altere o site.

## Segredos obrigatorios no GitHub

Em **Settings > Secrets and variables > Actions > Secrets**, cadastre:

- `FTP_SERVER`: endereco do servidor FTP, sem `ftp://`.
- `FTP_USERNAME`: usuario da hospedagem.
- `FTP_PASSWORD`: senha da hospedagem.

Segredos opcionais:

- `FTP_PORT`: porta do FTP. Se nao for informado, usa `21`.
- `FTP_TARGET_DIR`: pasta remota que recebe o site. Se nao for informada, usa a pasta inicial da conta FTP.

## Verificacao depois da publicacao

Em **Settings > Secrets and variables > Actions > Variables**, crie `SITE_URL` com a URL publica do site. Quando essa variavel existir, a automacao acessa o endereco depois do envio e marca a publicacao como falha se o site nao responder.

## Como publicar

1. Altere os arquivos dentro de `dist/`.
2. Envie a alteracao para a branch `main`.
3. Acompanhe a execucao em **Actions > Publicar site por FTP**.

A publicacao envia somente arquivos novos ou modificados e nao apaga arquivos remotos automaticamente.
