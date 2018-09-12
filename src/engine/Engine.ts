import Camera from '~/engine/Camera'
import Thing from '~/engine/Thing'

class Engine {
    private camerasWritable : Camera[] = []
    public get cameras() {
        return this.camerasWritable as ReadonlyArray<Camera>
    }

    private thingsWritable : Camera[] = []
    public get things() {
        return this.thingsWritable as ReadonlyArray<Thing>
    }
}

export default Engine
