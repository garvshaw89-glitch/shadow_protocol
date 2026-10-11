const step=n=>{for(let i=0;i<n;i++)loop()};const out=(...a)=>console.log(...a);
const hitsT=t=>{cam.getWorldDirection(v2);rc.set(cam.position,v2);rc.far=100;const h=rc.intersectObjects(wm.concat([t.m]),false);return h.length&&h[0].object===t.m};
const aimAt=t=>{const x=t.g.position.x,z=t.g.position.z,base=Math.atan2(z-P.z,x-P.x);for(let dp=-.12;dp<=.12;dp+=.02)for(let dy=-.1;dy<=.1;dy+=.02){P.yaw=base+dy;P.pitch=.1+dp;step(1);if(hitsT(t))return true}return false};
const fireAt=t=>{rmb=true;step(25);if(!aimAt(t)){rmb=false;return false}md=true;step(12);md=false;rmb=false;step(5);return true};
BRIEF=1;startLevel(0);step(10);PH.pw=PH.pwv=1;P.hp=P.hpm=1e6;P.inv[1]={k:'AR',r:0,mag:30};P.cur=1;setHeld(PH,'AR');P.sw=0;P.am.light=300;
trNext(4,'test');step(30);const ac=TGT.filter(q=>q.tag==='acc');let aimed=0;
for(const t of ac){P.x=18;P.z=t.g.position.z*.3;P.vx=P.vz=0;cw().mag=30;step(2);if(fireAt(t))aimed++;if(TR.s>4)break}
out('acc aimed',aimed,'down',ac.map(t=>t.down),'stage',TR.s,'hits/shots',ST.hits,ST.shots,'enemies spawned',TR.pr.length);
step(5);const d0=ST.dmg;P.x=30;P.z=0;step(300);out('damage from practice drones in 10s',Math.round(ST.dmg-d0),'drone states',TR.pr.map(e=>e.st));
// kill drones with real shots where aimable, remainder via damage
let real=0;for(const e of TR.pr){if(e.dead)continue;P.x=e.x-12;P.z=e.z;P.vx=P.vz=0;cw().mag=30;step(2);const x=e.x,z=e.z,base=Math.atan2(z-P.z,x-P.x);let ok=false;for(let dp=-.15;dp<=.15&&!ok;dp+=.03)for(let dy=-.1;dy<=.1&&!ok;dy+=.02){P.yaw=base+dy;P.pitch=dp;step(1);cam.getWorldDirection(v2);rc.set(cam.position,v2);rc.far=100;const h=rc.intersectObjects(EN.filter(q=>!q.dead).map(q=>q.bd),false);if(h.length&&h[0].object.userData.e===e)ok=true}
 if(ok){md=true;step(40);md=false;if(e.dead)real++}}
out('drones killed by real shots',real);TR.pr.forEach(e=>{if(!e.dead)dmgE(e,9999)});step(10);
out('state',state,'results',document.getElementById('op').textContent.replace(/\s+/g,' ').slice(0,200));
