import Direction from '~/engine/lib/Direction'

export enum BroadcastEvent {
    Collision,
    DoMove,
    Tick,
}

export interface BroadcastEventPayload {
    [BroadcastEvent.Collision] : {
        /**
         * The direction in which the collision occurred
         */
        direction : Direction
    }
    [BroadcastEvent.DoMove] : {
        /**
         * The direction to move in
         */
        direction : Direction
        /**
         * Number of units to moves
         */
        speed : number
    }
    [BroadcastEvent.Tick] : {}
}
