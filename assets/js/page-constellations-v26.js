
(() => {
  const page=(location.pathname.split("/").pop()||"index.html").replace(".html","");
  const COLORS={
    ice:["205,235,255","112,193,255"],
    gold:["255,224,174","255,181,92"],
    violet:["224,205,255","150,104,255"],
    mint:["190,255,228","89,222,183"],
    aqua:["183,244,255","76,203,229"],
    rose:["255,208,226","255,116,170"]
  };

  // Each page gets a completely unique constellation set.
  // Positions are normalized and intentionally spread to use empty space.
  const ATLAS={
    index:[
      {name:"URSA MAJOR",c:"ice",p:[[.07,.18],[.13,.14],[.19,.18],[.25,.23],[.32,.21],[.38,.27],[.45,.31]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
      {name:"CASSIOPEIA",c:"violet",p:[[.68,.12],[.73,.18],[.78,.13],[.83,.21],[.89,.16]],l:[[0,1],[1,2],[2,3],[3,4]]},
      {name:"CANES VENATICI",c:"mint",p:[[.10,.58],[.15,.52],[.20,.56],[.24,.49]],l:[[0,1],[1,2],[2,3]]},
      {name:"DRACO",c:"gold",p:[[.58,.66],[.63,.61],[.69,.65],[.72,.72],[.67,.78],[.60,.75],[.56,.70]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]}
    ],
    home:[
      {name:"ORION",c:"aqua",p:[[.45,.20],[.40,.31],[.50,.33],[.44,.43],[.49,.44],[.54,.45],[.42,.57],[.55,.60]],l:[[0,1],[0,2],[1,3],[2,5],[3,4],[4,5],[3,6],[5,7]]},
      {name:"TAURUS",c:"gold",p:[[.72,.18],[.76,.24],[.81,.22],[.84,.28],[.88,.31],[.80,.34]],l:[[0,1],[1,2],[2,3],[3,4],[1,5]]},
      {name:"LEPUS",c:"violet",p:[[.62,.55],[.66,.60],[.71,.58],[.69,.65],[.63,.67]],l:[[0,1],[1,2],[2,3],[3,4],[4,0]]},
      {name:"CANIS MAJOR",c:"ice",p:[[.16,.47],[.22,.52],[.26,.60],[.21,.66],[.14,.61]],l:[[0,1],[1,2],[2,3],[3,4],[4,0]]}
    ],
    group:[
      {name:"CYGNUS",c:"ice",p:[[.50,.10],[.50,.22],[.50,.36],[.50,.52],[.50,.70],[.36,.36],[.64,.36]],l:[[0,1],[1,2],[2,3],[3,4],[5,2],[2,6]]},
      {name:"VULPECULA",c:"mint",p:[[.12,.27],[.18,.22],[.23,.28],[.29,.24]],l:[[0,1],[1,2],[2,3]]},
      {name:"SAGITTA",c:"gold",p:[[.12,.67],[.20,.64],[.28,.68],[.34,.66]],l:[[0,1],[1,2],[2,3]]},
      {name:"CORONA BOREALIS",c:"violet",p:[[.73,.68],[.77,.63],[.82,.61],[.87,.64],[.90,.70],[.86,.76],[.80,.77]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]}
    ],
    businesses:[
      {name:"SCORPIUS",c:"rose",p:[[.08,.22],[.13,.18],[.18,.23],[.22,.31],[.27,.39],[.32,.48],[.31,.58],[.26,.66],[.20,.64]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]]},
      {name:"AQUILA",c:"ice",p:[[.65,.18],[.72,.27],[.79,.18],[.72,.37],[.72,.49]],l:[[0,1],[1,2],[1,3],[3,4]]},
      {name:"SAGITTARIUS",c:"gold",p:[[.18,.71],[.24,.65],[.31,.69],[.36,.76],[.31,.82],[.23,.80]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
      {name:"CAPRICORNUS",c:"mint",p:[[.67,.69],[.74,.64],[.82,.69],[.87,.76],[.80,.81],[.72,.79]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]}
    ],
    contact:[
      {name:"PEGASUS",c:"ice",p:[[.12,.19],[.21,.14],[.30,.20],[.25,.31],[.15,.29],[.37,.25]],l:[[0,1],[1,2],[2,3],[3,4],[4,0],[2,5]]},
      {name:"DELPHINUS",c:"aqua",p:[[.70,.18],[.75,.15],[.79,.20],[.75,.25],[.70,.18],[.82,.29]],l:[[0,1],[1,2],[2,3],[3,4],[2,5]]},
      {name:"PHOENIX",c:"gold",p:[[.76,.63],[.82,.57],[.88,.63],[.85,.72],[.78,.75],[.72,.70]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4]]},
      {name:"PISCES AUSTRINUS",c:"violet",p:[[.11,.68],[.18,.63],[.25,.68],[.31,.75],[.23,.80],[.15,.77]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]}
    ],
    ecosystem:[
      {name:"PERSEUS",c:"violet",p:[[.10,.16],[.16,.20],[.22,.27],[.28,.24],[.32,.32],[.26,.41],[.19,.48]],l:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6]]},
      {name:"GEMINI",c:"ice",p:[[.42,.17],[.50,.18],[.44,.29],[.52,.31],[.43,.43],[.53,.44],[.40,.58],[.55,.60]],l:[[0,2],[2,4],[4,6],[1,3],[3,5],[5,7],[2,3]]},
      {name:"AURIGA",c:"gold",p:[[.72,.16],[.78,.22],[.80,.33],[.74,.40],[.68,.32],[.67,.22]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
      {name:"LYNX",c:"mint",p:[[.84,.48],[.88,.55],[.91,.64],[.94,.73]],l:[[0,1],[1,2],[2,3]]},
      {name:"CANIS MINOR",c:"aqua",p:[[.56,.72],[.64,.70],[.71,.76]],l:[[0,1],[1,2]]}
    ]
  };

  const constellations=ATLAS[page];
  if(!constellations) return;

  // Remove v25 page layer if it exists from previous build.
  const old=document.getElementById("pageConstellations");
  if(old) old.remove();

  const canvas=document.createElement("canvas");
  canvas.id="pageConstellationsV26";
  canvas.setAttribute("aria-hidden","true");
  Object.assign(canvas.style,{
    position:"fixed", inset:"0", width:"100%", height:"100%",
    zIndex:"2", pointerEvents:"none", opacity:".88"
  });
  document.body.prepend(canvas);

  const ctx=canvas.getContext("2d");
  let w=0,h=0,dpr=1,mouse={x:-9999,y:-9999},meteors=[],nextMeteor=0;

  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    w=innerWidth; h=innerHeight;
    canvas.width=w*dpr; canvas.height=h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  addEventListener("resize",resize,{passive:true});
  addEventListener("pointermove",e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});
  addEventListener("pointerleave",()=>{mouse.x=-9999;mouse.y=-9999},{passive:true});

  function distToSegment(px,py,x1,y1,x2,y2){
    const A=px-x1,B=py-y1,C=x2-x1,D=y2-y1;
    const dot=A*C+B*D, len=C*C+D*D;
    let t=len?dot/len:-1;
    t=Math.max(0,Math.min(1,t));
    const x=x1+t*C,y=y1+t*D;
    return Math.hypot(px-x,py-y);
  }

  function drawConstellation(c,now,idx){
    const col=COLORS[c.c];
    const pts=c.p.map(p=>[p[0]*w,p[1]*h]);
    let nearest=9999;
    pts.forEach(p=>nearest=Math.min(nearest,Math.hypot(mouse.x-p[0],mouse.y-p[1])));
    c.l.forEach(([a,b])=>{
      const A=pts[a],B=pts[b];
      nearest=Math.min(nearest,distToSegment(mouse.x,mouse.y,A[0],A[1],B[0],B[1]));
    });
    const reveal=Math.max(0,1-nearest/210);
    const lineAlpha=.035+reveal*.56;
    const starAlpha=.38+reveal*.46;

    // lines
    c.l.forEach(([a,b],li)=>{
      const A=pts[a],B=pts[b];
      const g=ctx.createLinearGradient(A[0],A[1],B[0],B[1]);
      g.addColorStop(0,`rgba(${col[0]},${lineAlpha*.65})`);
      g.addColorStop(.5,`rgba(${col[1]},${lineAlpha})`);
      g.addColorStop(1,`rgba(${col[0]},${lineAlpha*.65})`);
      ctx.strokeStyle=g;
      ctx.lineWidth=.55+reveal*1.25;
      ctx.shadowBlur=reveal*12;
      ctx.shadowColor=`rgba(${col[1]},.7)`;
      ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();
      ctx.shadowBlur=0;
    });

    // stars
    pts.forEach((p,i)=>{
      const tw=.78+.22*Math.sin(now/900+i*1.91+idx);
      const hot=Math.max(0,1-Math.hypot(mouse.x-p[0],mouse.y-p[1])/135);
      const r=1.15+(i%3)*.28+hot*1.15;
      ctx.fillStyle=`rgba(${i%4===0?col[1]:col[0]},${Math.min(1,starAlpha*tw+hot*.22)})`;
      ctx.shadowBlur=5+hot*14;
      ctx.shadowColor=`rgba(${col[1]},.8)`;
      ctx.beginPath();ctx.arc(p[0],p[1],r,0,Math.PI*2);ctx.fill();
      ctx.shadowBlur=0;
    });

    // reveal name only when pointer is near enough
    if(reveal>.18){
      const anchor=pts[Math.floor(pts.length/2)];
      ctx.font="500 9px Arial, sans-serif";
      ctx.letterSpacing="0.15em";
      ctx.fillStyle=`rgba(${col[0]},${Math.min(.72,reveal*.78)})`;
      ctx.fillText(c.name,anchor[0]+14,anchor[1]-14);
    }
  }

  function spawnMeteor(now){
    if(page!=="ecosystem")return;
    if(!nextMeteor) nextMeteor=now+6500+Math.random()*6500;
    if(now<nextMeteor)return;
    const palette=[COLORS.ice,COLORS.gold,COLORS.aqua,COLORS.violet];
    const col=palette[Math.floor(Math.random()*palette.length)];
    meteors.push({
      x:w*(.58+Math.random()*.38), y:-40,
      vx:-(7.5+Math.random()*3.5), vy:4.2+Math.random()*2.2,
      len:100+Math.random()*100, life:0, col
    });
    nextMeteor=now+9000+Math.random()*9000;
  }

  function drawMeteors(now){
    spawnMeteor(now);
    meteors.forEach(m=>{
      m.x+=m.vx;m.y+=m.vy;m.life++;
      const alpha=Math.max(0,1-m.life/110);
      const mag=Math.hypot(m.vx,m.vy)||1;
      const ux=-m.vx/mag,uy=-m.vy/mag;
      const ex=m.x+ux*m.len,ey=m.y+uy*m.len;
      const g=ctx.createLinearGradient(m.x,m.y,ex,ey);
      g.addColorStop(0,`rgba(${m.col[0]},${alpha*.95})`);
      g.addColorStop(.25,`rgba(${m.col[1]},${alpha*.55})`);
      g.addColorStop(1,`rgba(${m.col[1]},0)`);
      ctx.strokeStyle=g;ctx.lineWidth=1.3;
      ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.fillStyle=`rgba(${m.col[0]},${alpha})`;
      ctx.shadowBlur=12;ctx.shadowColor=`rgba(${m.col[1]},.8)`;
      ctx.beginPath();ctx.arc(m.x,m.y,1.8,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    });
    meteors=meteors.filter(m=>m.life<110 && m.x>-250 && m.y<h+150);
  }

  function frame(now){
    ctx.clearRect(0,0,w,h);
    constellations.forEach((c,i)=>drawConstellation(c,now,i));
    drawMeteors(now);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
