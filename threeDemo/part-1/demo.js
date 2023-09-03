const scene = new THREE.Scene()

const mycanvas = document.getElementById('my-canvas')

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#f00' })

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.z = 3

scene.add(camera)

const render = new THREE.WebGL1Renderer({
  canvas: mycanvas
})

render.setSize(window.innerWidth, window.innerHeight)

render.render(scene, camera)
