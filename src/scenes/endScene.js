import * as PIXI from 'pixi.js';
import { button } from '../gameobjects/button'
import { TitleScene } from './title';

export class EndScene extends PIXI.Container
{
    constructor(game, robot, decorations)
    {
        super();
        this.game = game;
        this.robot = robot;
        this.decorations = decorations;
    }

    async preload()
    {
        PIXI.Assets.add({alias: 'testBG', src: './assets/backgrounds/LastBackground.png'});
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

        for (let i = 0; i < this.robot.length; ++i) {
            this.addChild(this.robot[i]);
        }

        for (let i = 0; i < this.decorations.length; ++i) {
            this.addChild(this.decorations[i]);
        }
    }

    update()
    {
        // nothing to do
    }
}