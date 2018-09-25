import Component from '~/engine/lib/Component'
// eslint-disable-next-line import/no-unresolved
import { PNG } from '*.png'


class Renderable extends Component {
    protected currentSprite : PNG
    public get sprite() : PNG {
        return this.currentSprite
    }

    public constructor(sprite : PNG) {
        super()

        this.currentSprite = sprite
    }

    public cleanup() {}

    public receive() {}

    /**
     * Called just before each rendering
     */
    public tick(_ : number) {}
}

Component.registerComponentType(Renderable)

export default Renderable
