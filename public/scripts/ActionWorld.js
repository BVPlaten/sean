import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { controllKeys } from './main.js';
// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
export class ActionWorld {
    get renderFunc() {
        return this._renderFunc;
    }
    set renderFunc(value) {
        this._renderFunc = value;
    }
    get rendr() {
        return this._rendr;
    }
    set rendr(value) {
        this._rendr = value;
    }
    get cam() {
        return this._cam;
    }
    set cam(value) {
        this._cam = value;
    }
    get scene() {
        return this._scene;
    }
    set scene(value) {
        this._scene = value;
    }
    get ctrls() {
        return this._ctrls;
    }
    set ctrls(value) {
        this._ctrls = value;
    }
    /*
    constructor
     */
    constructor(_renderFunc) {
        this._renderFunc = _renderFunc;
        this._scene = new THREE.Scene();
        this._rendr = new THREE.WebGLRenderer();
        this.rendr.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.rendr.domElement);
        let perspct = window.innerWidth / window.innerHeight;
        this._cam = new THREE.PerspectiveCamera(75, perspct, 0.1, 1000);
        this.cam.position.set(5, 6, -12);
        this.ctrls = new OrbitControls(this.cam, this.rendr.domElement);
        /*
        this.ctrls.addEventListener("change", event => {
            console.log( this.ctrls.object.position )
        });
        */
    }
    /*
       singelton pattern
     */
    static getInstance(renderF) {
        if (!ActionWorld.instance) {
            ActionWorld.instance = new ActionWorld(renderF);
        }
        return ActionWorld.instance;
    }
    /*
        move the location of the camera to a random point
     */
    tellMeAll() {
        this.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh)
                console.log(obj);
        });
    }
    /*
       render() is called to create a new frame in the animation
    */
    render() {
        this._renderFunc(this);
        //this.rendr.render(this.scene, this.cam);
        //this.update('RotationObject')
        //this.controllerCheck('RotationObject');
    }
    /*
        update() changes the objects in the scene that should be animated somehow
        https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/
     */
    update(objName) {
        const animObj = world.scene.getObjectByName(objName);
        if (animObj != null) {
            animObj.rotation.x += Math.PI / 270;
            animObj.rotation.y += Math.PI / 360;
            animObj.rotation.z += Math.PI / 180;
        }
    }
    /*
     react to keyboard press event
     TODO the animation logic should be put to the scene-controller
     */
    controllerCheck(objName, step = .05) {
        // console.log(controllKeys);
        const animObj = world.scene.getObjectByName(objName);
        if ((animObj !== undefined) && (animObj !== null)) {
            if (controllKeys['ArrowUp'] === true) {
                animObj.position.z += step;
            }
            if (controllKeys['ArrowDown'] === true) {
                animObj.position.z -= step;
            }
            if (controllKeys['ArrowRight'] === true) {
                animObj.position.x -= step;
            }
            if (controllKeys['ArrowLeft'] === true) {
                animObj.position.x += step;
            }
        }
    }
    /*
       rezize the canvas if the window size was changed
     */
    rezise() {
        this.cam.aspect = window.innerWidth / window.innerHeight;
        this.cam.updateProjectionMatrix();
        this.rendr.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
}
let renderStandart = (obj) => {
    obj.rendr.render(obj.scene, obj.cam);
    obj.update('RotationObject');
    obj.controllerCheck('RotationObject');
};
/*
 world is the container for the main Three.js components.
 scene,camera,ligth,renderer and orbit-controls
 it is a singleton, reused in all modules
 */
export const world = ActionWorld.getInstance(renderStandart);
//# sourceMappingURL=ActionWorld.js.map