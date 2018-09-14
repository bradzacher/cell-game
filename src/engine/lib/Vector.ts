import Direction from '~/engine/lib/Direction'

/**
 * Represents a point in the world, in squares
 */
class Vector {
    public readonly x : number
    public readonly y : number
    public readonly z : number

    public constructor(x : number, y : number, z : number = 1) {
        this.x = x
        this.y = y
        this.z = z
    }

    public move(direction : Direction, distance : number) : Vector {
        let { x, y } = this

        switch (direction) {
            case Direction.UP:
                x -= distance
                break

            case Direction.DOWN:
                x += distance
                break

            case Direction.LEFT:
                y -= distance
                break

            case Direction.RIGHT:
                y += distance
                break

            default:
                // shouldn't happen...
                throw new Error('Unexpected Direction')
        }

        return new Vector(x, y, this.z)
    }

    public add(other : Vector) {
        return new Vector(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
        )
    }
}

export default Vector
