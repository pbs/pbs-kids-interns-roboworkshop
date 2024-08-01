import * as PIXI from 'pixi.js';

export class decoration extends PIXI.Sprite
{
    // why is it formtted this way? instead of just x, y, shape
    constructor({ x = 0, y = 0, image = 'null' } = {})
    {
        const texture = PIXI.Assets.get(image);
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);

        this.eventMode = 'static'; // allows the shapes to be interactive
        this.cursor = 'pointer'; // on mouse over (i.e. when the cursor is over the object)... change its appearance to one that shows that there's a click/drag interaction
    
    }
    
    update()
    {
        // nothing to keep track of
    }
}