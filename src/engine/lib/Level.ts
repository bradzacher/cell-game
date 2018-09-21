// eslint-disable-next-line import/no-unresolved
import { PNG } from '*.png'
import Renderable from '~/engine/components/Renderable'
import Collidable from '~/engine/components/Collidable'
import { squareSize } from '~/engine/engines/Graphics'
import Size from '~/engine/lib/Size'
import Thing from '~/engine/lib/Thing'
import Vector from '~/engine/lib/Vector'

interface LevelConfig {
    /**
     * A valid CSS colour - defaults to black.
     */
    background ?: string
    /**
     * The unique name of the level.
     * Note that this is used to store the level in the game.
     */
    name : string
    /**
     * A list of every thing in the Level.
     */
    objects : Thing[]
    /**
     * Convenience prop for adding non-collidable, renderable floor things in bulk
     */
    floor : {
        /**
         * The number of "things" to add in each dimension
         */
        size : Size
        /**
         * The top-left corner of the floor
         */
        topLeft : Vector
        /**
         * The sprite to use for the floor things
         */
        sprite : PNG
    }[]
    /**
     * Convenience prop for adding collidable, optionally renderable wall things in bulk
     */
    walls : {
        /**
         * The number of "things" to add in each dimension
         */
        size : Size
        /**
         * The top-left corner of the floor
         */
        topLeft : Vector
        /**
         * The sprite to use for the floor things
         */
        sprite : PNG | null
    }[]
}

class Level {
    public readonly background : string
    public readonly name : string
    public readonly things : Thing[]

    public constructor({
        background = '#000000',
        name,
        objects,
        floor,
        walls,
    } : LevelConfig) {
        this.background = background
        this.name = name
        this.things = []

        // add a thing for the floor first, so the object render on top of it
        floor.forEach((config) => {
            const offset = new Vector(config.topLeft.x * squareSize, config.topLeft.y * squareSize)
            for (let row = 0; row < config.size.height; row += 1) {
                for (let col = 0; col < config.size.width; col += 1) {
                    this.things.push(new Thing({
                        topLeft: new Vector(
                            offset.x + row * config.sprite.height,
                            offset.y + col * config.sprite.width,
                        ),
                        size: new Size(config.sprite.height, config.sprite.width),
                        components: [
                            new Renderable(config.sprite),
                        ],
                    }))
                }
            }
        })

        walls.forEach((config) => {
            const offset = new Vector(config.topLeft.x * squareSize, config.topLeft.y * squareSize)
            for (let row = 0; row < config.size.height; row += 1) {
                for (let col = 0; col < config.size.width; col += 1) {
                    this.things.push(new Thing({
                        topLeft: new Vector(
                            offset.x + row * squareSize,
                            offset.y + col * squareSize,
                        ),
                        size: new Size(squareSize, squareSize),
                        components: ([
                            new Collidable(),
                        ] as any[]).concat(config.sprite ? [new Renderable(config.sprite)] : []),
                    }))
                }
            }
        })

        this.things.push(...objects)
    }
}

// convenience exports so level definitions only need to import one file
export default Level
export { Level }
export { default as Thing } from '~/engine/lib/Thing'

export { default as Animateable } from '~/engine/components/Animateable'
export { default as Collidable } from '~/engine/components/Collidable'
export { default as Moveable } from '~/engine/components/Moveable'
export { default as Renderable } from '~/engine/components/Renderable'
export { default as Direction } from '~/engine/lib/Direction'
export { default as Size } from '~/engine/lib/Size'
export { default as Vector } from '~/engine/lib/Vector'
