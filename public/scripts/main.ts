import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';

import ActionWorld from './ActionWorld.js'
import SceneCtrlr from './SceneCtrlr.js';

var sceneCtrl: SceneCtrlr;
var world: ActionWorld;

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

// load the scene-file created with the three.js online editor
const loadScene = (sceneFile: string) => {
	console.log('loading game object ')
	const Loader = new THREE.ObjectLoader();

	Loader.load(
		// resource URL
		sceneFile,
		// onLoad callback
		// Here the loaded data is assumed to be an object
		( obj: any ) => {
			console.log(`load finished in Loader ${obj}`);
			sceneCtrl = new SceneCtrlr(obj); 
			world = new ActionWorld(sceneCtrl);

			animate();
		},
	
		// onProgress callback
		( xhr: any ) => {
			//console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			return;
		},
	
		// onError callback.bind(this);
		( err: any ) => {
			console.error( `An error happened ${err}` );
		}
	);            
}

loadScene('./scripts/worm_of_run.json')

// .then( (gameFileData) => {
// 	const gameObj = THREE.ObjectLoader.parse( gameFileData );
// 	console.log(gameObj);

// 	sceneCtrl = new SceneCtrlr(gameObj); 
// 	world = new ActionWorld(sceneCtrl);

// 	animate();
// 	}
// )


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
	world.update();
    requestAnimationFrame(animate)
}
