import { roboPart } from '../gameobjects/roboPart';
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
        PIXI.Assets.add({alias: 'bounce', src: './assets/bounce.mp3'});

        await PIXI.Assets.load(['hexagon', 'star', 'bounce']);
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
    }

    update(ticker)
    {
        // bounce the balls
        this.hexagon.update(ticker);
        this.star.update(ticker);
    }
}