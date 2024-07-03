import { GAMEPLAY } from '../constants';
import * as PIXI from 'pixi.js';

export class roboPart extends PIXI.Sprite
{
    // why is it formtted this way? instead of just x, y, shape
    constructor({ x = 0, y = 0, shape = 'null' } = {})
    {
        const texture = PIXI.Assets.get(shape);
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);
        this.velocity = new PIXI.Point(0, 0);

        this.hitSound = PIXI.Assets.get('bounce');

        this.eventMode = 'static'; // allows the shapes to be interactive
        this.cursor = 'pointer'; // on mouse over (i.e. when the cursor is over the object)... change its appearance to one that shows that there's a click/drag interaction
    }

    update(ticker)
    {
        
        this.velocity.y += GAMEPLAY.GRAVITY * ticker.deltaTime;
        this.position.y += this.velocity.y * ticker.deltaTime;
        
        if(this.position.y > 680)
        {
            this.position.y = 679;
            this.velocity.y *= -1;

            this.hitSound.play();
        }
    }
}