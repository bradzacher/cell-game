import { BroadcastEvent, BroadcastEventPayload } from '~/engine/lib/BroadcastEvent'
import Component from '~/engine/lib/Component'

/**
 * Allows a Thing to move around
 */
class Moveable extends Component {
    public cleanup() : void {}

    public receive<T extends BroadcastEvent>(event : T, payloadIn : BroadcastEventPayload[T]) : void {
        if (event === BroadcastEvent.DoMove) {
            const payload = payloadIn as BroadcastEventPayload[BroadcastEvent.DoMove]
            this.attachedTo.center = this.attachedTo.center.move(payload.direction, payload.speed)
        }
    }
}

Component.registerComponentType(Moveable)

export default Moveable
