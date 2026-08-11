
document.addEventListener("DOMContentLoaded",()=>{
 const s=document.getElementById("system"),ps=[...document.querySelectorAll(".planet")];
 function frame(t){
   if(s){
     const q=s.getBoundingClientRect(),S=Math.min(q.width,q.height);
     ps.forEach((p,i)=>{
       const r=parseFloat(p.dataset.r)*S;
       const a=t*parseFloat(p.dataset.speed)+parseFloat(p.dataset.phase);
       const x=Math.cos(a)*r;
       const y=Math.sin(a)*r*.34;
       const z=Math.sin(a);
       const depth=(z+1)/2;
       const sc=.68+depth*.58;
       const blur=(1-depth)*.45;
       const bright=.74+depth*.36;
       p.style.zIndex=String(12+Math.round(depth*42));
       p.style.opacity=String(.40+depth*.60);
       p.style.filter=`blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(2)})`;
       p.style.transform=`translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) translateZ(${(z*95).toFixed(1)}px) scale(${sc.toFixed(3)})`;
       const sphere=p.querySelector(".sphere");
       if(sphere){
         const lightX=24+depth*12;
         sphere.style.backgroundPosition=`${(t*.004*(i+1))%100}% 50%, ${lightX}% 30%, 74% 76%, 0 0`;
       }
     });
   }
   requestAnimationFrame(frame)
 }
 requestAnimationFrame(frame);
});
