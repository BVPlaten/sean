import * as THREE from 'three'
import { rootThree, ThreeRootSingleton } from './Root.js'

/* 
   create the requested mesh
 */
function changeGeometry(componentName: string): THREE.BufferGeometry {
    let objToAdd: THREE.BufferGeometry;
    switch (componentName) {
        case "Box":
            objToAdd = new THREE.BoxGeometry( 1, 1, 1 );
            break;
        case "Sphere":
            objToAdd = new THREE.SphereGeometry( 0.75, 24, 24 );
            break;
        case "TorusKnot":
            objToAdd = new THREE.TorusKnotGeometry( 0.75, 0.1, 64, 12, 0.2, 3 );
            break;
        default:
            objToAdd = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
            break;
    }
    return objToAdd;
}


function singleGeometryRender(obj: ThreeRootSingleton){
    
    let renderOneGeometry = (obj: ThreeRootSingleton) => {
        obj.rendr.render(obj.scene, obj.cam);
        obj.update('RotationObject')
        obj.controllerCheck('RotationObject');
    }
    rootThree.renderFunc = renderOneGeometry;
}

export { changeGeometry, singleGeometryRender };