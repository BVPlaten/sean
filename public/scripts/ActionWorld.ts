import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import { controllKeys } from './main.js';
import SceneCtrlr from './SceneCtrlr.js'


// the container contains the basic components of a 3D visualization
// singleton : https://refactoring.guru/design-patterns/singleton/typescript/example
//
//  world is the container for the main Three.js components. 
//  scene,camera,ligth,renderer and orbit-controls
//  it is a singleton, one instance for all modules
export default class ActionWorld {
    public ctrls: OrbitControls;
    public rendr: THREE.WebGLRenderer;
    public cam: THREE.PerspectiveCamera;
    public sound: THREE.Audio;

    /*
    constructor
     */
    constructor(public scene :SceneCtrlr) {
        this.rendr = new THREE.WebGLRenderer();
        this.rendr.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.rendr.domElement)

        let perspct: number = window.innerWidth / window.innerHeight;
        this.cam = new THREE.PerspectiveCamera( 75, perspct, 0.1, 1000 );
        this.cam.position.set(5,6,-12);
        this.ctrls = new OrbitControls( this.cam, this.rendr.domElement );

        this.rendr.render(this.scene.scene,this.cam);
        this.initSound();
    }

    /*
     prepare a THREE.Audio Instance to play a sound in case of collision
     */
    public initSound() {
        const listener = new THREE.AudioListener();
        this.cam.add( listener );
        this.sound = new THREE.Audio( listener );
        
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( './assets/MicrowaveBell.ogg', ( buffer: any ) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 1 );
            //this.sound.play();
        });        
    }

    /*
       rezize the canvas if the window size was changed
     */
    public rezise() {
        this.cam.aspect = window.innerWidth / window.innerHeight
        this.cam.updateProjectionMatrix()
        this.rendr.setSize(window.innerWidth, window.innerHeight)
        this.rendr.render(this.scene.scene,this.cam);
    }

    /*
     animation function of the scene 
     */
    public update() {
        this.scene.update();
        this.scene.moveByKey('PlayerBoxObj')
        
        this.rendr.render(this.scene.scene,this.cam);
    }


}




