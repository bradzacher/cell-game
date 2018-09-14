import Component from '~/engine/lib/Component'
// eslint-disable-next-line import/no-unresolved
import { PNG } from '*.png'


class Renderable extends Component {
    public readonly sprite : PNG
    public constructor(sprite : PNG) {
        super()

        this.sprite = sprite
    }

    public cleanup() {}

    public receive() {}
}

Component.registerComponentType(Renderable)

export default Renderable
