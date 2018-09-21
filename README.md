# cell-game

A top-down, square-based interactive 'game' reminiscent of pokemon.

## Architecture

The engine uses an entity-component driven architecture.
This means that everything that exists within the world is represented by a `Thing`.
What the thing can do is determined by the `Component`s that are attached to it.

For example:

- In order for a thing to draw a sprite, it must be given the `Renderable` component.
- In order for a thing to react to collisions, it must be given the `Collidable` component.

This architecture, whilst more complex to code, enables the engine to be more flexible, and allows a thing to be given capabilities without requiring extra code.

The codebase is split up into the following main classes:

- `src/Game.ts` - `Game` acts as the central controller. It tracks `Thing`s, coordinates the engines, and stores the `Level`s.
- `src/engines/Graphics.ts` - the graphics engine; responsible for rendering all `Thing`s that are `Renderable`.
- `src/engines/Physics.ts` - (TODO) the physics engine; responsible for moving and colliding all the `Thing`s that have physics-capable `Component`s.
- `src/lib/Thing.ts` - a thing in the system!
- `src/lib/Level.ts` - a configuration package which stores a list of things that exist on a screen, as well as (TODO).
