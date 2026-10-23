"use strict";
/* ===== Configuração ===== */
const WHATS = "5513996884284";
const WA_MSG = "Olá, Logotop Design! Vim pelo site e quero um orçamento.";

/* Sites do carrossel (vídeos horizontais). Para adicionar outro, inclua uma linha aqui. */
const SITES = [
  {id:"ipurple",     nome:"iPurple",             seg:"Celulares e scooters elétricas · RJ"},
  {id:"megavolt",    nome:"MegaVolt",            seg:"Mobilidade elétrica · Nova Iguaçu, RJ"},
  {id:"lunartech",   nome:"Lunar Tech",          seg:"Conserto e venda de iPhone · RS"},
  {id:"uti",         nome:"UTI da Tecnologia",   seg:"Assistência técnica e acessórios"},
  {id:"igshop",      nome:"IG Shop",             seg:"Fornecedor de iPhones · RJ"},
  {id:"tmcell",      nome:"TM Cell",             seg:"iPhone, iPad e acessórios"},
  {id:"faziotech",   nome:"Fazio Tech",          seg:"Assistência técnica e reparos"},
  {id:"infotech",    nome:"Infotech",            seg:"Celular no boleto"},
  {id:"digitalcell", nome:"Digital Cell",        seg:"Loja de celulares"}
];
const SPEED = 1.4;  // vídeos 40% mais rápidos
const MAX_SEG = 18; // segundos máximos de cada site antes de avançar

/* Portfólio de identidade visual. Para preencher, adicione {img:"identidade/arquivo.webp", nome:"Marca", seg:"Segmento"} */
/* Logotipos (pasta identidade/). Para adicionar, inclua {id:"arquivo",nome:"Marca",seg:"Segmento"} */
const LOGOS_A = [{id:"onecell",nome:"One Cell",seg:"Venda e manutenção de celulares"},{id:"agrolion",nome:"Agro Lion",seg:"Reparos agrícolas e celulares"},{id:"mddesigner",nome:"MD Designer",seg:"Móveis planejados"},{id:"leandrojumper",nome:"Leandro Jumper",seg:"Marca pessoal"},{id:"skymachine",nome:"Skymachine",seg:"Assistência técnica"},{id:"vertex",nome:"Vertex Mobile",seg:"Acessórios"},{id:"megavolt",nome:"MegaVolt",seg:"Mobilidade elétrica"},{id:"sancava",nome:"Sancava",seg:"Moda e beleza"},{id:"ramonmaia",nome:"Ramon Maia",seg:"Música"},{id:"conexaonordeste",nome:"Conexão Nordeste",seg:"Evento mobile"},{id:"nand",nome:"NAND",seg:"Especialista Apple"},{id:"drogariaprimavera",nome:"Drogaria Popular de Primavera",seg:"Farmácia"},{id:"arena",nome:"Arena Smartphone",seg:"Smartphones"},{id:"imperitech",nome:"Imperi Tech",seg:"Soluções em tecnologia"},{id:"apiariold",nome:"Apiário LD",seg:"Apicultura"},{id:"ipurple",nome:"iPurple",seg:"Celulares e scooters"},{id:"labfix",nome:"Lab Fix",seg:"iPhone repair"},{id:"andresacunha",nome:"Andrêsa Cunha",seg:"Psicóloga clínica"},{id:"estofaclean",nome:"EstofáClean",seg:"Limpeza de estofados"},{id:"galeno",nome:"Galeno",seg:"Utilidades e eletrônicos"}];
const LOGOS_B = [{id:"marcondesapple",nome:"Marcondes Apple",seg:"Curso de microeletrônica"},{id:"nucleo3tech",nome:"Núcleo 3 Tech",seg:"Tecnologia"},{id:"alpino",nome:"Alpino",seg:"Doceria"},{id:"matosprata",nome:"Matos Prata",seg:""},{id:"tecnobyte",nome:"Tecnobyte",seg:"Informática e acessórios"},{id:"viajemais",nome:"Viaje+",seg:"Turismo"},{id:"santiagoimports",nome:"Santiago Imports",seg:"Smartphones"},{id:"maniaiphone",nome:"Mania iPhone 019",seg:"iPhone"},{id:"duna",nome:"Duna",seg:""},{id:"onlyfor",nome:"Only For Import",seg:"Importados"},{id:"aquino",nome:"Aquino Imports",seg:"Importados"},{id:"jessicamedeiros",nome:"Jessica Medeiros Studio",seg:"Studio"},{id:"igshop-logo",nome:"IG Shop",seg:"Fornecedor de iPhones"},{id:"perolapreta",nome:"Pérola Preta",seg:"Joias"},{id:"nautilus",nome:"Nautilus",seg:"Essência do homem moderno"},{id:"zaltryon",nome:"Zaltryon",seg:"Soluções digitais"},{id:"skyline",nome:"Skyline Mobile",seg:"Celulares"},{id:"qamar",nome:"Qamar Arabian",seg:"Perfumaria"},{id:"martech",nome:"Martech",seg:"Cursos de software EAD"},{id:"topstore",nome:"TopStore",seg:"Assistência técnica e celulares"}];

/* ===== WhatsApp ===== */
const waHref = "https://wa.me/"+WHATS+"?text="+encodeURIComponent(WA_MSG);
document.querySelectorAll("a.wa").forEach(a=>a.href=waHref);

/* ===== Header ===== */
const header=document.getElementById("top");
const nav=document.getElementById("nav"),mt=document.getElementById("menuT");
mt.addEventListener("click",()=>{const o=nav.classList.toggle("open");mt.setAttribute("aria-expanded",o)});
nav.querySelectorAll("ul a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");mt.setAttribute("aria-expanded",false)}));

/* ===== Carrossel ===== */
const track=document.getElementById("track"),tabs=document.getElementById("tabs");
let cur=0,timer=null,raf=null,t0=0;
SITES.forEach((s,i)=>{
  const el=document.createElement("div");el.className="slide";el.dataset.i=i;
  el.innerHTML=`<div class="frame"><div class="bar"><span class="dots"><i></i><i></i><i></i></span><span class="url">${s.nome}</span><span class="live">Em destaque</span></div>
  <div class="screen"><video muted playsinline preload="none" poster="videos/${s.id}.webp" aria-label="Gravação do site ${s.nome}"></video><img src="videos/${s.id}.webp" alt="" loading="lazy"></div></div>
  <div class="caption"><h3>${s.nome}</h3><p>${s.seg}</p></div>`;
  el.addEventListener("click",()=>{if(i!==cur)go(i)});
  track.appendChild(el);
  const b=document.createElement("button");b.className="tab";b.setAttribute("role","tab");b.innerHTML=`<i></i>${s.nome}`;
  b.addEventListener("click",()=>go(i));tabs.appendChild(b);
});
const slides=[...track.children],tbs=[...tabs.children];
function load(i){const v=slides[(i+SITES.length)%SITES.length].querySelector("video");if(!v.src){v.src="videos/"+SITES[(i+SITES.length)%SITES.length].id+".mp4";v.preload="auto"}}
function position(){
  const s=slides[cur],vw=track.parentElement.clientWidth;
  const off=s.offsetLeft-(vw-s.offsetWidth)/2;
  track.style.transform=`translateX(${-off}px)`;
}
function go(i){
  i=(i+SITES.length)%SITES.length;
  slides.forEach((s,k)=>{s.classList.toggle("on",k===i);s.classList.remove("playing");const v=s.querySelector("video");if(k!==i&&!v.paused)v.pause()});
  tbs.forEach((t,k)=>{t.classList.toggle("on",k===i);t.setAttribute("aria-selected",k===i);t.firstChild.style.width=k<i?"100%":"0"});
  cur=i;position();
  const tb=tbs[i];tabs.scrollTo({left:tb.offsetLeft-tabs.clientWidth/2+tb.offsetWidth/2,behavior:"smooth"});
  load(i);load(i+1);
  const s=slides[i],v=s.querySelector("video");
  try{v.currentTime=0}catch(e){}
  v.playbackRate=SPEED;v.defaultPlaybackRate=SPEED;
  const p=v.play();if(p)p.then(()=>s.classList.add("playing")).catch(()=>{});
  clearTimeout(timer);cancelAnimationFrame(raf);t0=performance.now();
  const lim=()=>Math.min(MAX_SEG,isFinite(v.duration)&&v.duration>0?v.duration/SPEED:MAX_SEG);
  const tick=()=>{const el=(performance.now()-t0)/1000;tbs[i].firstChild.style.width=Math.min(100,el/lim()*100)+"%";if(el>=lim()){go(i+1)}else raf=requestAnimationFrame(tick)};
  raf=requestAnimationFrame(tick);
}
slides.forEach(s=>{const v=s.querySelector("video");v.addEventListener("playing",()=>{v.playbackRate=SPEED;s.classList.add("playing")})});
document.getElementById("sites").addEventListener("focusin",()=>cancelAnimationFrame(raf));
document.getElementById("prev").onclick=()=>go(cur-1);
document.getElementById("next").onclick=()=>go(cur+1);
addEventListener("resize",position);
// troca por gesto no celular
let sx=null;track.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
track.addEventListener("touchend",e=>{if(sx==null)return;const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)go(cur+(d<0?1:-1));sx=null});
// só toca quando o carrossel está visível
const reel=document.getElementById("sites");let started=false;
new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){started=true;go(cur)}
  else if(started){slides[cur].querySelector("video").pause();cancelAnimationFrame(raf)}
}),{threshold:.25}).observe(reel);
slides[0].classList.add("on");tbs[0].classList.add("on");requestAnimationFrame(position);




