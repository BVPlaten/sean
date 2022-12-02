// the canvas
import * as THREE from 'three';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import Stats from '../jsm/libs/stats.module.js';
import { GUI } from '../jsm/libs/lil-gui.module.min.js';
import makeMesh from './geomFactory';
export default class RootScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 2;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // ****
        this.scene.add(this.switchGeometry("Box"));
        // ****
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        this.gui = new GUI();
        const cubeFolder = this.gui.addFolder('Cube');
        /*
        cubeFolder.add(cube.scale, 'x', -5, 5)
        cubeFolder.add(cube.scale, 'y', -5, 5)
        cubeFolder.add(cube.scale, 'z', -5, 5)
        */
        cubeFolder.open();
        const cameraFolder = this.gui.addFolder('Camera');
        cameraFolder.add(this.camera.position, 'z', 0, 10);
        cameraFolder.open();
    }
    switchGeometry(geomName) {
        return makeMesh(geomName);
    }
    updateAnimate() {
        this.controls.update();
        this.stats.update();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
}
