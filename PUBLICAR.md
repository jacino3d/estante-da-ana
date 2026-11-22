# Publicar a Estante da Ana

O pacote está pronto para GitHub Pages. Nenhuma senha, token, foto original de lombada ou arquivo de pesquisa faz parte dele. É um site público: não inclua endereço residencial, credenciais ou dados de clientes em nenhum arquivo.

## Publicar pelo navegador

1. Extraia `estante-da-ana-github.zip` no computador.
2. Crie um repositório em https://github.com/new chamado `estante-da-ana`, com branch principal `main`. No GitHub Free, escolha público para usar Pages sem contratar um plano.
3. No repositório, escolha **Add file → Upload files**. Arraste o conteúdo da pasta extraída, incluindo `.github`, `scripts`, `vendor`, `covers`, `collages`, `furniture` e `ref`. Os arquivos devem ficar na raiz, sem outra pasta por cima. Confirme o commit.
4. Vá a **Settings → Pages → Build and deployment → Source → GitHub Actions**. Em **Actions**, execute `Publish Estante da Ana` se necessário. Cada novo commit em `main` publica as alterações automaticamente.
5. Quando o workflow ficar verde, Pages informará o link. Com o nome acima: `https://jacino3d.github.io/estante-da-ana/`. Esse endereço é o previsto, não uma confirmação de publicação.
6. Ative **Enforce HTTPS** em Pages se a opção estiver disponível. Compartilhe o endereço HTTPS com os compradores; funciona no navegador do celular, sem instalação.

O workflow publica somente os arquivos preparados em `dist`, não o editor de estoque nem estas instruções. Não precisa de npm, chave de API ou dependências de build.

## Marcar um exemplar como vendido

1. Na pasta extraída, abra `manage-inventory.html` no navegador do computador.
2. Busque o título, autor ou código. Cada exemplar possui um código próprio: livros repetidos podem ser vendidos separadamente.
3. Selecione **Vendido** e clique **Baixar arquivo atualizado**.
4. No GitHub, substitua `inventory-status.js` pelo arquivo baixado e confirme o commit em `main`.
5. Aguarde o workflow ficar verde e atualize a página. O livro continua cinza no mesmo lugar, sem abrir ou aceitar compra. Para devolver ao estoque, selecione **Disponível** e repita.

A mudança só vale para todos depois do commit e da publicação. Use o arquivo mais recente do repositório no seu editor local antes de editar novamente, para não desfazer vendas anteriores. Não exclua ou reordene linhas antigas de INVENTORY_RAW: os códigos são vinculados à ordem. Novos exemplares devem ser acrescentados ao final.

## Contatos e frete

Edite `site-config.js` com e-mail e WhatsApp comercial antes de compartilhar. O número usa apenas dígitos: país 55, DDD e número. Os placeholders permanecem desativados até a configuração. O CEP de origem ainda é um exemplo municipal; substitua pelo CEP exato de coleta quando conhecido. Frete é pedido por contato; não há cotação automática ou pagamento PIX ativo nesta versão.

O site não recebe nem armazena CEPs ou mensagens de compradores. Ao clicar para contato, o comprador abre um rascunho no provedor escolhido. Capas e metadados podem ser buscados no Google Books, Open Library e fontes editoriais; esses serviços recebem as solicitações normais do navegador. Não há analytics ou cadastro de usuários. Os metadados de livros são guardados por até 30 dias no navegador para reduzir consultas.

## Conferir antes de enviar

Use HTTP para o visualizador 3D: `python -m http.server 8765`, depois `http://localhost:8765`. Abrir index.html diretamente pode bloquear módulos 3D. No celular, o link público HTTPS funciona normalmente. Deslize as prateleiras para ver os títulos e toque para abrir. Se WebGL não estiver disponível, a capa em HTML é exibida.

Fontes oficiais: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site e https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
