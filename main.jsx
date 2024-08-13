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
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.autoRotate = true;

const clock = new THREE.Clock();
let previousTime = 0;

const renderLoop = ()=>{    
    cubeMesh.rotation.y += THREE.MathUtils.degToRad(10);
    let currentTime = clock.getElapsedTime();
    let delta = currentTime - previousTime;
    cubeMaterial.color.r = Math.sin(currentTime);
    cubeMaterial.color.g = 1 - Math.sin(currentTime);
    cubeMaterial.color.b = 1 - Math.sin(currentTime);
    previousTime = currentTime;
    cubeMesh.position.x = Math.sin(currentTime)*2;
    cubeMesh.scale.x = Math.sin(currentTime)*2;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
}

const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true
});
const maxPixelRatio = Math.min(2, window.devicePixelRatio);

renderer.setPixelRatio(maxPixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

renderLoop();