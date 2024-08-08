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
        PIXI.Assets.add({alias: 'endBG', src: './assets/backgrounds/LastBackground.png'});
        PIXI.Assets.add({alias: 'spritesheet', src: './assets/spritesheets/spritesheet.json'});

        this.backgroundTexture = await PIXI.Assets.load('endBG');
        await PIXI.Assets.load('spritesheet');
    }

    start()
    {
        const scalerBackground = PIXI.Sprite.from(this.backgroundTexture);
        this.addChild(scalerBackground);

        let restartBtn = new button({ x: 0, y: 0, image: "navButtons/restart.png" });
        restartBtn.x = this.game.width - restartBtn.width - 200;
        restartBtn.y = this.game.height - restartBtn.height - 100;

        restartBtn.on('pointerdown', () =>
        {
            const nextScene = new TitleScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        this.addChild(restartBtn);

        for (let i = 0; i < this.robot.length; ++i) {
            this.robot[i].y += 105;
            this.addChild(this.robot[i]);
        }

        for (let i = 0; i < this.decorations.length; ++i) {
            this.decorations[i].y += 105;
            this.decorations[i].interactive = false;
            this.addChild(this.decorations[i]);
        }
    }

    update()
    {
        // nothing to do
    }
}