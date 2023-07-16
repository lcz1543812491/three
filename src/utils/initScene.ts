import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  // cube.position.set(5,0, 0);
  // cube.scale.set(3,2,1);
  cube.rotation.set(Math.PI / 4, 0, 0);
  const gui = new dat.GUI();
  gui
    .add(cube.position, "x")
    .min(0)
    .max(10)
    .step(0.1)
    .name("移动x轴")
    .onChange((value) => {
      console.log("onChange", value);
    })
    .onFinishChange((value) => {
      console.log("onFinishChange", value);
    });

  gui
    .addColor(
      {
        color: "#00ff00",
      },
      "color"
    )
    .onChange((value) => {
      cube.material.color.set(value);
    });

  gui
    .add(
      {
        fn: () => {
          console.log("@@@@");
          gsap.to(cube.position, {
            x: 5,
            duration: 5,
            ease: "back.out(1.7)",
            repeat: 3,
            yoyo: true,
            onComplete: () => {
              console.log("onComplete");
            },
          });
        },
      },
      "fn"
    )
    .name("点击动画");


  gui.addFolder('设置立方体').add(cube.material, 'wireframe');  

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  scene.add(cube);
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
