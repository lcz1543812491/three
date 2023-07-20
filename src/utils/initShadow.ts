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

  const gui = new dat.GUI();

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


  const smallBallGeometry = new THREE.SphereGeometry(0.2, 100, 100);
  const smallBallmaterial1 = new THREE.MeshBasicMaterial({color: 0xff0000});

  const smallBall = new THREE.Mesh(smallBallGeometry, smallBallmaterial1);
  smallBall.position.set(2,2,2);


  const sphere = new THREE.Mesh(geometry1, material1);
  sphere.castShadow = true;

  const geometry = new THREE.PlaneGeometry(10, 10, 200, 200);
  const plane = new THREE.Mesh(geometry, cubeMaterial);
  plane.position.set(0, -1.8, 0);
  plane.rotation.x = Math.PI / 2;
  plane.receiveShadow = true;

  scene.add(plane);
  scene.add(sphere);
  scene.add(smallBall);


  const light = new THREE.AmbientLight(0x404040, 0.7); // soft white light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  const spotLight = new THREE.SpotLight(0xffff, 0.5);
  spotLight.position.set(5,5,5);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(4096, 4096);
  spotLight.shadow.radius = 20;
  spotLight.target = sphere;
  spotLight.angle = Math.PI / 6;
  spotLight.distance = 0;
  spotLight.penumbra = 0.7;
  spotLight.decay = 0.2;



  const pointLight = new THREE.PointLight(0xff0000, 5);
  pointLight.position.set(2,2,2);
  pointLight.castShadow = true;

  smallBall.add(pointLight);

  gui.add(pointLight.position, 'x').min(-5).max(5).step(0.1);



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

  // scene.add(directionalLight);
  scene.add(light);
  scene.add(spotLight);
  scene.add(pointLight);


  

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  // scene.add(cube);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;

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

  const clock = new THREE.Clock();

  function render() {
    const time = clock.getElapsedTime();
    // console.log('@@@', Math.sin(time));
    smallBall.position.x = Math.sin(time) * 3;
    smallBall.position.z = Math.cos(time) * 3;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
