// Deploy separately from GitHub Pages. PHONE and TURNSTILE_SECRET are secrets.
const headers={
  'Cache-Control':'no-store, private','Referrer-Policy':'no-referrer',
  'X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY',
  'Content-Security-Policy':"default-src 'none'; script-src https://challenges.cloudflare.com; style-src 'unsafe-inline'; frame-src https://challenges.cloudflare.com; connect-src https://challenges.cloudflare.com; form-action 'self' https://wa.me https://*.whatsapp.com https://api.whatsapp.com; base-uri 'none'; frame-ancestors 'none'"
};
const reply=(text,status=200,extra={})=>new Response(text,{status,headers:{...headers,'Content-Type':'text/plain; charset=utf-8',...extra}});
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const recentlyVerified=new Map();
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),byte=>byte.toString(16).padStart(2,'0')).join('');
async function boundedBody(request){
  const reader=request.body?.getReader();if(!reader)return '';
  let size=0;const chunks=[];
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>24000){await reader.cancel();throw new Error('oversize');}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return new TextDecoder().decode(bytes);
}
export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(!env.PHONE||!/^55[1-9]\d[2-9]\d{7,8}$/.test(env.PHONE)||!env.TURNSTILE_SECRET||!env.TURNSTILE_SITE_KEY||!env.CONTACT_LIMITER)return reply('Contato ainda não configurado.',503);
    if(!['/','/open'].includes(url.pathname))return reply('Não encontrado.',404);
    if(!['GET','POST'].includes(request.method))return reply('Método não permitido.',405,{Allow:'GET, POST'});
    try{const limit=await env.CONTACT_LIMITER.limit({key:request.headers.get('CF-Connecting-IP')||'unknown'});if(!limit.success)return reply('Muitas tentativas. Aguarde um minuto.',429,{'Retry-After':'60'});}catch{return reply('Serviço temporariamente indisponível.',503);}
    if(request.method==='GET'&&url.pathname==='/'){
      const text=url.searchParams.get('text')||'Olá, Ana! Tenho interesse nos livros da sua estante.';
      if(text.length>4000)return reply('A lista está muito longa. Volte à estante e consulte um grupo menor de livros por vez.',400);
      const nonce=crypto.randomUUID().replaceAll('-','');
      const retry=url.searchParams.get('retry')==='expired'?'<p role="status">A verificação anterior expirou. Faça uma nova verificação para continuar.</p>':'';
      const html=`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contato protegido — Estante da Ana</title><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script><style>body{margin:0;background:#f2ede4;color:#35251c;font:16px/1.6 system-ui}main{max-width:560px;margin:8vh auto;padding:24px}h1{font:36px Georgia}label{display:block;margin:0 0 14px}input{display:block;box-sizing:border-box;width:100%;margin-top:6px;padding:12px;border:1px solid #ae9885;border-radius:5px;font:inherit}button{padding:14px 20px;background:#3b251b;color:#fff;border:0;border-radius:5px;font:inherit}button:disabled{opacity:.65}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#e7dccd;padding:16px;font:14px/1.5 system-ui}a{color:#70462d}</style><main><h1>Fale com Ana</h1><p>Informe seu nome e confirme a verificação para abrir o WhatsApp. Você poderá revisar e enviar a mensagem no aplicativo.</p>${retry}<form id="contact-form" method="post" action="/open"><input type="hidden" name="text" value="${escapeHtml(text)}"><label for="contact-name">Seu nome<input id="contact-name" name="name" type="text" maxlength="80" autocomplete="name" required placeholder="Como podemos te chamar?"></label><div class="cf-turnstile" data-sitekey="${escapeHtml(env.TURNSTILE_SITE_KEY)}" data-action="whatsapp"></div><p><button type="submit">Continuar para o WhatsApp ↗</button></p></form><details><summary>Ver mensagem</summary><p>Seu nome será incluído no início desta mensagem:</p><pre>${escapeHtml(text)}</pre></details><p>A verificação é processada pela Cloudflare para reduzir acessos automatizados. Seu nome e o número ficarão visíveis no WhatsApp após continuar.</p><a href="https://jacino3d.github.io/estante-da-ana/">← Voltar à estante</a></main><script nonce="${nonce}">document.querySelector('#contact-form').addEventListener('submit',function(){const b=this.querySelector('button');b.disabled=true;b.textContent='Abrindo WhatsApp…'});</script></html>`;
      return reply(html,200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':headers['Content-Security-Policy'].replace("https://challenges.cloudflare.com;","https://challenges.cloudflare.com 'nonce-"+nonce+"';")});
    }
    if(request.method!=='POST'||url.pathname!=='/open')return reply('Não encontrado.',404);
    if(!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))return reply('Formato inválido.',415);
    let form;try{form=new URLSearchParams(await boundedBody(request));}catch{return reply('Solicitação grande demais.',413);}
    const token=form.get('cf-turnstile-response')||'',text=form.get('text')||'';
    const name=(form.get('name')||'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim();
    if(!token||token.length>2048||text.length>4000||!name||name.length>80)return reply('Informe seu nome, conclua a verificação e tente novamente.',400);
    let personalized=text;
    if(/^Olá, Ana!\s*/i.test(text))personalized=text.replace(/^Olá, Ana!\s*/i,`Olá, eu sou ${name}, `).replace(', Tenho interesse',', tenho interesse');
    else if(/^Hello Ana!\s*/i.test(text))personalized=text.replace(/^Hello Ana!\s*/i,`Hello, I am ${name}, `).replace(', I’m interested',', and I’m interested');
    else personalized=`Olá, eu sou ${name}. ${text}`;
    const message=personalized;
    const tokenKey=await digest(token),messageKey=await digest(message),now=Date.now();
    for(const [key,entry] of recentlyVerified)if(entry.expires<=now)recentlyVerified.delete(key);
    const cacheKey=new Request(`${url.origin}/_verified/${tokenKey}`);
    let previous=recentlyVerified.get(tokenKey);
    if(!previous&&globalThis.caches?.default){
      try{const cached=await caches.default.match(cacheKey);if(cached)previous=await cached.json();}catch{}
    }
    if(previous){
      if(previous.messageKey!==messageKey)return reply('Esta verificação já foi usada. Volte e faça uma nova verificação.',403);
      return new Response(null,{status:303,headers:{...headers,Location:`https://wa.me/${env.PHONE}?text=${encodeURIComponent(message)}`}});
    }
    try{
      const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined}),signal:AbortSignal.timeout(8000)});
      if(!response.ok)return reply('Verificação indisponível. Tente novamente.',503);
      const check=await response.json();
      const errors=check['error-codes']||[];
      if(errors.includes('invalid-input-secret'))return reply('A chave secreta do Turnstile no Cloudflare não corresponde a este widget. O administrador precisa atualizar o secret TURNSTILE_SECRET.',503);
      if(errors.includes('timeout-or-duplicate')||errors.includes('invalid-input-response'))return new Response(null,{status:303,headers:{...headers,Location:`/?retry=expired&text=${encodeURIComponent(text)}`}});
      if(!check.success)return reply('A Cloudflare não aceitou esta verificação. Atualize a página e tente novamente. Código: '+errors.join(', '),403);
      if(check.hostname!==url.hostname)return reply('O domínio permitido no widget Turnstile não corresponde ao contato. Confira a lista de domínios do widget no Cloudflare.',403);
      if(check.action!=='whatsapp')return reply('A ação configurada no widget não corresponde. Atualize a página de contato e tente novamente.',403);
      recentlyVerified.set(tokenKey,{messageKey,expires:now+120000});
      if(globalThis.caches?.default){
        try{await caches.default.put(cacheKey,new Response(JSON.stringify({messageKey}),{headers:{'Cache-Control':'public, max-age=120','Content-Type':'application/json'}}));}catch{}
      }
      return new Response(null,{status:303,headers:{...headers,Location:`https://wa.me/${env.PHONE}?text=${encodeURIComponent(message)}`}});
    }catch{return reply('Verificação indisponível. Tente novamente.',503);}
  }
};
