import * as PIXI from 'pixi.js';
import { button } from '../gameobjects/button'
import { TitleScene } from './title';
import { EndScene } from './endScene';
import { decoration } from '../gameobjects/decoration';
import { gameMath } from '../gameMath';
import { roboPart } from '../gameobjects/roboPart';

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
        let homeBtn = new button({ image: "navButtons/homeButton.png" });

        homeBtn.x = 270;
        homeBtn.y = this.game.height - homeBtn.height - 30;

        this.addChild(homeBtn);

        let nextBtn = new button({ image: "navButtons/nextArrow.png" });
        
        nextBtn.x = this.game.width - nextBtn.width - 130;
        nextBtn.y = this.game.height - nextBtn.height - 30;

        this.addChild(nextBtn);

        homeBtn.on('pointerdown', () =>
        {
            const prevScene = new TitleScene(this.game);
            this.game.application.state.scene.value = prevScene;
        });

        nextBtn.on('pointerdown', () =>
        {
            const nextScene = new EndScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        // add all the robot parts that were chosen in the previous scene
        for (let i = 0; i < this.robot.length; ++i) {
            this.robot[i].interactive = false;
            this.addChild(this.robot[i]);
        }

        let shirt = new decoration({ x: 300, y: 300, image: "decorations/tshirt.png"});
        this.addChild(shirt);

        let eyes = new decoration({ x: 300, y: 500, image: "decorations/eyes.png"});
        this.addChild(eyes);

        let lightbulb = new decoration({ x: 1000, y: 400, image: "decorations/lightbulb.png"});
        this.addChild(lightbulb);

        this.children.forEach(function (child) {
            if (child instanceof decoration) {
                child.on('pointerdown', this.onDragStart);
                child.on('pointerup', this.onDragEnd);
                child.on('pointerupoutside', this.onDragStart);
            }
        }.bind(this));
    }

    onDragStart() {
        this.dragTarget = this;
        this.alpha = 0.75;
        this.on('pointermove', this.parent.onDragMove); // since this is called on each child, make sure it grabs the function from the parent file 
    }

    onDragMove(event) {

        if (this.dragTarget) {
            this.dragTarget.parent.toLocal(event.global, this.dragTarget.parent, this.dragTarget.position);
        }

        if (this.parent) {
            this.parent.addChild(this);
        }

    }

    onDragEnd() {
        if (this.dragTarget) {
            this.dragTarget = null;
            this.alpha = 1;
        }

        let robotCollision = null;

        this.parent.children.forEach(child => {
            if (child instanceof roboPart) {
                if (gameMath.collision(this, child)) {
                    robotCollision = child;
                }
            }
        });

        if (!robotCollision) {
            this.x = this.initialX;
            this.y = this.initialY;
        }
    }

    update()
    {
        // nothing to do
    }
}