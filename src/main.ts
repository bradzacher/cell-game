import Game from '~/engine/Game'
import levels from '~/levels'

const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
if (!canvas) {
    throw new Error('YOU FORGOT THE CANVAS, YOU NINNY!')
}

const game = new Game(canvas)
window.game = game

levels.forEach(game.addLevel)

game.loadLevel('house1_floor1')
game.start()
