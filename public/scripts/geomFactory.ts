// this module contains all classes for geometries
import * as THREE from 'three'

/* meshWrapper creates the mesh to be added to the scene
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
class meshWrapper {
    private _material!: THREE.MeshBasicMaterial;
    public get material(): THREE.MeshBasicMaterial {
        return this._material;
    }
    public set material(value: THREE.MeshBasicMaterial) {
        this._material = value;
    }
    
    private _mesh!: THREE.Mesh;
    public get mesh(): THREE.Mesh {
        return this._mesh;
    }
    public set mesh(value: THREE.Mesh) {
        this._mesh = value;
    }

    constructor(geometry: THREE.BufferGeometry){
        // const geometry = new THREE.SphereGeometry( 1, 24, 24 );
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        })
        this.mesh = new THREE.Mesh(geometry, this.material)
    }
}



/* create the requested mesh
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
class Factory {
    private _geometry!: THREE.BufferGeometry;

    public get geometry(): THREE.BufferGeometry {
        return this._geometry;
    }
    public set geometry(value: THREE.BufferGeometry) {
        this._geometry = value;
    }
    
    constructor(typeOfObject: string){
        this.changeGeometry(typeOfObject);
    }

    changeGeometry(typeOfObject: string) {
        switch (typeOfObject) {
            case "Box":
                this._geometry = new THREE.BoxGeometry( 1, 1, 1 );
                break;
            case "Sphere":
                this._geometry = new THREE.SphereGeometry( 15, 32, 16 );
                break;
            case "TorusKnot":
                this._geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
                break;
            default:
                break;
        }
    }
}


const makeMesh = (geometryName: string): THREE.Mesh => {
    const geomCreate: Factory = new Factory(geometryName);
    const mesh: meshWrapper = new meshWrapper(geomCreate.geometry);

    return mesh.mesh;
};

export default makeMesh;