/* ===== Soluções: brilho que segue o cursor + mensagem por formato ===== */
document.querySelectorAll(".type").forEach(c=>{
  c.href="https://wa.me/"+WHATS+"?text="+encodeURIComponent(c.dataset.msg);
  c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")});
});

/* ===== Metodologia: etapas em sequência ===== */
const stp=[...document.querySelectorAll(".step")],rail=document.getElementById("rail");
let si=0,st=null;
function setStep(i){si=i;stp.forEach((x,k)=>{x.classList.toggle("on",k===i);x.classList.toggle("done",k<i)});rail.style.transform="scaleX("+(i/(stp.length-1))+")"}
function autoStep(){clearInterval(st);st=setInterval(()=>setStep((si+1)%stp.length),3200)}
stp.forEach((x,k)=>{x.addEventListener("mouseenter",()=>{setStep(k);clearInterval(st)});x.addEventListener("click",()=>{setStep(k);clearInterval(st)});x.addEventListener("mouseleave",autoStep)});
setStep(0);
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)autoStep();else clearInterval(st)}),{threshold:.3}).observe(document.getElementById("flow"));


/* ===== Imersão ===== */
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE=matchMedia("(hover:hover) and (pointer:fine)").matches;
const follow=document.getElementById("follow"),curEl=document.getElementById("cur"),prog=document.getElementById("prog"),bandEl=document.getElementById("band");
const W=["Sites","Landing pages","E-commerce","Identidade visual","Sites de luxo","Lojas virtuais"];
bandEl.innerHTML=[...W,...W,...W,...W].map(w=>`<span>${w}</span>`).join("");
let mx=innerWidth*.7,my=innerHeight*.4,fx=mx,fy=my,cx=mx,cy=my,lastY=scrollY,vel=0,bx=0,dir=-1;
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;if(FINE)curEl.classList.add("on")},{passive:true});
document.addEventListener("pointerleave",()=>curEl.classList.remove("on"));
document.addEventListener("pointerover",e=>{
  const t=e.target;curEl.classList.toggle("watch",!!t.closest(".slide:not(.on)")||!!t.closest(".slide.on .screen"));
  if(t.closest(".slide.on .screen"))curEl.querySelector("span").textContent="Ao vivo";else curEl.querySelector("span").textContent="Assistir";
  curEl.classList.toggle("link",!curEl.classList.contains("watch")&&!!t.closest("a,button,summary"));
});
// botões magnéticos
const mags=[...document.querySelectorAll(".btn-fill,.arr,.wa-float")];
const magState=new Map(mags.map(m=>[m,{x:0,y:0,tx:0,ty:0}]));
if(FINE&&!RM)addEventListener("pointermove",e=>{mags.forEach(m=>{const r=m.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy),R=Math.max(r.width,r.height)*.9;const st=magState.get(m);if(d<R){st.tx=Math.max(-2,Math.min(2,dx*.02));st.ty=Math.max(-1.5,Math.min(1.5,dy*.03))}else{st.tx=0;st.ty=0}})},{passive:true});
function frame(){
  const k=RM?1:.06;fx+=(mx-fx)*k;fy+=(my-fy)*k;cx+=(mx-cx)*.22;cy+=(my-cy)*.22;
  if(!RM)follow.style.transform=`translate(${(fx-innerWidth*.7)*.35}px,${(fy-innerHeight*.4)*.35}px)`;
  curEl.style.transform=`translate(${cx}px,${cy}px)`;
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?y/h:0})`;
  const dv=y-lastY;lastY=y;vel+=(dv-vel)*.1;if(Math.abs(dv)>0.5)dir=dv>0?-1:1;
  if(!RM){bx+=dir*(0.6+Math.min(Math.abs(vel)*.35,14));const half=bandEl.scrollWidth/2;if(bx<-half)bx+=half;if(bx>0)bx-=half;bandEl.style.transform=`translateX(${bx}px)`;
    const rx=(fy/innerHeight-.5)*-14,ry=(fx/innerWidth-.5)*18;}
  mags.forEach(m=>{const st=magState.get(m);st.x+=(st.tx-st.x)*.18;st.y+=(st.ty-st.y)*.18;m.style.translate=`${st.x.toFixed(2)}px ${st.y.toFixed(2)}px`});
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
// contadores
const fmt=n=>n.toLocaleString(document.documentElement.lang||"pt-BR",{useGrouping:"always"});
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,to=+el.dataset.to;if(RM)return;const t0=performance.now(),D=1600;
  const step=t=>{const p=Math.min(1,(t-t0)/D),v=Math.round(to*(1-Math.pow(1-p,4)));el.textContent=fmt(v);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.6});
document.querySelectorAll(".cnt").forEach(c=>cio.observe(c));
// revelação ao rolar (apenas o que começa fora da tela)
const rv=[...document.querySelectorAll(".head>div,.head>p,.type,.step,.ecom>div,.about>*,.inc,.faq>div,.final h2,.final .row,.reel,.vreel")];
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;const sib=[...el.parentElement.children].indexOf(el);el.style.transitionDelay=Math.min(sib,5)*70+"ms";el.classList.add("r-in");el.classList.remove("r-pre");rio.unobserve(el);setTimeout(()=>{el.style.transitionDelay="";el.classList.remove("r-in")},1600)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
if(!RM)rv.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add("r-pre");rio.observe(el)}});

/* ===== Carrossel vertical ===== */
const VS=[["Digital Cell","Loja de celulares"],["IG Shop","Fornecedor de iPhones · RJ"],["Infotech","Celular no boleto"],["Lunar Tech","iPhone e assistência técnica"],["UTI da Tecnologia","Assistência técnica"],["Jessica Makeup","Beleza e perfumaria · BA"],["Moriah Cell","Reparo em placa"],["Ótica 7","Ótica"],["Assistência técnica","Celulares e informática"],["Duna Brand","Moda feminina"],["Anna's Store","Boutique"],["Studio de beleza","Cabelo e estética"],["Galeria da Moda","Moda feminina · PB"],["Dra. Ludmilla Beatriz Paiva","Estética e odontologia"],["iSmart","Repair + Shop"],["Kalu","Moda feminina"],["AJ Cell","Assistência técnica"],["Studio Maria Clara","Lash design"],["Dra. Ingrid Arreguy","Harmonização facial"],["Porto Paraíso Tour","Agência de turismo"]];
const vtrack=document.getElementById("vtrack"),vdots=document.getElementById("vdots"),vname=document.getElementById("vname");
VS.forEach((d,i)=>{const n=String(i).padStart(2,"0"),el=document.createElement("div");el.className="vs";
  el.innerHTML=`<div class="phone"><video muted playsinline loop preload="none" aria-label="Site ${d[0]} no celular"></video><img src="verticais/v${n}.webp" alt="" loading="lazy"></div>`;
  el.addEventListener("click",()=>{if(i!==vi)vgo(i)});vtrack.appendChild(el);vdots.appendChild(document.createElement("i"))});
const vsl=[...vtrack.children],vdt=[...vdots.children];let vi=0,vt=null,vstarted=false;
function vpos(){const n=VS.length;vsl.forEach((s,k)=>{let o=((k-vi)%n+n)%n;if(o>n/2)o-=n;const far=Math.abs(o)>3;
  if(far!==s.classList.contains("far")){s.style.transition="none";s.classList.toggle("far",far);s.style.setProperty("--o",o);s.offsetWidth;s.style.transition=""}else s.style.setProperty("--o",o)})}
function vgo(i){vi=(i+VS.length)%VS.length;
  vsl.forEach((s,k)=>{const n=VS.length,dd=Math.min(Math.abs(k-vi),n-Math.abs(k-vi));s.classList.toggle("on",k===vi);s.classList.toggle("n1",dd===1);if(k!==vi){s.classList.remove("playing");const v=s.querySelector("video");if(!v.paused)v.pause()}});
  vdt.forEach((d,k)=>d.classList.toggle("on",k===vi));vname.innerHTML=VS[vi][0]+`<span>${VS[vi][1]}</span>`;vpos();
  const s=vsl[vi],v=s.querySelector("video");if(!v.src){v.src=`verticais/v${String(vi).padStart(2,"0")}.mp4`}
  const nx=vsl[(vi+1)%VS.length].querySelector("video");if(!nx.src){nx.preload="auto";nx.src=`verticais/v${String((vi+1)%VS.length).padStart(2,"0")}.mp4`}
  try{v.currentTime=0}catch(e){}
  v.play().then(()=>{s.classList.add("playing")}).catch(()=>{});
  clearTimeout(vt);vt=setTimeout(()=>vgo(vi+1),9000)}
const vsec=document.getElementById("mobile");vsec.addEventListener("focusin",()=>clearTimeout(vt));vsec.addEventListener("focusout",e=>{if(!vsec.contains(e.relatedTarget)){clearTimeout(vt);vt=setTimeout(()=>vgo(vi+1),9000)}});
document.getElementById("vprev").onclick=()=>vgo(vi-1);document.getElementById("vnext").onclick=()=>vgo(vi+1);
addEventListener("resize",vpos);
let vsx=null;vtrack.addEventListener("touchstart",e=>vsx=e.touches[0].clientX,{passive:true});
vtrack.addEventListener("touchend",e=>{if(vsx==null)return;const d=e.changedTouches[0].clientX-vsx;if(Math.abs(d)>40)vgo(vi+(d<0?1:-1));vsx=null});
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)vgo(vi);else{clearTimeout(vt);vsl[vi].querySelector("video").pause()}}),{threshold:.25}).observe(document.getElementById("mobile"));
vsl[0].classList.add("on");vsl[1].classList.add("n1");vsl[VS.length-1].classList.add("n1");vdt[0].classList.add("on");vname.innerHTML=VS[0][0]+`<span>${VS[0][1]}</span>`;vpos();

/* ===== Identidade visual ===== */
const ALL=[...LOGOS_A,...LOGOS_B],logosEl=document.getElementById("logos");
[LOGOS_A,LOGOS_B].forEach((L,r)=>{const row=document.createElement("div");row.className="lrow"+(r?" rev":"");
  row.innerHTML=[...L,...L].map((d,k)=>`<button class="lg" type="button" data-i="${ALL.indexOf(d)}" ${k>=L.length?'tabindex="-1" aria-hidden="true"':''} aria-label="Ver logotipo ${d.nome}"><img src="identidade/${d.id}.webp" alt="Logotipo ${d.nome}" loading="lazy" width="210" height="210"></button>`).join("");
  logosEl.appendChild(row)});
const lb=document.getElementById("lb");document.body.appendChild(lb);const _lb0=0,lbI=document.getElementById("lbI"),lbC=document.getElementById("lbC");let li=0,lastF=null;
let LBSET=null;
function showL(i){const S=LBSET||ALL.map(d=>({src:"identidade/"+d.id+".webp",nome:d.nome,seg:d.seg}));li=(i+S.length)%S.length;const d=S[li];lbI.src=d.src;lbI.alt=d.nome;lbC.innerHTML=d.nome+(d.seg?`<span>${d.seg}</span>`:"")}
document.addEventListener("click",e=>{const f=e.target.closest("#cgrid figure");if(!f)return;LBSET=caseImgs;lastF=f;showL(+f.dataset.i);lb.hidden=false;document.getElementById("lbX").focus()});
logosEl.addEventListener("click",e=>{const b=e.target.closest(".lg");if(!b)return;LBSET=null;lastF=b;showL(+b.dataset.i);lb.hidden=false;document.getElementById("lbX").focus()});
const closeL=()=>{lb.hidden=true;lastF&&lastF.focus()};
document.getElementById("lbX").onclick=closeL;document.getElementById("lbP").onclick=()=>showL(li-1);document.getElementById("lbN").onclick=()=>showL(li+1);
lb.addEventListener("click",e=>{if(e.target===lb)closeL()});
addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")closeL();if(e.key==="ArrowLeft")showL(li-1);if(e.key==="ArrowRight")showL(li+1)});

/* ===== Logotipos: profundidade, parallax e flutuação ===== */
(()=>{
  const wrap=logosEl,rows=[...wrap.querySelectorAll(".lrow")],cards=[...wrap.querySelectorAll(".lg")];
  const RMx=matchMedia("(prefers-reduced-motion: reduce)").matches;if(RMx)return;
  const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
  const lite=(navigator.hardwareConcurrency||8)<=2||(navigator.connection&&navigator.connection.saveData);
  if(lite)wrap.classList.add("lite");
  // flutuação com ritmo próprio para cada cartão (pseudoaleatório estável)
  cards.forEach((c,i)=>{const r=(n)=>((Math.sin(i*12.9898+n*78.233)*43758.5453)%1+1)%1;
    c.style.setProperty("--fd",(5.5+r(1)*4.5).toFixed(2)+"s");c.style.setProperty("--fdl",(-r(2)*9).toFixed(2)+"s");
    c.style.setProperty("--fa",(3+r(3)*5).toFixed(1)+"px");c.style.setProperty("--fr",(r(4)*.9).toFixed(2)+"deg")});
  // inclinação 3D por cartão seguindo o cursor
  if(fine){cards.forEach(c=>{
    c.addEventListener("pointermove",e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
      c.classList.add("tilt");c.style.setProperty("--ry",(x*14).toFixed(2)+"deg");c.style.setProperty("--rx",(-y*14).toFixed(2)+"deg");
      c.style.setProperty("--px",x.toFixed(3));c.style.setProperty("--py",y.toFixed(3));
      c.style.setProperty("--gx",((x+.5)*100).toFixed(1)+"%");c.style.setProperty("--gy",((y+.5)*100).toFixed(1)+"%")});
    c.addEventListener("pointerleave",()=>{c.classList.remove("tilt");c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg");c.style.setProperty("--px",0);c.style.setProperty("--py",0)})})}
  // parallax de camadas (cursor) + entrada/saída espacial (rolagem)
  let tx=0,ty=0,cx=0,cy=0,sp=0,csp=0,vis=false,raf=0;
  if(fine)addEventListener("pointermove",e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
  const depth=[{d:1,z:0},{d:-1.4,z:-40}];
  function tick(){
    const b=wrap.getBoundingClientRect(),c=(b.top+b.height/2)/innerHeight-.5;sp=Math.max(-1,Math.min(1,c*1.6));
    const k=.07;cx+=(tx-cx)*k;cy+=(ty-cy)*k;csp+=(sp-csp)*.12;const a=Math.abs(csp);
    rows.forEach((r,i)=>{const L=depth[i]||depth[0];
      
      r.style.translate=`${(cx*-26*L.d).toFixed(2)}px 0px ${(L.z - a*90).toFixed(1)}px`;
      r.style.opacity=(1-a*.55).toFixed(3)});
    raf=vis?requestAnimationFrame(tick):0}
  new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(tick)}),{rootMargin:"120px 0px"}).observe(wrap);
})();
document.querySelector(".wa-brand").href="https://wa.me/"+WHATS+"?text="+encodeURIComponent("Olá, Logotop Design! Quero um orçamento de site com identidade visual.");

/* ===== Case identidade completa ===== */
const CASES={
 astro:{nome:"Astro Celulares",itens:[["parede","Logotipo","hero-l"],["fachada","Fachada",""],["relogio","Smartwatch","tall"],["polo","Uniforme",""],["placa","Placa",""],["wind-banner","Wind banner","tall"],["cartao","Cartão de visita",""],["vidro","Recepção",""]]},
 skymachine:{nome:"Skymachine",itens:[["logo","Logotipo","hero-l"],["fachada","Fachada",""],["polo","Camisa polo",""],["bone","Boné",""],["recepcao","Recepção",""],["cartao","Cartão de visita",""],["sacola","Sacola",""],["outdoor","Outdoor",""],["moletom","Moletom",""],["fachada-2","Fachada",""],["moletom-2","Moletom",""],["moletom-3","Moletom",""]]},
 engexis:{nome:"Engexis Engenharia",itens:[["parede","Logotipo","hero-l"],["colete","Uniforme em obra",""],["apresentacao","Apresentação","tall"],["polo","Camisa polo",""],["capacete","Capacete (EPI)",""],["cartao","Cartão com QR code",""]]},
 alma:{nome:"Alma Moda e Estilo",itens:[["parede","Logotipo","hero-l"],["fachada","Fachada",""],["tag","Tag de roupa","tall"],["recepcao","Recepção",""],["sacola","Sacola",""],["caixa","Embalagem",""],["papel","Versão em papel",""],["tecido","Aplicação em tecido",""]]},
 ambience:{nome:"Ambience Fit Store",itens:[["logo","Logotipo","hero-l"],["fachada","Fachada",""],["top","Moda fitness","tall"],["placa","Placa",""],["garrafa","Squeeze",""],["cartao","Cartão de visita",""],["top-costas","Uniforme",""],["simbolo","Símbolo em relevo",""]]},
 urbano:{nome:"Urbano Multimarcas",itens:[["parede","Logotipo","hero-l"],["fachada","Fachada",""],["cartao","Cartão de visita","tall"],["notebook","Tela",""],["polo","Uniforme",""],["caneca","Caneca",""],["checklist","Checklist de serviço",""],["post","Redes sociais",""]]},
 istore:{nome:"iStore iPhones",itens:[["parede","Logotipo","hero-l"],["fachada","Fachada",""],["relogio","Smartwatch","tall"],["polo","Uniforme",""],["placa","Placa",""],["wind-banner","Wind banner","tall"],["vidro","Recepção",""]]}
};
const cgrid=document.getElementById("cgrid");let caseImgs=[];
function renderCase(k){const c=CASES[k];caseImgs=c.itens.map(it=>({src:`case/${k}/${it[0]}.webp`,nome:c.nome,seg:it[1]}));
  const hero=c.itens[0],rest=c.itens.slice(1),tall=rest.filter(x=>x[2]==="tall"),flat=rest.filter(x=>x[2]!=="tall");
  const all=[...tall,...flat],singles=all.slice(0,4),extra=all.slice(4,7),hidden=all.length-7;
  const lay=[[hero,"hero-l"],...singles.map(x=>[x,""]),...extra.map((x,j)=>[x,"x"+extra.length+(j===0?" xf":"")])];
  caseImgs=[...lay.map(([it])=>it),...all.slice(7)].map(it=>({src:`case/${k}/${it[0]}.webp`,nome:c.nome,seg:it[1]}));
  cgrid.innerHTML=lay.map(([it,cls],i)=>`<figure class="${cls}" data-i="${i}"><img src="case/${k}/${it[0]}.webp" alt="${c.nome}: ${it[1]}" loading="lazy"><figcaption>${it[1]}</figcaption>${hidden>0&&i===lay.length-1?`<span class="more-n">+${hidden}</span>`:""}</figure>`).join("");
  document.querySelectorAll(".ctab").forEach(t=>{const on=t.dataset.c===k;t.classList.toggle("on",on);t.setAttribute("aria-selected",on)})}
document.querySelectorAll(".ctab").forEach(t=>t.addEventListener("click",()=>renderCase(t.dataset.c)));
renderCase("skymachine");

/* ===== Países ===== */
const P=[["Brasil","br"],["Chile","cl"],["Equador","ec"],["Peru","pe"],["Argentina","ar"],["Estados Unidos","us"],["África do Sul","za"],["Reino Unido","gb"],["Irlanda","ie"],["Paraguai","py"],["Colômbia","co"],["Holanda","nl"],["Venezuela","ve"],["México","mx"]];
document.getElementById("marq").innerHTML=[...P,...P].map(p=>`<span><img src="flags/${p[1]}.svg" alt="" width="36" height="27">${p[0]}</span>`).join("");
document.getElementById("yr").textContent=new Date().getFullYear();

/* ===== Idiomas (PT / EN / ES) ===== */
(()=>{
const D={"Assistir": ["Watch", "Ver"], "Ao vivo": ["Live", "En vivo"], "Sites": ["Websites", "Sitios"], "Soluções": ["Solutions", "Soluciones"], "E-commerce": ["E-commerce", "E-commerce"], "Identidade visual": ["Brand identity", "Identidad visual"], "Sobre": ["About", "Nosotros"], "Orçamento": ["Get a quote", "Cotizar"], "que fazem sua marca": ["that make your brand", "que hacen que tu marca"], "valer mais": ["worth more", "valga más"], "e vender por você.": ["and sell for you.", "y venda por ti."], "Pedir orçamento no WhatsApp": ["Get a quote on WhatsApp", "Cotizar por WhatsApp"], "Ver sites no ar": ["See live websites", "Ver sitios publicados"], "anos de estúdio": ["years in business", "años de estudio"], "clientes atendidos": ["clients served", "clientes atendidos"], "países": ["countries", "países"], "online": ["online", "online"], "Landing pages": ["Landing pages", "Landing pages"], "Sites de luxo": ["Luxury websites", "Sitios de lujo"], "Lojas virtuais": ["Online stores", "Tiendas online"], "Sites no ar": ["Live websites", "Sitios publicados"], "Projetos que já estão": ["Projects that are already", "Proyectos que ya están"], "vendendo": ["selling", "vendiendo"], "Gravações reais de sites que entregamos. Cada um com design exclusivo, pensado para o público e o segmento do cliente.": ["Real recordings of websites we delivered. Each one with an exclusive design, built for the client's audience and industry.", "Grabaciones reales de sitios que entregamos. Cada uno con diseño exclusivo, pensado para el público y el sector del cliente."], "Em destaque": ["Featured", "Destacado"], "Celulares e scooters elétricas · RJ": ["Phones and electric scooters · RJ", "Celulares y scooters eléctricos · RJ"], "Mobilidade elétrica · Nova Iguaçu, RJ": ["Electric mobility · Nova Iguaçu, RJ", "Movilidad eléctrica · Nova Iguaçu, RJ"], "Conserto e venda de iPhone · RS": ["iPhone repair and sales · RS", "Reparación y venta de iPhone · RS"], "Assistência técnica e acessórios": ["Repair services and accessories", "Servicio técnico y accesorios"], "Fornecedor de iPhones · RJ": ["iPhone supplier · RJ", "Proveedor de iPhones · RJ"], "iPhone, iPad e acessórios": ["iPhone, iPad and accessories", "iPhone, iPad y accesorios"], "Assistência técnica e reparos": ["Repair services", "Servicio técnico y reparaciones"], "Celular no boleto": ["Phones on installment plans", "Celulares a plazos"], "Loja de celulares": ["Phone store", "Tienda de celulares"], "Na tela do celular": ["On the phone screen", "En la pantalla del celular"], "Feitos para quem compra pelo": ["Built for people who shop on their", "Hechos para quien compra desde el"], "celular": ["phone", "celular"], "A maior parte dos clientes chega pelo Instagram e pelo WhatsApp, direto no celular. Por isso cada site é pensado primeiro para a tela pequena.": ["Most customers arrive through Instagram and WhatsApp, straight on their phones. That's why every website is designed for the small screen first.", "La mayoría de los clientes llega por Instagram y WhatsApp, directo en el celular. Por eso cada sitio se piensa primero para la pantalla pequeña."], "iPhone e assistência técnica": ["iPhone and repair services", "iPhone y servicio técnico"], "Assistência técnica": ["Repair services", "Servicio técnico"], "Beleza e perfumaria · BA": ["Beauty and fragrances · BA", "Belleza y perfumería · BA"], "Reparo em placa": ["Board-level repair", "Reparación de placas"], "Ótica": ["Optical store", "Óptica"], "Celulares e informática": ["Phones and computers", "Celulares e informática"], "Moda feminina": ["Women's fashion", "Moda femenina"], "Boutique": ["Boutique", "Boutique"], "Studio de beleza": ["Beauty studio", "Estudio de belleza"], "Cabelo e estética": ["Hair and aesthetics", "Cabello y estética"], "Moda feminina · PB": ["Women's fashion · PB", "Moda femenina · PB"], "Estética e odontologia": ["Aesthetics and dentistry", "Estética y odontología"], "Lash design": ["Lash design", "Diseño de pestañas"], "Harmonização facial": ["Facial harmonization", "Armonización facial"], "Agência de turismo": ["Travel agency", "Agencia de turismo"], "Soluções em sites": ["Website solutions", "Soluciones en sitios web"], "Quatro formatos. Um só": ["Four formats. One", "Cuatro formatos. Un solo"], "padrão": ["standard", "estándar"], "de acabamento.": ["of finish.", "de acabado."], "Cada formato atende a um objetivo comercial diferente. Todos recebem o mesmo nível de design, desempenho e atenção aos detalhes. Escolha um e fale direto com a nossa equipe.": ["Each format serves a different business goal. All of them get the same level of design, performance and attention to detail. Pick one and talk directly to our team.", "Cada formato cumple un objetivo comercial distinto. Todos reciben el mismo nivel de diseño, rendimiento y atención al detalle. Elige uno y habla directo con nuestro equipo."], "Mais pedido": ["Most requested", "Más pedido"], "Landing page": ["Landing page", "Landing page"], "Página única de alta conversão, construída para campanhas e tráfego pago. Cada bloco conduz o visitante a uma só ação: falar com você.": ["A single high-converting page built for campaigns and paid traffic. Every block leads the visitor to one action: contacting you.", "Página única de alta conversión, creada para campañas y tráfico pago. Cada bloque lleva al visitante a una sola acción: hablar contigo."], "Tráfego pago": ["Paid traffic", "Tráfico pago"], "Lançamentos": ["Launches", "Lanzamientos"], "Captação de leads": ["Lead generation", "Captación de leads"], "Solicitar orçamento": ["Request a quote", "Solicitar cotización"], "Site institucional": ["Corporate website", "Sitio institucional"], "Presença digital completa para empresas que precisam transmitir solidez: apresentação, serviços, equipe, avaliações e localização em uma navegação elegante.": ["A complete digital presence for companies that need to convey credibility: overview, services, team, reviews and location in an elegant layout.", "Presencia digital completa para empresas que necesitan transmitir solidez: presentación, servicios, equipo, reseñas y ubicación en una navegación elegante."], "Empresas": ["Companies", "Empresas"], "Clínicas": ["Clinics", "Clínicas"], "Prestadores de serviço": ["Service providers", "Prestadores de servicios"], "Site catálogo": ["Catalog website", "Sitio catálogo"], "Vitrine digital com produtos, modelos e condições de pagamento, com pedido direto pelo WhatsApp. O formato preferido de lojas de celulares e revendas.": ["A digital showcase with products, models and payment terms, with orders straight to WhatsApp. The favorite format of phone stores and resellers.", "Vitrina digital con productos, modelos y condiciones de pago, con pedidos directos por WhatsApp. El formato preferido de tiendas de celulares y revendedores."], "Lojas": ["Stores", "Tiendas"], "Revendas": ["Resellers", "Revendedores"], "Distribuidores": ["Distributors", "Distribuidores"], "Loja virtual": ["Online store", "Tienda online"], "E-commerce completo, com carrinho, pagamento e cálculo de frete, para vender 24 horas por dia com a identidade da sua marca.": ["A complete e-commerce store with cart, payments and shipping rates, selling 24 hours a day with your brand's identity.", "E-commerce completo, con carrito, pagos y cálculo de envío, para vender las 24 horas con la identidad de tu marca."], "Venda online": ["Online sales", "Venta online"], "Entregas": ["Deliveries", "Entregas"], "Marcas próprias": ["Own brands", "Marcas propias"], "Em todo site": ["Included in every site by", "En cada sitio"], "Logotop": ["Logotop", "Logotop"], "Design exclusivo, nada de modelo pronto": ["Exclusive design, no templates", "Diseño exclusivo, sin plantillas"], "Perfeito no celular, no tablet e no computador": ["Flawless on phone, tablet and desktop", "Perfecto en celular, tablet y computadora"], "Botão de WhatsApp sempre à mão": ["WhatsApp button always within reach", "Botón de WhatsApp siempre a mano"], "Animações e efeitos de alto padrão": ["High-end animations and effects", "Animaciones y efectos de alto nivel"], "Avaliações de clientes e localização": ["Customer reviews and location", "Reseñas de clientes y ubicación"], "Estrutura pensada para aparecer no Google": ["Structure built to show up on Google", "Estructura pensada para aparecer en Google"], "Carregamento rápido": ["Fast loading", "Carga rápida"], "Publicação acompanhada até o site estar no ar": ["Guided launch until the site is live", "Publicación acompañada hasta que el sitio esté en línea"], "Metodologia": ["Process", "Metodología"], "Um processo claro, do": ["A clear process, from", "Un proceso claro, de la"], "atendimento inicial": ["first conversation", "primera conversación"], "à entrega.": ["to delivery.", "a la entrega."], "Quatro etapas com entregas definidas. Você aprova cada fase antes de avançarmos, com atendimento online em qualquer fuso horário.": ["Four stages with defined deliverables. You approve each phase before we move on, with online support in any time zone.", "Cuatro etapas con entregas definidas. Apruebas cada fase antes de avanzar, con atención online en cualquier zona horaria."], "Avaliação": ["Assessment", "Evaluación"], "Conversamos sobre o seu negócio, o seu público, os seus diferenciais e o que o site precisa entregar.": ["We talk about your business, your audience, what sets you apart and what the website needs to achieve.", "Hablamos sobre tu negocio, tu público, tus diferenciales y lo que el sitio necesita lograr."], "Entrega": ["Deliverable", "Entrega"], "Estrutura e estratégia do site": ["Site structure and strategy", "Estructura y estrategia del sitio"], "Direção de arte": ["Art direction", "Dirección de arte"], "Layout exclusivo, alinhado à sua identidade visual e desenhado para guiar o visitante até o contato.": ["An exclusive layout, aligned with your brand identity and designed to guide visitors to get in touch.", "Diseño exclusivo, alineado con tu identidad visual y pensado para guiar al visitante hasta el contacto."], "Layout para aprovação": ["Layout for approval", "Diseño para aprobación"], "Desenvolvimento": ["Development", "Desarrollo"], "Codificação responsiva, otimização de velocidade e estrutura técnica preparada para o Google.": ["Responsive coding, speed optimization and a technical structure ready for Google.", "Programación responsiva, optimización de velocidad y estructura técnica preparada para Google."], "Versão navegável para testes": ["Clickable version for testing", "Versión navegable para pruebas"], "Lançamento": ["Launch", "Lanzamiento"], "Publicação no seu domínio e testes finais em celular, tablet e computador.": ["Publishing on your domain and final tests on phone, tablet and desktop.", "Publicación en tu dominio y pruebas finales en celular, tablet y computadora."], "Site no ar, pronto para vender": ["Site live and ready to sell", "Sitio en línea, listo para vender"], "Sua loja vendendo": ["Your store selling", "Tu tienda vendiendo"], "enquanto": ["while", "mientras"], "você dorme.": ["you sleep.", "duermes."], "Lojas virtuais com o mesmo cuidado visual dos nossos sites: experiência de marca premium e compra simples do início ao fim.": ["Online stores with the same visual care as our websites: a premium brand experience and a simple purchase from start to finish.", "Tiendas online con el mismo cuidado visual de nuestros sitios: experiencia de marca premium y compra simple de principio a fin."], "Quero minha loja virtual": ["I want my online store", "Quiero mi tienda online"], "Catálogo de produtos": ["Product catalog", "Catálogo de productos"], "com fotos e variações": ["with photos and variants", "con fotos y variantes"], "Carrinho e checkout": ["Cart and checkout", "Carrito y checkout"], "simples e seguro": ["simple and secure", "simple y seguro"], "Pagamentos": ["Payments", "Pagos"], "Pix, cartão e boleto": ["Pix, card and bank slip", "Pix, tarjeta y boleto"], "cálculo de frete": ["shipping rates", "cálculo de envío"], "Design de marca": ["Brand design", "Diseño de marca"], "exclusivo": ["exclusive", "exclusivo"], "Identidade visual completa": ["Complete brand identity", "Identidad visual completa"], "Da marca à": ["From logo to", "De la marca a la"], "fachada": ["storefront", "fachada"], "Quando criamos a identidade, ela vai muito além do logotipo: aplicamos a marca em fachada, uniforme, cartão, placa e redes sociais, tudo pronto para o site.": ["When we create an identity, it goes far beyond the logo: we apply the brand to storefronts, uniforms, business cards, signs and social media, all ready for the website.", "Cuando creamos la identidad, va mucho más allá del logotipo: aplicamos la marca en fachada, uniforme, tarjeta, letrero y redes sociales, todo listo para el sitio."], "Alma Moda": ["Alma Moda", "Alma Moda"], "Logotipo": ["Logo", "Logotipo"], "Smartwatch": ["Smartwatch", "Smartwatch"], "Wind banner": ["Feather flag", "Banderola"], "Fachada": ["Storefront", "Fachada"], "Uniforme": ["Uniform", "Uniforme"], "Placa": ["Sign", "Letrero"], "Cartão de visita": ["Business card", "Tarjeta de presentación"], "Recepção": ["Reception", "Recepción"], "Uniforme em obra": ["Uniform on site", "Uniforme en obra"], "Apresentação": ["Presentation", "Presentación"], "Camisa polo": ["Polo shirt", "Camisa polo"], "Capacete (EPI)": ["Safety helmet", "Casco de seguridad"], "Cartão com QR code": ["Card with QR code", "Tarjeta con código QR"], "Tag de roupa": ["Clothing tag", "Etiqueta de ropa"], "Sacola": ["Shopping bag", "Bolsa"], "Embalagem": ["Packaging", "Empaque"], "Versão em papel": ["Paper version", "Versión en papel"], "Aplicação em tecido": ["Fabric application", "Aplicación en tela"], "Moda fitness": ["Fitness wear", "Ropa fitness"], "Squeeze": ["Water bottle", "Botella deportiva"], "Símbolo em relevo": ["Embossed symbol", "Símbolo en relieve"], "Tela": ["Screen", "Pantalla"], "Caneca": ["Mug", "Taza"], "Checklist de serviço": ["Service checklist", "Checklist de servicio"], "Redes sociais": ["Social media", "Redes sociales"], "Também criamos a sua marca": ["We also create your brand", "También creamos tu marca"], "Um site forte começa por uma": ["A strong website starts with a", "Un sitio fuerte empieza con una"], "marca": ["strong", "marca"], "forte.": ["brand.", "fuerte."], "Ainda não tem identidade visual? Criamos o logotipo junto com o site, para tudo sair no mesmo padrão. Algumas das marcas que já desenhamos:": ["Don't have a brand identity yet? We create the logo together with the website, so everything matches. Some of the brands we've designed:", "¿Todavía no tienes identidad visual? Creamos el logotipo junto con el sitio, para que todo tenga el mismo estándar. Algunas de las marcas que ya diseñamos:"], "Quero site + identidade visual": ["I want website + brand identity", "Quiero sitio + identidad visual"], "Sobre a Logotop": ["About Logotop", "Sobre Logotop"], "Há 10 anos criando presença digital para mais de": ["10 years building digital presence for more than", "Hace 10 años creando presencia digital para más de"], "4 mil": ["4,000", "4 mil"], "A Logotop Design é uma empresa de Design Gráfico e Marketing criativo que atende clientes no Brasil e no mundo, desenvolvendo sites, e-commerces e identidades visuais alinhados aos objetivos de cada negócio.": ["Logotop Design is a graphic design and creative marketing company serving clients in Brazil and around the world, developing websites, e-commerce stores and brand identities aligned with each business's goals.", "Logotop Design es una empresa de Diseño Gráfico y Marketing creativo que atiende a clientes en Brasil y en todo el mundo, desarrollando sitios web, e-commerce e identidades visuales alineados con los objetivos de cada negocio."], "À frente da Logotop estão Paulo, responsável pela criação, e Elly, pela criação e gestão. Juntos, acompanhamos cada projeto de perto, unindo criatividade, estratégia e atendimento direto em todas as etapas.": ["Logotop is led by Paulo, responsible for design, and Elly, responsible for design and management. Together, we follow every project closely, combining creativity, strategy and direct support at every stage.", "Al frente de Logotop están Paulo, responsable de la creación, y Elly, de la creación y la gestión. Juntos, acompañamos cada proyecto de cerca, uniendo creatividad, estrategia y atención directa en todas las etapas."], "CEO e Designer Gráfico": ["CEO and Graphic Designer", "CEO y Diseñador Gráfico"], "Sócia e Gestora": ["Partner and Manager", "Socia y Gerente"], "Brasil": ["Brazil", "Brasil"], "Chile": ["Chile", "Chile"], "Equador": ["Ecuador", "Ecuador"], "Peru": ["Peru", "Perú"], "Argentina": ["Argentina", "Argentina"], "Estados Unidos": ["United States", "Estados Unidos"], "África do Sul": ["South Africa", "Sudáfrica"], "Reino Unido": ["United Kingdom", "Reino Unido"], "Irlanda": ["Ireland", "Irlanda"], "Paraguai": ["Paraguay", "Paraguay"], "Colômbia": ["Colombia", "Colombia"], "Holanda": ["Netherlands", "Países Bajos"], "Venezuela": ["Venezuela", "Venezuela"], "México": ["Mexico", "México"], "Dúvidas frequentes": ["FAQ", "Preguntas frecuentes"], "Antes de pedir seu": ["Before you request your", "Antes de pedir tu"], "orçamento": ["quote", "cotización"], "Todo o projeto é conduzido online, pelo WhatsApp, com você acompanhando cada etapa. É assim que já atendemos mais de 4 mil clientes em 14 países, como empresa registrada (CNPJ 69.087.797/0001-02).": ["The whole project runs online, through WhatsApp, with you following every step. That's how we've served more than 4,000 clients in 14 countries, as a registered company (CNPJ 69.087.797/0001-02).", "Todo el proyecto se lleva online, por WhatsApp, y acompañas cada etapa. Así ya atendimos a más de 4 mil clientes en 14 países, como empresa registrada (CNPJ 69.087.797/0001-02)."], "Preciso ter logotipo e textos prontos?": ["Do I need a logo and copy ready?", "¿Necesito tener logotipo y textos listos?"], "Não. Se a sua marca ainda não tem identidade visual, criamos junto com o site. A estrutura e os textos são definidos com você no atendimento inicial.": ["No. If your brand doesn't have an identity yet, we create it along with the website. The structure and copy are defined with you in the first conversation.", "No. Si tu marca todavía no tiene identidad visual, la creamos junto con el sitio. La estructura y los textos se definen contigo en la primera conversación."], "Quanto custa e quanto tempo leva?": ["How much does it cost and how long does it take?", "¿Cuánto cuesta y cuánto tiempo tarda?"], "Depende do formato e da quantidade de páginas. Antes de começar, você recebe uma proposta com valor e prazo definidos.": ["It depends on the format and number of pages. Before we start, you receive a proposal with a set price and timeline.", "Depende del formato y la cantidad de páginas. Antes de empezar, recibes una propuesta con precio y plazo definidos."], "O site funciona bem no celular?": ["Does the website work well on phones?", "¿El sitio funciona bien en el celular?"], "Sim. Todo site é desenhado e testado para celular, tablet e computador, já que a maior parte dos acessos vem do celular.": ["Yes. Every website is designed and tested for phone, tablet and desktop, since most visits come from phones.", "Sí. Todo sitio se diseña y prueba para celular, tablet y computadora, ya que la mayoría de las visitas llega desde el celular."], "Vamos conversar": ["Let's talk", "Hablemos"], "Seu próximo site": ["Your next website", "Tu próximo sitio"], "começa": ["starts", "empieza"], "aqui": ["here", "aquí"], "Chamar no WhatsApp": ["Message us on WhatsApp", "Escribir por WhatsApp"], "Fale com a gente": ["Get in touch", "Habla con nosotros"], "Navegue": ["Explore", "Navega"], "No celular": ["On mobile", "En el celular"], "Dúvidas": ["FAQ", "Preguntas"], "Logotop Design®. Todos os direitos reservados.": ["Logotop Design®. All rights reserved.", "Logotop Design®. Todos los derechos reservados."], "Venda e manutenção de celulares": ["Phone sales and repair", "Venta y reparación de celulares"], "Reparos agrícolas e celulares": ["Agricultural and phone repairs", "Reparaciones agrícolas y celulares"], "Móveis planejados": ["Custom furniture", "Muebles a medida"], "Marca pessoal": ["Personal brand", "Marca personal"], "Acessórios": ["Accessories", "Accesorios"], "Moda e beleza": ["Fashion and beauty", "Moda y belleza"], "Música": ["Music", "Música"], "Evento mobile": ["Mobile event", "Evento mobile"], "Especialista Apple": ["Apple specialist", "Especialista Apple"], "Farmácia": ["Pharmacy", "Farmacia"], "Smartphones": ["Smartphones", "Smartphones"], "Soluções em tecnologia": ["Technology solutions", "Soluciones tecnológicas"], "Apicultura": ["Beekeeping", "Apicultura"], "Celulares e scooters": ["Phones and scooters", "Celulares y scooters"], "iPhone repair": ["iPhone repair", "Reparación de iPhone"], "Psicóloga clínica": ["Clinical psychologist", "Psicóloga clínica"], "Limpeza de estofados": ["Upholstery cleaning", "Limpieza de tapizados"], "Utilidades e eletrônicos": ["Home goods and electronics", "Artículos y electrónica"], "Curso de microeletrônica": ["Microelectronics course", "Curso de microelectrónica"], "Tecnologia": ["Technology", "Tecnología"], "Doceria": ["Sweet shop", "Dulcería"], "Informática e acessórios": ["Computers and accessories", "Informática y accesorios"], "Turismo": ["Tourism", "Turismo"], "Importados": ["Imports", "Importados"], "Studio": ["Studio", "Estudio"], "Joias": ["Jewelry", "Joyería"], "Essência do homem moderno": ["The essence of the modern man", "Esencia del hombre moderno"], "Soluções digitais": ["Digital solutions", "Soluciones digitales"], "Celulares": ["Phones", "Celulares"], "Perfumaria": ["Fragrances", "Perfumería"], "Cursos de software EAD": ["Online software courses", "Cursos de software a distancia"], "Assistência técnica e celulares": ["Repair services and phones", "Servicio técnico y celulares"], "Mobilidade elétrica": ["Electric mobility", "Movilidad eléctrica"], "Fornecedor de iPhones": ["iPhone supplier", "Proveedor de iPhones"], "Avaliações no Instagram": ["Instagram reviews", "Reseñas en Instagram"], "Quem já fez com a gente,": ["People who worked with us", "Quien ya trabajó con nosotros"], "recomenda": ["recommend", "recomienda"], "Comentários reais de clientes no nosso Instagram.": ["Real comments from clients on our Instagram, translated from Portuguese.", "Comentarios reales de clientes en nuestro Instagram, traducidos del portugués."], "Ver mais avaliações": ["See more reviews", "Ver más reseñas"], "Ver menos": ["Show less", "Ver menos"], "Ver no Instagram": ["See on Instagram", "Ver en Instagram"], "Avaliações": ["Reviews", "Reseñas"], "clientes no Brasil e no mundo.": ["clients in Brazil and around the world.", "clientes en Brasil y en el mundo."], "Conte sobre o seu negócio e receba uma proposta para o seu projeto. Atendemos clientes em qualquer país.": ["Tell us about your business and get a proposal for your project. We work with clients in any country.", "Cuéntanos sobre tu negocio y recibe una propuesta para tu proyecto. Atendemos clientes en cualquier país."], "Sites, landing pages e lojas virtuais para empresas do Brasil e de mais 13 países. Do briefing à publicação, você fala direto com quem desenha.": ["Websites, landing pages and online stores for businesses in Brazil and 13 other countries. From briefing to launch, you talk directly to the designer.", "Sitios web, landing pages y tiendas online para empresas de Brasil y de otros 13 países. Desde el briefing hasta la publicación, hablas directamente con quien diseña."], "Sites, landing pages, lojas virtuais e identidades visuais para empresas do Brasil e do mundo.": ["Websites, landing pages, online stores and brand identities for businesses in Brazil and worldwide.", "Sitios web, landing pages, tiendas online e identidades visuales para empresas de Brasil y del mundo."], "Como funciona o atendimento?": ["How does it work?", "¿Cómo funciona la atención?"], "O que dizem sobre a": ["What people say about", "Lo que dicen sobre"], "Política de Privacidade": ["Privacy Policy", "Política de Privacidad"], "Países atendidos: Brasil, Chile, Equador, Peru, Argentina, Estados Unidos, África do Sul, Reino Unido, Irlanda, Paraguai, Colômbia, Holanda, Venezuela, México": ["Countries served: Brazil, Chile, Ecuador, Peru, Argentina, United States, South Africa, United Kingdom, Ireland, Paraguay, Colombia, Netherlands, Venezuela, Mexico", "Países atendidos: Brasil, Chile, Ecuador, Perú, Argentina, Estados Unidos, Sudáfrica, Reino Unido, Irlanda, Paraguay, Colombia, Países Bajos, Venezuela, México"], "Termos de Uso": ["Terms of Use", "Términos de Uso"]}, A={"Logotop Design, início": ["Logotop Design, home", "Logotop Design, inicio"], "Abrir menu": ["Open menu", "Abrir menú"], "Site anterior": ["Previous website", "Sitio anterior"], "Próximo site": ["Next website", "Siguiente sitio"], "Escolher site": ["Choose website", "Elegir sitio"], "Escolher marca": ["Choose brand", "Elegir marca"], "Fechar": ["Close", "Cerrar"], "Anterior": ["Previous", "Anterior"], "Próximo": ["Next", "Siguiente"], "Falar no WhatsApp": ["Chat on WhatsApp", "Hablar por WhatsApp"], "Logotipo ampliado": ["Enlarged logo", "Logotipo ampliado"], "Logotipos criados pela Logotop": ["Logos created by Logotop", "Logotipos creados por Logotop"], "Avaliação anterior": ["Previous review", "Reseña anterior"], "Próxima avaliação": ["Next review", "Siguiente reseña"], "Pedir orçamento no WhatsApp": ["Get a quote on WhatsApp", "Cotizar por WhatsApp"]}, IDX={en:0,es:1};
const WA={pt:{g:"Olá, Logotop Design! Vim pelo site e quero um orçamento.",t:n=>`Olá, Logotop Design! Quero um orçamento de ${n.toLowerCase()}.`,b:"Olá, Logotop Design! Quero um orçamento de site com identidade visual."},
 en:{g:"Hi, Logotop Design! I found you through your website and would like a quote.",t:n=>`Hi, Logotop Design! I'd like a quote for a ${n.toLowerCase()}.`,b:"Hi, Logotop Design! I'd like a quote for a website with brand identity."},
 es:{g:"¡Hola, Logotop Design! Vi su sitio y quiero una cotización.",t:n=>`¡Hola, Logotop Design! Quiero una cotización de ${n.toLowerCase()}.`,b:"¡Hola, Logotop Design! Quiero una cotización de sitio con identidad visual."}};
