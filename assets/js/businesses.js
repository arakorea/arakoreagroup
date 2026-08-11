
document.addEventListener("DOMContentLoaded",()=>{
  function lang(){return localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en"}
  function applyBusinessCopy(){
    const l=lang(),pack=window.ARA_BUSINESS_I18N?.[l]||window.ARA_BUSINESS_I18N?.en;
    document.querySelectorAll("[data-business-copy]").forEach(block=>{
      const lines=pack?.[block.dataset.businessCopy];
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
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(applyBusinessCopy,0)));
  applyBusinessCopy();
});

document.addEventListener("DOMContentLoaded",()=>{
  function currentLang(){return localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en"}
  function getPath(obj,path){return path.split(".").reduce((o,k)=>o&&o[k],obj)}
  function applyBusinessUI(){
    const lang=currentLang();
    const pack=window.ARA_BUSINESS_UI?.[lang]?.businesses || window.ARA_BUSINESS_UI?.en?.businesses;
    if(!pack)return;
    document.querySelectorAll("[data-biz]").forEach(el=>{
      const v=getPath(pack,el.dataset.biz);
      if(v!==undefined)el.textContent=v;
    });
    document.querySelectorAll("[data-biz-card]").forEach(el=>{
      const v=getPath(pack.cards,el.dataset.bizCard);
      if(v!==undefined)el.textContent=v;
    });
  }
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(applyBusinessUI,0)));
  applyBusinessUI();
});
