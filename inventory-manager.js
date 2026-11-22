const stock={...window.ESTANTE_STOCK};
const list=document.querySelector('#inventory-list');
const search=document.querySelector('#inventory-search');
function renderInventory(){
  list.replaceChildren();const query=search.value.toLocaleLowerCase();
  for(const book of BOOKS){
    if(!`${book.id} ${book.title} ${book.author}`.toLocaleLowerCase().includes(query))continue;
    const row=document.createElement('div');row.className='row';
    const label=document.createElement('label');label.htmlFor=`status-${book.id}`;label.textContent=book.title;
    const detail=document.createElement('small');detail.textContent=`${book.id} · ${book.author} · nicho original ${book.bay}, prateleira ${book.shelf}`;label.append(detail);
    const select=document.createElement('select');select.id=`status-${book.id}`;
    select.append(new Option('Disponível','available'),new Option('Vendido','sold'));
    select.value=stock[book.id]||book.status;row.classList.toggle('sold',select.value==='sold');
    select.addEventListener('change',()=>{stock[book.id]=select.value;row.classList.toggle('sold',select.value==='sold');document.querySelector('#inventory-status').textContent='Alterações pendentes — baixe o arquivo e atualize no GitHub.';});
    row.append(label,select);list.append(row);
  }
}
search.addEventListener('input',renderInventory);
document.querySelector('#inventory-export').addEventListener('click',()=>{
  const content=`// Status por exemplar. Atualize este arquivo no GitHub para publicar as alterações.\nwindow.ESTANTE_STOCK = ${JSON.stringify(stock,null,2)};\n`;
  const url=URL.createObjectURL(new Blob([content],{type:'text/javascript;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='inventory-status.js';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  document.querySelector('#inventory-status').textContent='Arquivo exportado. Substitua inventory-status.js no repositório e confirme o commit.';
});
window.addEventListener('beforeunload',event=>{if(document.querySelector('#inventory-status').textContent.includes('pendentes'))event.preventDefault();});
renderInventory();
