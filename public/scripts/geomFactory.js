// this module contains all classes for geometries
import * as THREE from 'three';
/* create the requested mesh
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
function changeGeometry(componentName) {
    switch (componentName) {
        case "Box":
            return new THREE.BoxGeometry(1, 1, 1);
            break;
        case "Sphere":
            return new THREE.SphereGeometry(0.75, 24, 24);
            break;
        case "TorusKnot":
            return new THREE.TorusKnotGeometry(0.75, 0.1, 64, 12, 0.2, 3);
            break;
        default:
            return new THREE.BoxGeometry(0.1, 0.1, 0.1);
            break;
    }
}
export { changeGeometry };
