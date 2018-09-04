import sprites from './scripts/sprites'
import fonts from './scripts/fonts'
import typescript from 'rollup-plugin-typescript2'

export default {
    input: './src/main.ts',
    output: {
        file: 'build/index.js',
        format: 'iife',
    },

    plugins: [
        sprites(),
        fonts(),
        typescript(),
    ],
}
