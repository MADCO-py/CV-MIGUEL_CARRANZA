import { useMemo } from 'react';

/** An original SVG wire globe: native vectors, no downloaded imagery or GPU dependency. */
export function PixelGlobe() {
  const pixels = useMemo(() => {
    const points = [];
    for (let y = -10; y <= 10; y++) {
      for (let x = -10; x <= 10; x++) {
        const r = x*x + y*y;
        if (r > 95 || r < 5) continue;
        const z = Math.sqrt(100-r);
        if ((Math.sin(x*.7+y*.5) + Math.cos(y*.8-x*.3)) > .25) {
          points.push({x:60+x*4.5,y:60+y*4.5,opacity:.3+z/15});
        }
      }
    }
    return points;
  }, []);
  return <svg className="pixel-globe" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="49" />
    <ellipse cx="60" cy="60" rx="24" ry="49" />
    <ellipse cx="60" cy="60" rx="42" ry="49" />
    <ellipse cx="60" cy="60" rx="49" ry="19" />
    <ellipse cx="60" cy="60" rx="45" ry="36" />
    <path d="M11 60h98M60 11v98" />
    <g className="globe-pixels">{pixels.map((p,i)=><rect key={i} x={p.x} y={p.y} width="3" height="3" opacity={p.opacity}/>)}</g>
    <path className="globe-crosshair" d="M0 60h7m106 0h7M60 0v7m0 106v7"/>
  </svg>;
}
