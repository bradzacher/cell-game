import { BroadcastEvent, BroadcastEventPayload } from '~/engine/lib/BroadcastEvent'
import Component from '~/engine/lib/Component'
import Direction from '~/engine/lib/Direction'

type CollidableCallback = (direction : Direction) => void

/**
 * Allows a component to handle collisions
 */
class Collidable extends Component {
    private readonly callback : CollidableCallback
    public constructor(callback : CollidableCallback) {
        super()

        this.callback = callback
    }

    public cleanup() {}

    public receive<T extends BroadcastEvent>(event : T, payloadIn : BroadcastEventPayload[T]) : void {
        if (event === BroadcastEvent.Collision) {
            const payload = payloadIn as BroadcastEventPayload[BroadcastEvent.Collision]
            this.callback(payload.direction)
        }
    }
}

Component.registerComponentType(Collidable)

export default Collidable
