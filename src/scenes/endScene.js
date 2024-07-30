import * as PIXI from 'pixi.js';
import { button } from '../gameobjects/button'
import { TitleScene } from './title';

export class EndScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        PIXI.Assets.add({alias: 'testBG', src: './assets/backgrounds/BG1320x780-2.png'});
        PIXI.Assets.add({alias: 'spritesheet', src: './assets/spritesheets/spritesheet.json'});

        this.backgroundTexture = await PIXI.Assets.load('testBG');
        await PIXI.Assets.load('spritesheet');
    }

    start()
    {
        const scalerBackground = PIXI.Sprite.from(this.backgroundTexture);
        this.addChild(scalerBackground);

        let restartBtn = new button({ x: this.game.width / 2, y: this.game.height / 2, image: "navButtons/restart.png" });

        restartBtn.on('pointerdown', () =>
        {
            const nextScene = new TitleScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        this.addChild(restartBtn);
    }

    update()
    {
        // nothing to do
    }
}