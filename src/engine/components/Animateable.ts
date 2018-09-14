import Component from '~/engine/lib/Component'

class Animateable extends Component {
    public readonly sprite : any
    public constructor(sprite : any) {
        super()

        this.sprite = sprite
    }

    public cleanup() {}

    public receive() {}
}

Component.registerComponentType(Animateable)

export default Animateable
