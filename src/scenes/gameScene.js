import { roboPart } from '../gameobjects/roboPart';
//import { dragObject } from '../scripts/dragObject';
import * as PIXI from 'pixi.js';

export class GameScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        PIXI.Assets.add({alias: 'hexagon', src: './assets/hexagon.png'});
        PIXI.Assets.add({alias: 'star', src: './assets/star.png'});
        PIXI.Assets.add({alias: 'square', src: './assets/whitesquare120x120.png'});
        PIXI.Assets.add({alias: 'bounce', src: './assets/bounce.mp3'});

        await PIXI.Assets.load(['hexagon', 'star', 'square', 'bounce']);
    }

    start()
    {
        const texture = PIXI.Assets.get('testBG');
        const scalerBackground = new PIXI.Sprite(texture);
        this.addChild(scalerBackground);

        // add dragging functionality
        // let dragTarget = null;

        // add some items to this scene
        let hexagon = new roboPart({ x: (this.game.width / 2) + 100, y: this.game.height / 2, shape: 'hexagon' });
        hexagon.scale.x *= 0.5;
        hexagon.scale.y *= 0.5;
        this.addChild(hexagon);

        let star = new roboPart({ x: this.game.width / 2 - 100, y: 100, shape: 'star' });
        this.addChild(star);
        
        let square = new roboPart({ x: 300, y: 180, shape: 'square'});
        square.tint = 0xa608c9;
        this.addChild(square);

        let square2 = new roboPart({ x: 700, y: 380, shape: 'square'});
        this.addChild(square2);
    }


    
    
    update(ticker) {
        this.children.forEach(child => {
            if (child instanceof roboPart) {
                child.update(ticker);
            }
        });
    }
    

    // this.on('pointerup', this.onDragEnd);
    

    // add a dsstore, stores stuff that happens to the directory for mac os
    // look into containers and display objects: graphical objects that can be moved around
}