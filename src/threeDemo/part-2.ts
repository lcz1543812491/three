import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function part1() {
  const scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 2)
  const material = new THREE.MeshBasicMaterial({ color: '#f00', wireframe: true })

  const cube = new THREE.Mesh(geometry, material)

  

  const geometry1 = new THREE.BufferGeometry();

  const vertices = new Float32Array( [
    -1.0, -1.0,  1.0, // v0
     1.0, -1.0,  1.0, // v1
     1.0,  1.0,  1.0, // v2
    -1.0,  1.0,  1.0, // v3
  ] );
  
  const indices = [
    0, 1, 2,
    2, 3, 0,
  ];
  
  geometry.setIndex( indices );
  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  
  const material1 = new THREE.MeshBasicMaterial( { color: 0xfff000 } );
  const mesh = new THREE.Mesh( geometry, material1 );

  scene.add(mesh)


  // cube.position.set(1, -0.5, 1)
  // cube.scale.set(2, 0.5, 0.5)

  // cube.rotation.y = 1.7
  // scene.add(cube)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.z = 3

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer()

  render.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(render.domElement)

  const clock = new THREE.Clock()

  // gsap.to(cube.position, { duration: 1, delay: 1, x: 10})
  // gsap.to(cube.position, { duration: 1, delay: 2, x: 0})

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
  });

  function tick() {
    // const currentTime = Date.now()
    // const deltaTime = currentTime - pretime
    // pretime = currentTime

    // console.log('deltaTime', deltaTime)

    // cube.rotation.y += 0.001 * deltaTimeel

    // const elapse = clock.getElapsedTime()
    // cube.position.y = Math.sin(elapse)
    // cube.position.x = Math.cos(elapse)

    // camera.lookAt(cube.position)

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
