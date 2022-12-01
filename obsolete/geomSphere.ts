// creates a sphere for three.js
import * as THREE from 'three'

function createGeom(cam: THREE.PerspectiveCamera, rend: THREE.WebGLRenderer){
    const geometry = new THREE.SphereGeometry( 1, 24, 24 );
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
}

export { createGeom };