let L="pt",busy=false;const ORIG=new WeakMap();
function tNode(n){let r=ORIG.get(n);const cur=n.nodeValue;
  if(!r||cur!==r.last){r={o:cur,last:cur};ORIG.set(n,r)}
  const o=r.o,k=o.trim();if(!k)return;const tr=D[k];
  const v=(L==="pt"||!tr)?o:o.replace(k,tr[IDX[L]]);if(cur!==v)n.nodeValue=v;r.last=v}
function tAttr(el){for(const at of ["aria-label","alt"]){const key="data-pt-"+at;let o=el.getAttribute(key);
  if(o===null){o=el.getAttribute(at);if(o===null)continue;el.setAttribute(key,o)}
  const tr=A[o]||D[o];el.setAttribute(at,(L==="pt"||!tr)?o:tr[IDX[L]])}}
function run(root){busy=true;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement&&!n.parentElement.closest("script,style")?1:2});let n;while(n=w.nextNode())tNode(n);
  if(root.querySelectorAll)root.querySelectorAll("[aria-label],[alt]").forEach(tAttr);
  busy=false}
function setWA(){const W=WA[L],u=m=>"https://wa.me/"+WHATS+"?text="+encodeURIComponent(m);
  document.querySelectorAll("a.wa").forEach(a=>a.href=u(W.g));
  document.querySelectorAll(".type[data-msg]").forEach(c=>{const h=c.querySelector("h3");c.href=u(W.t(h.textContent))});
  const br=document.querySelector(".wa-brand");if(br)br.href=u(W.b)}
