import Animateable from '~/engine/components/Animateable'
import Renderable from '~/engine/components/Renderable'
import Camera from '~/engine/lib/Camera'
import Component from '~/engine/lib/Component'
import Engine from '~/engine/lib/Engine'
import Size from '~/engine/lib/Size'
import Thing from '~/engine/lib/Thing'
import Vector from '~/engine/lib/Vector'

const relevantComponents = [
    Component.getTypeGuid(Renderable),
    Component.getTypeGuid(Animateable),
]

class GraphicsEngine extends Engine {
    private readonly camera : Camera
    private readonly renderables = new Set<Thing>()
    private readonly renderContext : CanvasRenderingContext2D

    private viewportSize : Size = new Size(0, 0)
    private viewportCenter : Vector = new Vector(0, 0)

    public constructor(camera : Camera) {
        super()

        this.camera = camera
        const ctx = this.camera.renderTarget.getContext('2d')
        if (ctx === null) {
            throw new Error('Error initialising camera - could not get render context')
        }
        this.renderContext = ctx

        // have to do this after initialising the context
        this.camera.renderTarget.addEventListener('resize', this.onRenderTargetResize)
        window.addEventListener('resize', this.onRenderTargetResize)
        this.onRenderTargetResize()
    }

    private onRenderTargetResize = () => {
        const bcr = this.camera.renderTarget.getBoundingClientRect()
        this.viewportSize = new Size(bcr.height, bcr.width)
        this.viewportCenter = new Vector(this.viewportSize.width / 2, this.viewportSize.height / 2)
        this.camera.renderTarget.height = this.viewportSize.height
        this.camera.renderTarget.width = this.viewportSize.width
        this.rerender()
    }

    public tick() {
        this.rerender()
    }

    private rerender() {
        this.renderContext.save()

        // clear the canvas
        this.renderContext.clearRect(0, 0, this.viewportSize.height, this.viewportSize.width)

        // we treat the top left corner of the render canvas as (0,0)
        // and the center of the camera is the center of the physical render target
        const cameraOffset = this.camera.center.add(this.viewportCenter)
        this.renderContext.translate(cameraOffset.x, cameraOffset.y)

        // TODO - render each renderable
        this.renderables.forEach((thing) => {
            const render = thing.getComponent(Renderable)! /*|| thing.getComponent(Animateable)*/

            const sprite = render.sprite
            this.renderContext.drawImage(
                sprite.image,
                // spritesheet location
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                // draw location
                thing.center.x - (sprite.width / 2),
                thing.center.y - (sprite.height / 2),
                sprite.width,
                sprite.height,
            )
        })
        this.renderContext.fillStyle = 'red'
        this.renderContext.fillRect(0, 0, 10, 10)

        this.renderContext.restore()
    }

    public addThing(thing : Thing) {
        if (relevantComponents.some(c => thing.hasComponent(c))) {
            this.renderables.add(thing)
        }
    }
    public reomveThing(thing : Thing) {
        this.renderables.delete(thing)
    }
}

export default GraphicsEngine
