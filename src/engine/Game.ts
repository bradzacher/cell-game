import GraphicsEngine from '~/engine/engines/Graphics'
import PhysicsEngine from '~/engine/engines/Physics'
import Camera from '~/engine/lib/Camera'
import Level from '~/engine/lib/Level'
import Thing from '~/engine/lib/Thing'

class Game {
    private readonly camera : Camera
    private readonly physics : PhysicsEngine
    private readonly graphics : GraphicsEngine

    private readonly levels = new Map<string, Level>()
    private readonly thingsBacker = new Set<Thing>()
    public get things() {
        return this.thingsBacker as ReadonlySet<Thing>
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
        const maxTickDurationMs = 1000 / rate

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
            if (timer.duration > maxTickDurationMs) {
                console.error('Tick ran over budget! Budgetted', maxTickDurationMs, 'ms, ran for', timer.duration, 'ms')
            }
        }, maxTickDurationMs)
    }

    /**
     * Registers a thing in the game and its engines
     */
    public addThing = (thing : Thing) => {
        // keep track of the thing
        this.thingsBacker.add(thing)

        // add it to the engines (let them decide if they care about the thing)
        this.physics.addThing(thing)
        this.graphics.addThing(thing)
    }

    /**
     * Removes a thing from the engine
     */
    public removeThing = (thing : Thing) => {
        this.graphics.removeThing(thing)
        this.physics.removeThing(thing)
        this.thingsBacker.delete(thing)
        thing.deconstructor()
    }

    /**
     * Adds a level to the engine
     */
    public addLevel = (level : Level) => {
        this.levels.set(level.name, level)
    }

    /**
     * Loads a level into the engine.
     * This will remove and destroy everything already loaded into the engine.
     */
    public loadLevel = (name : string) => {
        const level = this.levels.get(name)
        if (!level) {
            throw new Error(`Unknown level: ${name}`)
        }

        this.thingsBacker.forEach(this.removeThing)
        level.things.forEach(this.addThing)
        this.graphics.setBackground(level.background)
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
