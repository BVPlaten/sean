// this module contains all classes for geometries
import * as THREE from 'three';
/* meshWrapper creates the mesh to be added to the scene
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
class meshWrapper {
    get material() {
        return this._material;
    }
    set material(value) {
        this._material = value;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        this._mesh = value;
    }
    constructor(geometry) {
        // const geometry = new THREE.SphereGeometry( 1, 24, 24 );
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });
        this.mesh = new THREE.Mesh(geometry, this.material);
    }
}
/* create the requested mesh
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
class Factory {
    get geometry() {
        return this._geometry;
    }
    set geometry(value) {
        this._geometry = value;
    }
    constructor(typeOfObject) {
        this.changeGeometry(typeOfObject);
    }
    changeGeometry(typeOfObject) {
        switch (typeOfObject) {
            case "Box":
                this._geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case "Sphere":
                this._geometry = new THREE.SphereGeometry(15, 32, 16);
                break;
            case "TorusKnot":
                this._geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
                break;
            default:
                break;
        }
    }
}
const makeMesh = (geometryName) => {
    const geometry = new THREE.SphereGeometry(1, 24, 24);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff7733,
        wireframe: true
    });
    const object = new THREE.Mesh(geometry, material);
    return object;
};
export default makeMesh;
