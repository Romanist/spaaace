import Serializer from 'lance/serialize/Serializer';
import PhysicsObject2D from 'lance/serialize/PhysicalObject2D';
import PixiRenderableComponent from 'lance/render/pixi/PixiRenderableComponent';
import Renderer from '../client/SpaaaceRenderer';

const RADIUS = 5;
const MASS = 1;

export default class Missile extends PhysicsObject2D {

    constructor(gameEngine, options, props){
        super(gameEngine, options, props);
    }

    // this is what allows usage of shadow object with input-created objects (missiles)
    // see https://medium.com/javascript-multiplayer-gamedev/chronicles-of-the-development-of-a-multiplayer-game-part-2-loops-and-leaks-10b453e843e0
    // in the future this will probably be embodied in a component

    static get netScheme() {
        return Object.assign({
            inputId: { type: Serializer.TYPES.INT32 }
        }, super.netScheme);
    }

    onAddToWorld(gameEngine) {

        // create the physics body
        this.gameEngine = gameEngine;
        this.physicsObj = gameEngine.physicsEngine.addCircle(RADIUS, MASS);
        this.physicsObj.position = [this.position.x, this.position.y];

        // create the render object
        let renderer = Renderer.getInstance();
        if (renderer) {
            let sprite = new PIXI.Sprite(PIXI.loader.resources.missile.texture);
            renderer.sprites[this.id] = sprite;
            sprite.width = 81 * 0.5;
            sprite.height = 46 * 0.5;
            sprite.anchor.set(0.5, 0.5);
            sprite.position.set(this.position.x, this.position.y);
            renderer.layer2.addChild(sprite);
        }
    }

    onRemoveFromWorld(gameEngine) {
        let renderer = Renderer.getInstance();
        if (renderer && renderer.sprites[this.id]) {
            renderer.sprites[this.id].destroy();
            delete renderer.sprites[this.id];
        }
    }

    syncTo(other) {
        super.syncTo(other);
        this.inputId = other.inputId;
    }
}
