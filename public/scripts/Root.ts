import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import { controllKeys } from './main.js';


// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
class ThreeRootSingleton {
    private static instance: ThreeRootSingleton;
    private _ctrls: OrbitControls;
    private _rendr: THREE.WebGLRenderer;
    private _cam: THREE.PerspectiveCamera;
    private _scene: THREE.Scene;

    public get rendr(): THREE.WebGLRenderer {
        return this._rendr;
    }
    public set rendr(value: THREE.WebGLRenderer) {
        this._rendr = value;
    }

    public get cam(): THREE.PerspectiveCamera {
        return this._cam;
    }
    public set cam(value: THREE.PerspectiveCamera) {
        this._cam = value;
    }

    public get scene(): THREE.Scene {
        return this._scene;
    }
    public set scene(value: THREE.Scene) {
        this._scene = value;
    }

    /*
     */
    private constructor() {
        this._scene = new THREE.Scene();
        this._rendr = new THREE.WebGLRenderer();

        this.rendr.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.rendr.domElement)

        this._cam = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.cam.position.z = 3
        this._ctrls = new OrbitControls( this.cam, this.rendr.domElement )
    }

    /*
       singelton pattern
     */
    public static getInstance(): ThreeRootSingleton {
        if (!ThreeRootSingleton.instance) {
            ThreeRootSingleton.instance = new ThreeRootSingleton();
        }
        return ThreeRootSingleton.instance;
    }

    /* 
        move the location of the camera to a random point 
     */
     public tellMeAll() {
        this.scene.traverse( function( object ) {

            if ( object instanceof THREE.Mesh ) console.log( object );
        
        } );
    }

    /*
       render() is called to create a new frame in the animation
    */
    public render() {
        this.rendr.render(this.scene, this.cam);
        this.update('RotationObject')
        this.controllerCheck('RotationObject');
    }

    /*
        update() changes the objects in the scene that should be animated somehow
        https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/
     */
    public update(objName : string) {
        const animObj = rootThree.scene.getObjectByName(objName);
        if(animObj != null) {
            animObj.rotation.x += Math.PI / 270;
            animObj.rotation.y += Math.PI / 360;
            animObj.rotation.z += Math.PI / 180;
        }
    }

    /*
     react to keyboard press event
     */
    controllerCheck(objName : string) {
        // console.log(controllKeys);
        const animObj = rootThree.scene.getObjectByName(objName);
        if(animObj === null) {
            return; 
        }
        else {
            if(controllKeys['ArrowUp'] === true) {
                animObj!.position.y +=.01;
            }
            if(controllKeys['ArrowDown'] === true) {
                animObj!.position.y -=.01;
            }
            if(controllKeys['ArrowRight'] === true) {
                animObj!.position.x +=.01;
            }
            if(controllKeys['ArrowLeft'] === true) {
                animObj!.position.x -=.01;
            }
        }
    } 


    /*
       rezize the canvas if the window size was changed
     */
    public rezise() {
        this.cam.aspect = window.innerWidth / window.innerHeight
        this.cam.updateProjectionMatrix()
        this.rendr.setSize(window.innerWidth, window.innerHeight)
        this.render();
    
    }
}

/*
 rootThree is the container for the main Three.js components. it is a singleton, reused in all modules
 */
export const rootThree: ThreeRootSingleton = ThreeRootSingleton.getInstance();


