import * as PIXI from 'pixi.js';

export class roboFrame extends PIXI.Sprite
{
    constructor({ x = 0, y = 0, shape = 'null'} = {})
    {
        const texture = PIXI.Assets.get(shape);
        super(texture);

        this.currentShape = null; // no shape that's currently on top of the frame yet

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);

        this.eventMode = 'static';
        this.cursor = 'pointer'; 

        /*
        this.on('pointerover', () =>
        {
            this.alpha = 0.75;
        });

        this.on('pointerleave', () =>
        {
            this.alpha = 1;
        });
        */
    }
    
    update()
    {
        // nothing to keep track of
    }
}