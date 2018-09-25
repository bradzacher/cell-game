import Renderable from '~/engine/components/Renderable'
import Component from '~/engine/lib/Component'
// eslint-disable-next-line import/no-unresolved
import { PNG } from '*.png'

interface Frame {
    sprite : PNG
    duration : number
}

class Animateable extends Renderable {
    /**
     * The list of frame to cycle through
     */
    private readonly frameList : Frame[]
    /**
     * The last frame to be rendered
     */
    private currentFrameIdx : number = 0
    /**
     * The time the last frame was rendered
     */
    private lastRenderTime : number = 0

    public constructor(frames : Frame[]) {
        super(frames[0].sprite)

        this.frameList = frames
    }

    public cleanup() {}

    public receive() {}

    /**
     * Called just before each rendering
     */
    public tick(time : number) {
        const timeSinceLastFrame = time - this.lastRenderTime
        const currentFrame = this.frameList[this.currentFrameIdx]
        if (timeSinceLastFrame >= currentFrame.duration) {
            // increment the frame
            this.currentFrameIdx += 1
            if (this.currentFrameIdx >= this.frameList.length) {
                this.currentFrameIdx = 0
            }
            this.currentSprite = this.frameList[this.currentFrameIdx].sprite
            // in case the a frame ran long, in order to not drag out the animation,
            // keep track of the intended duration instead of the actual duration.
            this.lastRenderTime += currentFrame.duration
        }
    }
}

Component.registerComponentType(Animateable)

export default Animateable
