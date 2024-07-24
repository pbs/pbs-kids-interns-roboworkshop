import * as PIXI from 'pixi.js';

export class toolbox extends PIXI.Sprite
{
    // why is it formtted this way? instead of just x, y, shape
    constructor({ x = 0, y = 0, closedBox = 'null', openBox = 'null' } = {})
    {
        
        const texture = PIXI.Assets.get(closedBox);
        super(texture);

        // check which box image to display... starting with a closed box
        //let box = closedBox;
        this.openBox = openBox;
        this.closedBox = closedBox;

        this.x = x;
        this.y = y;

        // this.box = box; // to help with debugging
        this.open = false; // toolbox is yet to be opened/used

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

        this.on('pointerdown', () =>
        {
            // if the box is open, close it... otherwise, open it
            if (this.open) {
                this.open = false;
                this.texture = openBox;
            } else {
                this.open = true;
                this.texture = closedBox;
            }
        });

    }
    
    update()
    {
        
        // switch(toolboxOpen) {
        //     case headBox:
        //         this.displayHeadParts();
        //         break;
        // } 
    }
    
}