function apply(l){if(!["pt","en","es"].includes(l))l="pt";L=l;document.querySelectorAll("blockquote[data-en]").forEach(q=>{if(!q.dataset.pt)q.dataset.pt=q.innerHTML;q.innerHTML=l==="pt"?q.dataset.pt:q.dataset[l]});document.documentElement.lang=l==="pt"?"pt-BR":l;run(document.body);setWA();
  document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.l===l));
  try{localStorage.setItem("lt-lang",l)}catch(e){}
  document.querySelectorAll(".cnt").forEach(c=>{const v=+c.dataset.to;c.textContent=v.toLocaleString(document.documentElement.lang,{useGrouping:"always"})});if(typeof position==="function")position();if(typeof vpos==="function")vpos();if(window.__rvfit)setTimeout(window.__rvfit,50)}
new MutationObserver(ms=>{if(busy||L==="pt")return;busy=true;for(const m of ms){
  if(m.type==="characterData")tNode(m.target);else m.addedNodes.forEach(x=>{if(x.nodeType===3)tNode(x);else if(x.nodeType===1){busy=false;run(x);busy=true}})}busy=false})
  .observe(document.body,{childList:true,characterData:true,subtree:true});
document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>apply(b.dataset.l)));window.__relang=()=>apply(L);
let start="";try{start=localStorage.getItem("lt-lang")||""}catch(e){}
if(!["pt","en","es"].includes(start))start="";
if(!start){const nl=(navigator.language||"pt").slice(0,2);start=nl==="es"?"es":nl==="en"?"en":"pt"}
if(start!=="pt")apply(start);
})();

