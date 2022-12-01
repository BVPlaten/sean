// the canvas
import * as THREE from 'three'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import Stats from '../jsm/libs/stats.module.js'
import { GUI } from '../jsm/libs/lil-gui.module.min.js'

export default class RootScene {
    scene! :THREE.Scene;
    camera! :THREE.PerspectiveCamera;
    renderer! :THREE.WebGLRenderer;
    controls! :OrbitControls;
    stats! :Stats; 
    gui! :GUI;


    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        this.camera.position.z = 2
        
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        
        // ****
        this.scene.add(this.addSphere());
        // ****
        
        this.stats = Stats()
        document.body.appendChild(this.stats.dom)
        
        this.gui = new GUI()
        const cubeFolder = this.gui.addFolder('Cube')
        /*
        cubeFolder.add(cube.scale, 'x', -5, 5)
        cubeFolder.add(cube.scale, 'y', -5, 5)
        cubeFolder.add(cube.scale, 'z', -5, 5)
        */
        cubeFolder.open()
        const cameraFolder = this.gui.addFolder('Camera')
        cameraFolder.add(this.camera.position, 'z', 0, 10)
        cameraFolder.open()
    }

    addSphere(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry( 1, 24, 24 );
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        })
        const object = new THREE.Mesh(geometry, material)
        return object;
    }

    updateAnimate() {
        this.controls.update()
        this.stats.update()
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
    

}
