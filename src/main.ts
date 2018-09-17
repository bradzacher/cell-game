import Game from '~/engine/Game'

const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
if (!canvas) {
    throw new Error('YOU FORGOT THE CANVAS, YOU NINNY!')
}

const game = new Game(canvas)

;(window as any).game = game