/* ===== Gadgets: vídeo mapeado na perspectiva de cada tela ===== */
(()=>{const g=document.getElementById("gadgets");if(!g)return;const BW=525,BH=510;
function solve(A,b){const n=b.length;for(let i=0;i<n;i++){let m=i;for(let r=i+1;r<n;r++)if(Math.abs(A[r][i])>Math.abs(A[m][i]))m=r;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];
  for(let r=i+1;r<n;r++){const f=A[r][i]/A[i][i];for(let c=i;c<n;c++)A[r][c]-=f*A[i][c];b[r]-=f*b[i]}}
  const x=new Array(n);for(let i=n-1;i>=0;i--){let s=b[i];for(let c=i+1;c<n;c++)s-=A[i][c]*x[c];x[i]=s/A[i][i]}return x}
function fit(){const sc=g.clientWidth/BW;
  g.querySelectorAll(".gscr").forEach(el=>{const w=el.offsetWidth,h=el.offsetHeight;
    const q=el.dataset.q.split(" ").map(p=>p.split(",").map(Number)).map(([x,y])=>[x*sc,y*sc]);
    const src=[[0,0],[w,0],[w,h],[0,h]],A=[],b=[];
    for(let i=0;i<4;i++){const [x,y]=src[i],[u,v]=q[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);b.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);b.push(v)}
    const k=solve(A,b);
    el.style.transform=`matrix3d(${k[0]},${k[3]},0,${k[6]},${k[1]},${k[4]},0,${k[7]},0,0,1,0,${k[2]},${k[5]},0,1)`})}
