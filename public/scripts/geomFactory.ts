// this module contains all classes for geometries
import * as THREE from 'three'


class GeometryBase {
    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.MeshBasicMaterial;
    private _mesh!: THREE.Mesh;

    public get geometry(): THREE.BufferGeometry {
        return this._geometry;
    }
    public set geometry(value: THREE.BufferGeometry) {
        this._geometry = value;
    }
    
    public get material(): THREE.MeshBasicMaterial {
        return this._material;
    }
    public set material(value: THREE.MeshBasicMaterial) {
        this._material = value;
    }

    public get mesh(): THREE.Mesh {
        return this._mesh;
    }
    public set mesh(value: THREE.Mesh) {
        this._mesh = value;
    }

    constructor() {
        console.log("GeometryBase Constructor called")
        this.geometry = new THREE.BufferGeometry();
        this.material  = new THREE.MeshBasicMaterial();
        this.mesh  = new THREE.Mesh();
    
    }

};


class Box extends GeometryBase {
    constructor() {
        super();
        console.log("Box  Constructor called")

        this.geometry =  new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff77,
            wireframe: true,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
};

class Sphere extends GeometryBase {
    constructor() {
        super();
        console.log("Box  Constructor called")

        this.geometry =  new THREE.SphereGeometry( 15, 32, 16 );
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff77,
            wireframe: true,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
};

class TorusKnot extends GeometryBase {
    constructor() {
        super();
        console.log("Box  Constructor called")

        this.geometry =  new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff77,
            wireframe: true,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
};



class Factory {
    private _geometry: GeometryBase;

    public get geometry() {
        return this._geometry;
    }

    constructor(typeOfObject: string){
        this._geometry = new GeometryBase();

        switch (typeOfObject) {
            case "Box":
                console.log("Box will be created!")
                this._geometry = new Box();
                break;
            case "Sphere":
                console.log("Sphere will be created!")
                this._geometry = new Sphere();
                break;
            case "TorusKnot":
                console.log("TorusKnot will be created!")
                this._geometry = new TorusKnot();
                break;
            default:
                console.log("It is immpossible to press here !!!")
                break;
        }
    }
}


export default Factory;