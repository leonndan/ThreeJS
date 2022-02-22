import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const torusTexture = new THREE.TextureLoader().load('espiral.jpg');
const normal4Texture = new THREE.TextureLoader().load('normal.jpg');
const geometry = new THREE.TorusKnotGeometry(10.887, 0.885, 44,5,10,3);
const material = new THREE.MeshStandardMaterial({ map: torusTexture,
  normalMap: normal4Texture, });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

//const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.0 );
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('fondo.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('Daniel.jpeg');

const jeff = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture, side: THREE.DoubleSide }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


//Objeto1
const objTexture = new THREE.TextureLoader().load('space.jpg');
const normal1Texture = new THREE.TextureLoader().load('normal.jpg');

const obj = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: objTexture,
    normalMap: normal1Texture,
  })
);

scene.add(obj);

obj.position.z = 40;
obj.position.setX(-20);

//objeto2
const obj1Texture = new THREE.TextureLoader().load('rojo.jpg');
const normal2Texture = new THREE.TextureLoader().load('normal.jpg');

const obj1 = new THREE.Mesh(
  new THREE.SphereGeometry(6, 96, 96),
  new THREE.MeshStandardMaterial({
    map: obj1Texture,
    normalMap: normal2Texture,
  })
);

scene.add(obj1);

obj1.position.z = 60;
obj1.position.setX(-20);

//objeto3
const obj2Texture = new THREE.TextureLoader().load('rojo1.jpg');
const normal3Texture = new THREE.TextureLoader().load('normal.jpg');

const obj2 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 16, 16),
  new THREE.MeshStandardMaterial({
    map: obj2Texture,
    normalMap: normal3Texture,
  })
);

scene.add(obj2);

obj2.position.z = 15;
obj2.position.setX(-10);

jeff.position.z = -2.5;
jeff.position.x = 2;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  obj.rotation.x += 0.05;
  obj.rotation.y += 0.075;
  obj.rotation.z += 0.05;

  obj1.rotation.x += 0.05;
  obj1.rotation.y += 0.075;
  obj1.rotation.z += 0.05;

  obj2.rotation.x += 0.05;
  obj2.rotation.y += 0.075;
  obj2.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  //torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  obj.rotation.x += 0.005;
  obj1.rotation.x += 0.005;
  obj2.rotation.x += 0.005;

  
  jeff.rotation.y += 0.005;


  // controls.update();

  renderer.render(scene, camera);
}

animate();
