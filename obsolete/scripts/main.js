import { rootThree } from './Root.js';
import { LoadModel, SwitchGeomtry } from './buttonHandler.js';
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
// /* 
//   button handler to controll the movement
//  */
//   function trackKeys(keys) {
// 	let down = Object.create(null);
// 	function track(event) {
// 		if (keys.includes(event.key)) {
// 			down[event.key] = event.type == "keydown";
// 			event.preventDefault();
// 		}
// 	}
// 	window.addEventListener("keydown", track);
// 	window.addEventListener("keyup", track);
// 	return down;
// }
// const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "q"]);
document.addEventListener("keydown", (event) => {
    if (event.key === "a") {
        console.log(`Du hast die Taste ${event.code} gedrückt`);
    }
});
/*
  window resize function
 */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    rootThree.rezise();
}
/*
 the animaotion is an endless loop of displaying frames on the screen
 */
function animate() {
    requestAnimationFrame(animate);
    rootThree.render();
}
animate();
//# sourceMappingURL=main.js.map