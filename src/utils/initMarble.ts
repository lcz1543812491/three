import * as THREE from "three";
import marbleUrl from "../assets/marble.gltf";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function initMarble() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.set(-50, 50, 130);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();


  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50,50,50);
  pointLight.castShadow = true;


  const renderer = new THREE.WebGL1Renderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const ambient = new THREE.AmbientLight(0x404040, 10);
  scene.add(ambient);
  scene.add(camera);
  scene.add(pointLight);


  const gltfLoader = new GLTFLoader();
  gltfLoader.load(marbleUrl, (value) => {
    console.log('@@@@', value.scene.children[0]);
    const marble = value.scene;
    // marble.position.z = -10;
    marble.scale.x = 100;
    marble.scale.y = 100;
    marble.scale.z = 100;
    scene.add(marble);
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  }
  render();
}
