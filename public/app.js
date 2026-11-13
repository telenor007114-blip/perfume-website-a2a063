const products = [
 {name:'Oud Al Hejaz', subtitle:'Royal Oud', notes:'Smoky · Woody · Royal', size:'50ml Eau de Parfum', price:4999,old:6999,usd:18,detail:'12+ hours lasting',color:'oud',tag:'THE SIGNATURE',label:'OUD'},
 {name:'White Musk Tahara',subtitle:'Soft & Serene',notes:'Clean · Soft · Daily wear',size:'50ml',price:2499,usd:9,detail:'For every day & prayer',color:'musk',tag:'EVERYDAY FAVOURITE',label:'MUSK'},
 {name:'Rose Taif',subtitle:'The Rose of Taif',notes:'Floral · Delicate · Timeless',size:'50ml · Rose from Taif, Saudi Arabia',price:3999,usd:14,detail:'For women & men',color:'rose',tag:'FLORAL ESSENTIAL',label:'ROSE'},
 {name:'Amber & Musk Attar',subtitle:'A Precious Ritual',notes:'Warm · Pure · Alcohol-free',size:'12ml Attar Oil',price:1499,usd:6,detail:'Sunnah attar',color:'attar',tag:'ALCOHOL-FREE',label:'ATTAR'},
 {name:'Amber Gold',subtitle:'After Dark',notes:'Warm · Sweet · Evening',size:'100ml',price:5999,usd:21,detail:'For celebrations & weddings',color:'amber',tag:'EVENING LUXURY',label:'AMBER'},
 {name:'Hejaz Gift Box',subtitle:'Three Little Treasures',notes:'Oud · Musk · Rose',size:'3 × 12ml Attars · Gift-ready box',price:3499,old:4999,usd:12,detail:'A gift for Umrah & Eid',color:'gift',tag:'THE PERFECT GIFT',label:'HEJAZ'},
 {name:'GORGEOUS',subtitle:'The Best Seller',notes:'Bold · Elegant · Unforgettable',size:'30ml & 50ml Eau de Parfum',variants:[{size:'30ml',price:4049,usd:15},{size:'50ml',price:5999,usd:21}],detail:'Best seller — most demanding',color:'gorgeous',tag:'BEST SELLER',label:'GORGEOUS'},
 {name:'SAUVAGE',subtitle:'Wild & Fresh',notes:'Fresh · Woody · Iconic',size:'30ml & 50ml Eau de Parfum',variants:[{size:'30ml',price:3239,usd:12},{size:'50ml',price:4799,usd:17}],detail:'A modern classic',color:'sauvage',tag:'MOST WANTED',label:'SAUVAGE'},
 {name:'GLORY',subtitle:'Wear Your Glory',notes:'Bright · Confident · Masculine',size:'30ml & 50ml Eau de Parfum',variants:[{size:'30ml',price:3239,usd:12},{size:'50ml',price:4799,usd:17}],detail:'Commanding & refined',color:'glory',tag:'RISING STAR',label:'GLORY'},
 {name:'GULAN',subtitle:'The Flower',notes:'Floral · Sweet · Romantic',size:'30ml & 50ml Eau de Parfum',variants:[{size:'30ml',price:3239,usd:12},{size:'50ml',price:4799,usd:17}],detail:'Soft petals, lasting charm',color:'gulan',tag:'FOR HER',label:'GULAN'}
];
const money = value => 'Rs. ' + value.toLocaleString('en-PK');
const whatsapp = text => 'https://wa.me/923450200567?text=' + encodeURIComponent(text);
const bottle = p => `<div class="bottle"><div class="cap"></div><div class="bottle-body"><div class="bottle-label"><small>AL HEJAZ</small><strong>${p.label}</strong><span>e - PERFUME</span></div></div></div>`;
const priceLine = p => p.variants.length>1 ? p.variants.map(v=>`${v.size} ${money(v.price)}`).join(' · ') : money(p.price);
const orderMessage = p => p.variants.length>1
 ? `Assalam-o-Alaikum! I would like to order ${p.name} — ${p.variants.map(v=>`${v.size} ${money(v.price)}`).join(' or ')}. Please confirm availability and delivery charges.`
 : `Assalam-o-Alaikum! I would like to order ${p.name} (${p.size}) — ${money(p.price)}. Please confirm availability and delivery charges.`;
