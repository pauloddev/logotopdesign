"use strict";
(()=>{const ok=["pt","en","es"];let l="";try{l=localStorage.getItem("lt-lang")||""}catch(e){}
if(!ok.includes(l)){const n=(navigator.language||"pt").slice(0,2);l=ok.includes(n)?n:"pt"}
function set(x){if(!ok.includes(x))x="pt";document.querySelectorAll("article[data-l]").forEach(a=>a.hidden=a.dataset.l!==x);
 document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.l===x));
 document.documentElement.lang=x==="pt"?"pt-BR":x;try{localStorage.setItem("lt-lang",x)}catch(e){}}
document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>set(b.dataset.l)));
set(l);const y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();})();
