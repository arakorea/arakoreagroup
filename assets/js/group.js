
document.addEventListener("DOMContentLoaded",()=>{
  const network=document.querySelector(".network");
  const nodes=[...document.querySelectorAll(".node[data-node]")];
  const lines=[...document.querySelectorAll(".net-lines line")];
  const info=document.getElementById("nodeInfo");
  const detail=document.getElementById("nodeDetail");
  const keyMap={center:"centerInfo",ara:"araInfo",akenm:"akInfo",tikoonz:"tikInfo",ourbang:"ourInfo"};
  const detailMap={
    ara:["ARA KOREA","ARAKOREA.ORG · ARAKOREA.SHOP · ARA KOREA FILM FESTIVAL"],
    akenm:["AK ENM","IP BUSINESS · MUSIC & RECORDS · PUBLISHING · PRODUCTION · PERFORMANCE"],
    tikoonz:["TIKOONZ","TIKOONZ.COM · TIKOONZ.TV · TIKOONZ.SHOP · ICEHAIL.COM"],
    ourbang:["OURBANG","CREATORS · LIVE · DISCOVERY · CONTENT · COMMUNITY · COMMERCE"]
  };
  let active="center",locked=false;

  function lang(){return localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en"}
  function msg(k){return window.ARA_I18N?.[lang()]?.group?.[keyMap[k]]||""}

  function activate(k){
    active=k;
    network.className=network.className.replace(/\bfocus-\S+/g,"").trim();
    if(k!=="center")network.classList.add("focus-"+k);
    nodes.forEach(n=>n.classList.toggle("active",n.dataset.node===k));
    lines.forEach(l=>l.classList.toggle("active",l.dataset.to===k||k==="center"));
    if(info){info.removeAttribute("data-i18n");info.textContent=msg(k)}
    if(detail){
      const d=detailMap[k];detail.classList.toggle("show",!!d);
      if(d){detail.querySelector("strong").textContent=d[0];detail.querySelector("span").textContent=d[1]}
    }
  }
  function nearest(x,y){
    let k=null,b=1e9;
    nodes.filter(n=>n.dataset.node!=="center").forEach(n=>{
      const r=n.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=Math.hypot(x-cx,y-cy);
      if(d<b){b=d;k=n.dataset.node}
    });
    return b<155?k:"center";
  }
  network.addEventListener("pointermove",e=>{if(!locked)activate(nearest(e.clientX,e.clientY))});
  network.addEventListener("pointerleave",()=>{if(!locked)activate("center")});
  nodes.forEach(n=>n.addEventListener("click",e=>{
    e.preventDefault();const k=n.dataset.node;
    if(k==="center"){locked=false;activate("center");return}
    if(locked&&active===k){locked=false;activate("center")}else{locked=true;activate(k)}
  }));
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(()=>activate(active),0)));
  activate("center");
});
