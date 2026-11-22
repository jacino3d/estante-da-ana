// Deploy separately from GitHub Pages. PHONE and TURNSTILE_SECRET are secrets.
const headers={
  'Cache-Control':'no-store, private','Referrer-Policy':'no-referrer',
  'X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY',
  'Content-Security-Policy':"default-src 'none'; script-src https://challenges.cloudflare.com; style-src 'unsafe-inline'; frame-src https://challenges.cloudflare.com; connect-src https://challenges.cloudflare.com; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
};
const reply=(text,status=200,extra={})=>new Response(text,{status,headers:{...headers,'Content-Type':'text/plain; charset=utf-8',...extra}});
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const sameOriginPost=(request,url)=>{
  const origin=request.headers.get('Origin');
  if(origin){
    try{
      const parsed=new URL(origin);
      if(parsed.protocol==='https:'&&parsed.hostname===url.hostname)return true;
    }catch{}
  }
  const site=request.headers.get('Sec-Fetch-Site');
  if(site)return site==='same-origin';
  const referer=request.headers.get('Referer');
  try{return !!referer&&new URL(referer).origin===url.origin;}catch{return false;}
};
const errorPage=(title,message)=>'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escapeHtml(title)+' — Estante da Ana</title><style>body{margin:0;background:#f2ede4;color:#35251c;font:17px/1.6 system-ui}main{max-width:560px;margin:12vh auto;padding:24px}h1{font:36px Georgia}a{display:inline-block;margin-top:18px;color:#70462d}</style><main><h1>'+escapeHtml(title)+'</h1><p>'+escapeHtml(message)+'</p><a href="/">← Voltar à página de contato</a></main></html>';
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
      const html=`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contato protegido — Estante da Ana</title><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script><style>body{margin:0;background:#f2ede4;color:#35251c;font:16px/1.6 system-ui}main{max-width:560px;margin:8vh auto;padding:24px}h1{font:36px Georgia}button{padding:14px 20px;background:#3b251b;color:#fff;border:0;border-radius:5px;font:inherit}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#e7dccd;padding:16px;font:14px/1.5 system-ui}a{color:#70462d}</style><main><h1>Fale com Ana</h1><p>Confirme a verificação abaixo para abrir o WhatsApp. Você poderá revisar e enviar a mensagem no aplicativo.</p><form method="post" action="/open"><input type="hidden" name="text" value="${escapeHtml(text)}"><div class="cf-turnstile" data-sitekey="${escapeHtml(env.TURNSTILE_SITE_KEY)}" data-action="whatsapp"></div><p><button type="submit">Continuar para o WhatsApp ↗</button></p></form><details><summary>Ver mensagem</summary><pre>${escapeHtml(text)}</pre></details><p>A verificação é processada pela Cloudflare para reduzir acessos automatizados. O número ficará visível no WhatsApp após continuar.</p><a href="https://jacino3d.github.io/estante-da-ana/">← Voltar à estante</a></main></html>`;
      return reply(html,200,{'Content-Type':'text/html; charset=utf-8'});
    }
    if(request.method!=='POST'||url.pathname!=='/open')return reply('Não encontrado.',404);
    if(!sameOriginPost(request,url))return reply(errorPage('Não foi possível continuar','Volte à página de contato, atualize a verificação e tente novamente.'),403,{'Content-Type':'text/html; charset=utf-8'});
    if(!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))return reply('Formato inválido.',415);
    let form;try{form=new URLSearchParams(await boundedBody(request));}catch{return reply('Solicitação grande demais.',413);}
    const token=form.get('cf-turnstile-response')||'',text=form.get('text')||'';
    if(!token||token.length>2048||text.length>4000)return reply('Conclua a verificação e tente novamente.',400);
    try{
      const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined}),signal:AbortSignal.timeout(8000)});
      if(!response.ok)return reply('Verificação indisponível. Tente novamente.',503);
      const check=await response.json();
      if(!check.success||check.hostname!==url.hostname||check.action!=='whatsapp')return reply('Verificação inválida ou expirada. Volte e tente novamente.',403);
      return new Response(null,{status:303,headers:{...headers,Location:`https://wa.me/${env.PHONE}?text=${encodeURIComponent(text||'Olá, Ana!')}`}});
    }catch{return reply('Verificação indisponível. Tente novamente.',503);}
  }
};