fit();addEventListener("resize",fit);new ResizeObserver(fit).observe(g);
g.querySelectorAll("video").forEach(v=>{v.muted=true;v.play().catch(()=>{})});
})();

/* ===== Soluções: animações só quando visíveis ===== */
(()=>{const t=document.querySelector(".types");if(!t)return;new IntersectionObserver(es=>es.forEach(e=>t.classList.toggle("play",e.isIntersecting)),{threshold:.1}).observe(t)})();


/* ===== Avaliações: carrossel com destaque central ===== */
(()=>{const t=document.getElementById("rvTrack"),dots=document.getElementById("rvDots");if(!t)return;
 const cards=[...t.children],N=cards.length;let i=0,timer=null,hold=false;
 cards.forEach((c,k)=>{dots.appendChild(document.createElement("i"));c.addEventListener("click",()=>{if(k!==i){go(k);restart()}})});
 function fit(){cards.forEach(c=>c.style.height="");let h=0;cards.forEach(c=>{h=Math.max(h,c.offsetHeight)});cards.forEach(c=>c.style.height=h+"px");t.style.setProperty("--h",(h+16)+"px")}
 function go(k){i=(k+N)%N;cards.forEach((c,j)=>{let o=((j-i)%N+N)%N;if(o>N/2)o-=N;const far=Math.abs(o)>2;
   if(far!==c.classList.contains("far")){c.style.transition="none";c.classList.toggle("far",far);c.style.setProperty("--o",o);c.offsetWidth;c.style.transition=""}else c.style.setProperty("--o",o);
   c.classList.toggle("on",o===0);c.classList.toggle("n1",Math.abs(o)===1);c.inert=o!==0;c.setAttribute("aria-hidden",o!==0)});
   [...dots.children].forEach((d,j)=>d.classList.toggle("on",j===i))}
 document.getElementById("rvPrev").onclick=()=>{go(i-1);restart()};document.getElementById("rvNext").onclick=()=>{go(i+1);restart()};
 let sx=null;t.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;hold=true},{passive:true});
 t.addEventListener("touchend",e=>{if(sx!=null){const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){go(i+(d<0?1:-1));restart()}}sx=null;setTimeout(()=>hold=false,4000)});
 t.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse")hold=true});document.getElementById("avaliacoes").addEventListener("focusin",()=>hold=true);document.getElementById("avaliacoes").addEventListener("focusout",()=>hold=false);t.addEventListener("pointerleave",()=>hold=false);
 function restart(){clearInterval(timer);if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;timer=setInterval(()=>{if(!hold)go(i+1)},5000)}
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)restart();else clearInterval(timer)}),{threshold:.3}).observe(t);
 addEventListener("resize",fit);
 go(0);fit();window.__rvfit=fit;
})();
