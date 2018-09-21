import Character from '~/assets/sprites/characters/dude/stand_down.png'
import Floorboards from '~/assets/sprites/terrain/floor-wood.png'
import Wall from '~/assets/sprites/terrain/wall1.png'

import * as Config from '~/engine/lib/Level'

export default new Config.Level({
    name: 'house1_floor1',
    objects: [
        new Config.Thing({
            components: [
                new Config.Renderable(Character),
            ],
            topLeft: new Config.Vector(0, 0),
            facing: Config.Direction.DOWN,
        }),
    ],
    floor: [
        {
            size: new Config.Size(8, 8),
            sprite: Floorboards,
            topLeft: new Config.Vector(0, 0),
        },
    ],
    walls: [
        // top wall
        {
            size: new Config.Size(8, 1),
            sprite: Wall,
            topLeft: new Config.Vector(0, -1),
        },
        // left wall
        {
            size: new Config.Size(1, 8),
            sprite: null,
            topLeft: new Config.Vector(-1, 0),
        },
        // right wall
        {
            size: new Config.Size(1, 8),
            sprite: null,
            topLeft: new Config.Vector(8, 0),
        },
        // bottom wall
        {
            size: new Config.Size(8, 1),
            sprite: null,
            topLeft: new Config.Vector(0, 8),
        },
    ],
})
