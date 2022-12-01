// this module contains all classes for geometries
import * as THREE from 'three';
class GeometryBase {
    get geometry() {
        return this._geometry;
    }
    set geometry(value) {
        this._geometry = value;
    }
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
    constructor() {
        console.log("GeometryBase Constructor called");
        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.MeshBasicMaterial();
        this.mesh = new THREE.Mesh();
    }
}
;
class Box extends GeometryBase {
    constructor() {
        super();
        console.log("Box  Constructor called");
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff77,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
;
class Sphere extends GeometryBase {
    constructor() {
        super();
        console.log("Box  Constructor called");
        this.geometry = new THREE.SphereGeometry(15, 32, 16);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff77,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
;
class TorusKnot extends GeometryBase {
    constructor() {
        super();
        console.log("Box  Constructor called");
        this.geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff77,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
;
class Factory {
    get geometry() {
        return this._geometry;
    }
    constructor(typeOfObject) {
        this._geometry = new GeometryBase();
        switch (typeOfObject) {
            case "Box":
                console.log("Box will be created!");
                this._geometry = new Box();
                break;
            case "Sphere":
                console.log("Sphere will be created!");
                this._geometry = new Sphere();
                break;
            case "TorusKnot":
                console.log("TorusKnot will be created!");
                this._geometry = new TorusKnot();
                break;
            default:
                console.log("It is immpossible to press here !!!");
                break;
        }
    }
}
export default Factory;
