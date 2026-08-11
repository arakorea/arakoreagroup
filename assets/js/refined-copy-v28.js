
document.addEventListener("DOMContentLoaded",()=>{
 const lang=()=>localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en";
 const set=(sel,text)=>{const e=document.querySelector(sel);if(e&&text!==undefined)e.textContent=text};
 const lines=(sel,arr)=>{const e=document.querySelector(sel);if(!e||!arr)return;e.innerHTML="";arr.forEach(t=>{const s=document.createElement("span");s.className="sentence";s.textContent=t;e.appendChild(s)})};
 function apply(){
  const p=window.ARA_REFINED_COPY?.[lang()]||window.ARA_REFINED_COPY?.en;if(!p)return;
  const path=(location.pathname.split("/").pop()||"index.html").replace(".html","");
  if(path==="home"){
    set('[data-i18n="home.line1"]',p.home.line1);set('[data-i18n="home.line2"]',p.home.line2);set('[data-i18n="home.copy"]',p.home.copy[0]);
  }
  if(path==="group"){
    set('[data-i18n="group.intro1"]',p.group.intro1);set('[data-i18n="group.intro2"]',p.group.intro2);
    set('[data-i18n="group.const1"]',p.group.const1);set('[data-i18n="group.const2"]',p.group.const2);
    set('[data-i18n="group.close1"]',p.group.close1);set('[data-i18n="group.close2"]',p.group.close2);
    lines('[data-copy-key="introCopy"]',p.group.intro);lines('[data-copy-key="constCopy"]',p.group.const);
    lines('[data-copy-key="araCopy"]',p.group.ara);lines('[data-copy-key="akCopy"]',p.group.ak);
    lines('[data-copy-key="tikCopy"]',p.group.tik);lines('[data-copy-key="ourCopy"]',p.group.our);
  }
  if(path==="businesses"){
    set('[data-biz="hero1"]',p.biz.hero1);set('[data-biz="hero2"]',p.biz.hero2);
    lines('[data-business-copy="hero"]',p.biz.hero);lines('[data-business-copy="ara"]',p.biz.ara);
    lines('[data-business-copy="ak"]',p.biz.ak);lines('[data-business-copy="tik"]',p.biz.tik);lines('[data-business-copy="our"]',p.biz.our);
    set('[data-biz="hub1"]',p.biz.hub1);set('[data-biz="hub2"]',p.biz.hub2);
  }
  if(path==="ecosystem"){
    const spans=document.querySelectorAll(".eco-title span");if(spans[0])spans[0].textContent=p.eco.title1;if(spans[1])spans[1].textContent=p.eco.title2;
    lines('[data-eco-line="hero"]',p.eco.hero);set('[data-flow-title]',p.eco.flowTitle);lines('[data-eco-line="flowP"]',p.eco.flow);
    set('[data-world-title]',p.eco.worldTitle);lines('[data-eco-line="worldP"]',p.eco.world);lines('[data-eco-line="knowP"]',p.eco.know);
  }
 }
 document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(apply,20)));
 setTimeout(apply,20);
});
