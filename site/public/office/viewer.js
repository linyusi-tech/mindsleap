import * as THREE from 'three';
import {OrbitControls} from 'three/OrbitControls';
import {GLTFLoader} from 'three/GLTFLoader';
const host=document.querySelector('#viewport');
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#eeece7');
scene.add(new THREE.HemisphereLight(0xe8f1ff,0xb7a98c,2.1));
const light=new THREE.DirectionalLight(0xfff1db,3.2);light.position.set(7,30,15);light.castShadow=true;light.shadow.mapSize.set(2048,2048);light.shadow.camera.left=-28;light.shadow.camera.right=28;light.shadow.camera.top=28;light.shadow.camera.bottom=-28;light.shadow.camera.far=100;light.shadow.normalBias=.03;scene.add(light);light.target.position.set(12,0,-12);scene.add(light.target);
const fill=new THREE.DirectionalLight(0xe5f0ff,1.5);fill.position.set(30,12,-5);scene.add(fill);
const camera=new THREE.PerspectiveCamera(48,1,.03,400);camera.position.set(13,33,19);
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(12,0,-11);controls.enableDamping=true;controls.minDistance=.15;controls.maxDistance=220;controls.maxPolarAngle=Math.PI*.495;
let model,clay=false,ceiling=false;const originals=new Map();
const views=[
 ['00_BirdsEye','整体鸟瞰',[565,625,0]],
 ['01_Entrance_to_Logo','01 · 入口 → Logo 墙',[514,241,1.5]],
 ['02_Corridor_to_All','02 · 走廊 → 全场',[690,805,1.5]],
 ['03_Office_to_Green','03 · 办公区 → 绿植墙',[612,422,1.5]],
 ['04_Office_to_Training','04 · 办公区 → 培训区',[180,755,1.5]],
 ['05_Training_to_Office_Tea','05 · 培训区 → 办公 / 茶室',[869,835,1.5]],
 ['06_Plan_Top','俯视 · 核对平面',[561,620,0]]
];
function pos(p){return new THREE.Vector3((p[0]-89)/40,p[2]||0,(p[1]-1052)/40)}
function setRoof(show){ceiling=show;model?.traverse(o=>{if(o.name.startsWith('CEILING')||o.name.startsWith('Ceiling linear')||o.name.startsWith('Ceiling_linear'))o.visible=show});document.querySelector('#roof').classList.toggle('on',show)}
let currentView=0;
function setView(i){
 if(!model)return;currentView=i;
 const name=views[i][0];let cam;model.traverse(o=>{if(o.isCamera&&o.name.startsWith(name))cam=o});
 if(i===6){camera.position.set(11.8,35,-10.8);camera.up.set(0,0,-1);camera.fov=43;camera.lookAt(11.8,0,-10.8);controls.target.set(11.8,0,-10.8);setRoof(false)}
 else {camera.up.set(0,1,0);if(cam){cam.updateWorldMatrix(true,false);cam.getWorldPosition(camera.position);cam.getWorldQuaternion(camera.quaternion);camera.fov=cam.fov||48}else camera.position.set(13,33,19);controls.target.copy(pos(views[i][2]));setRoof(i!==0)}
 if(i===0){camera.position.sub(controls.target).multiplyScalar(Math.max(1,1.5/camera.aspect)).add(controls.target)}
 if(i===6){camera.position.y=35*Math.max(1,1.15/camera.aspect)}
 camera.updateProjectionMatrix();controls.update();document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',Number(b.dataset.view)===i));document.querySelector('#viewtitle').textContent=views[i][1];
}
window.setView=setView;
document.querySelector('#views').innerHTML=views.map((v,i)=>`<button data-view="${i}">${v[1]}</button>`).join('');
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(Number(b.dataset.view)));
document.querySelector('#roof').onclick=()=>setRoof(!ceiling);
document.querySelector('#clay').onclick=()=>{clay=!clay;model.traverse(o=>{if(!o.isMesh)return;if(clay){originals.set(o,o.material);o.material=new THREE.MeshStandardMaterial({color:o.name.toLowerCase().includes('glass')?0xb6d2dd:0xd9d9d1,roughness:.9,transparent:o.name.toLowerCase().includes('glass'),opacity:o.name.toLowerCase().includes('glass')?.15:1})}else{o.material.dispose();o.material=originals.get(o)}});if(!clay)originals.clear();document.querySelector('#clay').classList.toggle('on',clay)};
document.querySelector('#compare').onclick=()=>{document.body.classList.toggle('comparing');resize()};
document.querySelector('#shot').onclick=()=>{renderer.render(scene,camera);const a=document.createElement('a');a.download='MindsLeap-'+views[currentView][0]+'.png';a.href=renderer.domElement.toDataURL('image/png');a.click()};
document.querySelector('#download').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([window.MODEL_BYTES],{type:'model/gltf-binary'}));a.download='MindsLeap-office-v1.glb';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000)};
function resize(){renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();if(model&&(currentView===0||currentView===6))setView(currentView)};window.addEventListener('resize',resize);
const keys=new Set();window.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(e.target.tagName))return;keys.add(e.key.toLowerCase());if(['w','a','s','d','q','e'].includes(e.key.toLowerCase()))e.preventDefault()});window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>keys.clear());
const clock=new THREE.Clock();function frame(){requestAnimationFrame(frame);const dt=Math.min(clock.getDelta(),.08);if(keys.size){const f=new THREE.Vector3();camera.getWorldDirection(f);f.y=0;f.normalize();const r=f.clone().cross(new THREE.Vector3(0,1,0));const d=new THREE.Vector3();if(keys.has('w'))d.add(f);if(keys.has('s'))d.sub(f);if(keys.has('d'))d.add(r);if(keys.has('a'))d.sub(r);if(keys.has('e'))d.y++;if(keys.has('q'))d.y--;d.multiplyScalar(dt*2.5);camera.position.add(d);controls.target.add(d)}controls.update();renderer.render(scene,camera)}
try {
const response=await fetch('/office/MindsLeap-office-v1.glb?v=island-angle-2');
if(!response.ok)throw new Error('HTTP '+response.status);
window.MODEL_BYTES=new Uint8Array(await response.arrayBuffer());
new GLTFLoader().parse(window.MODEL_BYTES.buffer,'',g=>{
 model=g.scene;scene.add(model);model.traverse(o=>{if(o.isMesh){o.castShadow=!o.name.toLowerCase().includes('glass');o.receiveShadow=true;const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{if(m.name.toLowerCase().includes('glass')){m.transparent=true;m.opacity=.17;m.depthWrite=false}})}});
 window.officeModel=model;window.modelReady=true;document.querySelector('#loading').remove();setView(0);resize();frame();
 const names=[];model.traverse(o=>names.push(o.name));window.modelStats={objects:names.length,training:names.filter(n=>/^Training_B\d_R\d_C\d+$/.test(n)).length,officeChairs:names.filter(n=>/^Office_\d_Chair_\d$/.test(n)).length,columns:names.filter(n=>/^Structural_column_\d+$/.test(n)).length,cameras:[]};model.traverse(o=>{if(o.isCamera)window.modelStats.cameras.push(o.name)});
},err=>{document.querySelector('#loading').textContent='模型未载入：'+err;console.error(err)});

} catch(error) {document.querySelector('#loading').textContent='模型载入失败，请刷新重试。';console.error(error);}
