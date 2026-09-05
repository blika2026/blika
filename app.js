const products=[
{id:1,name:"Roller për qime kafshësh",price:1990,old:2990,discount:33,emoji:"🐾",rating:"4.8",cat:"Kafshë shtëpiake",deal:true,best:true},
{id:2,name:"Kufje Bluetooth Pro",price:2490,old:3990,discount:38,emoji:"🎧",rating:"4.7",cat:"Elektronikë",deal:true,best:true},
{id:3,name:"Llambë LED me sensor",price:1490,old:2290,discount:35,emoji:"💡",rating:"4.6",cat:"Shtëpi & Kuzhinë",deal:true},
{id:4,name:"Mbajtëse telefoni për makinë",price:990,old:1590,discount:38,emoji:"📱",rating:"4.8",cat:"Aksesore",deal:true,best:true},
{id:5,name:"Çantë unisex për laptop",price:2990,old:4490,discount:33,emoji:"🎒",rating:"4.7",cat:"Modë & Veshje",best:true},
{id:6,name:"Set organizues kuzhine",price:1790,old:2490,discount:28,emoji:"🍳",rating:"4.5",cat:"Shtëpi & Kuzhinë",new:true},
{id:7,name:"Mini tripod për telefon",price:1290,old:1890,discount:32,emoji:"📸",rating:"4.8",cat:"Elektronikë",new:true},
{id:8,name:"Shishe termike 500ml",price:1590,old:2190,discount:27,emoji:"🥤",rating:"4.6",cat:"Sport & Outdoor",new:true}
];
const categories=[["📱","Elektronikë"],["🔌","Telefon & Aksesore"],["👕","Modë & Veshje"],["🏠","Shtëpi & Kuzhinë"],["💄","Bukuri & Kujdesi"],["🐶","Kafshë shtëpiake"],["🎮","Gaming"],["⚽","Sport & Outdoor"]];
let cart=JSON.parse(localStorage.getItem("blikaCart")||"[]");

function money(n){return n.toLocaleString("sq-AL")+" L"}
function productCard(p){return `<article class="product"><div class="productImg"><span class="discount">-${p.discount}%</span>${p.emoji}</div><div class="productBody"><h3>${p.name}</h3><div class="rating">★★★★★ <span>${p.rating}</span></div><div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div><button class="add" onclick="addToCart(${p.id})">+ Shto në shportë</button></div></article>`}
function render(list,id){document.getElementById(id).innerHTML=list.map(productCard).join("")}
function renderAll(){render(categories.map((c,i)=>({name:c[1],emoji:c[0]})).map(c=>`<div class="category" onclick="filterCat('${c.name}')"><div class="emoji">${c.emoji}</div><p>${c.name}</p></div>`), "categoryGrid"); render(products.filter(p=>p.deal),"dealGrid"); render(products.filter(p=>p.best),"bestGrid"); render(products.filter(p=>p.new),"newGrid"); updateCart()}
function renderCategories(){document.getElementById("categoryGrid").innerHTML=categories.map(c=>`<div class="category" onclick="filterCat('${c[1]}')"><div class="emoji">${c[0]}</div><p>${c[1]}</p></div>`).join("")}
function addToCart(id){cart.push(id);localStorage.setItem("blikaCart",JSON.stringify(cart));updateCart();toggleCart(true)}
function updateCart(){document.getElementById("cartCount").textContent=cart.length;let box=document.getElementById("cartItems");if(!cart.length){box.innerHTML='<p style="padding:25px;color:#888;text-align:center">Shporta është bosh.</p>'}else{box.innerHTML=cart.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(p=>`<div class="cartItem"><div class="mini">${p.emoji}</div><div><h4>${p.name}</h4><p>${money(p.price)}</p></div></div>`).join("")}document.getElementById("cartTotal").textContent=money(cart.reduce((s,id)=>s+(products.find(p=>p.id===id)?.price||0),0))}
function toggleCart(force){let c=document.getElementById("cart"),o=document.getElementById("overlay");let open=force===true?true:!c.classList.contains("open");c.classList.toggle("open",open);o.classList.toggle("show",open)}
function checkout(){if(!cart.length){alert("Shto një produkt në shportë.");return}alert("Checkout MVP: hapi tjetër do të jetë formulari i adresës + pagesa në dorëzim.");}
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function filterCat(cat){let list=products.filter(p=>p.cat===cat);document.getElementById("deals").scrollIntoView({behavior:"smooth"});document.getElementById("dealGrid").innerHTML=list.length?list.map(productCard).join(""):'<p>Nuk ka ende produkte në këtë kategori.</p>'}
function searchProducts(){let q=document.getElementById("searchInput").value.toLowerCase().trim();let list=products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));document.getElementById("deals").scrollIntoView({behavior:"smooth"});document.getElementById("dealGrid").innerHTML=list.map(productCard).join("")||"<p>Nuk u gjet asnjë produkt.</p>"}
function showAll(){render(products,"dealGrid")}
renderCategories();render(products.filter(p=>p.deal),"dealGrid");render(products.filter(p=>p.best),"bestGrid");render(products.filter(p=>p.new),"newGrid");updateCart();
if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{})}