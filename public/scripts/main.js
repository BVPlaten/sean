import ActionWorld from './ActionWorld.js';
import SceneCtrlr from './SceneCtrlr.js';
/*
  button handler to controll the movement
 */
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
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
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    world.rezise();
}
/*
 the animation is an endless loop of displaying frames on the screen
 */
function animate() {
    requestAnimationFrame(animate);
    world.update();
}
// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f
let sceneCtrl = new SceneCtrlr('./scripts/worm_of_run.json');
let world = new ActionWorld(sceneCtrl);
animate();
//# sourceMappingURL=main.js.map