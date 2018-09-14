import { BroadcastEvent, BroadcastEventPayload } from '~/engine/lib/BroadcastEvent'
import Thing from '~/engine/lib/Thing'

let idCounter = 0
const componentTypeGuidMap = new Map<Function, number>()

export interface ComponentConstructor<T extends Component> {
    new (...args : any[]) : T
}
export type InferTypeFromConstructor<T> = T extends ComponentConstructor<infer U> ? U : never

abstract class Component {
    private attachedToInternal : Thing | null = null
    public get attachedTo() : Thing {
        if (!this.attachedToInternal) {
            throw new Error('Component was not properly attached to a Thing')
        }

        return this.attachedToInternal
    }

    /**
     * Attaches a component to a thing
     */
    public attach(owner : Thing) {
        if (this.attachedToInternal) {
            throw new Error('Attempted to attach a component that was already attached to a thing')
        }

        this.attachedToInternal = owner
    }

    /**
     * Called when another component broadcasts events via the parent Thing
     */
    public abstract receive(event : BroadcastEvent, payload : BroadcastEventPayload[typeof event]) : void

    /**
     * Called when the parent entity is removed from the engine, or when the component is detached from its parent.
     */
    public abstract cleanup() : void

    /**
     * Fetches the unique ID for this component's type
     */
    public getTypeGuid() : number {
        return Component.getTypeGuid(this)
    }

    /**
     * Fetches the unique ID for the given component's type
     */
    public static getTypeGuid(type : Function | Component) {
        const constructorType = typeof type === 'function'
            ? type
            : type.constructor

        // eslint-disable-next-line typescript/no-non-null-assertion
        return componentTypeGuidMap.get(constructorType)!
    }

    /**
     * Registers a new component type and assigns it a unique GUID
     */
    public static registerComponentType(constructorType : Function) {
        if (!componentTypeGuidMap.has(constructorType)) {
            componentTypeGuidMap.set(constructorType, idCounter)
            idCounter += 1
        }
    }
}

export default Component
