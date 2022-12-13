import {rootThree, ThreeRootSingleton} from './Root.js'
import {controllKeys} from './main.js'


function moveBox(obj: ThreeRootSingleton) {
    obj.controllerCheck('Box');
}


export default function consumeThePillsRender(obj: ThreeRootSingleton){

    let renderPillConsume = (obj: ThreeRootSingleton) => {
        obj.rendr.render(obj.scene, obj.cam);
        moveBox(obj);
        obj.update('RotationObject')
    }
    rootThree.renderFunc = renderPillConsume;
}
