import PhysicsEngine from '~/engine/engines/Physics'
import Camera from '~/engine/lib/Camera'
import Thing from '~/engine/lib/Thing'
import GraphicsEngine from '~/engine/engines/Graphics'

class Game {
    private readonly camera : Camera
    private readonly physics : PhysicsEngine
    private readonly graphics : GraphicsEngine

    private readonly thingsWritable = new Set<Thing>()
    public get things() {
        return this.thingsWritable as ReadonlySet<Thing>
    }

    public constructor(renderTarget : HTMLCanvasElement) {
        this.camera = new Camera({ renderTarget })
        this.physics = new PhysicsEngine()
        this.graphics = new GraphicsEngine(this.camera)
    }

    /**
     * Starts the game engine
     * @param rate the number of ticks per second
     */
    public start(rate : number = 30) {
        let tickCount = 0
        let tickAverageMs = 0

        window.setInterval(() => {
            performance.mark('tick-start')

            this.tick()

            performance.mark('tick-end')
            performance.measure('tick-duration', 'tick-start', 'tick-end')
            const timer = performance.getEntriesByName('tick-duration')[0]
            performance.clearMarks()
            performance.clearMeasures()

            tickCount += 1
            tickAverageMs += (timer.duration - tickAverageMs) / tickCount

            if (tickCount % rate === 0) {
                console.info('Average tick duration: ', Math.round(tickAverageMs * 10000) / 10000, 'ms')
            }
        }, 1000 / rate)
    }

    /**
     * Registers a thing in the game and its engines
     */
    public addThing(thing : Thing) {
        // keep track of the thing
        this.thingsWritable.add(thing)

        // add it to the engines (let them decide if they care about the thing)
        this.physics.addThing(thing)
        this.graphics.addThing(thing)
    }

    /**
     * Removes a thing from the engine
     */
    public removeThing(thing : Thing) {
        this.graphics.addThing(thing)
        this.physics.reomveThing(thing)
        this.thingsWritable.delete(thing)
        thing.deconstructor()
    }

    /**
     * Advances the game engine one round.
     */
    public tick() {
        this.physics.tick()
        this.graphics.tick()
    }
}

export default Game
