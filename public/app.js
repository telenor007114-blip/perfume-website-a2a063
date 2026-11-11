const products = [
 {name:'GORGEOUS',subtitle:'5ml Tester',notes:'Signature tester',size:'5ml Tester',price:499,detail:'Try it before the full bottle',color:'rose',tag:'TESTER',label:'GORGEOUS',msg:'I want GORGEOUS 5ml Rs 499'},
 {name:'GLORY',subtitle:'5ml Tester',notes:'Signature tester',size:'5ml Tester',price:499,detail:'Try it before the full bottle',color:'amber',tag:'TESTER',label:'GLORY',msg:'I want GLORY 5ml Rs 499'},
 {name:'SAUVAGE',subtitle:'5ml Tester',notes:'Signature tester',size:'5ml Tester',price:499,detail:'Try it before the full bottle',color:'oud',tag:'TESTER',label:'SAUVAGE',msg:'I want SAUVAGE 5ml Rs 499'},
 {name:'Trio Tester Pack',subtitle:'3 × 5ml',notes:'Gorgeous · Glory · Sauvage',size:'3 × 5ml Testers',price:1199,detail:'Discover all three scents',color:'gift',tag:'BEST VALUE',label:'TRIO',msg:'I want TRIO PACK Rs 1199',cta:'Order Trio Pack'},
 {name:'Full Bottle 30ml',subtitle:'30ml',notes:'Your chosen scent',size:'30ml Full Bottle',price:2999,detail:'Choose your scent on WhatsApp',color:'musk',tag:'FULL BOTTLE',label:'30ML',msg:'I want FULL BOTTLE 30ml Rs 2999',cta:'Order Full Bottle',pick:true},
 {name:'Full Bottle 50ml',subtitle:'50ml',notes:'Your chosen scent',size:'50ml Full Bottle',price:4499,detail:'Free delivery in Pakistan',color:'attar',tag:'FREE DELIVERY',label:'50ML',msg:'I want FULL BOTTLE 50ml Rs 4499',cta:'Order Full Bottle',pick:true}
];
const DELIVERY = 250, FREE_OVER = 3000;
const money = value => 'Rs. ' + value.toLocaleString('en-PK');
const whatsapp = text => 'https://wa.me/923450200567?text=' + encodeURIComponent(text);
const delivery = subtotal => subtotal > FREE_OVER ? 0 : DELIVERY;
const bottle = p => `<div class="bottle"><div class="cap"></div><div class="bottle-body"><div class="bottle-label"><small>AL HIJAZI</small><strong${p.label.length>5?' class="long"':''}>${p.label}</strong><span>FRAGRANCE</span></div></div></div>`;
document.querySelector('#products').innerHTML = products.map(p => `<article class="product-card"><div class="product-art ${p.color}"><span class="product-tag">${p.tag}</span><div class="bottle-scene" aria-hidden="true">${p.color==='gift'?`<div class="gift-box"></div>`+bottle({label:'GORGEOUS'})+bottle({label:'GLORY'})+bottle({label:'SAUVAGE'}):bottle(p)}</div><span class="art-size">${p.size}</span></div><div class="product-info"><p class="product-notes">${p.notes}</p><h3>${p.name}</h3><p class="product-detail">${p.detail}</p><div class="product-bottom"><div class="price">${money(p.price)}</div><a href="${whatsapp(p.msg)}" aria-label="${p.cta||'Order'} — ${p.name} ${p.size} on WhatsApp">${p.cta||'Order on WhatsApp'} <span aria-hidden="true">↗</span></a></div></div></article>`).join('');
const select = document.querySelector('#product');
products.forEach((p,i)=>select.add(new Option(`${p.name} (${p.size}) — ${money(p.price)}`,String(i))));
const form = document.querySelector('#order-form');
const total = document.querySelector('#order-total');
const scentField = document.querySelector('#scent-field');
const scent = form.elements.scent;
function syncScent(){
 const p = products[select.value];
 const needed = Boolean(p && p.pick);
 scentField.hidden = !needed;
 scent.required = needed;
 if(!needed) scent.value = '';
}
function updateTotal(){
 syncScent();
 const p = products[select.value];
 const quantity = Number(form.elements.quantity.value);
 if(!p || !Number.isInteger(quantity) || quantity<1 || quantity>99){total.textContent='Select a product and valid quantity to see your subtotal.';return;}
 const subtotal = p.price*quantity;
 if(form.elements.country.value!=='Pakistan'){total.textContent=`Subtotal: ${money(subtotal)} · Delivery confirmed on WhatsApp`;return;}
 const fee = delivery(subtotal);
 total.textContent = fee ? `Subtotal: ${money(subtotal)} + ${money(fee)} delivery = ${money(subtotal+fee)} · Cash on Delivery` : `Subtotal: ${money(subtotal)} + FREE delivery = ${money(subtotal)} · Cash on Delivery`;
}
form.addEventListener('input',updateTotal);
form.addEventListener('change',updateTotal);
form.addEventListener('submit',event=>{
 event.preventDefault();
 syncScent();
 if(!form.reportValidity()) return;
 const data = new FormData(form);
 const p = products[data.get('product')];
 const quantity = Number(data.get('quantity'));
 if(!p || !Number.isInteger(quantity) || quantity<1 || quantity>99) return;
 const subtotal = p.price*quantity;
 const fee = delivery(subtotal);
 const domestic = data.get('country')==='Pakistan';
 const message = `Assalam-o-Alaikum Al Hijazi Fragrance!\nI would like to place an order.\n\nProduct: ${p.name} (${p.size})${p.pick?`\nScent: ${data.get('scent')}`:''}\nQuantity: ${quantity}\nUnit price: ${money(p.price)}\nSubtotal: ${money(subtotal)}\n${domestic?`Delivery: ${fee?money(fee):'FREE'}\nTotal: ${money(subtotal+fee)}\nPayment: Cash on Delivery`:'International delivery: please confirm charges'}\n\nName: ${data.get('name').trim()}\nWhatsApp: ${data.get('phone').trim()}\nCountry: ${data.get('country')}\nDelivery address: ${data.get('address').trim()}\n\nPlease confirm availability and delivery.`;
 document.querySelector('#form-status').textContent='Opening WhatsApp. Please send the prepared message to complete your order request.';
 window.location.assign(whatsapp(message));
});
