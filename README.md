# Estante da Ana

Site público estático em português e inglês, publicado pelo GitHub Pages. O workflow envia somente os arquivos de `dist`; fotos originais, pesquisas e o editor de estoque não entram no site público.

## Estoque e preços

O editor local está em `manage-inventory.html`. Abra esse arquivo no computador, marque exemplares vendidos ou ajuste estimativas, exporte `inventory-status.js` e publique esse arquivo no GitHub para atualizar a estante. O editor não grava alterações sozinho nem tem acesso para publicar no GitHub. Não compartilhe uma versão hospedada publicamente do editor; o acesso privado via Cloudflare Access ainda depende da ativação do Zero Trust.

Cada exemplar tem um código estável. Não remova nem reordene entradas de `INVENTORY_RAW`; exemplares novos vão ao final. Use sempre a versão mais recente de `inventory-status.js` ao editar.

## Publicação

Cada commit em `main` executa `.github/workflows/pages.yml`. A preparação de `dist` é feita por `node scripts/build-pages.mjs`. O site público é `https://jacino3d.github.io/estante-da-ana/`.

## Contato e privacidade

O WhatsApp passa pelo Worker em `contact-gateway/`. Telefone e segredo Turnstile ficam apenas nos secrets de produção da Cloudflare. A página pede o nome, verifica o desafio no servidor e abre um rascunho; não envia a mensagem nem guarda o nome ou a lista de livros. Os logs de observabilidade do Worker estão desativados. O livro, a lista e o nome ficam visíveis no WhatsApp após o redirecionamento.

Os preços são estimativas negociáveis. O frete e o PIX são combinados com Ana; o site não calcula tarifas nem recebe pagamentos. Não inclua endereços, dados de clientes, telefone ou credenciais no código público.

Para desenvolvimento local do visualizador 3D, use `python -m http.server 8765` e abra `http://localhost:8765/`.
