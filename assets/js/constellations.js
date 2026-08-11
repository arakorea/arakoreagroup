
const canvas=document.getElementById('space'),ctx=canvas.getContext('2d');
let W,H,DPR=Math.min(devicePixelRatio||1,2);
let mx=.5,my=.5,tx=.5,ty=.5,last=0;
let field=[];

const palette=[
  [255,255,255],
  [176,210,255],
  [255,221,176],
  [198,183,255],
  [178,255,226],
  [255,190,218]
];

// normalized constellation templates
const constellations=[
 {name:'URSA MAJOR',color:[176,210,255],anchor:[.14,.20],scale:.13,
  pts:[[0,0],[.18,.05],[.35,.0],[.53,.08],[.70,.03],[.82,.16],[1,.25]],
  edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
 {name:'CASSIOPEIA',color:[198,183,255],anchor:[.72,.17],scale:.12,
  pts:[[0,.15],[.23,0],[.48,.22],[.72,.04],[1,.17]],
  edges:[[0,1],[1,2],[2,3],[3,4]]},
 {name:'ORION',color:[255,221,176],anchor:[.72,.61],scale:.13,
  pts:[[.18,0],[.77,.04],[.42,.37],[.50,.41],[.58,.45],[0,.9],[1,1]],
  edges:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[5,6]]},
 {name:'CYGNUS',color:[178,255,226],anchor:[.22,.64],scale:.12,
  pts:[[.50,0],[.50,.26],[.50,.52],[.50,.82],[0,.48],[1,.48]],
  edges:[[0,1],[1,2],[2,3],[4,2],[2,5]]},
 {name:'LYRA',color:[255,190,218],anchor:[.46,.17],scale:.075,
  pts:[[.50,0],[.18,.35],[.82,.35],[.25,.82],[.75,.82]],
  edges:[[0,1],[0,2],[1,3],[2,4],[3,4]]},
 {name:'SCORPIUS',color:[255,205,165],anchor:[.40,.72],scale:.13,
  pts:[[0,.05],[.18,0],[.34,.12],[.46,.28],[.54,.48],[.68,.64],[.82,.78],[1,.72]],
  edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]}
];

function resize(){
 W=innerWidth;H=innerHeight;canvas.width=W*DPR;canvas.height=H*DPR;canvas.style.width=W+'px';canvas.style.height=H+'px';
 ctx.setTransform(DPR,0,0,DPR,0,0);
 const n=Math.min(520,Math.floor(W*H/2700));
 field=Array.from({length:n},()=>({
  x:Math.random()*W,y:Math.random()*H,z:.16+Math.random()*.84,
  r:.28+Math.random()*1.5,a:.10+Math.random()*.78,
  p:Math.random()*6.28,c:palette[(Math.random()*palette.length)|0],
  drift:(Math.random()-.5)*.055
 }));
}
resize();addEventListener('resize',resize);

addEventListener('pointermove',e=>{tx=e.clientX/W;ty=e.clientY/H});
addEventListener('pointerleave',()=>{tx=.5;ty=.5});

