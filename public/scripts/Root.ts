import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';

// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
export class ThreeRootSingleton {
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

    private constructor() {
        this._scene = new THREE.Scene();
        this._rendr = new THREE.WebGLRenderer();

        this.rendr.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.rendr.domElement)
        

        this.cam = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.cam.position.z = 3

        this._ctrls = new OrbitControls( this.cam, this.rendr.domElement )
    }

    public static getInstance(): ThreeRootSingleton {
        if (!ThreeRootSingleton.instance) {
            ThreeRootSingleton.instance = new ThreeRootSingleton();
        }
        return ThreeRootSingleton.instance;
    }

    // public static getExisting(): ThreeRootSingleton {
    //     if (!ThreeRootSingleton.instance) {
    //         throw new Error('Something bad happened');
    //     }
    //     return ThreeRootSingleton.instance;
    //     }

    /* 
     move the location of the camera to a random point 
     */
     public moveCamera() {
    }

    /*
     update() changes the objects in the scene that should be animated
     */
     update() {

     }

    /*
    render() is called to create a new frame in the animation
    */
    public render() {
        this.rendr.render(this.scene, this.cam);
    }
}

