import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls';
import Stats from 'stats';
import { GUI } from 'gui';

// the container contains the scene and all objects
export class SceneContainer{
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
