
document.addEventListener("DOMContentLoaded",()=>{
 const lang=()=>localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en";
 const apply=()=>{
  const p=window.ARA_ECO23?.[lang()]||window.ARA_ECO23?.en;if(!p)return;
  const hero=document.querySelector("[data-hero]");if(hero){hero.innerHTML="";p.hero.forEach(t=>{const s=document.createElement("span");s.className="sentence";s.textContent=t;hero.appendChild(s)})}
  document.querySelector("[data-flow-title]").textContent=p.flowTitle;document.querySelector("[data-flow-p]").textContent=p.flowP;
  document.querySelectorAll(".flow-step b").forEach((e,i)=>e.textContent=p.steps[i]);
  document.querySelector("[data-world-title]").textContent=p.worldTitle;document.querySelector("[data-world-p]").textContent=p.worldP;
  document.querySelectorAll(".world-card").forEach((e,i)=>{e.querySelector("h3").textContent=p.worlds[i][0];e.querySelector("p").textContent=p.worlds[i][1]});
  document.querySelector("[data-know-title]").textContent=p.knowTitle;document.querySelector("[data-know-p]").textContent=p.knowP;
  document.querySelectorAll(".knowledge-item").forEach((e,i)=>{e.querySelector("b").textContent=p.knowledge[i][0];e.querySelector("span").textContent=p.knowledge[i][1]});
 };
 document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(apply,0)));apply();
});

document.addEventListener("DOMContentLoaded",()=>{
  function ecoLang(){return localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en"}
  function applyEcoLines(){
    const pack=window.ARA_ECO_LINE?.[ecoLang()]||window.ARA_ECO_LINE?.en;
    if(!pack)return;
    document.querySelectorAll("[data-eco-line]").forEach(block=>{
      const lines=pack[block.dataset.ecoLine];
      if(!lines)return;
      block.innerHTML="";
      lines.forEach(text=>{
        const s=document.createElement("span");
        s.className="sentence";
        s.textContent=text;
        block.appendChild(s);
      });
    });
  }
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(applyEcoLines,0)));
  setTimeout(applyEcoLines,0);
});
