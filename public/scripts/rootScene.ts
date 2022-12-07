// the canvas
import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';

import { changeGeometry } from './geomFactory.js'
import { SceneContainer } from './model.js'


export default class PlayField {
    private _m: SceneContainer = new SceneContainer();
    public get m(): SceneContainer {
        return this._m;
    }
    public set m(value: SceneContainer) {
        this._m = value;
    }

    constructor() {
        this.m.scene = new THREE.Scene()
        this.m.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        this.m.camera.position.z = 2
        
        this.m.renderer = new THREE.WebGLRenderer()
        this.m.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.m.renderer.domElement)
        
        this.m.controls = new OrbitControls(this.m.camera, this.m.renderer.domElement)
        
        // ****
        this.m.material = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true})

        this.switchGeometry("Box");
        
        this.m.stats = Stats()
        document.body.appendChild(this.m.stats.dom)
        
        this.m.gui = new GUI()
        const cubeFolder = this.m.gui.addFolder('Cube')

        cubeFolder.open()
        const cameraFolder = this.m.gui.addFolder('Camera')
        cameraFolder.add(this.m.camera.position, 'z', 0, 10)
        cameraFolder.open()
    }

    switchGeometry(geomName: string): void{
        if(this.m.geometry != undefined){
            this.m.geometry.dispose();
        }
        this.m.geometry = changeGeometry(geomName);
        this.m.mesh = new THREE.Mesh(this.m.geometry, this.m.material );
        this.m.scene.clear();
        this.m.scene.add(this.m.mesh)
    }

    updateAnimate() {
        this.m.mesh.rotation.x += Math.PI / 270;
        this.m.mesh.rotation.y += Math.PI / 360;
        this.m.controls.update()
        this.m.stats.update()
    }

    render() {
        this.m.renderer.render(this.m.scene, this.m.camera);
    }
    
    resize() {
        this.m.camera.aspect = window.innerWidth / window.innerHeight
        this.m.camera.updateProjectionMatrix()
        this.m.renderer.setSize(window.innerWidth, window.innerHeight)
        this.render()
    }

    getScene() {
        return this.m.scene;
    }
}
