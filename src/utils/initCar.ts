import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import carGltf from '../assets/car1/scene.gltf';

export function initCar() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#ccc');
  scene.environment =  new THREE.Color('#ccc');

  const renderer = new THREE.WebGL1Renderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50000
  );
  camera.position.set(0, 2, 6);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;


  const grid = new THREE.GridHelper(10, 10)
  grid.material.opacity = 0.2
  grid.material.transparent = true

  const light = new THREE.AmbientLight(0x404040, 3); 
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 0, 10);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, -10);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(10, 0, 0);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-10, 0, 0);



  directionalLight.castShadow = true;
  directionalLight.shadow.radius = 20;
  directionalLight.shadow.mapSize.set(4096, 4096);

  directionalLight2.castShadow = true;
  directionalLight2.shadow.radius = 20;
  directionalLight2.shadow.mapSize.set(4096, 4096)


  const bdMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0092ff,
    metalness: 1,
    roughness: 0.5,
    clearcoat:1,
    clearcoatRoughness: 0,
  });

  scene.add(grid);
  scene.add(camera);
  scene.add(light);
  scene.add(directionalLight);
  scene.add(directionalLight1);
  scene.add(directionalLight2);
  scene.add(directionalLight3);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function render(){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  }

  render();  


  const gltfLoader = new GLTFLoader();
  const draLoader = new DRACOLoader();
  draLoader.setDecoderPath( './assets' );
  gltfLoader.load(carGltf, (car) => {
    console.log('car', car);
    const carScene = car.scene;
    carScene.traverse((child) => {
        if(child.isMesh){
          console.log(child.name);
          if(child.name === "Plane131_plastic_smooth002_0"){
            child.material = bdMaterial
          }
        }
    })
    scene.add(carScene);
  })

}
