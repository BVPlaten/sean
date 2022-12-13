import { rootThree } from './Root.js';
function moveBox(obj) {
    obj.controllerCheck('Box');
}
export default function consumeThePillsRender(obj) {
    let renderPillConsume = (obj) => {
        obj.rendr.render(obj.scene, obj.cam);
        moveBox(obj);
        obj.update('RotationObject');
    };
    rootThree.renderFunc = renderPillConsume;
}
//# sourceMappingURL=ConsumeThePills.js.map