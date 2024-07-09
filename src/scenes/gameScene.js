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

        // add some items to this scene
        this.hexagon = new roboPart({ x: (this.game.width / 2) + 100, y: this.game.height / 2, shape: 'hexagon' });
        this.addChild(this.hexagon);

        this.star = new roboPart({ x: this.game.width / 2 - 100, y: 100, shape: 'star' });
        this.addChild(this.star);

        this.square = new roboPart({ x: 300, y: 180, shape: 'square'});
        this.addChild(this.square);
    }

    /*
    update(ticker)
    {
        // bounce the shapes
        this.hexagon.update(ticker);
        this.star.update(ticker);
    }
    */
}