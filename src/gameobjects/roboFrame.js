import * as PIXI from 'pixi.js';

export class roboFrame extends PIXI.Sprite
{
    constructor({ x = 0, y = 0, image = 'null', shape = 'null'} = {})
    {
        const texture = PIXI.Assets.get(image);
        super(texture);

        this.currentShape = null; // no shape that's currently on top of the frame yet

        this.shape = shape; // to help with debugging

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);

        this.eventMode = 'static';
    }
    
    update()
    {
        // nothing to keep track of
    }
}