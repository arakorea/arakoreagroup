
(() => {
 const PAGE=(location.pathname.split("/").pop()||"index.html").replace(".html","");
 const SETS={
  index:{names:["URSA MAJOR","CASSIOPEIA"],stars:[
   [.13,.24,1.5],[.20,.20,1.2],[.27,.23,1.4],[.34,.30,1.6],[.42,.28,1.2],[.49,.34,1.4],[.56,.39,1.2],
   [.71,.18,1.4],[.76,.23,1.2],[.82,.20,1.5],[.78,.29,1.2],[.72,.31,1.3]],
   lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,8],[8,9],[9,10],[10,11]]},
  home:{names:["ORION","LYRA"],stars:[
   [.18,.25,1.5],[.25,.35,1.2],[.30,.46,1.7],[.37,.56,1.2],[.25,.48,1.3],[.16,.61,1.5],[.35,.68,1.4],
   [.72,.22,1.4],[.77,.31,1.8],[.83,.27,1.2],[.80,.39,1.2],[.73,.42,1.3]],
   lines:[[0,2],[1,2],[2,3],[2,4],[4,5],[3,6],[7,8],[8,9],[8,10],[10,11]]},
  group:{names:["CYGNUS","CORONA BOREALIS"],stars:[
   [.50,.15,1.6],[.50,.27,1.2],[.50,.40,1.8],[.50,.54,1.3],[.50,.70,1.5],[.36,.40,1.3],[.64,.40,1.3],
   [.73,.22,1.1],[.78,.18,1.3],[.84,.20,1.4],[.88,.26,1.2],[.90,.34,1.1]],
   lines:[[0,1],[1,2],[2,3],[3,4],[5,2],[2,6],[7,8],[8,9],[9,10],[10,11]]},
  businesses:{names:["SCORPIUS","AQUILA"],stars:[
   [.15,.20,1.4],[.20,.27,1.2],[.24,.36,1.4],[.30,.45,1.6],[.37,.51,1.2],[.43,.59,1.4],[.42,.68,1.2],[.36,.74,1.3],[.30,.71,1.2],
   [.69,.25,1.2],[.76,.32,1.7],[.83,.25,1.2],[.76,.42,1.3],[.76,.53,1.2]],
   lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[9,10],[10,11],[10,12],[12,13]]},
  ecosystem:{names:["PERSEUS","GEMINI"],stars:[
   [.13,.30,1.3],[.20,.25,1.5],[.27,.30,1.2],[.34,.25,1.6],[.39,.34,1.2],[.32,.43,1.4],[.25,.50,1.2],
   [.67,.20,1.4],[.75,.22,1.5],[.69,.34,1.2],[.77,.36,1.3],[.68,.48,1.4],[.78,.50,1.2],[.65,.62,1.2],[.80,.64,1.3]],
   lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[7,9],[9,11],[11,13],[8,10],[10,12],[12,14],[9,10]]}
 };
 const cfg=SETS[PAGE]; if(!cfg)return;
 const c=document.createElement("canvas");c.id="pageConstellations";c.setAttribute("aria-hidden","true");
 Object.assign(c.style,{position:"fixed",inset:"0",width:"100%",height:"100%",zIndex:"1",pointerEvents:"none",opacity:".72"});
 document.body.prepend(c);const x=c.getContext("2d");let w,h,dpr,mouse={x:-9999,y:-9999};
 function size(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0)}
 addEventListener("resize",size);addEventListener("pointermove",e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});size();
 let meteors=[],nextMeteor=performance.now()+7000+Math.random()*7000;
 function meteor(now){
   if(PAGE!=="ecosystem")return;
   if(now>nextMeteor){meteors.push({x:w*(.58+Math.random()*.35),y:-40,len:100+Math.random()*90,v:7+Math.random()*3,life:0});
     if(Math.random()<.28) setTimeout(()=>meteors.push({x:w*(.55+Math.random()*.35),y:-30,len:70+Math.random()*70,v:6+Math.random()*2,life:0}),450);
     nextMeteor=now+10000+Math.random()*8000}
   meteors.forEach(m=>{m.x-=m.v;m.y+=m.v*.58;m.life++;let a=Math.max(0,1-m.life/105);
     let g=x.createLinearGradient(m.x,m.y,m.x+m.len,m.y-m.len*.58);g.addColorStop(0,`rgba(240,249,255,${a*.9})`);g.addColorStop(.18,`rgba(151,211,255,${a*.55})`);g.addColorStop(1,"rgba(255,211,145,0)");
     x.strokeStyle=g;x.lineWidth=1.25;x.beginPath();x.moveTo(m.x,m.y);x.lineTo(m.x+m.len,m.y-m.len*.58);x.stroke()});
   meteors=meteors.filter(m=>m.life<105&&m.y<h+100)
 }
 function draw(now){
  x.clearRect(0,0,w,h);const pts=cfg.stars.map(s=>[s[0]*w,s[1]*h,s[2]]);
  cfg.lines.forEach(([a,b])=>{let A=pts[a],B=pts[b],d=Math.hypot(mouse.x-(A[0]+B[0])/2,mouse.y-(A[1]+B[1])/2),hot=Math.max(0,1-d/230);
    x.strokeStyle=`rgba(126,187,255,${.10+hot*.34})`;x.lineWidth=.65+hot*1.15;x.shadowBlur=hot*10;x.shadowColor="rgba(115,190,255,.6)";
    x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(B[0],B[1]);x.stroke();x.shadowBlur=0});
  pts.forEach((p,i)=>{let pulse=.72+.28*Math.sin(now/1100+i*1.7),d=Math.hypot(mouse.x-p[0],mouse.y-p[1]),hot=Math.max(0,1-d/150);
    x.fillStyle=`rgba(${i%4===0?"255,220,170":"205,232,255"},${.55*pulse+hot*.35})`;x.shadowBlur=5+hot*12;x.shadowColor=i%4===0?"rgba(255,207,145,.65)":"rgba(111,190,255,.75)";
    x.beginPath();x.arc(p[0],p[1],p[2]+hot*1.2,0,Math.PI*2);x.fill();x.shadowBlur=0});
  meteor(now);requestAnimationFrame(draw)
 }requestAnimationFrame(draw);
})();
