import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export function initScene(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    // cube.position.set(5,0, 0);
    // cube.scale.set(3,2,1);
    cube.rotation.set(Math.PI/4, 0, 0);

    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    scene.add( cube );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.render( scene, camera );
    const root = document.getElementById('root');

    if(root){
        root.appendChild( renderer.domElement );
    }

    const controls = new OrbitControls( camera, renderer.domElement );

    function render(){
       cube.position.x += 0.01; 
       cube.rotation.x += 0.01;
       if(cube.position.x > 5){
        cube.position.x = 0;
       }
       renderer.render(scene, camera)
       requestAnimationFrame(render);
    }

    render();

}