function drawConstellation(c,t){
 const ax=c.anchor[0]*W, ay=c.anchor[1]*H, sc=c.scale*Math.min(W,H);
 let pts=[];
 const cursorX=mx*W,cursorY=my*H;
 let centerX=0,centerY=0;
 c.pts.forEach(p=>{centerX+=ax+p[0]*sc;centerY+=ay+p[1]*sc});
 centerX/=c.pts.length;centerY/=c.pts.length;
 const distToCursor=Math.hypot(cursorX-centerX,cursorY-centerY);
 const active=Math.max(0,1-distToCursor/(Math.min(W,H)*.36));

 c.pts.forEach((p,i)=>{
   let x=ax+p[0]*sc, y=ay+p[1]*sc;
   // constellation subtly gathers toward cursor when active
   const pull=active*0.075;
   x+=(cursorX-x)*pull;
   y+=(cursorY-y)*pull;
   // tiny orbital movement
   const ang=t*.00018+i*.85;
   x+=Math.cos(ang)*active*5;
   y+=Math.sin(ang)*active*5;
   pts.push({x,y});
 });

 c.edges.forEach(([a,b])=>{
   const p1=pts[a],p2=pts[b];
   ctx.strokeStyle=`rgba(${c.color[0]},${c.color[1]},${c.color[2]},${0.055+active*.78})`;
   ctx.lineWidth=.85+active*.95;
   ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
 });

 pts.forEach((p,i)=>{
   const tw=.82+.18*Math.sin(t*.002+i);
   const rr=1.18+(i%3)*.42+active*1.05;
   ctx.beginPath();
   ctx.fillStyle=`rgba(${c.color[0]},${c.color[1]},${c.color[2]},${(.46+active*.54)*tw})`;
   ctx.arc(p.x,p.y,rr,0,Math.PI*2);ctx.fill();
   if(active>.18){
     ctx.beginPath();
     ctx.fillStyle=`rgba(${c.color[0]},${c.color[1]},${c.color[2]},${active*.08})`;
     ctx.arc(p.x,p.y,rr*5.5,0,Math.PI*2);ctx.fill();
   }
 });
}

function frame(t){
 mx+=(tx-mx)*.04;my+=(ty-my)*.04;
 ctx.clearRect(0,0,W,H);
 const qx=mx*W,qy=my*H;
 const parx=(mx-.5)*30,pary=(my-.5)*22;
 const near=[];

 for(const s of field){
   // constant slow star drift + depth parallax
   s.x += s.drift*(.4+s.z);
   if(s.x<0)s.x=W;if(s.x>W)s.x=0;
   let x=s.x+parx*s.z,y=s.y+pary*s.z;
   let dx=x-qx,dy=y-qy,d=Math.hypot(dx,dy)||1;

   // stars curve/orbit around cursor instead of only linking
   if(d<210){
     const strength=(1-d/210)*12*s.z;
     const ang=Math.atan2(dy,dx)+1.10;
     x+=Math.cos(ang)*strength;
     y+=Math.sin(ang)*strength;
   }

   const tw=.68+.32*Math.sin(t*.0014+s.p);
   ctx.beginPath();
   ctx.fillStyle=`rgba(${s.c[0]},${s.c[1]},${s.c[2]},${s.a*tw})`;
   ctx.arc(x,y,s.r*s.z,0,Math.PI*2);ctx.fill();

   if(d<155&&s.z>.42)near.push({x,y,d,c:s.c,z:s.z});
 }

 near.sort((a,b)=>a.d-b.d);
 near.length=Math.min(near.length,11);
 for(let i=0;i<near.length;i++){
   const a=near[i];
   ctx.strokeStyle=`rgba(${a.c[0]},${a.c[1]},${a.c[2]},${Math.max(.08,.34-a.d/700)})`;
   ctx.lineWidth=1.05;
   ctx.beginPath();ctx.moveTo(qx,qy);ctx.lineTo(a.x,a.y);ctx.stroke();
   for(let j=i+1;j<near.length;j++){
     const b=near[j],dd=Math.hypot(a.x-b.x,a.y-b.y);
     if(dd<112){
       ctx.strokeStyle=`rgba(190,220,255,${.28*(1-dd/112)})`;
       ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
     }
   }
 }

 // soft cursor halo to make the interactive zone visible
 const halo=ctx.createRadialGradient(qx,qy,0,qx,qy,150);
 halo.addColorStop(0,'rgba(150,195,255,.08)');
 halo.addColorStop(1,'rgba(150,195,255,0)');
 ctx.fillStyle=halo;ctx.beginPath();ctx.arc(qx,qy,150,0,Math.PI*2);ctx.fill();

 constellations.forEach(c=>drawConstellation(c,t));
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
