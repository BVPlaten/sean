import {Scene,Mesh,MeshBasicMaterial,Object3D,Box3,Sphere,Vector3} from 'three';
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
    public arrOfObstcls: Array<object>;
    knotBSphere: any;

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
    constructor(private gameObject: any) {
        this._scene = new Scene();
        this._scene.add(gameObject);
        this.arrOfObstcls = new Array<object>;

        // https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection/Bounding_volume_collision_detection_with_THREE.js
        // expand THREE.js Sphere to support collision tests vs Box3
        // we are creating a vector outside the method scope to
        // avoid spawning a new instance of Vector3 on every check
        Sphere.__closest = new Vector3();
        Sphere.prototype.intersectsBox = function (box: Mesh) {
        // get box closest point to sphere center by clamping
        Sphere.__closest.set(this.center.x, this.center.y, this.center.z);
        Sphere.__closest.clamp(box.min, box.max);
        const distance = this.center.distanceToSquared(Sphere.__closest);
        return distance < this.radius * this.radius;
        };
    }

    private collision() {
        const playerBox = this._scene.getObjectByName('PlayerBoxObj');
        playerBox.geometry.computeBoundingBox();
        const knotBBox = new Box3(
            playerBox.geometry.boundingBox.min,
            playerBox.geometry.boundingBox.max
          );

        const specialPill = this._scene.getObjectByName('Pill3Obj');
        specialPill.geometry.computeBoundingSphere();
        const knotBSphere = new Sphere(specialPill.position, 
                                       specialPill.geometry.boundingSphere.radius );
        if(knotBSphere.intersectsBox(knotBBox)) {
            console.log('Kontakt !!!');
        }
                            
    }

    /*
     the animate function is called by the render function for every frame
     */
    update(){
        const animObj = this._scene.getObjectByName('PlayerBoxObj');
        if(animObj === undefined) {return};
        animObj.rotation.y += 0.0724;
        animObj.rotation.x += 0.0359;
        this.collision();
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
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ToDo
Mach ersteinmal eine einfache funktion in der dur die einzelnennen Object§D Instanzen aus der Szene ausliest ubd diese dann 
mit einem bounding versiehst 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ToDo
*/

    /*
     add boundings to game-objects
     */
    addBoundings() {
        // create a list with all objects that needs a collision detection
        let objNames = ['PlayerBoxObj', 'Pill1Obj', 'Pill2Obj', 'Pill3Obj', 'Pill4Obj', 'Pill5Obj', 'Pill6Obj'];
        const setBounding =  (child: Object3D ) => {
            if( child instanceof Mesh ) {
                if(child.name.startsWith('Player')) {
                    this.addBoundingBox(child);
                }
                if(child.name.startsWith('Pill')) {
                    this.addBoundingSphere(child);
                }
            }
        };
        this._scene.traverse( (child: Object3D) => {setBounding( child ) });
    }

    /*
     add bounding box to the player-object
     */
    addBoundingBox(child: Object3D) {
        console.log(`Player Mesh detected ${child.name} : Box`)
        // return;
        const knotBBox = new Box3(new Vector3(), new Vector3());
        knotBBox.setFromObject(child);
    }

    /*
     add bounding sphere to the obstacles
    */
    addBoundingSphere(child: Object3D) {
        console.log(`Obstacle Mesh detected ${child.name} : Sphere`)
        // return;
        const knotBSphere = new Sphere(
            child.position,
            child.geometry.boundingSphere.radius
            );
        this.arrOfObstcls.push(knotBSphere)
    }


}
