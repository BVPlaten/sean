// the canvas
import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls'
import Stats from 'stats'
import { GUI } from 'gui'

import { changeGeometry } from './geomFactory.js'
import model from './model.js'


export default class PlayField {
    private components: model = new model();

    constructor() {
        this.components.scene = new THREE.Scene()
        this.components.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        this.components.camera.position.z = 2
        
        this.components.renderer = new THREE.WebGLRenderer()
        this.components.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.components.renderer.domElement)
        
        this.components.controls = new OrbitControls(this.components.camera, this.components.renderer.domElement)
        
        // ****
        this.components.material = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true})
        /*
        this.components.mesh = new THREE.Mesh(this.components.geometry, this.components.material );
        this.components.scene.add(this.components.mesh)
        */
       this.switchGeometry("Box");
        // ****
        
        this.components.stats = Stats()
        document.body.appendChild(this.components.stats.dom)
        
        this.components.gui = new GUI()
        const cubeFolder = this.components.gui.addFolder('Cube')
        /*
        cubeFolder.add(cube.scale, 'x', -5, 5)
        cubeFolder.add(cube.scale, 'y', -5, 5)
        cubeFolder.add(cube.scale, 'z', -5, 5)
        */
        cubeFolder.open()
        const cameraFolder = this.components.gui.addFolder('Camera')
        cameraFolder.add(this.components.camera.position, 'z', 0, 10)
        cameraFolder.open()
    }

    switchGeometry(geomName: string): void{
        if(this.components.geometry != undefined){
            this.components.geometry.dispose();
        }
        this.components.geometry = changeGeometry(geomName);
        this.components.mesh = new THREE.Mesh(this.components.geometry, this.components.material );
        this.components.scene.clear();
        this.components.scene.add(this.components.mesh)
    }

    updateAnimate() {
        this.components.mesh.rotation.x += Math.PI / 270;
        this.components.mesh.rotation.y += Math.PI / 360;
        this.components.controls.update()
        this.components.stats.update()
    }

    render() {
        this.components.renderer.render(this.components.scene, this.components.camera);
    }
    
    resize() {
        this.components.camera.aspect = window.innerWidth / window.innerHeight
        this.components.camera.updateProjectionMatrix()
        this.components.renderer.setSize(window.innerWidth, window.innerHeight)
        this.render()
    }
}
