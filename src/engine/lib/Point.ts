/**
 * Represents a point in the world, in squares
 */
class Point {
    public readonly x : number
    public readonly y : number

    public constructor(x : number, y : number) {
        this.x = x
        this.y = y
    }
}

export default Point
