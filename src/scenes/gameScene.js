import { button } from '../gameobjects/button';
import { roboPart } from '../gameobjects/roboPart';
import * as PIXI from 'pixi.js';
import { TitleScene } from './title';
import { EndScene } from './endScene';
import { roboFrame } from '../gameobjects/roboFrame';
import { toolbox } from '../gameobjects/toolbox';
import { BODYPARTS } from '../constants';

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
        PIXI.Assets.add({alias: 'workshopBG', src: './assets/backgrounds/Botbuilderbackground.png'});

        /*
        add roboframe parts
        */
        PIXI.Assets.add({alias: 'head', src: './assets/roboFrameParts/bothead.png'});
        PIXI.Assets.add({alias: 'body', src: './assets/roboFrameParts/Botbody.png'});
        PIXI.Assets.add({alias: 'leftArm', src: './assets/roboFrameParts/leftbotarm.png'});
        PIXI.Assets.add({alias: 'rightArm', src: './assets/roboFrameParts/rightbotarm.png'});
        PIXI.Assets.add({alias: 'leftLeg', src: './assets/roboFrameParts/leftbotleg.png'});
        PIXI.Assets.add({alias: 'rightLeg', src: './assets/roboFrameParts/rightbotleg.png'});

        /*
        add shape textures
        */
        PIXI.Assets.add({alias: 'hexagon', src: './assets/shapes/hexagon.png'});
        PIXI.Assets.add({alias: 'star', src: './assets/shapes/star.png'});
        PIXI.Assets.add({alias: 'square', src: './assets/shapes/whitesquare120x120.png'});
        
        // sounds can be loaded here
        // PIXI.Assets.add({alias: 'bounce', src: './assets/bounce.mp3'});

        /*
        add button textures
        */
        PIXI.Assets.add({alias: 'back', src: './assets/navButtons/backArrow.png'});
        PIXI.Assets.add({alias: 'next', src: './assets/navButtons/nextArrow.png'});

        /*
        add toolbox textures
        */
        PIXI.Assets.add({alias: 'headBox', src: './assets/toolboxes/headtoolbox.png'});
        PIXI.Assets.add({alias: 'headBoxOpen', src: './assets/toolboxes/headtoolboxOpen.png'});

        PIXI.Assets.add({alias: 'bodyBox', src: './assets/toolboxes/bodyBoxClosed.png'});
        PIXI.Assets.add({alias: 'bodyBoxOpen', src: './assets/toolboxes/bodyBoxOpen.png'});

        PIXI.Assets.add({alias: 'armBox', src: './assets/toolboxes/armBoxClosed.png'});
        PIXI.Assets.add({alias: 'armBoxOpen', src: './assets/toolboxes/armBoxOpen.png'});

        PIXI.Assets.add({alias: 'legBox', src: './assets/toolboxes/legBoxClosed.png'});
        PIXI.Assets.add({alias: 'legBoxOpen', src: './assets/toolboxes/legBoxOpen.png'});

        /*
        now load all the textures
        */
        await PIXI.Assets.load(['workshopBG', 
                                'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg',
                                'hexagon', 'star', 'square', 
                                /* 'bounce', */ 
                                'back', 'next',
                                'headBox', 'headBoxOpen', 'bodyBox', 'bodyBoxOpen', 'armBox', 'armBoxOpen', 'legBox', 'legBoxOpen']);
    }

    start()
    {
        const texture = PIXI.Assets.get('workshopBG');
        const scalerBackground = new PIXI.Sprite(texture);
        this.addChild(scalerBackground);

        // setting interactiveChildren here could be useful
        this.interactiveChildren = true;

        // enum for each body part, to be used for determining the roboParts' types
        

        /*
        add the robot's frame
        */
        let head = new roboFrame({ x: this.game.width / 2, y: 150, shape: 'head'});
        this.addChild(head);

        let body = new roboFrame({ x: this.game.width / 2, y: 150 + head.height, shape: 'body'});
        this.addChild(body);

        let leftArm = new roboFrame({ x: this.game.width / 2 - body.width , y: 150 + head.height, shape: 'leftArm'});
        this.addChild(leftArm);

        let rightArm = new roboFrame({ x: this.game.width / 2 + body.width , y: 150 + head.height, shape: 'rightArm'});
        this.addChild(rightArm);

        let leftLeg = new roboFrame({ x: this.game.width / 2 - body.height / 2, 
                                        y: 200 + head.height + body.height, shape: 'leftLeg'});
        this.addChild(leftLeg);

        let rightLeg = new roboFrame({ x: this.game.width / 2  + body.height / 2, 
                                        y: 200 + head.height + body.height, shape: 'rightLeg'});
        this.addChild(rightLeg);

        /*
        add toolboxes
        */
        let headBox = new toolbox({x: 450, y: this.game.height - 100,  closedBox: 'headBox', openBox: 'headBoxOpen', type: BODYPARTS.HEAD});
        this.addChild(headBox);

        let bodyBox = new toolbox({x: 600, y: this.game.height - 100,  closedBox: 'bodyBox', openBox: 'bodyBoxOpen', type: BODYPARTS.BODY});
        this.addChild(bodyBox);

        let armBox = new toolbox({x: 750, y: this.game.height - 100,  closedBox: 'armBox', openBox: 'armBoxOpen', type: BODYPARTS.ARM});
        this.addChild(armBox);

        let legBox = new toolbox({x: 900, y: this.game.height - 100,  closedBox: 'legBox', openBox: 'legBoxOpen', type: BODYPARTS.LEG});
        this.addChild(legBox);

        /*
        add roboParts to the scene
        */
        let hexagon = new roboPart({ x: 900, y: 100, shape: 'hexagon', type: BODYPARTS.HEAD });
        hexagon.scale.x *= 0.5;
        hexagon.scale.y *= 0.5;
        this.addChild(hexagon);

        let star = new roboPart({ x: 250, y: 400, shape: 'star', type: BODYPARTS.HEAD });
        this.addChild(star);

        let square = new roboPart({ x: 300, y: 180, shape: 'square', type: BODYPARTS.HEAD});
        square.tint = 0xa608c9;
        this.addChild(square);

        let square2 = new roboPart({ x: 1000, y: 380, shape: 'square', type: BODYPARTS.HEAD});
        square2.tint = 0x31ad3f;
        this.addChild(square2);

        let star2 = new roboPart({ x: 250, y: 400, shape: 'star', type: BODYPARTS.BODY });
        star2.tint = 0xa763ff;
        this.addChild(star2);

        let hex2 = new roboPart({ x: 900, y: 100, shape: 'hexagon', type: BODYPARTS.ARM });
        hex2.scale.x *= 0.5;
        hex2.scale.y *= 0.5;
        hex2.tint = 0xa763ff;
        this.addChild(hex2);

        let square3 = new roboPart({ x: 1000, y: 380, shape: 'square', type: BODYPARTS.LEG});
        square3.tint = 0xf542cb;
        this.addChild(square3);

        /*
        now add buttons to navigate back and forth
        */
        let backBtn = new button({ image: 'back'});

        //scale before transform so coordinates get adjusted correctly
        backBtn.scale.x *= 0.5;
        backBtn.scale.y *= 0.5;
        backBtn.x = 270;
        backBtn.y = this.game.height - backBtn.height - 30;

        this.addChild(backBtn);

        let nextBtn = new button({ image: 'next'});
        
        nextBtn.scale.x *= 0.5;
        nextBtn.scale.y *= 0.5;
        nextBtn.x = this.game.width - nextBtn.width - 110;
        nextBtn.y = this.game.height - nextBtn.height - 20;

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
    }

    
    update(ticker) {

        // let hideShapes = false;

        this.children.forEach(child => {

            if (child instanceof roboPart || child instanceof toolbox) {
                child.update(ticker); // calls update from roboPart or toolbox class
            }

            if (child instanceof toolbox) {
                if (child.open) {
                    switch(child.type) {
                        case BODYPARTS.HEAD:
                            this.displayParts(BODYPARTS.HEAD);
                            break;
                        case BODYPARTS.BODY:
                            this.displayParts(BODYPARTS.BODY);
                            break;
                        case BODYPARTS.ARM:
                            this.displayParts(BODYPARTS.ARM);
                            break;
                        case BODYPARTS.LEG:
                            this.displayParts(BODYPARTS.LEG);
                            break;
                    }
                } else {
                    this.hideShapes(child);
                }
            }
        
        });

    }
    
    onDragStart() {
        this.dragTarget = this;
        this.alpha = 0.75;
        this.on('pointermove', this.parent.onDragMove); // since this is called on each child, make sure it grabs the function from the parent file 

        // if the shape we're dragging currently belongs to a roboFrame, make sure it no longer does
        // also, restore the frame's opacity
        this.parent.children.forEach(child => {
            if (child instanceof roboFrame) {
                if (child.currentShape === this) {
                    child.currentShape = null;
                    child.alpha = 1;
                    child.onFrame = false;
                }
            }
        });
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

        let closestDistance = null;
        let closestObject = null;

        this.parent.children.forEach(child => {

            if (child instanceof roboFrame) {

                if(this.parent.collision(this, child)) { // if the roboFrame is colliding with a roboPart

                    // calculate the distance between the two objects
                    let distance = this.parent.calculateDistance(this, child);

                    if(closestDistance === null || distance < closestDistance) {
                        closestDistance = distance;
                        closestObject = child;
                    }

                } else {
                    
                    // child.alpha = 1;

                    // if the current shape being dragged is no longer colliding with a roboFrame, return it to its og position
                    if (child.currentShape === this) {
                        child.currentShape = null; // additionally, the roboFrame no longer has a shape on it
                        this.x = this.initialX;
                        this.y = this.initialY;
                    }

                } 

            }

        });

        // if the target roboFrame already has a shape on it, return the shape on it back to its og position
        if (closestObject && closestObject.currentShape) {
            closestObject.currentShape.x = closestObject.currentShape.initialX;
            closestObject.currentShape.y = closestObject.currentShape.initialY;
            closestObject.currentShape.onFrame = false;
        }

        // if there was a closest roboFrame calculated, stick the roboPart to it 
        // also, update its currentShape and make the frame transparent
        if (closestObject) {
            this.x = closestObject.x;
            this.y = closestObject.y;
            closestObject.currentShape = this;
            closestObject.alpha = 0;
            this.onFrame = true;
        } else { // otherwise, the roboPart was dropped outside with no collision, so bring it back to its og position
            this.x = this.initialX;
            this.y = this.initialY;
            this.onFrame = false;
        }
    }

    calculateDistance(object1, object2) {
        return Math.sqrt(Math.pow(object1.x - object2.x, 2) + Math.pow(object1.y - object2.y, 2));
    }

    collision(object1, object2) {
        return (object1.x + object1.width > object2.x) && (object1.x < object2.x + object2.width)
            && (object1.y + object1.height > object2.y) && (object1.y < object2.y + object2.height);
    }

    displayParts(roboPartType) {
        this.children.forEach(child => {
            if (child instanceof roboPart) {
                if (child.type === roboPartType) {
                    child.visible = true;
                    // console.log(child.shape, child.visible);
                }
            }
        });
    }

    hideShapes(toolbox) {

        this.children.forEach (child => {
            if (child instanceof roboPart) {
                if (child.type === toolbox.type && !child.onFrame) {
                    child.visible = false;
                }
            }
        });
        
    } 
    // add a dsstore, stores stuff that happens to the directory for mac os
    // look into containers and display objects: graphical objects that can be moved around
}