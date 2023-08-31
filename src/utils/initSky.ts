import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import flyGltf from '../assets/fly/scene.gltf';


export function initSky() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#000");

// const textLoader = new THREE.TextureLoader();
// sky.mapping = THREE.EquirectangularReflectionMapping
// scene.environment = sky
// scene.background = sky



  const renderer = new THREE.WebGL1Renderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  });

  renderer.outputEncoding = THREE.sRGBEncoding;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50000
  );

  camera.position.set(0, 2, 6)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;


  const light = new THREE.AmbientLight(0x404040, 10);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-20, 20, 20);

  scene.add(camera)
  scene.add(light)
  scene.add(directionalLight)

  document.body.appendChild(renderer.domElement)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function render(){
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(render)
  }
  render()

  const gltfLoader = new GLTFLoader();
  const draLoader = new DRACOLoader();
  draLoader.setDecoderPath( './assets' );
  gltfLoader.load(flyGltf, (fly) => {
    console.log('fly', fly);
    const flyScene = fly.scene;
    // carScene.traverse((child) => {
    //     if(child.isMesh){
    //       console.log(child.name);
    //       if(child.name === "Plane131_plastic_smooth002_0"){
    //         child.material = bdMaterial
    //       }
    //     }
    // })
    scene.add(flyScene);
  })

}
