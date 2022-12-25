import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';
import { world } from './ActionWorld.js'
import { changeGeometry, singleGeometryRender } from './singleGeometry.js'
import { SwitchGeomtry } from './buttonHandler.js'
import SceneCtrlr from './SceneCtrlr.js';

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

/*
 button handler to start the load object function
 */
const button = document.getElementById('loadscene');
button?.addEventListener('click', (event) => {
    const game = new SceneCtrlr("./scripts/worm_of_run.json");
})

/*
 button handler to switch between objects
 */
const btns = Array.prototype.slice.call(document.getElementsByClassName("geomswitch"));
btns.forEach(button => {
    button.addEventListener("click", (e: { target: { innerText: any } }) => {
        //SwitchGeomtry(e.target.innerText)
        world.scene.clear(); 
        singleGeometryRender(world);
    
        const geom: THREE.BufferGeometry = changeGeometry(e.target.innerText);
        const mtrl: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true})
        
        const mesh = new THREE.Mesh(geom, mtrl );
        mesh.name = 'RotationObject';
        world.scene.add(mesh);
    })
});

/* 
  button handler to controll the movement
 */
function trackKeys(keys :String[]) {
	let down = Object.create(null);
	function track(event: KeyboardEvent) {
        // console.log(event.code);
		if (keys.includes(event.code)) {
			down[event.code] = event.type == "keydown";
			event.preventDefault();
		}
	}
	window.addEventListener("keydown", track);
	window.addEventListener("keyup", track);
	return down;
}

// global array with the currently pressed control-key
export let controllKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"]);

/*
  window resize => change the camera settings
 */
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    world.rezise();
}

/*
 the animation is an endless loop of displaying frames on the screen
 */
function animate() {
    requestAnimationFrame(animate)
    world.render();
}
animate()