document.querySelector('#products').innerHTML = products.map(p => {
 const usds = p.variants.map(v=>v.usd);
 const usdLabel = usds[0]===usds[usds.length-1] ? `$${usds[0]} USD` : `$${Math.min(...usds)}–${Math.max(...usds)} USD`;
 return `<article class="product-card"><div class="product-art ${p.color}"><span class="product-tag">${p.tag}</span><div class="bottle-scene" aria-hidden="true">${p.color==='gift'?`<div class="gift-box"></div>`:''}${bottle(p)}${p.color==='gift'?bottle({...p,label:'MUSK'})+bottle({...p,label:'ROSE'}):''}</div><span class="art-size">${p.size}</span></div><div class="product-info"><p class="product-notes">${p.notes}</p><h3>${p.name}</h3><p class="product-detail">${p.detail} <span>· ${usdLabel}</span></p><div class="product-bottom"><div class="price">${priceLine(p)} ${p.old?`<s>${money(p.old)}</s>`:''}</div><a href="${whatsapp(orderMessage(p))}" aria-label="Order ${p.name} on WhatsApp">Order <span aria-hidden="true">↗</span></a></div></div></article>`;
}).join('');
const select = document.querySelector('#product');
products.forEach((p,i)=>p.variants.forEach((v,j)=>select.add(new Option(`${p.name} — ${v.size} — ${money(v.price)}`,`${i}-${j}`))));
const form = document.querySelector('#order-form');
const total = document.querySelector('#order-total');
function pick(value){
 const [i,j] = String(value).split('-').map(Number);
 const p = products[i];
 return p && p.variants[j] ? {p,v:p.variants[j]} : null;
}
function updateTotal(){
 const chosen = pick(select.value);
 const quantity = Number(form.elements.quantity.value);
 if(!chosen || !Number.isInteger(quantity) || quantity<1 || quantity>99){total.textContent='Select a fragrance and valid quantity to see your subtotal.';return;}
 const {p,v} = chosen;
 const domestic = form.elements.country.value==='Pakistan';
 total.textContent = domestic ? `Subtotal: ${money(v.price*quantity)} + Rs. 250 delivery = ${money(v.price*quantity+250)}` : `Subtotal: ${money(v.price*quantity)} · Delivery confirmed on WhatsApp`;
}
form.addEventListener('input',updateTotal);
form.addEventListener('change',updateTotal);
form.addEventListener('submit',event=>{
 event.preventDefault();
 if(!form.reportValidity()) return;
 const data = new FormData(form);
 const chosen = pick(data.get('product'));
 const quantity = Number(data.get('quantity'));
 if(!chosen || !Number.isInteger(quantity) || quantity<1 || quantity>99) return;
 const {p,v} = chosen;
 const message = `Assalam-o-Alaikum Al Hejaz-e-Perfume!\nI would like to place an order.\n\nProduct: ${p.name} (${v.size})\nQuantity: ${quantity}\nUnit price: ${money(v.price)}\nSubtotal: ${money(v.price*quantity)}\n${data.get('country')==='Pakistan'?`Delivery: Rs. 250\nTotal: ${money(v.price*quantity+250)}`:'International delivery: please confirm charges'}\n\nName: ${data.get('name').trim()}\nWhatsApp: ${data.get('phone').trim()}\nCountry: ${data.get('country')}\nDelivery address: ${data.get('address').trim()}\n\nPlease confirm availability, payment details and delivery.`;
 document.querySelector('#form-status').textContent='Opening WhatsApp. Please send the prepared message to complete your order request.';
 window.location.assign(whatsapp(message));
});
document.querySelectorAll('.poster-art img').forEach(img=>{
 const fallback = () => img.closest('.poster-art').classList.add('no-photo');
 if(img.complete && img.naturalWidth===0) fallback();
 else img.addEventListener('error',fallback);
});
