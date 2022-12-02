import * as THREE from 'three'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import Stats from '../jsm/libs/stats.module.js'
import { GUI } from '../jsm/libs/lil-gui.module.min.js'

export default class ThreeModel{
    public scene! :THREE.Scene;
    public geometry!: THREE.BufferGeometry;
    public material!: THREE.MeshBasicMaterial;
    public mesh!: THREE.Mesh;

    public camera! :THREE.PerspectiveCamera;
    public renderer! :THREE.WebGLRenderer;
    public controls! :OrbitControls;
    public stats! :Stats; 
    public gui! :GUI;
}
