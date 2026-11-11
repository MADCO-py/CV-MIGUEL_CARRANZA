import { useMemo } from 'react';

// An original projected surface: lightweight SVG, no stock image or WebGL runtime.
export function SignatureScene() {
  const rings = useMemo(() => {
    const project = (x,y,z) => {
      const a=-.48,b=.86;
      const y1=y*Math.cos(a)-z*Math.sin(a), z1=y*Math.sin(a)+z*Math.cos(a);
      const x1=x*Math.cos(b)+z1*Math.sin(b), z2=-x*Math.sin(b)+z1*Math.cos(b);
      const perspective=950/(950-z2);
      return [560+x1*perspective,335+y1*perspective,z2];
    };
    return Array.from({length:106},(_,i)=>{
      const u=i/106*Math.PI*2;
      const radius=195+30*Math.sin(3*u);
      const pts=Array.from({length:65},(_,j)=>{
        const v=j/64*Math.PI*2;
        const tube=64+18*Math.sin(u);
        return project((radius+tube*Math.cos(v))*Math.cos(u), (radius+tube*Math.cos(v))*Math.sin(u)*.77, tube*Math.sin(v)+65*Math.sin(2*u));
      });
      return { d:pts.map(([x,y],j)=>`${j?'L':'M'}${x.toFixed(2)},${y.toFixed(2)}`).join('')+'Z', depth:pts.reduce((a,p)=>a+p[2],0)/pts.length };
    }).sort((a,b)=>a.depth-b.depth);
  },[]);
  return <svg className="signature-scene" viewBox="0 0 1000 720" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="signature-metal" x1="240" y1="60" x2="780" y2="610" gradientUnits="userSpaceOnUse"><stop stopColor="#f1f4f7"/><stop offset=".32" stopColor="#7c8b9e"/><stop offset=".55" stopColor="#c4d0dd"/><stop offset=".79" stopColor="#394555"/><stop offset="1" stopColor="#8193ac"/></linearGradient>
      <radialGradient id="signature-floor"><stop stopColor="#7f9cc6" stopOpacity=".2"/><stop offset="1" stopColor="#7f9cc6" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="555" cy="626" rx="330" ry="70" fill="url(#signature-floor)"/>
    <g className="signature-surface">{rings.map((p,i)=><path key={i} d={p.d} fill="#10151b" fillOpacity=".045" stroke="url(#signature-metal)" strokeWidth={p.depth>0?1.05:.65} opacity={.32+(p.depth+250)/750}/>)}</g>
  </svg>;
}
