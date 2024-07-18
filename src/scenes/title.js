import { GameScene } from './gameScene';
import * as PIXI from 'pixi.js';
import { button } from '../gameobjects/button'

export class TitleScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        PIXI.Assets.add({alias: 'titleBG', src: './assets/backgrounds/botbuilderfrontpage.png'});
        PIXI.Assets.add({alias: 'button', src: './assets/headtoolbox.png'});

        this.backgroundTexture = await PIXI.Assets.load('titleBG');
        await PIXI.Assets.load('button');
    }

    start()
    {
        const scalerBackground = PIXI.Sprite.from(this.backgroundTexture);
        this.addChild(scalerBackground);

        let startBtn = new button({ x: this.game.width / 2, y: this.game.height / 2, image: 'button' });

        startBtn.on('pointerdown', () =>
        {
            const nextScene = new GameScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        this.addChild(startBtn);
    }

    update()
    {
        // nothing to do
    }
}