import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';
import PlayField from './rootScene.js';
import { startLoad } from './objectloadertest.js'

// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://medium.com/threejs/module-specifiers-versus-relative-import-references-fd747980ba6f

let rootScene = new PlayField();

const button = document.getElementById('loadscene');
button?.addEventListener('click', (event) => {
    console.log("loading scene!");
    startLoad(rootScene.m);
})


function animate() {
    requestAnimationFrame(animate)
    rootScene.updateAnimate();
    rootScene.render();
}

//add event handling for the buttons
const btns = Array.prototype.slice.call(document.getElementsByClassName("btn"));
btns.forEach(button => {
    button.addEventListener("click", (e: { target: { innerText: any } }) => {
        rootScene.switchGeometry(e.target.innerText);
    })
});

animate()