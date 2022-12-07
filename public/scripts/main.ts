import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';
import { ThreeRootSingleton } from './Root.js'
import LoadModel from './objectloadertest.js'

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

const objSwitcher: ThreeRootSingleton = ThreeRootSingleton.getInstance();


/*
 button handler to switch to the load object function
 */
const button = document.getElementById('loadscene');
button?.addEventListener('click', (event) => {
    console.log("loading scene and display it on the screen !");
    LoadModel(objSwitcher);
})

/*
 button handler to switch between objects
 */
// const btns = Array.prototype.slice.call(document.getElementsByClassName("btn"));
// btns.forEach(button => {
//     button.addEventListener("click", (e: { target: { innerText: any } }) => {
//         //rootScene.switchGeometry(e.target.innerText);
//         console.log(`switching to the object: ${e.target.innerText} !`);
//     })
// });

/*
 window resize function 
 */
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    objSwitcher.render();
}

/*
 the animaotion is an endless loop of displaying frames on the screen
 */
function animate() {
    requestAnimationFrame(animate)
    objSwitcher.render();
    objSwitcher.update();

    //rootScene.updateAnimate();
    //rootScene.render();
}
animate()
