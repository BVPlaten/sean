import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';
import { rootThree } from './Root.js'
import { LoadModel, SwitchGeomtry } from './buttonHandler.js'

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

/*
 button handler to start the load object function
 */
const button = document.getElementById('loadscene');
button?.addEventListener('click', (event) => {
    LoadModel();
})

/*
 button handler to switch between objects
 */
const btns = Array.prototype.slice.call(document.getElementsByClassName("geomswitch"));
btns.forEach(button => {
    button.addEventListener("click", (e: { target: { innerText: any } }) => {
        SwitchGeomtry(e.target.innerText)
    })
});

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
