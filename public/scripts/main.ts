import * as THREE from 'three'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import Stats from '../jsm/libs/stats.module.js'
import { GUI } from '../jsm/libs/lil-gui.module.min.js'
import RootScene from './rootScene.js'

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

let rootScene = new RootScene();

function animate() {
    requestAnimationFrame(animate)
    rootScene.updateAnimate();
    rootScene.render();
}

//add event handling for the buttons
const btns = Array.prototype.slice.call(document.getElementsByClassName("btn"));
btns.forEach(button => {
    button.addEventListener("click", (e: { target: { innerText: any } }) => {
        console.log( ` Button ${e.target.innerText} was pressed!`);
        rootScene.switchGeometry(e.target.innerText);
    })
});

animate()