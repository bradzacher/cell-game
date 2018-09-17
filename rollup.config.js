import * as path from 'path'
import browsersync from 'rollup-plugin-browsersync'
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
        sourcemap: true,
    },
    watch: {
        include: 'src/**/*',
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
        ...(process.argv.includes('--watch') || process.argv.includes('-w')
            ? [
                browsersync({
                    server: './build',
                    port: 2723,
                }),
            ]
            : []),
    ],
}
