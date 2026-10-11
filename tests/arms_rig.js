const step=n=>{for(let i=0;i<n;i++)loop()};const out=(...a)=>console.log(...a);
menu();step(10);PH.pw=PH.pwv=1;
const names=['ShoulderJoint','ShoulderArmor','UpperArm','ElbowJoint','Forearm','WristJoint','Hand'];
for(const sd of ['Left','Right']){out(sd,'nodes',names.map(n=>!!PH.g.getObjectByName(sd+n)).every(Boolean),'| digits',['Thumb','Index','Middle','Ring','Little'].map(f=>!!PH.g.getObjectByName(f+'FingerSegments')).every(Boolean))}
const cnt=(o)=>{let n=0;o.traverse(()=>n++);return n};
out('hierarchy: UpperArm under ShoulderMount',PH.g.getObjectByName('RightUpperArm').parent.name,PH.g.getObjectByName('LeftUpperArm').parent.name,'| Forearm under UpperArm',PH.g.getObjectByName('RightForearm').parent.name,'| Hand under Forearm',PH.g.getObjectByName('LeftHand').parent.name,'| Wrist under Forearm',PH.g.getObjectByName('RightWristJoint').parent.name);
out('finger segments per hand',[0,1].map(i=>Object.values(PH.fingers[i]).reduce((a,b)=>a+b.length,0)),'| digits',Object.keys(PH.fingers[0]).join(','));
let meshes=0;PH.g.traverse(o=>{if(o.isMesh)meshes++});out('total meshes',meshes);
const V=THREE.Vector3,pa=new V(),pb=new V();
const tipDist=(i,gw)=>{let best=9;const F=PH.fingers[i];for(const k in F){const g3=F[k][2];g3.localToWorld(pa.set(0,-.04,0));best=Math.min(best,pa.distanceTo(gw))}return best};
for(const k of ['AR','EN','SG','PS','RF']){setHeld(PH,k);for(let i=0;i<40;i++)animH(PH,.033,0,1,.15,false,false,0);PH.g.updateMatrixWorld(true);const U=PH.wm.userData;
 const gR=PH.wm.localToWorld(new V(...U.gr)),gL=PH.wm.localToWorld(new V(...U.fg));PH.nodes.WeaponSocket.getWorldPosition(pa);const dR=pa.distanceTo(gR);PH.nodes.SupportGripTarget.getWorldPosition(pb);const dL=pb.distanceTo(gL);
 out(k,'socket->grip R',dR.toFixed(3),'L',dL.toFixed(3),'| nearest fingertip to grip R',tipDist(0,gR).toFixed(3),'L',tipDist(1,gL).toFixed(3),'| curl R middle',PH.fingers[0].middle.map(g=>g.rotation.z.toFixed(2)).join('/'),'index',PH.fingers[0].index.map(g=>g.rotation.z.toFixed(2)).join('/'))}
// states: recoil, reload hand transition, switch, relaxed (no power), joints independent
setHeld(PH,'AR');PH.rec=0;PH.rlp=0;PH.sw=0;for(let i=0;i<30;i++)animH(PH,.033,0,0,.1,false,false,0);
const e0=PH.fa[0].quaternion.clone(),s0=PH.ua[0].quaternion.clone(),w0=PH.hn[0].quaternion.clone(),r0=PH.act[0].rod.scale.y;
PH.rec=1;animH(PH,.033,0,1,.15,false,false,0);out('recoil: upper/forearm/wrist/actuator all respond',!PH.ua[0].quaternion.equals(s0),!PH.fa[0].quaternion.equals(e0),!PH.hn[0].quaternion.equals(w0),PH.act[0].rod.scale.y.toFixed(3),'vs',r0.toFixed(3));PH.rec=0;
const lg0=new V();PH.hn[1].getWorldPosition(lg0);PH.rlp=.5;for(let i=0;i<8;i++)animH(PH,.033,0,1,.15,false,true,0);const lg1=new V();PH.g.updateMatrixWorld(true);PH.hn[1].getWorldPosition(lg1);out('reload: left hand travels (m)',lg0.distanceTo(lg1).toFixed(3),'| left grip openness',PH.fingers[1].middle.map(g=>g.rotation.z.toFixed(2)).join('/'));PH.rlp=0;for(let i=0;i<30;i++)animH(PH,.033,0,1,.15,false,false,0);out('after reload left grip',PH.fingers[1].middle.map(g=>g.rotation.z.toFixed(2)).join('/'));
PH.pw=PH.pwv=0;PH.pw=0;for(let i=0;i<60;i++)animH(PH,.033,0,0,.1,false,false,0);out('powered-down: right hand curl relaxes',PH.fingers[0].middle.map(g=>g.rotation.z.toFixed(2)).join('/'));PH.pw=PH.pwv=1;
// actuator length follows the elbow
const lens=[];for(const k of ['AR','PS','RF']){setHeld(PH,k);for(let i=0;i<30;i++)animH(PH,.033,0,k==='PS'?0:1,.2,false,false,0);lens.push(PH.act[0].rod.scale.y.toFixed(2))}out('actuator rod scale across weapons/poses',lens.join(' '));
