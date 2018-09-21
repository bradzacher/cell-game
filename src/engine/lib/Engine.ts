import Thing from '~/engine/lib/Thing'

abstract class Engine {
    /**
     * Advances the engine one unit of time
     */
    public abstract tick() : void

    /**
     * Add a thing to the engine.
     * Note that the engine doesn't have to register the thing unless it needs to care
     */
    public abstract addThing(thing : Thing) : void
    /**
     * Removes a thing from the engine.
     */
    public abstract removeThing(thing : Thing) : void
}

export default Engine
