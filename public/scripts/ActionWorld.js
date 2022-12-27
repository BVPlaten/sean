import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import SceneCtrlr from './SceneCtrlr.js';
// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
//
//  world is the container for the main Three.js components. 
//  scene,camera,ligth,renderer and orbit-controls
//  it is a singleton, one instance for all modules
export default class ActionWorld {
    /*
    constructor
     */
    constructor(scene) {
        this.scene = scene;
        this.sceneCtrl = new SceneCtrlr('./scripts/worm_of_run.json');
        this.rendr = new THREE.WebGLRenderer();
        this.rendr.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.rendr.domElement);
        let perspct = window.innerWidth / window.innerHeight;
        this.cam = new THREE.PerspectiveCamera(75, perspct, 0.1, 1000);
        this.cam.position.set(5, 6, -12);
        this.ctrls = new OrbitControls(this.cam, this.rendr.domElement);
        this.rendr.render(this.sceneCtrl.scene, this.cam);
        this.initSound();
    }
    /*
     prepare a THREE.Audio Instance to play a sound in case of collision
     */
    initSound() {
        const listener = new THREE.AudioListener();
        this.cam.add(listener);
        this.sound = new THREE.Audio(listener);
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load('./assets/MicrowaveBell.ogg', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setLoop(true);
            this.sound.setVolume(1);
            //this.sound.play();
        });
    }
    /*
       rezize the canvas if the window size was changed
     */
    rezise() {
        this.cam.aspect = window.innerWidth / window.innerHeight;
        this.cam.updateProjectionMatrix();
        this.rendr.setSize(window.innerWidth, window.innerHeight);
        this.rendr.render(this.sceneCtrl.scene, this.cam);
    }
    /*
     animation function of the scene
     */
    update() {
        this.sceneCtrl.update();
        this.sceneCtrl.moveByKey('PlayerBoxObj');
        this.rendr.render(this.sceneCtrl.scene, this.cam);
    }
}
//# sourceMappingURL=ActionWorld.js.map