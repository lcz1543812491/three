import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import flyGltf from '../assets/fly/scene.gltf';
import rgbeUrl from "../assets/WechatIMG10.jpg";


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


  const light = new THREE.AmbientLight(0x404040, 100);
  light.position.set(20, 20, 20)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(-20, 40, 20);


  for(let i = 0; i <= 10; i++) {

    // const x = Math.random()*1000 - 500
    // const y = Math.random()*1000 - 500
    // const z = Math.random()*1000 - 500
   
    const sphereGe = new THREE.SphereGeometry(1, 100, 100);
    console.log()
    // const skyMat = new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load(rgbeUrl),
    // });
    sphereGe.scale(1, 1, -1);
    const sky = new THREE.Mesh(sphereGe);
    scene.add(sky)
  }

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
    fly.scene.scale.x = 0.6;
    fly.scene.scale.y = 0.6;
    fly.scene.scale.z = 0.6;
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
