import './style.css'

import * as THREE from 'three'
import { PointLight, PointLightHelper, SpotLight, SpotLightHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



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
camera.position.setY(80);
camera.rotation.set(-0.5,0,0)


// Plane
const loadr = new THREE.TextureLoader()
const map = loadr.load("nrm.png")

const groundgeo = new THREE.BoxGeometry(50000,1,50000) 
const groundmat = new THREE.MeshStandardMaterial({color:0x0e134a,normalMap:map})

const ground = new THREE.Mesh(groundgeo,groundmat)
ground.position.y = -100

scene.add(ground)


// Lighting

const l1 = new PointLight(0xffffff,1)

l1.position.set(0,80,300) 
l1.target = ground

const l1help = new PointLightHelper(l1) 

scene.add(l1)
// UFO
var ufo
const loader = new GLTFLoader()
loader.load('/ufo/untitled.gltf',(gltf)=>{
  ufo = gltf
  ufo.scene.scale.set(20,20,20)
  scene.add(ufo.scene)
})


//Controlls

document.onkeydown = function(e){
  const speed = 70
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


  if(e.keyCode === 65 && ufo.scene.position.y < 1000){
    ufo.scene.position.y += speed / 2;
    camera.position.y += speed / 2;
    l1.position.y += speed / 2;
  }
  if(e.keyCode === 90 && ufo.scene.position.y > 0){
    ufo.scene.position.y -= speed / 2;
    camera.position.y -= speed / 2;
    l1.position.y -= speed / 2;
  }
}

const controls = new OrbitControls(camera, renderer.domElement)


function animate(){
  window.requestAnimationFrame(animate)

  //controls.update()

  renderer.render(scene,camera)
}
animate()

