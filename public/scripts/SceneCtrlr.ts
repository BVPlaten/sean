import {Scene,Mesh,ObjectLoader,AudioListener} from 'three';
import {controllKeys} from './main.js'


/* 
 * SceneCtrlr
 *
 * The Scene will become a simple clone of the worms game
 * 
 * 
 */

export default class SceneCtrlr {
    private _scene: Scene;
    public get scene(): Scene {
        return this._scene;
    }
    public set scene(value: Scene) {
        this._scene = value;
    }


    /*
     constructor 
     Param: sceneFile : string : path with filename to load 
     */
    constructor(private fileName: string) {
        this._scene = new Scene();

        this.loadScene(fileName);
    }


    /*
     load the JSON object with the scene definition
     */
    loadScene(sceneFile: string): void {
        this._scene.clear();
        //this.localRenderFunc(rootThree); 
        const Loader = new ObjectLoader();

        Loader.load(
            // resource URL
            sceneFile,
        
            // onLoad callback
            // Here the loaded data is assumed to be an object
            ( obj: any ) => {
                this._scene.add( obj );
            },
        
            // onProgress callback
            ( xhr: any ) => {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                return;
            },
        
            // onError callback
            ( err: any ) => {
                console.error( `An error happened ${err}` );
            }
        );
    }


    /* 
     write all object3d instances of the scene to the console
    tellMeAll() {
        super.traverse( ( obj: any ) => {
            if ( obj instanceof Mesh ) console.log( obj );
        });
    }
    */

    /*
     get 3dobject by name from the scene
     */
    /*
    getObjectByName(objName: string) {
        return this.getObjectByName(objName)
    }
    */


    /*
     the animate function is called by the render function for every frame
     */
    update(){
        const animObj = this._scene.getObjectByName('PlayerBoxObj');
        if(animObj === undefined) {return};
        animObj.rotation.y += 0.0724;
        animObj.rotation.x += 0.0359;
    }


    /*
     react to keyboard press event
     TODO the animation logic should be put to the scene-controller
     */
    moveByKey(objName : string, step: number = .25) {
        // console.log(controllKeys);
        const animObj = this._scene.getObjectByName(objName);

        if ((animObj !== undefined) && (animObj !== null)) {
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

        //const gameObj = world.scene.getObjectByName(objectNames[0]);
        //gameObj?.clear();
    }

}