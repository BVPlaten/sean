import * as THREE from 'three';
import { rootThree } from './Root.js';
export class PillConsuming {
    /*
     constructor
     Param: sceneFile : string : path with filename to load
     */
    constructor(sceneFile) {
        this.sceneFile = sceneFile;
        this.loadScene();
        this.addBoundings();
        this.localRenderFunc = (obj) => {
            obj.rendr.render(obj.scene, obj.cam);
            this.moveBox(obj);
            obj.update('RotationObject');
        };
        rootThree.renderFunc = this.localRenderFunc;
    }
    /*
     load the JSON object with the scene definition
     */
    loadScene() {
        rootThree.scene.clear();
        //this.localRenderFunc(rootThree); 
        const Loader = new THREE.ObjectLoader();
        Loader.load(
        // resource URL
        this.sceneFile, 
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function (obj) {
            rootThree.scene.add(obj);
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
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=PillConsuming.js.map