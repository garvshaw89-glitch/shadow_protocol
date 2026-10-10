const {JSDOM}=require('jsdom'),fs=require('fs');
const html=fs.readFileSync('../index.html','utf8');
const game=html.match(/<script>([\s\S]*?)<\/script>/g).pop().replace(/^<script>|<\/script>$/g,'');
const body=html.replace(/<script[\s\S]*?<\/script>/g,'');
const dom=new JSDOM(body,{runScripts:'outside-only',url:'https://x.test/',pretendToBeVisual:true});
const w=dom.window;
const ctx=new Proxy({},{get:(t,k)=>k==='createRadialGradient'||k==='createLinearGradient'?()=>({addColorStop(){}}):()=>{}, set:()=>true});
w.HTMLCanvasElement.prototype.getContext=function(){return ctx};
w.matchMedia=()=>({matches:false});
w.eval(fs.readFileSync('node_modules/three/build/three.min.js','utf8'));
w.THREE.WebGLRenderer=class{constructor(){this.shadowMap={};this.domElement=w.document.createElement('canvas')}setPixelRatio(){}setSize(){}render(){}};
w.THREE.Clock.prototype.getDelta=()=>0.033;
let raf=null;w.requestAnimationFrame=f=>{raf=f;return 1};
w.document.exitPointerLock=()=>{};
w.HTMLCanvasElement.prototype.requestPointerLock=()=>{};
const errs=[];w.addEventListener('error',e=>errs.push(e.message));
const test=fs.readFileSync('test.js','utf8');
try{w.eval(game+'\n'+test.replace('__STEP__','(n=>{for(let i=0;i<n;i++){raf&&raf()}})'))}catch(e){console.log('EXC',e.stack.split('\n').slice(0,6).join('\n'))}
console.log('errors',errs);
