import './style.css'

import * as THREE from 'three'
import { PointLight, PointLightHelper, SpotLight, SpotLightHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



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

camera.position.setZ(300);
camera.position.setY(180);
camera.rotation.set(-0.5,0,0)


// Plane
const loadr = new THREE.TextureLoader()
const map = loadr.load("nrm.png")

const groundgeo = new THREE.BoxGeometry(50000,1,50000) 
const groundmat = new THREE.MeshStandardMaterial({color:0x0e134a})

const ground = new THREE.Mesh(groundgeo,groundmat)
ground.position.y = -100

scene.add(ground)


// Lighting

const l1 = new PointLight(0xffffff,2)

l1.position.set(0,180,300) 
l1.target = ground

const l1help = new PointLightHelper(l1) 

scene.add(l1)
// UFO
var ufo
const loader = new GLTFLoader()
loader.load('/ufo/untitled.gltf',(gltf)=>{
  ufo = gltf
  ufo.scene.position.y += 100
  ufo.scene.scale.set(20,20,20)
  scene.add(ufo.scene)
})


//Controlls

document.onkeydown = function(e){
  const speed = 20
  console.log(e.keyCode);
  if(e.keyCode === 39){
    ufo.scene.position.x += speed;
    camera.position.x += speed;
    l1.position.x += speed;
  }
  if(e.keyCode === 37){
    ufo.scene.position.x -= speed;
    camera.position.x-= speed;
    l1.position.x-= speed;
  }
  if(e.keyCode === 40){
    ufo.scene.position.z += speed;
    camera.position.z += speed;
    l1.position.z += speed;
  }
  if(e.keyCode === 38){
    ufo.scene.position.z -= speed;
    camera.position.z -= speed;
    l1.position.z -= speed;
  }


 
}




// Elements -----------------


// Main name
var name
const nameloader = new GLTFLoader()
nameloader.load('/name/name.gltf',(gltf)=>{
  name = gltf
  name.scene.scale.set(80,80,80)
  name.scene.position.set(-40,-73,-100)
  name.scene.rotation.set(0,0.2,0)
  scene.add(name.scene)
})

// Main image
var image
const imageloader = new GLTFLoader()
imageloader.load('/image/image.gltf',(gltf)=>{
  image = gltf
  image.scene.scale.set(100,100,100)
  image.scene.position.set(0,-100,-600)
  image.scene.rotation.set(0,-0.2,0)
  scene.add(image.scene)
})



// -------------------------




function animate(){
  window.requestAnimationFrame(animate)

  //controls.update()

  renderer.render(scene,camera)
}
animate()

const music = document.getElementById("#music")
music.play()

