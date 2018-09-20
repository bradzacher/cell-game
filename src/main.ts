import Game from '~/engine/Game'
import Thing from '~/engine/lib/Thing'
import Renderable from '~/engine/components/Renderable'

import Character from '../assets/sprites/char.png'

const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
if (!canvas) {
    throw new Error('YOU FORGOT THE CANVAS, YOU NINNY!')
}

const game = new Game(canvas)
;(window as any).game = game

const character = new Thing({
    components: [
        new Renderable(Character),
    ],
})
game.addThing(character)

game.start()
