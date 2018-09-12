import Component from '~/engine/lib/Component'
import Direction from '~/engine/lib/Direction'
import Point from '~/engine/lib/Point'
import Size from '~/engine/lib/Size'

export class Thing {
    /**
     * The center square for the thing
     */
    public center : Point
    /**
     * The dimensions of the thing
     */
    public size : Size
    /**
     * The direction the thing is facing
     * Defaults to UP
     */
    public rotation : Direction
    /**
     * The components that are attached to this Thing
     */
    public readonly components : Component[]

    public constructor({
        center = new Point(0, 0),
        size = new Size(0, 0),
        rotation = Direction.UP,
        components = [],
    }) {
        this.center = center
        this.size = size
        this.rotation = rotation
        this.components = components
    }

    /**
     * Called when the thing is removed from the engine
     */
    public deconstructor() {
        this.components.forEach(c => c.cleanup())
    }
}

export default Thing
