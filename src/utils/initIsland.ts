import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Water } from "three/addons/objects/water2";
import rgbeUrl from "../assets/WechatIMG10.jpg";
import treegltf from '../assets/tree.gltf';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


export function initIsland() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  camera.position.set(-50, 50, 130);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  scene.add(camera);


  const light = new THREE.AmbientLight(0x404040, 1); // soft white light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);
  scene.add(light);

  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.body.appendChild(renderer.domElement);

  function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  }
  render();

  //   const planeGe = new THREE.PlaneGeometry(100, 100);
  //   const planeMate = new THREE.MeshBasicMaterial({color: 0xffffff});
  //   const plane = new THREE.Mesh(planeGe, planeMate);
  //   scene.add(plane);

  const sphereGe = new THREE.SphereGeometry(100, 60, 40);
  const skyMat = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(rgbeUrl),
  });
  // console.log('skyMat', skyMat);
  sphereGe.scale(1, 1, -1);
  const sky = new THREE.Mesh(sphereGe, skyMat);

  // const circle = new THREE.CircleGeometry(300, 128);
  // const circleMat = new Water(circle, {
  //   textureWidth: 1024,
  //   textureHeight: 1024,
  //   color: 0xeeeeff,
  //   flowDirection: new THREE.Vector2(1, 1),
  //   scale: 1,
  // });

  // console.log('circleMat', circleMat);

  // circleMat.rotation.x = - Math.PI / 2;
  // scene.add(circleMat);

  const gltfLoader = new GLTFLoader();
  const draLoader = new DRACOLoader();
  draLoader.setDecoderPath( './assets' );


  gltfLoader.load(treegltf, (value) => {
    const tree = value.scene;
    tree.position.y = -50;
    tree.scale.x = 100;
    tree.scale.y = 100;
    tree.scale.z = 100;
    console.log('@@@@@', tree);
    scene.add(tree);
  })

  scene.add(sky);
}
