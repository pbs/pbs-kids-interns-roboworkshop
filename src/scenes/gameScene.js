import { button } from '../gameobjects/button';
import { roboPart } from '../gameobjects/roboPart';
import * as PIXI from 'pixi.js';
import { TitleScene } from './title';
import { EndScene } from './endScene';

export class GameScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        /*
        add shape textures
        */
        PIXI.Assets.add({alias: 'hexagon', src: './assets/hexagon.png'});
        PIXI.Assets.add({alias: 'star', src: './assets/star.png'});
        PIXI.Assets.add({alias: 'square', src: './assets/whitesquare120x120.png'});
        PIXI.Assets.add({alias: 'bounce', src: './assets/bounce.mp3'});

        /*
        add button textures
        */
        PIXI.Assets.add({alias: 'back', src: './assets/backArrow.png'});
        PIXI.Assets.add({alias: 'next', src: './assets/nextArrow.png'});

        /*
        now load all the textures
        */
        await PIXI.Assets.load(['hexagon', 'star', 'square', 'bounce', 'back', 'next']);
    }

    start()
    {
        const texture = PIXI.Assets.get('testBG');
        const scalerBackground = new PIXI.Sprite(texture);
        this.addChild(scalerBackground);

        // setting interactiveChildren here could be useful
        this.interactiveChildren = true;

        /*
        add some shapes to this scene
        */
        let hexagon = new roboPart({ x: (this.game.width / 2) + 100, y: this.game.height / 2, shape: 'hexagon' });
        hexagon.scale.x *= 0.5;
        hexagon.scale.y *= 0.5;
        this.addChild(hexagon);

        let star = new roboPart({ x: this.game.width / 2 - 100, y: 100, shape: 'star' });
        this.addChild(star);
        
        let square = new roboPart({ x: 300, y: 180, shape: 'square'});
        square.tint = 0xa608c9;
        this.addChild(square);

        let square2 = new roboPart({ x: 700, y: 380, shape: 'square'});
        this.addChild(square2);

        /*
        now add buttons to navigate back and forth
        */
        let backBtn = new button({x: this.game.width / 4, y: this.game.height /* - backBtn.height */ - 200, image: 'back'});
        backBtn.scale.x *= 0.5;
        backBtn.scale.y *= 0.5;
        this.addChild(backBtn);

        let nextBtn = new button({x: this.game.width /* - nextBtn.width */ - 300, y: this.game.height /* - nextBtn.height */ - 200, image: 'next'});
        nextBtn.scale.x *= 0.5;
        nextBtn.scale.y *= 0.5;
        this.addChild(nextBtn);

        backBtn.on('pointerdown', () =>
        {
            const prevScene = new TitleScene(this.game);
            this.game.application.state.scene.value = prevScene;
        });

        nextBtn.on('pointerdown', () =>
        {
            const nextScene = new EndScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        /*
        make the objects interactable
        */
        this.dragTarget = null;

        // turn on listeners
        this.children.forEach(function (child) { 
            if (child instanceof roboPart) {

                child.on('pointerdown', this.onDragStart);

                child.on('pointerup', this.onDragEnd);
                child.on('pointerupoutside', this.onDragEnd);

            }
        }.bind(this));

    }

    
    update(ticker) {
        
        this.children.forEach(child => {
            if (child instanceof roboPart) {
                child.update(ticker); // calls update from roboPart class
            }
        });

    }
    
    onDragStart() {
        this.dragTarget = this;
        this.alpha = 0.75;
        this.on('pointermove', this.parent.onDragMove); // since this is called on each child, make sure the function 
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
    }

    // add a dsstore, stores stuff that happens to the directory for mac os
    // look into containers and display objects: graphical objects that can be moved around
}