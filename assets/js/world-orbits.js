
document.addEventListener("DOMContentLoaded",()=>{
  const configs={
    ara:{speed:.00019,phase:.25,tilt:-.12},
    akenm:{speed:.00015,phase:1.1,tilt:.10},
    tikoonz:{speed:.000125,phase:2.0,tilt:-.08},
    ourbang:{speed:.000105,phase:2.8,tilt:.06}
  };

  document.querySelectorAll(".orbit3d").forEach(orbit=>{
    const key=orbit.dataset.orbit;
    const cfg=configs[key]||{speed:.00012,phase:0,tilt:0};
    const moons=[...orbit.querySelectorAll(".moon")];
    const planet=orbit.parentElement.querySelector(".world-orb");

    function frame(t){
      const r=orbit.getBoundingClientRect();
      const rx=r.width*.42;
      const ry=r.height*.38;   // intentionally tall
      const zAmp=260;

      moons.forEach((m,i)=>{
        const a=t*cfg.speed+cfg.phase+(Math.PI*2*i/moons.length);

        // projected 3D orbit
        let x=Math.cos(a)*rx;
        let y=Math.sin(a)*ry;

        // slight axis tilt without flattening the ellipse
        const tx=x*Math.cos(cfg.tilt)-y*Math.sin(cfg.tilt);
        const ty=x*Math.sin(cfg.tilt)+y*Math.cos(cfg.tilt);
        x=tx; y=ty;

        const z=Math.sin(a)*zAmp;
        const depth=(z+zAmp)/(2*zAmp); // 0 rear, 1 front

        // front is much larger/brighter, rear much smaller/darker
        const scale=.48+depth*.88;
        const opacity=.18+depth*.82;
        const blur=(1-depth)*1.05;
        const bright=.55+depth*.65;

        m.style.transform =
          `translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translateZ(${z.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        m.style.opacity=opacity.toFixed(2);
        m.style.filter=`blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(2)})`;

        // True front/back layering relative to the main planet.
        // Rear satellites go behind the planet; front satellites come above it.
        m.style.zIndex = depth < .48 ? "8" : "45";
      });

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
});
