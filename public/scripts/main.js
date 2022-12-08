import { rootThree } from './Root.js';
import { LoadModel, SwitchGeomtry } from './objectloadertest.js';
// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f
/*
 button handler to start the load object function
 */
const button = document.getElementById('loadscene');
button === null || button === void 0 ? void 0 : button.addEventListener('click', (event) => {
    LoadModel();
});
/*
 button handler to switch between objects
 */
const btns = Array.prototype.slice.call(document.getElementsByClassName("geomswitch"));
btns.forEach(button => {
    button.addEventListener("click", (e) => {
        SwitchGeomtry(e.target.innerText);
    });
});
/*
 window resize function
 */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    rootThree.rezise();
    // rootThree.cam.aspect = window.innerWidth / window.innerHeight
    // rootThree.cam.updateProjectionMatrix()
    // rootThree.rendr.setSize(window.innerWidth, window.innerHeight)
    // rootThree.render();
}
/*
 the animaotion is an endless loop of displaying frames on the screen
 */
function animate() {
    requestAnimationFrame(animate);
    rootThree.render();
}
animate();
