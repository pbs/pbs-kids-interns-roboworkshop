import * as PIXI from 'pixi.js';

export class roboFrame extends PIXI.Sprite
{
    constructor({ x = 0, y = 0, shape = 'null' } = {})
    {
        const texture = PIXI.Assets.get(shape);
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);

        this.eventMode = 'static'; // allows the shapes to be interactive
        this.cursor = 'pointer'; 

        this.on('pointerover', () =>
        {
            this.tint = 0xffffff;
        });

        this.on('pointerleave', () =>
        {
            this.tint = 0xcccccc;
        });
    }
    
    update()
    {
        // nothing to keep track of
    }
}