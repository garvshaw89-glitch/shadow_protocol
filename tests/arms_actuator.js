const step=n=>{for(let i=0;i<n;i++)loop()};const out=(...a)=>console.log(...a);
menu();step(5);PH.pw=PH.pwv=1;for(let i=0;i<30;i++)animH(PH,.033,0,1,.1,false,false,0);
out('thumb node name',PH.fingers[0].thumb[0].name,'| index',PH.fingers[0].index[0].name);
const base=PH.act[0].rod.scale.y,f=PH.fa[0],q0=f.quaternion.clone();
const res=[];for(const a of [0,.5,1.0,1.5,2.0]){f.quaternion.copy(q0).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),a));updateAct(PH,0);res.push([a,PH.act[0].rod.scale.y.toFixed(2)])}
out('elbow flex (rad) -> actuator rod scale (rod follows the joint):',res.map(r=>r.join('->')).join('  '));
// does the actuator axis keep pointing at the forearm lug?
f.quaternion.copy(q0).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),1.2));updateAct(PH,0);PH.g.updateMatrixWorld(true);
const a=PH.act[0],tip=new THREE.Vector3(0,-(a.Lb+a.Lr*a.rod.scale.y),0);a.g.localToWorld(tip);const lug=a.Bf.clone();f.localToWorld(lug);out('rod tip to forearm lug distance (m) at 1.2 rad flex:',tip.distanceTo(lug).toFixed(4));
