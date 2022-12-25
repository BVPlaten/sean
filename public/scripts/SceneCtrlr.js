import * as THREE from 'three';
import { world } from './ActionWorld.js';
/*
 * SceneCtrlr
 *
 * The Scene will become a simple clone of the worms game
 *
 *
 */
export default class SceneCtrlr {
    /*
     constructor
     Param: sceneFile : string : path with filename to load
     */
    constructor(sceneFile) {
        this.sceneFile = sceneFile;
        this.loadScene();
        this.addBoundings();
        // a function called by the renderer 
        this.localRenderFunc = (obj) => {
            obj.rendr.render(obj.scene, obj.cam);
            this.moveBox(obj);
        };
        // rendering is done in the world object
        world.renderFunc = this.localRenderFunc;
    }
    /*
     load the JSON object with the scene definition
     */
    loadScene() {
        world.scene.clear();
        //this.localRenderFunc(rootThree); 
        const Loader = new THREE.ObjectLoader();
        Loader.load(
        // resource URL
        this.sceneFile, 
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function (obj) {
            world.scene.add(obj);
            0;
        }, 
        // onProgress callback
        function (xhr) {
            //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            return;
        }, 
        // onError callback
        function (err) {
            console.error('An error happened');
        });
    }
    /*
     move the box selected by its name controlled by the cursor keys
     */
    moveBox(obj) {
        obj.controllerCheck('PlayerBoxObj', 0.33);
    }
    /*
     add the boundigs to the play-objects
     */
    addBoundings() {
        // create a list with all objects that needs a collision detection
        const objectNames = new Array();
        objectNames.push('PlayerBoxObj');
        objectNames.push('Pill1Obj');
        objectNames.push('Pill2Obj');
        objectNames.push('Pill3Obj');
        objectNames.push('Pill4Obj');
        objectNames.push('Pill5Obj');
        objectNames.push('Pill6Obj');
        const gameObj = world.scene.getObjectByName(objectNames[0]);
        gameObj === null || gameObj === void 0 ? void 0 : gameObj.clear();
    }
}
//# sourceMappingURL=SceneCtrlr.js.map