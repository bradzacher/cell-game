import Animateable from '~/engine/components/Animateable'
import Renderable from '~/engine/components/Renderable'
import Camera from '~/engine/lib/Camera'
import Component from '~/engine/lib/Component'
import { GRID_SIZE } from '~/engine/lib/Constants'
import Engine from '~/engine/lib/Engine'
import Size from '~/engine/lib/Size'
import Thing from '~/engine/lib/Thing'
import Vector from '~/engine/lib/Vector'

const relevantComponents = [
    Component.getTypeGuid(Renderable),
    Component.getTypeGuid(Animateable),
]
window.debugRender = true

class GraphicsEngine extends Engine {
    private readonly camera : Camera
    private readonly renderables = new Set<Thing>()
    private readonly renderContext : CanvasRenderingContext2D
    private readonly cameraSquareOffset = new Vector(-GRID_SIZE / 2, -GRID_SIZE / 2)

    private viewportSize : Size = new Size(0, 0)
    private viewportCenter : Vector = new Vector(0, 0)
    private background : string = '#000000'

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
        const cameraOffset = this.camera.topLeft.add(this.viewportCenter).add(this.cameraSquareOffset)
        this.renderContext.translate(cameraOffset.x, cameraOffset.y)

        // set the background
        this.renderContext.fillStyle = this.background
        this.renderContext.fillRect(
            -this.viewportCenter.x,
            -this.viewportCenter.y,
            this.viewportSize.width + GRID_SIZE,
            this.viewportSize.height + GRID_SIZE,
        )

        this.renderables.forEach((thing) => {
            // TODO - render animateables
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
                thing.topLeft.x,
                thing.topLeft.y,
                sprite.width,
                sprite.height,
            )
        })

        // render some helpful debug artefacts if requested
        if (window.debugRender) {
            // draw a square at (0,0)
            this.renderContext.fillStyle = 'red'
            this.renderContext.fillRect(27, 27, 10, 10)

            // draw a grid
            this.renderContext.strokeStyle = 'red'
            const max = 10 * GRID_SIZE
            for (let i = -10; i < 10; i += 1) {
                const offset = GRID_SIZE * i
                this.renderContext.moveTo(-max, offset)
                this.renderContext.lineTo(max, offset)
                this.renderContext.stroke()
            }
            for (let i = -10; i < 10; i += 1) {
                const offset = GRID_SIZE * i
                this.renderContext.moveTo(offset, -max)
                this.renderContext.lineTo(offset, max)
                this.renderContext.stroke()
            }
        }

        this.renderContext.restore()
    }

    public addThing(thing : Thing) {
        if (relevantComponents.some(c => thing.hasComponent(c))) {
            this.renderables.add(thing)
        }
    }
    public removeThing(thing : Thing) {
        this.renderables.delete(thing)
    }


    /**
     * Sets the colour used to draw on the background of the scene
     *
     * @param {string} background - a valid css colour string
     */
    public setBackground(background : string) {
        this.background = background
    }
}

export default GraphicsEngine
