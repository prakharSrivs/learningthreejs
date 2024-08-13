import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "white" });

const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)
scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,100);
scene.add(camera);

camera.position.setZ(5);

const canvas = document.querySelector("#threejs");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.autoRotate = true;

const renderLoop = ()=>{
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
}

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderLoop();