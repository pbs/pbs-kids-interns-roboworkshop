// import { Anchor } from 'springroll';
import { GameScene } from './gameScene';
import * as PIXI from 'pixi.js';
import { button } from '../gameobjects/button'
// import { Assets } from 'pixi.js';

export class TitleScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        PIXI.Assets.add({alias: 'titleBG', src: './assets/botbuilderfrontpage.png'});
        PIXI.Assets.add({alias: 'button', src: './assets/headtoolbox.png'});

        this.backgroundTexture = await PIXI.Assets.load('titleBG');
        await PIXI.Assets.load('button');
    }

    start()
    {
        const scalerBackground = PIXI.Sprite.from(this.backgroundTexture);
        this.addChild(scalerBackground);

/*
        // a clickable label to cause a scene change
        const text = new PIXI.Text({
            text:'Click me!',
            style:{
                fill: 0xffffff
            }
        });
        text.interactive = true;
        text.anchor.set(0.5, 0.5);

        text.on('pointerdown', () =>
        {
            // when the label is clicked, preload the game scene and then tell the app to switch scenes
            const nextScene = new GameScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });
*/

        let startBtn = new button({ x: this.game.width / 2, y: this.game.height / 2, image: 'button' });

        startBtn.on('pointerdown', () =>
        {
            const nextScene = new GameScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });
        
        /*
        this.game.scaleManager.addEntity(new Anchor(
        {
            position: { x: this.width / 2, y: this.height / 2 },
            direction: { x: -1, y: -1 },
            callback: ({x, y}) => startBtn.position.set(x, y)
        }));
        */

        this.addChild(startBtn);
    }

    update()
    {
        // nothing to do
    }
}