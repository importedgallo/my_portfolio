import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* Steps for this project
  1. 
  2.
  3.
  4.
*/

// initializing scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera)

//initalizing animation object shape (geometry and material)
const geormetry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
  // const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})
const torus = new THREE.Mesh(geormetry, material)
scene.add(torus)

//pointLight
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)
//ambientLight
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
//lightHelper
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
//orbit controls for POV
const controls = new OrbitControls(camera, renderer.domElement);


//star function
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}

// 200 randomly positioned stars
Array(200).fill().forEach(addStar);


//space texture and backgroudn
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


//animate function that renders 3D object
function animate() {
  requestAnimationFrame( animate );

  // rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update()

  renderer.render(scene, camera)

}

// main
animate()
