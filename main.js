import './style.css'

import * as THREE from 'three'
import { PointLight, PointLightHelper, SpotLight, SpotLightHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';



const scene = new THREE.Scene();

const viewSize = 900

const aspectRatio = window.innerWidth/window.innerHeight

 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight , 0.1 , 1000000);
//const camera = new THREE.OrthographicCamera(-aspectRatio*viewSize / 2,aspectRatio*viewSize / 2,viewSize/2, -viewSize/2 ,-1000 , 1000000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha:true
});

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(170);
camera.position.setY(180);
camera.rotation.set(-0.5,0,0)

const composer = new EffectComposer( renderer );



// Plane
var world
const worldloader = new GLTFLoader()
worldloader.load('/world/world.gltf',(gltf)=>{
  world = gltf
  world.scene.position.y += 100
  world.scene.scale.set(80,80,80)
  scene.add(world.scene)
})


// Lighting

const l1 = new PointLight(0xffffff,1)

l1.position.set(0,180,1000) 
l1.target = world

const l3 = new PointLight(0xffffff,1.1)

l3.position.set(0,400,0) 
l3.target = world

const l2 = new PointLight(0xffffff,1.1)

l2.position.set(0,2800000,3000000) 
l2.target = world


scene.add(l1,l2,l3)


// UFO
var ufo
const loader = new GLTFLoader()
loader.load('/ufo/untitled.gltf',(gltf)=>{
  ufo = gltf
  ufo.scene.position.y += 160
  ufo.scene.position.z += 0
  ufo.scene.scale.set(10,10,10)
  scene.add(ufo.scene)
})


//Controlls

document.onkeydown = function(e){
  const speed = 10
  console.log(e.keyCode);
  if(e.keyCode === 39){
    ufo.scene.velocity.x += speed;
    camera.velocity.x += speed;
    l1.velocity.x += speed;
  }
  if(e.keyCode === 37){
    ufo.scene.velocity.x -= speed;
    camera.velocity.x-= speed;
    l1.velocity.x-= speed;
  }
  if(e.keyCode === 40){
    ufo.scene.velocity.z += speed;
    camera.velocity.z += speed;
    l1.velocity.z += speed;
  }
  if(e.keyCode === 38){
    ufo.scene.velocity.z -= speed;
    camera.velocity.z -= speed;
    l1.velocity.z -= speed;
  }
  renderer.render(scene,camera)

 
}




// Elements -----------------





// -------------------------




function animate(){
  window.requestAnimationFrame(animate)

  //controls.update()

  renderer.render(scene,camera)
}
animate()

const music = document.getElementById("#music")
music.play()

