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
        PIXI.Assets.add({alias: 'buildYourRobot', src: './assets/gameSelectionBtns/buildYourRobot.png'});
        PIXI.Assets.add({alias: 'roboPuzzle', src: './assets/gameSelectionBtns/roboPuzzle.png'})

        this.backgroundTexture = await PIXI.Assets.load('titleBG');
        await PIXI.Assets.load(['buildYourRobot', 'roboPuzzle']);
    }

    start()
    {
        const scalerBackground = PIXI.Sprite.from(this.backgroundTexture);
        this.addChild(scalerBackground);

        let puzzleBtn = new button({ x: this.game.width / 2 - 100, y: this.game.height / 2, image: 'roboPuzzle' });
        let buildYourOwnBtn = new button({ x: this.game.width / 2 + 100, y: this.game.height / 2, image: 'buildYourRobot' });

        buildYourOwnBtn.on('pointerdown', () =>
        {
            const nextScene = new GameScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        this.addChild(puzzleBtn);
        this.addChild(buildYourOwnBtn);
    }

    update()
    {
        // nothing to do
    }
}