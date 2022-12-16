import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import { controllKeys } from './main.js';


// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
export class ThreeRootSingleton {
    private static instance: ThreeRootSingleton;
    private _ctrls: OrbitControls;
    private _rendr: THREE.WebGLRenderer;
    private _cam: THREE.PerspectiveCamera;
    private _scene: THREE.Scene;

    public get renderFunc(): Function {
        return this._renderFunc;
    }
    public set renderFunc(value: Function) {
        this._renderFunc = value;
    }
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
    public get ctrls(): OrbitControls {
        return this._ctrls;
    }
    public set ctrls(value: OrbitControls) {
        this._ctrls = value;
    }


    /*
    constructor
     */
    private constructor(private _renderFunc: Function) {
        this._scene = new THREE.Scene();
        this._rendr = new THREE.WebGLRenderer();

        this.rendr.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.rendr.domElement)
        let perspct: number = window.innerWidth / window.innerHeight,;
        this._cam = new THREE.PerspectiveCamera( 75, perspct, 0.1, 1000 );
        this.cam.position.set(5,6,-12);
        this.ctrls = new OrbitControls( this.cam, this.rendr.domElement );
        /*
        this.ctrls.addEventListener("change", event => {  
            console.log( this.ctrls.object.position ) 
        });
        */
    }


    /*
       singelton pattern
     */
    public static getInstance(renderF : Function): ThreeRootSingleton {
        if (!ThreeRootSingleton.instance) {
            ThreeRootSingleton.instance = new ThreeRootSingleton(renderF);
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
        this._renderFunc(this);
        //this.rendr.render(this.scene, this.cam);
        //this.update('RotationObject')
        //this.controllerCheck('RotationObject');
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
    controllerCheck(objName : string, step: number = .05) {
        // console.log(controllKeys);
        const animObj = rootThree.scene.getObjectByName(objName);
        if(animObj === null) {
            return; 
        }
        else {
            if(controllKeys['ArrowUp'] === true) {
                animObj!.position.z += step;
            }
            if(controllKeys['ArrowDown'] === true) {
                animObj!.position.z -= step;
            }
            if(controllKeys['ArrowRight'] === true) {
                animObj!.position.x -= step;
            }
            if(controllKeys['ArrowLeft'] === true) {
                animObj!.position.x += step;
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


let renderStandart = (obj: ThreeRootSingleton) => {
    obj.rendr.render(obj.scene, obj.cam);
    obj.update('RotationObject')
    obj.controllerCheck('RotationObject');
}

/*
 rootThree is the container for the main Three.js components. it is a singleton, reused in all modules
 */
export const rootThree: ThreeRootSingleton = ThreeRootSingleton.getInstance(renderStandart);


