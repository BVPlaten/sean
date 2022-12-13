import * as THREE from 'three';
import { rootThree, ThreeRootSingleton } from './Root.js'
import { changeGeometry, singleGeometryRender } from './singleGeometry.js'
import consumeThePillsRender from './ConsumeThePills.js'

/*
    example to load a scene created with the three.js editor online : https://threejs.org/editor/ 
 */
export function LoadModel() {
    rootThree.scene.clear();
    consumeThePillsRender(rootThree); 

    const Loader = new THREE.ObjectLoader();
    Loader.load(
        // resource URL
        "./scripts/scene_play.json",
    
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
            rootThree.scene.add( obj );0
        },
    
        // onProgress callback
        function ( xhr ) {
            //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            return;
        },
    
        // onError callback
        function ( err ) {
            console.error( 'An error happened' );
        }
    );
    // Alternatively, to parse a previously loaded JSON structure
    // const object = loader.parse( a_json_object );
    // scene.add( object );
}

/* 
    function that switches the geometry by a given id
 */
export function SwitchGeomtry(geomId: string){
    rootThree.scene.clear(); 
    singleGeometryRender(rootThree);

    const geom: THREE.BufferGeometry = changeGeometry(geomId);
    const mtrl: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true})

    const mesh = new THREE.Mesh(geom, mtrl );
    mesh.name = 'RotationObject';
    rootThree.scene.add(mesh);
}