const products = [
 {name:'Oud Al Hejaz', subtitle:'Royal Oud', notes:'Smoky · Woody · Royal', size:'50ml Eau de Parfum', price:4999,old:6999,usd:18,detail:'12+ hours lasting',color:'oud',tag:'THE SIGNATURE',label:'OUD'},
 {name:'White Musk Tahara',subtitle:'Soft & Serene',notes:'Clean · Soft · Daily wear',size:'50ml',price:2499,usd:9,detail:'For every day & prayer',color:'musk',tag:'EVERYDAY FAVOURITE',label:'MUSK'},
 {name:'Rose Taif',subtitle:'The Rose of Taif',notes:'Floral · Delicate · Timeless',size:'50ml · Rose from Taif, Saudi Arabia',price:3999,usd:14,detail:'For women & men',color:'rose',tag:'FLORAL ESSENTIAL',label:'ROSE'},
 {name:'Amber & Musk Attar',subtitle:'A Precious Ritual',notes:'Warm · Pure · Alcohol-free',size:'12ml Attar Oil',price:1499,usd:6,detail:'Sunnah attar',color:'attar',tag:'ALCOHOL-FREE',label:'ATTAR'},
 {name:'Amber Gold',subtitle:'After Dark',notes:'Warm · Sweet · Evening',size:'100ml',price:5999,usd:21,detail:'For celebrations & weddings',color:'amber',tag:'EVENING LUXURY',label:'AMBER'},
 {name:'Hejaz Gift Box',subtitle:'Three Little Treasures',notes:'Oud · Musk · Rose',size:'3 × 12ml Attars · Gift-ready box',price:3499,old:4999,usd:12,detail:'A gift for Umrah & Eid',color:'gift',tag:'THE PERFECT GIFT',label:'HEJAZ'}
];
const money = value => 'Rs. ' + value.toLocaleString('en-PK');
const whatsapp = text => 'https://wa.me/923450200567?text=' + encodeURIComponent(text);
const bottle = p => `<div class="bottle"><div class="cap"></div><div class="bottle-body"><div class="bottle-label"><small>AL HEJAZ</small><strong>${p.label}</strong><span>e - PERFUME</span></div></div></div>`;
document.querySelector('#products').innerHTML = products.map((p,i) => `<article class="product-card"><div class="product-art ${p.color}"><span class="product-tag">${p.tag}</span><div class="bottle-scene" aria-hidden="true">${p.color==='gift'?`<div class="gift-box"></div>`:''}${bottle(p)}${p.color==='gift'?bottle({...p,label:'MUSK'})+bottle({...p,label:'ROSE'}):''}</div><span class="art-size">${p.size}</span></div><div class="product-info"><p class="product-notes">${p.notes}</p><h3>${p.name}</h3><p class="product-detail">${p.detail} <span>· $${p.usd} USD</span></p><div class="product-bottom"><div class="price">${money(p.price)} ${p.old?`<s>${money(p.old)}</s>`:''}</div><a href="${whatsapp(`Assalam-o-Alaikum! I would like to order ${p.name} (${p.size}) — ${money(p.price)}. Please confirm availability and delivery charges.`)}" aria-label="Order ${p.name} on WhatsApp">Order <span aria-hidden="true">↗</span></a></div></div></article>`).join('');
const select = document.querySelector('#product');
products.forEach((p,i)=>select.add(new Option(`${p.name} — ${money(p.price)}`,String(i))));
const form = document.querySelector('#order-form');
const total = document.querySelector('#order-total');
function updateTotal(){
 const p = products[select.value];
 const quantity = Number(form.elements.quantity.value);
 if(!p || !Number.isInteger(quantity) || quantity<1 || quantity>99){total.textContent='Select a fragrance and valid quantity to see your subtotal.';return;}
 const domestic = form.elements.country.value==='Pakistan';
 total.textContent = domestic ? `Subtotal: ${money(p.price*quantity)} + Rs. 250 delivery = ${money(p.price*quantity+250)}` : `Subtotal: ${money(p.price*quantity)} · Delivery confirmed on WhatsApp`;
}
form.addEventListener('input',updateTotal);
form.addEventListener('change',updateTotal);
form.addEventListener('submit',event=>{
 event.preventDefault();
 if(!form.reportValidity()) return;
 const data = new FormData(form);
 const p = products[data.get('product')];
 const quantity = Number(data.get('quantity'));
 if(!p || !Number.isInteger(quantity) || quantity<1 || quantity>99) return;
 const message = `Assalam-o-Alaikum Al Hejaz-e-Perfume!\nI would like to place an order.\n\nProduct: ${p.name} (${p.size})\nQuantity: ${quantity}\nUnit price: ${money(p.price)}\nSubtotal: ${money(p.price*quantity)}\n${data.get('country')==='Pakistan'?`Delivery: Rs. 250\nTotal: ${money(p.price*quantity+250)}`:'International delivery: please confirm charges'}\n\nName: ${data.get('name').trim()}\nWhatsApp: ${data.get('phone').trim()}\nCountry: ${data.get('country')}\nDelivery address: ${data.get('address').trim()}\n\nPlease confirm availability, payment details and delivery.`;
 document.querySelector('#form-status').textContent='Opening WhatsApp. Please send the prepared message to complete your order request.';
 window.location.assign(whatsapp(message));
});
