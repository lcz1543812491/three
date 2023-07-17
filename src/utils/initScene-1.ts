import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import textureUrl from "../assets/cai-zhi.jpg";
import textureUrl1 from "../assets/texture-2.jpg";

function createTrangle({ scene }) {
  for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry();
    const vertics = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      vertics[j] = Math.random() * 5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(vertics, 3));

    const color = new THREE.Color(Math.random(), Math.random(), Math.random());

    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }
}

export function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  const textLoader = new THREE.TextureLoader();
  const texture = textLoader.load(textureUrl);

  const texture1 = textLoader.load(textureUrl1);
  // texture.offset.x = 0.5

  const cubGeometry = new THREE.BoxGeometry();

  // const vertics = new Float32Array([
  //   -1, -1, 1, 1, -1, 1, 1, 1, 1,

  //   1, 1, 1, -1, 1, 1, -1, -1, 1,
  // ]);

  // cubGeometry.setAttribute('position', new THREE.BufferAttribute(vertics, 3))

  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: "#03556e",
    map: texture,
    alphaMap: texture1,
    transparent: true,
    aoMap: texture1,
    aoMapIntensity: 2
    // side: THREE.DoubleSide
  });

  const cube = new THREE.Mesh(cubGeometry, cubeMaterial);

  // console.log('@@@', THREE.BufferGeometry);

  const geometry = new THREE.PlaneGeometry(1, 1);
  const plane = new THREE.Mesh(geometry, cubeMaterial);
  scene.add(plane);
  plane.position.set(1, 0, 0);
  geometry.setAttribute("uv2", new THREE.BufferAttribute(geometry.attributes.uv.array, 2))

  // const planeGeometry = new THREE.BufferGeometry();
  // const plane = new THREE.Mesh(planeGeometry, cubeMaterial);
  // plane.position.set(3, 0, 0);
  // scene.add(plane);

  // planeGeometry.setAttribute(
  //   "uv2",
  //   new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
  // );

  scene.add(cube);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);

  //   const geometry = new THREE.BufferGeometry();
  //   const vertics = new Float32Array([
  //     -1, -1, 1,
  //     1, -1, 1,
  //     1, 1, 1,

  //     1,1,1,
  //     -1, 1, 1,
  //     -1, -1, 1,
  //   ]);

  //   geometry.setAttribute('position', new THREE.BufferAttribute(vertics, 3))

  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh(geometry, material);

  // cube.position.set(5,0, 0);
  // cube.scale.set(3,2,1);
  // cube.rotation.set(Math.PI / 4, 0, 0);
  // createTrangle({ scene });
  //   const gui = new dat.GUI();
  //   gui
  //     .add(cube.position, "x")
  //     .min(0)
  //     .max(10)
  //     .step(0.1)
  //     .name("移动x轴")
  //     .onChange((value) => {
  //       console.log("onChange", value);
  //     })
  //     .onFinishChange((value) => {
  //       console.log("onFinishChange", value);
  //     });

  //   gui
  //     .addColor(
  //       {
  //         color: "#00ff00",
  //       },
  //       "color"
  //     )
  //     .onChange((value) => {
  //       cube.material.color.set(value);
  //     });

  //   gui
  //     .add(
  //       {
  //         fn: () => {
  //           console.log("@@@@");
  //           gsap.to(cube.position, {
  //             x: 5,
  //             duration: 5,
  //             ease: "back.out(1.7)",
  //             repeat: 3,
  //             yoyo: true,
  //             onComplete: () => {
  //               console.log("onComplete");
  //             },
  //           });
  //         },
  //       },
  //       "fn"
  //     )
  //     .name("点击动画");

  // gui.addFolder("设置立方体").add(cube.material, "wireframe");

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

  //   const clock = new THREE.Clock();
  // const animate = gsap.to(cube.position, {
  //   x: 5,
  //   duration: 5,
  //   ease: "back.out(1.7)",
  //   repeat: 3,
  //   yoyo: true,
  //   onComplete: () => {
  //     console.log("onComplete");
  //   },
  // });
  // gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power3.out" });

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
    // console.log('@@@', time);

    // const time = clock.getElapsedTime();
    // const deltaTime = clock.getDelta();
    // console.log('time', time);
    // console.log('delta', deltaTime);

    // cube.position.x += 0.01;
    // cube.rotation.x += 0.01;
    // if (cube.position.x > 5) {
    //   cube.position.x = 0;
    // }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
