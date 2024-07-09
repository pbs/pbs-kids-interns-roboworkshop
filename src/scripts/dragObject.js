import { EventEmitter } from 'pixi.js';
import { roboPart } from '../gameobjects/roboPart';

class dragObject extends EventEmitter {

    /* set up dragging logic */

    async() {

        const ee = new EventEmitter();

        let dragTarget = null; // there's nothing being dragged yet
        ee.eventMode = 'static'; // defines the type of interaction for the container (in this case, the stage) ... static emits events and detects hits, equivalent to 'interaction = true'
        ee.hitArea = ee.screen; // sets the whole screen to be a possible hit area 
        ee.on('pointerup', onDragEnd); // triggers "drag end" event when player releases pointer
        ee.on('pointerupoutside', onDragEnd); // same as above, but when the player releases the pointer outside the hit area (in this case, going outside of the screen)

        roboPart.on('pointerdown', onDragStart, this);

        function onDragMove(originalEvent)
        {
            if (dragTarget)
            {
                dragTarget.parent.toLocal(originalEvent.global, null, dragTarget.position);
            }
        }

        function onDragStart()
        {
            // Store a reference to the data
            // * The reason for this is because of multitouch *
            // * We want to track the movement of this particular touch *
            this.alpha = 0.5;
            dragTarget = this;
            ee.on('pointermove', onDragMove);
        }

        function onDragEnd()
        {
            if (dragTarget)
            {
                ee.off('pointermove', onDragMove);
                dragTarget.alpha = 1;
                dragTarget = null;
            }
        }

    }

}

export default dragObject;
