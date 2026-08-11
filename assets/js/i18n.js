
function applyDesignedCopy(lang){
  const pack=window.ARA_LINE_COPY?.[lang];
  if(!pack)return;
  document.querySelectorAll("[data-copy-key]").forEach(block=>{
    const lines=pack[block.dataset.copyKey];
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


function gp(o,p){return p.split(".").reduce((x,k)=>x&&x[k],o)}
function setLang(l){if(!window.ARA_I18N[l])l="en";localStorage.setItem("ara_lang",l);document.documentElement.lang=l==="zh"?"zh-Hans":l;document.documentElement.dataset.lang=l;document.querySelectorAll("[data-i18n]").forEach(e=>{const v=gp(window.ARA_I18N[l],e.dataset.i18n);if(v)e.textContent=v});document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===l));applyDesignedCopy(l)}
document.addEventListener("DOMContentLoaded",()=>{const q=new URLSearchParams(location.search).get("lang");setLang(q||localStorage.getItem("ara_lang")||window.ARA_SITE.defaultLanguage||"en");document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));const m=document.querySelector(".menu-toggle"),n=document.querySelector(".global-nav");m?.addEventListener("click",()=>{const o=n.classList.toggle("open");m.setAttribute("aria-expanded",String(o))})});
