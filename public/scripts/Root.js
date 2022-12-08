import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
class ThreeRootSingleton {
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
    /*
     */
    constructor() {
        this._scene = new THREE.Scene();
        this._rendr = new THREE.WebGLRenderer();
        this.rendr.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.rendr.domElement);
        this._cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cam.position.z = 3;
        this._ctrls = new OrbitControls(this.cam, this.rendr.domElement);
    }
    /*
       singelton pattern
     */
    static getInstance() {
        if (!ThreeRootSingleton.instance) {
            ThreeRootSingleton.instance = new ThreeRootSingleton();
        }
        return ThreeRootSingleton.instance;
    }
    /*
        move the location of the camera to a random point
     */
    moveCamera() {
    }
    /*
       render() is called to create a new frame in the animation
    */
    render() {
        this.rendr.render(this.scene, this.cam);
        this.update();
    }
    /*
        update() changes the objects in the scene that should be animated somehow
     */
    update() {
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
/*
 rootThree is the container for the main Three.js components
 */
export const rootThree = ThreeRootSingleton.getInstance();
