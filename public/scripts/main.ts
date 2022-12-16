import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';
import { rootThree } from './Root.js'
import { changeGeometry, singleGeometryRender } from './singleGeometry.js'
import { SwitchGeomtry } from './buttonHandler.js'
import { PillConsuming } from './PillConsuming.js';

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

/*
 button handler to start the load object function
 */
const button = document.getElementById('loadscene');
button?.addEventListener('click', (event) => {
    const game = new PillConsuming("./scripts/worm_of_run.json");
})

/*
 button handler to switch between objects
 */
const btns = Array.prototype.slice.call(document.getElementsByClassName("geomswitch"));
btns.forEach(button => {
    button.addEventListener("click", (e: { target: { innerText: any } }) => {
        //SwitchGeomtry(e.target.innerText)
        rootThree.scene.clear(); 
        singleGeometryRender(rootThree);
    
        const geom: THREE.BufferGeometry = changeGeometry(e.target.innerText);
        const mtrl: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true})
    
        const mesh = new THREE.Mesh(geom, mtrl );
        mesh.name = 'RotationObject';
        rootThree.scene.add(mesh);
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


// export default function controllKeys() {
//     //arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowUp", "Space"]);
//     return trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowUp", "Space"]);
// }
export let controllKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"]);

/*
  window resize function 
 */
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    rootThree.rezise();
}

/*
 the animaotion is an endless loop of displaying frames on the screen
 */
function animate() {
    requestAnimationFrame(animate)
    rootThree.render();
}
animate()