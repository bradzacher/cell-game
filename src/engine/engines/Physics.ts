import Collidable from '~/engine/components/Collidable'
import Moveable from '~/engine/components/Moveable'
import Component from '~/engine/lib/Component'
import Engine from '~/engine/lib/Engine'
import Thing from '~/engine/lib/Thing'

const relevantComponents = [
    Component.getTypeGuid(Collidable),
    Component.getTypeGuid(Moveable),
]

class PhysicsEngine extends Engine {
    private readonly things = new Set<Thing>()

    public tick() {
        // calculate positions
        // determine collisions
        // apply movement
    }
    public addThing(thing : Thing) {
        if (relevantComponents.some(c => thing.hasComponent(c))) {
            this.things.add(thing)
        }
    }
    public removeThing(thing : Thing) {
        this.things.delete(thing)
    }
}

export default PhysicsEngine
