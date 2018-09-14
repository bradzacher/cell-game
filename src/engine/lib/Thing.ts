import { BroadcastEvent, BroadcastEventPayload } from '~/engine/lib/BroadcastEvent'
import Component, { ComponentConstructor, InferTypeFromConstructor } from '~/engine/lib/Component'
import Direction from '~/engine/lib/Direction'
import Size from '~/engine/lib/Size'
import Vector from '~/engine/lib/Vector'

export interface ConstructorArgs {
    center ?: Vector
    size ?: Size
    facing ?: Direction.UP
    velocity ?: Vector
    components ?: Component[]
}

class Thing {
    /**
     * The center square for the thing
     */
    public center : Vector
    /**
     * The dimensions of the thing
     */
    public size : Size
    /**
     * The direction the thing is facing
     * Defaults to UP
     */
    public facing : Direction
    /**
     * The velocity of the thing
     */
    public velocity : Vector

    /**
     * The components that are attached to this Thing
     */
    private readonly components : Map<number, Component> = new Map()

    public constructor({
        center = new Vector(0, 0),
        size = new Size(0, 0),
        facing = Direction.UP,
        velocity = new Vector(0, 0),
        components = [] as Component[],
    } : ConstructorArgs = {}) {
        this.center = center
        this.size = size
        this.facing = facing
        this.velocity = velocity

        components.forEach(c => this.components.set(c.getTypeGuid(), c))
    }

    /**
     * Called when the thing is removed from the engine
     */
    public deconstructor() {
        this.components.forEach(c => c.cleanup())
    }

    /**
     * Allows components to alert other components of events that have, or need to happen
     */
    public broadcast<T extends BroadcastEvent>(event : T, payload : BroadcastEventPayload[T]) {
        this.components.forEach((c) => {
            c.receive(event, payload)
        })
    }

    /**
     * Attaches a component to this thing
     */
    public attachComponent(component : Component) {
        this.components.set(component.getTypeGuid(), component)
        component.attach(this)
    }

    /**
     * Removes a component from this thing
     */
    public removeComponent(component : Component) {
        this.components.delete(component.getTypeGuid())
        component.cleanup()
    }

    /**
     * Gets the component of the given type attached to this Thing.
     * Returns null if no component of the type are attached
     */
    public getComponent<T extends Function>(componentClass : T) : InferTypeFromConstructor<T> | null {
        const id = Component.getTypeGuid(componentClass)

        return this.components.get(id) as InferTypeFromConstructor<T> || null
    }

    /**
     * Checks if the component of the given type attached to this Thing.
     */
    public hasComponent(componentClass : ComponentConstructor<Component> | Component | number) {
        let id : number
        if (typeof componentClass === 'function') {
            id = Component.getTypeGuid(componentClass)
        } else if (typeof componentClass === 'object') {
            id = componentClass.getTypeGuid()
        } else {
            id = componentClass
        }

        return this.components.has(id)
    }
}

export default Thing
