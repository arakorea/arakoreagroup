
document.addEventListener("DOMContentLoaded",()=>{
  const L=()=>localStorage.getItem("ara_lang")||window.ARA_SITE?.defaultLanguage||"en";
  function apply(){
    const p=window.ARA_CONTACT?.[L()]||window.ARA_CONTACT.en;
    const t=document.querySelectorAll(".contact-title span");
    if(t[0])t[0].textContent=p.title[0];
    if(t[1])t[1].textContent=p.title[1];
    const k=document.querySelector(".contact-kicker"); if(k)k.textContent=p.kicker;
    document.querySelectorAll(".contact-copy .sentence").forEach((e,i)=>{if(p.copy[i])e.textContent=p.copy[i]});
    document.querySelectorAll("[data-contact-label]").forEach(e=>{e.textContent=p.labels[e.dataset.contactLabel]||e.textContent});
    document.querySelectorAll("[data-contact-placeholder]").forEach(e=>{e.placeholder=p.place[e.dataset.contactPlaceholder]||""});
    const note=document.querySelector(".contact-note");if(note)note.textContent=p.note;
    const send=document.querySelector(".contact-submit");if(send)send.textContent=p.send;
    ["meta1","meta2","meta3"].forEach((key,i)=>{const e=document.querySelector(`[data-meta="${i}"]`);if(e)e.textContent=p[key]});
  }
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(apply,30)));
  apply();
});
