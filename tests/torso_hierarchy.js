const step=n=>{for(let i=0;i<n;i++)loop()};const out=(...a)=>console.log(...a);
menu();step(10);PH.g.updateMatrixWorld(true);
let meshes=0,inst=0,tris=0;PH.g.traverse(o=>{if(o.isMesh)meshes++;if(o.isInstancedMesh)inst+=o.count});
out('meshes',meshes,'instanced bolts',inst,'plates',PH.plates.length);
const want=['TorsoRoot','InternalChassis','ChestArmor','CentralReactor','LeftSideArmor','RightSideArmor','AbdominalAssembly','RearArmor','CoolingSystem','LeftShoulderMount','RightShoulderMount','WaistMount','HeadAssembly','WeaponMount'];
out('nodes present',want.every(n=>PH.nodes[n]),'missing',want.filter(n=>!PH.nodes[n]));
out('named in scene graph',want.map(n=>!!PH.g.getObjectByName(n==='HeadAssembly'?'HeadAssembly (Part 5)':n)).every(Boolean),'| root',PH.g.name);
const kids=PH.tor.children.map(c=>c.name||'(unnamed)').filter(n=>n!=='(unnamed)');out('TorsoRoot named children',kids.join(', '));
const P3=new THREE.Vector3(),L3=new THREE.Vector3();PH.nodes.RightShoulderMount.getWorldPosition(P3);PH.nodes.LeftShoulderMount.getWorldPosition(L3);
out('shoulder mounts world x/y/z R',P3.x.toFixed(3),P3.y.toFixed(3),P3.z.toFixed(3),'L',L3.x.toFixed(3),L3.y.toFixed(3),L3.z.toFixed(3),'| symmetric about z:',Math.abs(P3.z+L3.z)<1e-6&&Math.abs(P3.y-L3.y)<1e-6);
const R3=new THREE.Vector3();PH.nodes.CentralReactor.getWorldPosition(R3);const T3=new THREE.Vector3();PH.nodes.TorsoRoot.getWorldPosition(T3);out('reactor offset from torso centerline (z):',(R3.z-T3.z).toFixed(4));
const W3=new THREE.Vector3();PH.nodes.WaistMount.getWorldPosition(W3);const hp=PH.hips,H3=new THREE.Vector3();hp.getWorldPosition(H3);out('waist mount above hips origin (m):',(W3.y-H3.y).toFixed(3),'| waist z/x offset',(W3.x-H3.x).toFixed(4),(W3.z-H3.z).toFixed(4));
out('arm roots parented to mounts',PH.ua[0].parent===PH.nodes.RightShoulderMount&&PH.ua[1].parent===PH.nodes.LeftShoulderMount);
// IK still lands on grips with the new mounts
const pa=new THREE.Vector3();for(const k of ['AR','EN','SG','PS','RF']){setHeld(PH,k);for(let i=0;i<20;i++)animH(PH,.033,0,1,.15,false,false,0);PH.g.updateMatrixWorld(true);const U=PH.wm.userData;const g1=PH.wm.localToWorld(new THREE.Vector3(...U.gr));PH.hn[0].localToWorld(pa.set(0,-.06,0));const d0=pa.distanceTo(g1);const g2=PH.wm.localToWorld(new THREE.Vector3(...U.fg));PH.hn[1].localToWorld(pa.set(0,-.06,0));out('IK',k,'right hand->grip',d0.toFixed(3),'left hand->foregrip',pa.distanceTo(g2).toFixed(3))}
