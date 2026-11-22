// Cart storage contains only copy IDs. Each title is selectable once.
let cartIds=[];
try{const saved=JSON.parse(localStorage.getItem('ana-cart-v1')||'[]');if(Array.isArray(saved))cartIds=[...new Set(saved)];}catch{}
const cartText=(pt,en)=>state.lang==='pt'?pt:en;
const cartButton=document.createElement('button');cartButton.type='button';cartButton.className='cart-open';
cartButton.innerHTML='<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 3h2l2.5 12h11l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg><span class="cart-count"></span>';
document.body.append(cartButton);
const catalogEstimate=document.createElement('p');catalogEstimate.className='estimate-warning';$('.filter-row').before(catalogEstimate);
const cartDialog=document.createElement('dialog');cartDialog.className='cart-dialog';cartDialog.setAttribute('aria-labelledby','cart-heading');
cartDialog.innerHTML='<div class="cart-heading"><h2 id="cart-heading"></h2><button type="button" class="cart-close" aria-label="Fechar carrinho">×</button></div><p class="estimate-warning" id="cart-estimate-note"></p><div id="cart-items"></div><div class="cart-totals"><span id="cart-subtotal-label"></span><strong id="cart-subtotal"></strong></div><p id="cart-shipping-note"></p><div class="cart-checkout"><p class="pix-note" id="cart-pix-note"></p><div class="cart-footer-actions"><button type="button" class="cart-continue"></button><a id="cart-whatsapp" href="#"></a></div><p id="cart-result" role="status"></p></div>';
document.body.append(cartDialog);
const addButton=document.createElement('button');addButton.type='button';addButton.className='buy-button cart-add';$('#buy-button').before(addButton);
function cartKey(book){return `${book.title}|${book.author}`;}
function normaliseCart(){const seen=new Set();cartIds=cartIds.filter(id=>{const book=BOOKS.find(b=>b.id===id&&b.status==='available');if(!book||seen.has(cartKey(book)))return false;seen.add(cartKey(book));return true;});}
function persistCart(){normaliseCart();try{localStorage.setItem('ana-cart-v1',JSON.stringify(cartIds));}catch{}renderCart();}
function cartBooks(){return cartIds.map(id=>BOOKS.find(b=>b.id===id&&b.status==='available')).filter(Boolean);}
function sumEstimates(books){return books.reduce((sum,b)=>({min:sum.min+(b.suggestedPrice||b.priceRange[0]),max:sum.max+(b.suggestedPrice||b.priceRange[1])}),{min:0,max:0});}
function estimateRange(sum){return sum.min===sum.max?formatPrice(sum.min):`${formatPrice(sum.min)}–${formatPrice(sum.max)}`;}
function alreadyInCart(book){return cartBooks().some(item=>cartKey(item)===cartKey(book));}
function cartCover(book){
  const frame=document.createElement('div');frame.className='cart-cover';
  const fallback=document.createElement('div');fallback.className='cart-cover-fallback';fallback.style.background=book.color;fallback.style.color=contrast(book.color);
  const title=document.createElement('strong'),note=document.createElement('small');title.textContent=book.title;note.textContent=cartText('Capa ilustrativa','Illustrative cover');fallback.append(title,note);frame.append(fallback);
  const img=document.createElement('img');img.alt=cartText(`Capa de referência: ${book.title}`,`Reference cover: ${book.title}`);img.hidden=true;frame.append(img);
  img.onload=()=>{if(img.naturalWidth>20){img.hidden=false;fallback.hidden=true;}};
  img.onerror=()=>{img.hidden=true;fallback.hidden=false;};
  const initial=resolvedMetadata.get(book.id)?.cover||book.coverUrl;if(initial)img.src=initial;
  // Same cached cover lookup as the 3D preview, including titles without a local coverUrl.
  resolveCover(book).then(url=>{if(url&&frame.isConnected&&img.getAttribute('src')!==url)img.src=url;}).catch(()=>{});
  return frame;
}
function renderCart(){
  normaliseCart();const books=cartBooks(),rows=$('#cart-items');rows.replaceChildren();
  cartButton.hidden=!books.length;$('.cart-count').textContent=String(books.length);cartButton.setAttribute('aria-label',cartText(`Abrir carrinho (${books.length})`,`Open cart (${books.length})`));
  $('#cart-heading').textContent=cartText('Seu carrinho','Your cart');$('.cart-close').setAttribute('aria-label',cartText('Fechar carrinho','Close cart'));
  $('#cart-estimate-note').textContent=cartText('Todos os valores são ESTIMATIVAS. Negocie com Ana o preço final dos livros. Adicionar ao carrinho não reserva o exemplar.','All prices are ESTIMATES. Agree on final book prices with Ana. Adding a book does not reserve it.');
  catalogEstimate.textContent=cartText('PREÇOS ESTIMADOS — negocie com Ana. Confirme preço final, disponibilidade e entrega antes de pagar.','ESTIMATED PRICES — negotiate with Ana. Confirm final prices, availability and delivery before paying.');
  for(const book of books){
    const row=document.createElement('article');row.className='cart-item';row.append(cartCover(book));
    const info=document.createElement('div'),title=document.createElement('h3'),author=document.createElement('p'),price=document.createElement('p'),remove=document.createElement('button');
    title.textContent=book.title;author.textContent=book.author;price.textContent=`${estimateRange(sumEstimates([book]))} — ${cartText('estimativa','estimate')}`;
    remove.type='button';remove.className='cart-remove';remove.textContent=cartText('Remover livro','Remove book');remove.setAttribute('aria-label',`${remove.textContent}: ${book.title}`);remove.addEventListener('click',()=>{cartIds=cartIds.filter(id=>id!==book.id);persistCart();});
    info.append(title,author,price,remove);row.append(info);rows.append(row);
  }
  if(!books.length){const empty=document.createElement('p');empty.textContent=cartText('Seu carrinho está vazio. Continue explorando para escolher um livro.','Your cart is empty. Continue browsing to choose a book.');rows.append(empty);}
  $('#cart-subtotal-label').textContent=cartText('Subtotal ESTIMADO dos livros','ESTIMATED book subtotal');$('#cart-subtotal').textContent=estimateRange(sumEstimates(books));
  $('#cart-shipping-note').textContent=cartText('Entrega ou retirada em Juiz de Fora: combine diretamente com Ana pelo WhatsApp.','Shipping or pickup in Juiz de Fora: arrange directly with Ana on WhatsApp.');
  $('#cart-pix-note').textContent=cartText('Combine o valor final e a entrega com Ana. Ela enviará a cobrança PIX após o acordo.','Agree on final prices and delivery with Ana. She will send the PIX payment request afterwards.');
  $('.cart-continue').textContent=cartText('← Continuar explorando','← Continue browsing');$('#cart-whatsapp').textContent=cartText('Consultar Ana no WhatsApp ↗','Ask Ana on WhatsApp ↗');
  addButton.textContent=state.active&&alreadyInCart(state.active)?cartText('No carrinho — ver itens','In cart — view items'):cartText('Adicionar ao carrinho','Add to cart');
  updateCartContacts();
}
function updateCartContacts(){
  const books=cartBooks(),lines=books.map(b=>`• ${b.title} (${b.id}) — ${displayPrice(b)}`);
  const body=cartText('Olá, Ana! Tenho interesse nestes livros:','Hello Ana! I’m interested in these books:')+`\n\n${lines.join('\n')}\n\n${cartText('Subtotal estimado','Estimated subtotal')}: ${estimateRange(sumEstimates(books))}\n`+cartText('Podemos confirmar a disponibilidade, negociar os valores e combinar entrega e PIX?','Could we confirm availability, agree on prices, and arrange delivery and PIX?')+'\n\nhttps://jacino3d.github.io/estante-da-ana/';
  updateContactLink('cart-whatsapp','whatsapp','Pedido — Estante da Ana',body,!!books.length);
}
function continueBrowsing(){cartDialog.close();$('#acervo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
cartButton.addEventListener('click',()=>{hidePreview();renderCart();cartDialog.showModal();});$('.cart-close').addEventListener('click',()=>cartDialog.close());$('.cart-continue').addEventListener('click',continueBrowsing);
cartDialog.addEventListener('click',event=>{if(event.target===cartDialog)cartDialog.close();});
addButton.addEventListener('click',()=>{const book=state.active;if(!book||book.status==='sold')return;if(!alreadyInCart(book)){cartIds.push(book.id);persistCart();}$('#book-dialog').close();renderCart();cartDialog.showModal();});
$('#cart-whatsapp').addEventListener('click',event=>{if(!cartBooks().length){event.preventDefault();$('#cart-result').textContent=cartText('Adicione ao menos um livro.','Add at least one book.');}else if(event.currentTarget.getAttribute('aria-disabled')==='true'){event.preventDefault();$('#cart-result').textContent=cartText('O contato protegido de Ana ainda está sendo configurado.','Ana’s protected contact is being configured.');}});
window.EstanteCart={render:renderCart};$('#book-dialog').addEventListener('toggle',renderCart);renderCart();
