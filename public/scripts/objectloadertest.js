import * as THREE from 'three';
// example to load a scene created with the three.js editor online : https://threejs.org/editor/
export function startLoad(model) {
    model.scene.clear();
    const Loader = new THREE.ObjectLoader();
    Loader.load(
    // resource URL
    "./scripts/scene_test.json", 
    // onLoad callback
    // Here the loaded data is assumed to be an object
    function (obj) {
        // Add the loaded object to the scene
        model.scene.add(obj);
    }, 
    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, 
    // onError callback
    function (err) {
        console.error('An error happened');
    });
}
// Alternatively, to parse a previously loaded JSON structure
//const object = loader.parse( a_json_object );
//scene.add( object );
