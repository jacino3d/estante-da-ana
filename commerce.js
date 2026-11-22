// The cart stores copy IDs only, never buyer/contact/CEP data. Quotes are not orders.
let cartIds=[];
try{const saved=JSON.parse(localStorage.getItem('ana-cart-v1')||'[]');if(Array.isArray(saved))cartIds=[...new Set(saved)].filter(id=>BOOKS.some(b=>b.id===id&&b.status==='available'));}catch{}
const cartText=(pt,en)=>state.lang==='pt'?pt:en;
const cartButton=document.createElement('button');cartButton.type='button';cartButton.className='cart-open';
$('.site-header').append(cartButton);
const catalogEstimate=document.createElement('p');catalogEstimate.className='estimate-warning';$('.filter-row').before(catalogEstimate);
const cartDialog=document.createElement('dialog');cartDialog.className='cart-dialog';cartDialog.setAttribute('aria-labelledby','cart-heading');
cartDialog.innerHTML='<div class="cart-heading"><h2 id="cart-heading"></h2><button type="button" class="cart-close" aria-label="Fechar carrinho">×</button></div><p class="estimate-warning" id="cart-estimate-note"></p><div id="cart-items"></div><div class="cart-totals"><span id="cart-subtotal-label"></span><strong id="cart-subtotal"></strong><span id="cart-freight-label"></span><strong id="cart-freight"></strong><span id="cart-total-label"></span><strong id="cart-total"></strong></div><div class="cart-checkout"><label><span id="cart-cep-label"></span><input id="cart-cep" inputmode="numeric" maxlength="9" autocomplete="postal-code" placeholder="00000-000"></label><label><span id="cart-service-label"></span><select id="cart-service"><option value="SEDEX">SEDEX</option><option value="PAC">PAC</option><option value="Retirada">Retirada em Juiz de Fora</option></select></label><p id="cart-shipping-note"></p><p class="pix-note" id="cart-pix-note"></p><div class="contact-actions"><a id="cart-whatsapp" href="#"></a><a id="cart-email" href="#"></a></div><p id="cart-result" role="status"></p></div>';
document.body.append(cartDialog);
const addButton=document.createElement('button');addButton.type='button';addButton.className='buy-button cart-add';
$('#buy-button').before(addButton);
function persistCart(){try{localStorage.setItem('ana-cart-v1',JSON.stringify(cartIds));}catch{}renderCart();}
function cartBooks(){return cartIds.map(id=>BOOKS.find(b=>b.id===id&&b.status==='available')).filter(Boolean);}
function sumEstimates(books){return books.reduce((sum,b)=>({min:sum.min+(b.suggestedPrice||b.priceRange[0]),max:sum.max+(b.suggestedPrice||b.priceRange[1])}),{min:0,max:0});}
function estimateRange(sum){return sum.min===sum.max?formatPrice(sum.min):`${formatPrice(sum.min)}–${formatPrice(sum.max)}`;}
function matchingCopies(book){return activeBooks().filter(b=>b.title===book.title&&b.author===book.author);}
function addCopy(book){const next=matchingCopies(book).find(b=>!cartIds.includes(b.id));if(next){cartIds.push(next.id);persistCart();}return !!next;}
function renderCart(){
  cartIds=cartIds.filter(id=>BOOKS.some(b=>b.id===id&&b.status==='available'));
  const books=cartBooks(),sum=sumEstimates(books),rows=$('#cart-items');rows.replaceChildren();
  cartButton.textContent=cartText(`Carrinho (${books.length})`,`Cart (${books.length})`);
  $('#cart-heading').textContent=cartText('Seu carrinho','Your cart');
  $('.cart-close').setAttribute('aria-label',cartText('Fechar carrinho','Close cart'));
  $('#cart-estimate-note').textContent=cartText('Todos os valores são ESTIMATIVAS. Negocie com Ana o preço final dos livros e o frete. Adicionar ao carrinho não reserva o exemplar.','All prices are ESTIMATES. Agree on the final book prices and shipping with Ana. Adding a book does not reserve it.');
  catalogEstimate.textContent=cartText('PREÇOS ESTIMADOS — valores de referência, sujeitos a negociação com Ana. Confirme preço final, disponibilidade e frete antes de pagar.','ESTIMATED PRICES — reference values, subject to negotiation with Ana. Confirm final prices, availability and shipping before paying.');
  const groups=new Map();for(const book of books){const key=`${book.title}|${book.author}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(book);}
  for(const copies of groups.values()){
    const book=copies[0],row=document.createElement('article');row.className='cart-item';
    if(book.coverUrl){const img=document.createElement('img');img.src=book.coverUrl;img.alt='';img.loading='lazy';row.append(img);}
    const info=document.createElement('div'),title=document.createElement('h3'),author=document.createElement('p'),price=document.createElement('p'),controls=document.createElement('div');controls.className='cart-quantity';
    title.textContent=book.title;author.textContent=book.author;price.textContent=`${estimateRange(sumEstimates(copies))} — ${cartText('estimativa','estimate')}`;
    for(const [label,action,disabled] of [[cartText('Diminuir quantidade','Decrease quantity'),()=>{cartIds=cartIds.filter(id=>id!==copies.at(-1).id);persistCart();},false],[cartText('Aumentar quantidade','Increase quantity'),()=>addCopy(book),!matchingCopies(book).some(b=>!cartIds.includes(b.id))]]){
      const button=document.createElement('button');button.type='button';button.textContent=label.includes('Diminuir')||label.includes('Decrease')?'−':'+';button.setAttribute('aria-label',`${label}: ${book.title}`);button.disabled=disabled;button.addEventListener('click',action);controls.append(button);
      if(controls.children.length===1){const qty=document.createElement('span');qty.textContent=String(copies.length);controls.append(qty);}
    }
    const remove=document.createElement('button');remove.type='button';remove.textContent=cartText('Remover','Remove');remove.addEventListener('click',()=>{const ids=new Set(copies.map(b=>b.id));cartIds=cartIds.filter(id=>!ids.has(id));persistCart();});controls.append(remove);
    info.append(title,author,price,controls);row.append(info);rows.append(row);
  }
  if(!books.length){const empty=document.createElement('p');empty.textContent=cartText('Seu carrinho está vazio. Abra um livro para adicionar.','Your cart is empty. Open a book to add it.');rows.append(empty);}
  $('#cart-subtotal-label').textContent=cartText('Subtotal estimado dos livros','Estimated book subtotal');$('#cart-subtotal').textContent=estimateRange(sum);
  const pickup=$('#cart-service').value==='Retirada';
  $('#cart-freight-label').textContent=cartText('Frete','Shipping');$('#cart-freight').textContent=pickup?cartText('Retirada — combinar com Ana','Pickup — arrange with Ana'):cartText('A cotar com Ana','Quote from Ana required');
  $('#cart-total-label').textContent=cartText('Total final','Final total');$('#cart-total').textContent=cartText('Após negociação e confirmação','After agreement and confirmation');
  $('#cart-cep-label').textContent=cartText('CEP de entrega','Delivery postal code');$('#cart-service-label').textContent=cartText('Preferência de entrega','Delivery preference');
  $('#cart-service option[value="Retirada"]').textContent=cartText('Retirada em Juiz de Fora','Pickup in Juiz de Fora');
  $('#cart-shipping-note').textContent=cartText('Origem: Juiz de Fora/MG. Ana confirma o valor e o prazo de SEDEX/PAC conforme CEP e embalagem. Nenhuma tarifa de frete foi calculada nesta página.','Ships from Juiz de Fora, MG. Ana confirms SEDEX/PAC cost and delivery time using the postal code and parcel details. This page has not calculated shipping.');
  $('#cart-pix-note').textContent=cartText('Pagamento por PIX: após o acordo, Ana envia a cobrança do valor final pelo WhatsApp. Confira o nome do recebedor no banco antes de pagar.','PIX payment: after agreement, Ana sends a request for the final amount on WhatsApp. Check the recipient name in your bank app before paying.');
  $('#cart-whatsapp').textContent=cartText('Negociar pedido e PIX no WhatsApp ↗','Discuss order and PIX on WhatsApp ↗');$('#cart-email').textContent=cartText('Enviar consulta por e-mail ↗','Inquire by email ↗');
  addButton.textContent=state.active&&cartIds.includes(state.active.id)?cartText('No carrinho — ver itens','In cart — view items'):cartText('Adicionar ao carrinho','Add to cart');
  updateCartContacts();
}
function updateCartContacts(){
  const books=cartBooks(),cep=$('#cart-cep').value,service=$('#cart-service').value;
  const lines=books.map(b=>`${b.id} · ${b.title} — ${displayPrice(b)}`);
  const body=cartText('Olá, Ana! Quero negociar estes livros:','Hello Ana! I would like to discuss these books:')+`\n\n${lines.join('\n')}\n\n${cartText('Subtotal ESTIMADO','ESTIMATED subtotal')}: ${estimateRange(sumEstimates(books))}\n${cartText('Entrega','Delivery')}: ${service}\nCEP: ${cep||cartText('a informar','to be provided')}\n\n`+cartText('Por favor, confirme disponibilidade, preços negociados, frete e total final. Gostaria de pagar por PIX após combinarmos.','Please confirm availability, agreed prices, shipping and final total. I would like to pay by PIX once agreed.');
  updateContactLink('cart-whatsapp','whatsapp','Pedido — Estante da Ana',body,!!books.length);updateContactLink('cart-email','email','Pedido — Estante da Ana',body,!!books.length);
}
cartButton.addEventListener('click',()=>{hidePreview();renderCart();cartDialog.showModal();});
$('.cart-close').addEventListener('click',()=>cartDialog.close());cartDialog.addEventListener('click',event=>{if(event.target===cartDialog)cartDialog.close();});
addButton.addEventListener('click',()=>{const book=state.active;if(!book||book.status==='sold')return;if(!cartIds.includes(book.id)){cartIds.push(book.id);persistCart();}$('#book-dialog').close();renderCart();cartDialog.showModal();});
$('#cart-cep').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').replace(/^(\d{5})(\d)/,'$1-$2');$('#cart-result').textContent='';updateCartContacts();});
$('#cart-service').addEventListener('change',renderCart);
for(const id of ['cart-whatsapp','cart-email'])$("#"+id).addEventListener('click',event=>{
  if(!cartBooks().length){event.preventDefault();$('#cart-result').textContent=cartText('Adicione ao menos um livro.','Add at least one book.');return;}
  const cep=$('#cart-cep').value.replace(/\D/g,'');if($('#cart-service').value!=='Retirada'&&cep.length!==8){event.preventDefault();$('#cart-result').textContent=cartText('Informe um CEP de entrega com 8 números ou selecione retirada.','Enter an 8-digit destination CEP or choose pickup.');return;}
  if(event.currentTarget.getAttribute('aria-disabled')==='true'){event.preventDefault();$('#cart-result').textContent=cartText('O contato de Ana ainda está sendo configurado. Tente novamente em breve.','Ana’s contact is being configured. Please try again later.');}
});
window.EstanteCart={render:renderCart};
$('#book-dialog').addEventListener('toggle',renderCart);
renderCart();
