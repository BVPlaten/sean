import * as THREE from 'three';
import {world, ActionWorld} from './ActionWorld.js'
import {controllKeys} from './main.js'


/* 
 * SceneCtrlr
 *
 * The Scene will become a simple clone of the worms game
 * 
 * 
 */

export default class SceneCtrlr {
    localRenderFunc: Function;

    /*
     constructor 
     Param: sceneFile : string : path with filename to load 
     */
    constructor(private sceneFile : string) {
        this.loadScene();
        this.addBoundings()

        // a function called by the renderer 
        this.localRenderFunc = (obj: ActionWorld) => {
            obj.rendr.render(obj.scene, obj.cam);
            this.moveBox(obj);
        }

        // rendering is done in the world object
        world.renderFunc = this.localRenderFunc;
    }

    /*
     load the JSON object with the scene definition
     */
    loadScene(): void {
        world.scene.clear();
        //this.localRenderFunc(rootThree); 
        const Loader = new THREE.ObjectLoader();
        Loader.load(
            // resource URL
            this.sceneFile,
        
            // onLoad callback
            // Here the loaded data is assumed to be an object
            function ( obj: any ) {
                world.scene.add( obj );0
            },
        
            // onProgress callback
            function ( xhr: any ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                return;
            },
        
            // onError callback
            function ( err: any ) {
                console.error( 'An error happened' );
            }
        );
    }

    /*
     move the box selected by its name controlled by the cursor keys
     */
     moveBox(obj: ActionWorld) {
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

        const gameObj = world.scene.getObjectByName(objectNames[0]);
        gameObj?.clear();
    }
}