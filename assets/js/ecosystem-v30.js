
document.addEventListener("DOMContentLoaded",()=>{
 const L=()=>localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en";
 const set=(sel,t)=>{const e=document.querySelector(sel);if(e)e.textContent=t};
 const lines=(sel,a)=>{const e=document.querySelector(sel);if(!e)return;e.innerHTML="";a.forEach(t=>{const s=document.createElement("span");s.className="sentence";s.textContent=t;e.appendChild(s)})};
 const headingLines=(sel,t)=>{const e=document.querySelector(sel);if(!e)return;const parts=String(t).split(" / ");e.innerHTML="";parts.forEach((v,i)=>{const s=document.createElement("span");s.className="heading-line";s.textContent=v;e.appendChild(s);if(i<parts.length-1)e.appendChild(document.createElement("br"))})};
 function apply(){
   const p=window.ARA_ECO30?.[L()]||window.ARA_ECO30.en;
   const title=document.querySelectorAll(".eco-title span"); if(title[0])title[0].textContent=p.title[0];if(title[1])title[1].textContent=p.title[1];
   set(".eco-mantra",p.mantra); lines('[data-eco-line="hero"]',p.hero);
   const ks=document.querySelectorAll(".eco-kicker"); if(ks[1])ks[1].textContent=p.flowK;if(ks[2])ks[2].textContent=p.worldK;if(ks[3])ks[3].textContent=p.officialK;
   headingLines("[data-flow-title]",p.flowT);lines('[data-eco-line="flowP"]',p.flow);
   document.querySelectorAll(".flow-step b").forEach((e,i)=>{if(p.steps[i])e.textContent=p.steps[i]});
   headingLines("[data-world-title]",p.worldT);lines('[data-eco-line="worldP"]',p.world);
   document.querySelectorAll(".world-card").forEach((c,i)=>{if(!p.cards[i])return;c.querySelector("h3").textContent=p.cards[i][0];c.querySelector("p").textContent=p.cards[i][1]});
   set("[data-know-title]",p.officialT);lines('[data-eco-line="knowP"]',p.official);
   document.querySelectorAll(".knowledge-item").forEach((c,i)=>{if(!p.knowledge[i])return;c.querySelector("b").textContent=p.knowledge[i][0];c.querySelector("span").textContent=p.knowledge[i][1]});
 }
 document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(apply,40)));
 apply();
});
