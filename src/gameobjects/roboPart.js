// import { GAMEPLAY } from '../constants';
import * as PIXI from 'pixi.js';
// import { Game } from '../game';
// import { GameScene } from '../scenes/gameScene';

export class roboPart extends PIXI.Sprite
{
    // why is it formtted this way? instead of just x, y, shape
    constructor({ x = 0, y = 0, shape = 'null' } = {})
    {
        const texture = PIXI.Assets.get(shape);
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);
        // this.velocity = new PIXI.Point(0, 0);

        // this.hitSound = PIXI.Assets.get('bounce');

        this.eventMode = 'static'; // allows the shapes to be interactive
        this.cursor = 'pointer'; // on mouse over (i.e. when the cursor is over the object)... change its appearance to one that shows that there's a click/drag interaction

        this.dragTarget = null;
        this.dragInProgress = false;
    }
    
    update()
    {
        
        // this.velocity.y += GAMEPLAY.GRAVITY * ticker.deltaTime;
        // this.position.y += this.velocity.y * ticker.deltaTime;
        
        // if(this.position.y > 680)
        // {
        //     this.position.y = 679;
        //     this.velocity.y *= -1;

        //     this.hitSound.play();
        // }
        
        //console.log("update loop running");

        this.on('pointerdown', this.onDragStart);

        this.on('pointerup', this.onDragEnd);
        this.on('pointerupoutside', this.onDragEnd);
        
    }
    
    onDragStart() {
        // console.log("user is clicking on shape");
        if (!this.dragInProgress) {
            this.dragTarget = this;
            this.dragInProgress = true;
            this.alpha = 0.75;
            this.on('pointermove', this.onDragMove);
        }   
    }

    onDragMove(event) {
        //console.log("user is moving cursor!");
        if (this.dragTarget) {
            // console.log("drag target registered");
            this.dragTarget.parent.toLocal(event.global, this.dragTarget.parent, this.dragTarget.position);
            //console.log();
        }
    }

    onDragEnd() {
        // console.log("user has stopped interacting");
        if (this.dragInProgress && this.dragTarget) {
            // console.log("user has stopped interacting");
            this.dragTarget = null;
            this.alpha = 1;
            this.dragInProgress = false;
        }
    }
    
}