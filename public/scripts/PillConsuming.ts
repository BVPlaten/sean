import * as THREE from 'three';
import {rootThree, ThreeRootSingleton} from './Root.js'
import {controllKeys} from './main.js'

export class PillConsuming {
    localRenderFunc: Function;

    /*
     constructor 
     Param: sceneFile : string : path with filename to load 
     */
    constructor(private sceneFile : string) {
        this.loadScene();
        this.addBoundings()



        this.localRenderFunc = (obj: ThreeRootSingleton) => {
            obj.rendr.render(obj.scene, obj.cam);
            this.moveBox(obj);
            obj.update('RotationObject')
        }
        rootThree.renderFunc = this.localRenderFunc;
    }

    /*
     load the JSON object with the scene definition
     */
    loadScene(): void {
        rootThree.scene.clear();
        //this.localRenderFunc(rootThree); 
        const Loader = new THREE.ObjectLoader();
        Loader.load(
            // resource URL
            this.sceneFile,
        
            // onLoad callback
            // Here the loaded data is assumed to be an object
            function ( obj ) {
                rootThree.scene.add( obj );0
            },
        
            // onProgress callback
            function ( xhr ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                return;
            },
        
            // onError callback
            function ( err ) {
                console.error( 'An error happened' );
            }
        );
    }

    /*
     move the box selected by its name controlled by the cursor keys
     */
     moveBox(obj: ThreeRootSingleton) {
        obj.controllerCheck('PlayerBoxObj', 0.33);
    }

    /*
     add the boundigs to the play-objects
     */
    addBoundings() {
        // create a list with all objects that needs a collision detection
        const objectNames = new Array<string>();
        objectNames.push('PlayerBoxObj');
        objectNames.push('Pill1Obj');
        objectNames.push('Pill2Obj');
        objectNames.push('Pill3Obj');
        objectNames.push('Pill4Obj');
        objectNames.push('Pill5Obj');
        objectNames.push('Pill6Obj');

        const gameObj = rootThree.scene.getObjectByName(objectNames[0]);
        gameObj?.clear();




    }

}