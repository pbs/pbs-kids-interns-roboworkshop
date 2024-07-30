import * as PIXI from 'pixi.js';

export class toolbox extends PIXI.Sprite
{
    constructor({ x = 0, y = 0, closedBox = 'null', openBox = 'null', type = 'null' } = {})
    {
        
        const openTexture = PIXI.Assets.get(openBox);
        const closedTexture = PIXI.Assets.get(closedBox);
        super(closedTexture); // the box starts out as closed

        this.x = x;
        this.y = y;

        this.open = false; // toolbox is yet to be opened/used
        this.type = type;

        this.closedTexture = closedTexture;
        this.openTexture = openTexture;

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);

        this.eventMode = 'static'; // allows the shapes to be interactive
        this.cursor = 'pointer'; // on mouse over (i.e. when the cursor is over the object)... change its appearance to one that shows that there's a click/drag interaction
    
        this.on('pointerover', () =>
        {
            this.alpha = 0.75;
        });
    
        this.on('pointerleave', () =>
        {
            this.alpha = 1;
        });

    }
    
    update()
    {
        // nothing to update
    }
    
}