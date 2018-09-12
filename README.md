# cell-game

A top-down, square-based interactive 'game' reminiscent of pokemon.

## Architecture

The design is split into two layers:

- The engine, which tracks all of the game objects and their state
- The renderer, which draws based on the game's state

I did this so that I could decouple the rendering and easily change the renderer later (for example, add a canvas renderer).
