import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import textureUrl from "../assets/cai-zhi.jpg";
import textureUrl1 from "../assets/texture-2.jpg";


export function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  const manager = new THREE.LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('onStart', url, itemsLoaded, itemsTotal);
  };

  manager.onLoad = function () {
    console.log("Loading complete!");
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('onProgress', url, itemsLoaded, itemsTotal);
  };

  manager.onError = function (url) {
    console.log("There was an error loading " + url);
  };

  const textLoader = new THREE.TextureLoader(manager);
  const texture = textLoader.load(textureUrl);

  const texture1 = textLoader.load(textureUrl1);

  // const cubGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);


  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: "#fff",
    side: THREE.DoubleSide
  });


  const geometry1 = new THREE.SphereGeometry(1.5, 100, 100);
  const material1 = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.1,
    envMap: texture,
  });

  const sphere = new THREE.Mesh(geometry1, material1);
  sphere.castShadow = true;

  const geometry = new THREE.PlaneGeometry(10, 10, 200, 200);
  const plane = new THREE.Mesh(geometry, cubeMaterial);
  plane.position.set(0, -1.8, 0);
  plane.rotation.x = Math.PI / 2;
  plane.receiveShadow = true;

  scene.add(plane);
  scene.add(sphere);


  const light = new THREE.AmbientLight(0x404040, 0.7); // soft white light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.radius = 20;
  directionalLight.shadow.mapSize.set(4096, 4096);

  directionalLight.shadow.camera.far = 100;
  directionalLight.shadow.camera.near = 5;

  directionalLight.shadow.camera.top = 5
  directionalLight.shadow.camera.bottom = -5
  directionalLight.shadow.camera.left = -5
  directionalLight.shadow.camera.right = 5;

  scene.add(directionalLight);
  scene.add(light);


  

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  // scene.add(cube);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  renderer.render(scene, camera);
  const root = document.getElementById("root");

  if (root) {
    root.appendChild(renderer.domElement);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;


  window.addEventListener("dblclick", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      renderer.domElement.requestFullscreen();
    }
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
