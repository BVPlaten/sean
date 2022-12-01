// creates a box for three.js rendering
import THREE from 'three'

class Box {
    geometry = new THREE.BufferGeometry();
    constructor() {


    }
}

function createGeom(cam: THREE.PerspectiveCamera, rend: THREE.WebGLRenderer){
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff77,
        wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
}

export { createGeom };