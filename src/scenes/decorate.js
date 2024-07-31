import * as PIXI from 'pixi.js';
import { button } from '../gameobjects/button'
import { GameScene } from './gameScene';
import { EndScene } from './endScene';

export class DecorateScene extends PIXI.Container
{
    constructor(game, robot)
    {
        super();
        this.game = game;
        this.robot = robot;
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

        /*
        add buttons to navigate back and forth
        */
        let backBtn = new button({ image: "navButtons/backArrow.png" });

        backBtn.x = 270;
        backBtn.y = this.game.height - backBtn.height - 30;

        this.addChild(backBtn);

        let nextBtn = new button({ image: "navButtons/nextArrow.png" });
        
        nextBtn.x = this.game.width - nextBtn.width - 130;
        nextBtn.y = this.game.height - nextBtn.height - 30;

        this.addChild(nextBtn);

        backBtn.on('pointerdown', () =>
        {
            const prevScene = new GameScene(this.game);
            this.game.application.state.scene.value = prevScene;
        });

        nextBtn.on('pointerdown', () =>
        {
            const nextScene = new EndScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        this.addChild(this.robot);
    }

    update()
    {
        // nothing to do
    }
}