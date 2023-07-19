import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"
import textureUrl from "../assets/WechatIMG10.jpg";
import textureUrl1 from "../assets/WechatIMG2_1.jpg";
import rgbeUrl from '../assets/env.hdr';

// console.log('textureUrl', textureUrl, typeof textureUrl);

console.log('RGBELoader', RGBELoader);
console.log('rgbeUrl', rgbeUrl);

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
    console.log("onStart", url, itemsLoaded, itemsTotal);
  };

  manager.onLoad = function () {
    console.log("Loading complete!");
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log("onProgress", url, itemsLoaded, itemsTotal);
  };

  manager.onError = function (url) {
    console.log("There was an error loading " + url);
  };

  const textureLoader = new THREE.CubeTextureLoader();
  const rgbeLoader = new RGBELoader();
  console.log('rgbeLoader', rgbeLoader);

  rgbeLoader.load(rgbeUrl, (value) => {
    // console.log('@@@', value);
    value.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = value;
  });


  const texture = textureLoader.load([
    textureUrl,
    textureUrl1,
    textureUrl,
    textureUrl1,
    textureUrl,
    textureUrl1,
  ]);

  const geometry = new THREE.SphereGeometry(2, 100, 100);
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.1,
    envMap: texture,
  });
  const sphere = new THREE.Mesh(geometry, material);

  // scene.background = texture;

  scene.add(sphere);

  const light = new THREE.AmbientLight(0x404040, 0.5); // soft white light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);
  scene.add(light);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  // scene.add(cube);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);
  const root = document.getElementById("root");

  if (root) {
    root.appendChild(renderer.domElement);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  window.addEventListener("dblclick", () => {
    // if (animate.isActive()) {
    //   animate.pause();
    // } else {
    //   animate.resume();
    // }

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
