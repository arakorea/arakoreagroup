
(() => {
  const canvas=document.createElement("canvas");
  canvas.id="interactiveStarMesh";
  canvas.setAttribute("aria-hidden","true");
  Object.assign(canvas.style,{
    position:"fixed",inset:"0",width:"100%",height:"100%",
    zIndex:"1",pointerEvents:"none",opacity:".92"
  });
  document.body.prepend(canvas);

  const ctx=canvas.getContext("2d");
  const palette=[
    [222,240,255],[141,202,255],[255,221,174],
    [205,188,255],[172,246,218],[255,195,220]
  ];

  let W=0,H=0,DPR=1;
  let mx=.5,my=.5,tx=.5,ty=.5;
  let field=[];

  function resize(){
    DPR=Math.min(devicePixelRatio||1,2);
    W=innerWidth; H=innerHeight;
    canvas.width=W*DPR;canvas.height=H*DPR;
    canvas.style.width=W+"px";canvas.style.height=H+"px";
    ctx.setTransform(DPR,0,0,DPR,0,0);

    // Enough points to feel rich, but not visually noisy.
    const n=Math.min(470,Math.max(180,Math.floor(W*H/3200)));
    field=Array.from({length:n},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      z:.18+Math.random()*.82,
      r:.30+Math.random()*1.35,
      a:.10+Math.random()*.58,
      phase:Math.random()*Math.PI*2,
      c:palette[(Math.random()*palette.length)|0],
      vx:(Math.random()-.5)*.022,
      vy:(Math.random()-.5)*.016
    }));
  }
  resize();

  addEventListener("resize",resize,{passive:true});
  addEventListener("pointermove",e=>{
    tx=e.clientX/W;ty=e.clientY/H;
  },{passive:true});
  addEventListener("pointerleave",()=>{
    tx=.5;ty=.5;
  },{passive:true});

  function frame(t){
    mx+=(tx-mx)*.045;
    my+=(ty-my)*.045;

    ctx.clearRect(0,0,W,H);

    const qx=mx*W,qy=my*H;
    const parx=(mx-.5)*25;
    const pary=(my-.5)*18;
    const near=[];

    for(const s of field){
      s.x+=s.vx*(.4+s.z);
      s.y+=s.vy*(.4+s.z);
      if(s.x<0)s.x=W;if(s.x>W)s.x=0;
      if(s.y<0)s.y=H;if(s.y>H)s.y=0;

      let x=s.x+parx*s.z;
      let y=s.y+pary*s.z;
      let dx=x-qx,dy=y-qy;
      let d=Math.hypot(dx,dy)||1;

      // Gentle orbital/gathering motion around cursor.
      if(d<235){
        const strength=(1-d/235)*15*s.z;
        const ang=Math.atan2(dy,dx)+1.08;
        x+=Math.cos(ang)*strength;
        y+=Math.sin(ang)*strength;
      }

      const tw=.72+.28*Math.sin(t*.00125+s.phase);
      ctx.beginPath();
      ctx.fillStyle=`rgba(${s.c[0]},${s.c[1]},${s.c[2]},${s.a*tw})`;
      ctx.shadowBlur=s.z>.72?3:0;
      ctx.shadowColor=`rgba(${s.c[0]},${s.c[1]},${s.c[2]},.35)`;
      ctx.arc(x,y,s.r*s.z,0,Math.PI*2);
      ctx.fill();
      ctx.shadowBlur=0;

      if(d<175 && s.z>.40){
        near.push({x,y,d,z:s.z,c:s.c});
      }
    }

    near.sort((a,b)=>a.d-b.d);
    near.length=Math.min(near.length,13);

    // Cursor-to-star filaments.
    for(let i=0;i<near.length;i++){
      const a=near[i];
      const alpha=Math.max(.06,.48-a.d/480);
      const grad=ctx.createLinearGradient(qx,qy,a.x,a.y);
      grad.addColorStop(0,`rgba(176,220,255,${alpha*.52})`);
      grad.addColorStop(1,`rgba(${a.c[0]},${a.c[1]},${a.c[2]},${alpha})`);
      ctx.strokeStyle=grad;
      ctx.lineWidth=1.0;
      ctx.shadowBlur=4;
      ctx.shadowColor="rgba(112,190,255,.25)";
      ctx.beginPath();ctx.moveTo(qx,qy);ctx.lineTo(a.x,a.y);ctx.stroke();
      ctx.shadowBlur=0;

      // Star-to-star web.
      for(let j=i+1;j<near.length;j++){
        const b=near[j];
        const dd=Math.hypot(a.x-b.x,a.y-b.y);
        if(dd<125){
          const aa=.34*(1-dd/125);
          ctx.strokeStyle=`rgba(187,220,255,${aa})`;
          ctx.lineWidth=.85;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    }

    // Very subtle cursor halo.
    const halo=ctx.createRadialGradient(qx,qy,0,qx,qy,165);
    halo.addColorStop(0,"rgba(123,183,255,.075)");
    halo.addColorStop(.52,"rgba(101,151,255,.028)");
    halo.addColorStop(1,"rgba(101,151,255,0)");
    ctx.fillStyle=halo;
    ctx.beginPath();ctx.arc(qx,qy,165,0,Math.PI*2);ctx.fill();

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
