import bookcase1 from '~/assets/sprites/objects/bookcase1.png'
import stool from '~/assets/sprites/objects/stool.png'
import table3 from '~/assets/sprites/objects/table3.png'
import tv from '~/assets/sprites/objects/tv.png'
import window2 from '~/assets/sprites/objects/window2.png'
import doorMat2 from '~/assets/sprites/terrain/door-mat2.png'
import floorTiles from '~/assets/sprites/terrain/floor-tiles.png'
import stairsUp from '~/assets/sprites/terrain/stairs-up.png'
import wall1 from '~/assets/sprites/terrain/wall1.png'

import * as Config from '~/engine/lib/Level'

export default new Config.Level({
    name: 'house1_floor1',
    objects: [
        // bookcases
        new Config.Thing({
            components: [
                new Config.Renderable(bookcase1),
                new Config.Collidable(),
            ],
            topLeft: new Config.Vector(0, -Config.GRID_SIZE),
            size: new Config.Size(2 * Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        new Config.Thing({
            components: [
                new Config.Renderable(bookcase1),
                new Config.Collidable(),
            ],
            topLeft: new Config.Vector(Config.GRID_SIZE, -Config.GRID_SIZE),
            size: new Config.Size(2 * Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        // TV
        new Config.Thing({
            components: [
                new Config.Renderable(tv),
                new Config.Collidable(),
            ],
            topLeft: new Config.Vector(3 * Config.GRID_SIZE, 0),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        // Table
        new Config.Thing({
            components: [
                new Config.Renderable(table3),
                new Config.Collidable(),
            ],
            topLeft: new Config.Vector(3 * Config.GRID_SIZE, 3 * Config.GRID_SIZE),
            size: new Config.Size(2 * Config.GRID_SIZE, 2 * Config.GRID_SIZE),
        }),
        // Chairs
        new Config.Thing({
            components: [
                new Config.Renderable(stool),
            ],
            topLeft: new Config.Vector(2 * Config.GRID_SIZE, 3 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        new Config.Thing({
            components: [
                new Config.Renderable(stool),
            ],
            topLeft: new Config.Vector(2 * Config.GRID_SIZE, 4 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        new Config.Thing({
            components: [
                new Config.Renderable(stool),
            ],
            topLeft: new Config.Vector(5 * Config.GRID_SIZE, 3 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        new Config.Thing({
            components: [
                new Config.Renderable(stool),
            ],
            topLeft: new Config.Vector(5 * Config.GRID_SIZE, 4 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        // windows
        new Config.Thing({
            components: [
                new Config.Renderable(window2),
            ],
            topLeft: new Config.Vector(3 * Config.GRID_SIZE, -1 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        new Config.Thing({
            components: [
                new Config.Renderable(window2),
            ],
            topLeft: new Config.Vector(5 * Config.GRID_SIZE, -1 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
        new Config.Thing({
            components: [
                new Config.Renderable(window2),
            ],
            topLeft: new Config.Vector(7 * Config.GRID_SIZE, -1 * Config.GRID_SIZE),
            size: new Config.Size(Config.GRID_SIZE, Config.GRID_SIZE),
        }),
    ],
    floor: [
        {
            size: new Config.Size(7, 8),
            sprite: floorTiles,
            topLeft: new Config.Vector(0, 0),
        },
        // Door Mat
        {
            size: new Config.Size(1, 2),
            sprite: doorMat2,
            topLeft: new Config.Vector(2, 6),
        },
        // Stairs
        {
            size: new Config.Size(1, 1),
            sprite: stairsUp,
            topLeft: new Config.Vector(7, 0),
        },
    ],
    walls: [
        // top wall
        {
            size: new Config.Size(1, 8),
            sprite: wall1,
            topLeft: new Config.Vector(0, -1),
        },
        // left wall
        {
            size: new Config.Size(7, 1),
            sprite: null,
            topLeft: new Config.Vector(-1, 0),
        },
        // right wall
        {
            size: new Config.Size(7, 1),
            sprite: null,
            topLeft: new Config.Vector(8, 0),
        },
        // bottom wall
        {
            size: new Config.Size(1, 8),
            sprite: null,
            topLeft: new Config.Vector(0, 7),
        },
    ],
})
