import * as path from 'path'
import html from 'rollup-plugin-fill-html'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'

import sprites from './scripts/sprites'
import fonts from './scripts/fonts'

export default {
    input: './src/main.ts',
    output: {
        file: './build/index.js',
        format: 'iife',
    },

    plugins: [
        html({
            template: './src/index.html',
        }),
        sprites({
            rootPath: `${path.resolve(`${__dirname}/assets/sprites`)}/**/*.png`,
        }),
        fonts(),
        typescript(),
        resolve({
            browser: true,
        }),
    ],
}
