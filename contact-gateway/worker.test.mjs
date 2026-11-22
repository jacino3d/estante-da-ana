import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
const origin='https://contact.example.test';
const env={PHONE:'5532999999999',TURNSTILE_SECRET:'test-secret',TURNSTILE_SITE_KEY:'test-site-key',CONTACT_LIMITER:{limit:async()=>({success:true})}};
const post=(values={})=>new Request(`${origin}/open`,{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(values)});
test('number is withheld until successful server verification',async()=>{
  const unconfigured=await worker.fetch(new Request(origin),{});assert.equal(unconfigured.status,503);
  const page=await worker.fetch(new Request(`${origin}/?text=${encodeURIComponent('<script>alert(1)</script>')}`),env);
  const html=await page.text();assert.ok(!html.includes(env.PHONE));assert.ok(!html.includes(env.TURNSTILE_SECRET));assert.ok(!html.includes('<script>alert'));assert.ok(html.includes('&lt;script&gt;'));
  const missing=await worker.fetch(post({text:'book'}),env);assert.equal(missing.status,400);assert.equal(missing.headers.get('Location'),null);
  const limited=await worker.fetch(new Request(origin),{...env,CONTACT_LIMITER:{limit:async()=>({success:false})}});assert.equal(limited.status,429);
  const original=globalThis.fetch;
  try{
    globalThis.fetch=async()=>Response.json({success:false});
    const rejected=await worker.fetch(post({'cf-turnstile-response':'bad',text:'book'}),env);assert.equal(rejected.status,403);assert.equal(rejected.headers.get('Location'),null);
    globalThis.fetch=async()=>Response.json({success:true,hostname:'other.example.test',action:'whatsapp'});
    assert.equal((await worker.fetch(post({'cf-turnstile-response':'wrong-host'}),env)).status,403);
    globalThis.fetch=async()=>Response.json({success:true,hostname:new URL(origin).hostname,action:'whatsapp'});
    const accepted=await worker.fetch(post({'cf-turnstile-response':'verified',text:'Livro & autor'}),env);
    assert.equal(accepted.status,303);assert.equal(accepted.headers.get('Cache-Control'),'no-store, private');
    const destination=new URL(accepted.headers.get('Location'));assert.equal(destination.hostname,'wa.me');assert.equal(destination.pathname,`/${env.PHONE}`);assert.equal(destination.searchParams.get('text'),'Livro & autor');
  }finally{globalThis.fetch=original;}
});
