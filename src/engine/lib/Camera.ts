import Thing, { ConstructorArgs } from '~/engine/lib/Thing'

/**
 * A camera object within the game world.
 * Used to keep track of where a viewport should be looking.
 */
class Camera extends Thing {
    public readonly renderTarget : HTMLCanvasElement

    public constructor({
        renderTarget,
        ...otherArgs
    } : ConstructorArgs & { renderTarget : HTMLCanvasElement }) {
        super(otherArgs)

        this.renderTarget = renderTarget
    }
}

export default Camera
