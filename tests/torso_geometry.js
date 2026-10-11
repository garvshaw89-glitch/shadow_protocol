const step=n=>{for(let i=0;i<n;i++)loop()};const out=(...a)=>console.log(...a);
menu();step(10);PH.g.updateMatrixWorld(true);
const loc=n=>{const v=new THREE.Vector3();PH.nodes[n].getWorldPosition(v);return PH.tor.worldToLocal(v)};
const RM=loc('RightShoulderMount'),LM=loc('LeftShoulderMount'),CR=loc('CentralReactor'),WM=loc('WaistMount');
out('R mount (torso-local)',[RM.x,RM.y,RM.z].map(x=>x.toFixed(3)).join(','),'| L mount',[LM.x,LM.y,LM.z].map(x=>x.toFixed(3)).join(','));
out('mounts mirror-symmetric:',Math.abs(RM.z+LM.z)<1e-6&&Math.abs(RM.y-LM.y)<1e-6&&Math.abs(RM.x-LM.x)<1e-6,'| pivot axis',PH.nodes.RightShoulderMount.userData.axis,PH.nodes.LeftShoulderMount.userData.axis);
out('reactor local x/y/z',[CR.x,CR.y,CR.z].map(x=>x.toFixed(3)).join(','),'-> centered on centerline:',Math.abs(CR.z)<1e-6);
out('waist mount local',[WM.x,WM.y,WM.z].map(x=>x.toFixed(3)).join(','),'(origin of TorsoRoot = waist interface)');
// bounding symmetry of the torso body about the centerline (excluding the intentionally asymmetric Part-2 shoulder armor and weapon)
const bxx=new THREE.Box3();['InternalChassis','ChestArmor','CentralReactor','LeftSideArmor','RightSideArmor','AbdominalAssembly','RearArmor','CoolingSystem'].forEach(n=>bxx.expandByObject(PH.nodes[n]));
const mn=PH.tor.worldToLocal(bxx.min.clone()),mx=PH.tor.worldToLocal(bxx.max.clone());out('torso body AABB (world->local corners, approx) y range',Math.min(mn.y,mx.y).toFixed(2),Math.max(mn.y,mx.y).toFixed(2));
const sz=new THREE.Box3().setFromObject(PH.g).getSize(new THREE.Vector3());out('full mech size (m)',sz.x.toFixed(2),sz.y.toFixed(2),sz.z.toFixed(2));
