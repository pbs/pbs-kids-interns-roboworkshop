import { button } from '../gameobjects/button';
import { roboPart } from '../gameobjects/roboPart';
import * as PIXI from 'pixi.js';
import { TitleScene } from './title';
import { EndScene } from './endScene';
import { roboFrame } from '../gameobjects/roboFrame';

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
        add this lvl's bkgd
        */
        PIXI.Assets.add({alias: 'workshopBG', src: './assets/Botbuilderbackground.png'});

        /*
        add roboframe parts
        */
        PIXI.Assets.add({alias: 'head', src: './assets/roboFrameParts/bothead.png'});

        /*
        add shape textures
        */
        PIXI.Assets.add({alias: 'hexagon', src: './assets/hexagon.png'});
        PIXI.Assets.add({alias: 'star', src: './assets/star.png'});
        PIXI.Assets.add({alias: 'square', src: './assets/whitesquare120x120.png'});
        
        // sounds would be loaded here
        // PIXI.Assets.add({alias: 'bounce', src: './assets/bounce.mp3'});

        /*
        add button textures
        */
        PIXI.Assets.add({alias: 'back', src: './assets/backArrow.png'});
        PIXI.Assets.add({alias: 'next', src: './assets/nextArrow.png'});

        /*
        now load all the textures
        */
        await PIXI.Assets.load(['workshopBG', 'head', 'hexagon', 'star', 'square', /* 'bounce', */ 'back', 'next']);
    }

    start()
    {
        const texture = PIXI.Assets.get('workshopBG');
        const scalerBackground = new PIXI.Sprite(texture);
        this.addChild(scalerBackground);

        // setting interactiveChildren here could be useful
        this.interactiveChildren = true;

        /*
        add the robot's frame
        */
        let head = new roboFrame({ x: this.game.width / 2, y: 250, shape: 'head'});
        head.tint = 0xb7adc7;
        this.addChild(head);

        /*
        add some shapes to this scene
        */
        let hexagon = new roboPart({ x: 900, y: 200, shape: 'hexagon' });
        hexagon.scale.x *= 0.5;
        hexagon.scale.y *= 0.5;
        this.addChild(hexagon);

        let star = new roboPart({ x: 250, y: 400, shape: 'star' });
        this.addChild(star);
        
        let square = new roboPart({ x: 300, y: 180, shape: 'square'});
        square.tint = 0xa608c9;
        this.addChild(square);

        let square2 = new roboPart({ x: 1000, y: 380, shape: 'square'});
        square2.tint = 0x31ad3f;
        this.addChild(square2);

        /*
        now add buttons to navigate back and forth
        */
        let backBtn = new button({ image: 'back'});

        //scale before transform so coordinates get adjusted correctly
        backBtn.scale.x *= 0.5;
        backBtn.scale.y *= 0.5;
        backBtn.x = 270;
        backBtn.y = this.game.height - backBtn.height - 30;

        // console.log(`backbtn x: ${backBtn.x}`);

        this.addChild(backBtn);

        let nextBtn = new button({ image: 'next'});
        
        
        nextBtn.scale.x *= 0.5;
        nextBtn.scale.y *= 0.5;
        nextBtn.x = this.game.width - nextBtn.width - 110;
        nextBtn.y = this.game.height - nextBtn.height - 20;

        // console.log(`nextBtn coordinates: ${nextBtn.x} , ${nextBtn.y}`);
        // console.log(`nextBtn width & height: ${nextBtn.width} x ${nextBtn.height}`);
        // console.log(`game scene width & height: ${this.game.width} x ${this.game.height}`);
        // console.log(`nextBtn anchor: ${nextBtn.anchor}`);

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
        make the objects draggable
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

        // console.log(`hexagon anchor point: ${hexagon.anchor}`);
        const roboSilhouette = [];
        this.children.forEach(child =>{
            if (child instanceof roboFrame) {
                roboSilhouette.push(child);
            }
        });

        // console.log(`${roboSilhouette[0].toString()}`);
    }

    
    update(ticker) {
        
        // const roboSilhouette = this.getChildrenByLabel(roboFrame);

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
        // const roboSilhouette = this.parent.getChildrenByLabel("roboFrame");

        if (this.dragTarget) {
            this.dragTarget.parent.toLocal(event.global, this.dragTarget.parent, this.dragTarget.position);
        }

        if (this.parent) {
            this.parent.addChild(this);
        }

        // this.parent.roboSilhouette.forEach(framePiece => {
        //     if(this.parent.collision(this, framePiece)) {
        //         console.log("collision detected");
        //     }
        // });

        this.parent.children.forEach(child => {
            if (child instanceof roboFrame) {
                if (this.parent.collision(this, child)) {
                    console.log("collision detected");
                }
            }
        });
        
    }

    onDragEnd() {
        if (this.dragTarget) {
            this.dragTarget = null;
            this.alpha = 1;
        }
    }

    collision(object1, object2) {
        return (object1.x + object1.width > object2.x) && (object1.x < object2.x + object2.width)
            && (object1.y + object1.height > object2.y) && (object1.y < object2.y + object2.height);
    }

    // add a dsstore, stores stuff that happens to the directory for mac os
    // look into containers and display objects: graphical objects that can be moved around
}