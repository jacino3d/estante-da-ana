# Contato protegido — configuração pendente

Este backend NÃO é publicado pelo GitHub Pages. Não funciona até configurar e implantar em uma conta Cloudflare.

1. Entrar na conta Cloudflare e criar o Worker `estante-da-ana-contato`. Aceites contratuais e autenticação ficam com o titular da conta.
2. Criar um widget Turnstile para o hostname real do Worker. Usar modo Managed e obter a sitekey pública e a chave secreta.
3. Definir a sitekey em TURNSTILE_SITE_KEY. Salvar PHONE (número com 55, DDD e número, somente dígitos) e TURNSTILE_SECRET como secrets do Worker. Nunca colocar esses valores no repositório, no site-config.js ou no chat. A chave secreta de Turnstile não é a sitekey pública.
4. Implantar worker.mjs usando wrangler.jsonc. A configuração inclui um limite de 12 solicitações/minuto por IP e localização Cloudflare; não é um limite global exato. Escolher namespace_id próprio se 1001 já for usado por outro serviço na conta.
5. Inserir apenas a URL HTTPS pública do Worker em whatsappGatewayUrl no site-config.js e deixar whatsapp como placeholder/vazio. Publicar o commit no GitHub.
6. Conferir na implantação real: solicitação sem token ou com token inválido falha; desafio válido abre WhatsApp com o texto correto. A verificação deve ser feita pelo titular/visitante, não simulada pelo agente.

Fluxo: página da estante → página do Worker → Turnstile → POST com validação do token → redirecionamento para wa.me. A mensagem tem somente informações públicas dos livros e não contém CEP. O código não grava a lista, IP ou número em banco e não cria logs próprios. A Cloudflare processa a requisição conforme suas políticas; logs de infraestrutura são controlados pela conta. Respostas são no-store e no-referrer.

O número não é entregue no GET nem no código público. Após o visitante passar pela verificação, o número aparece no redirecionamento/WhatsApp. Isso reduz scraping simples, mas não impede uma pessoa ou automação que consiga passar pelo desafio de coletá-lo. Não há garantia de impedir phishing; um número exclusivo da loja continua sendo recomendável.

Documentação: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ e https://developers.cloudflare.com/workers/configuration/secrets/

## Contato protegido implantado

O Worker está em https://estante-da-ana-contato.jcphillips3d.workers.dev/ . O site-config.js aponta para esse endereço. PHONE e TURNSTILE_SECRET ficam somente como secrets de produção na Cloudflare. A sitekey pública e o account_id no wrangler.jsonc não são credenciais secretas. Não copie PHONE ou TURNSTILE_SECRET para arquivos locais ou GitHub. Ainda é necessário o teste final do titular: passar a verificação no navegador e conferir o destinatário e a mensagem no WhatsApp, sem enviar automaticamente.
