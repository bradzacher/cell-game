/* eslint-disable import/no-nodejs-modules */
import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'
import { dataToEsm } from 'rollup-pluginutils'
import Spritesmith from 'spritesmith'

const root = path.resolve(`${__dirname}/assets/sprites`)

function createSheet() {
    return new Promise((resolve, reject) => {
        const images = glob.sync(`${root}/**/*.png`)

        Spritesmith.run({
            src: images,
        }, (err, result) => {
            if (err) {
                reject(err)
            }

            resolve({
                image: result.image,
                coordinates: result.coordinates,
            })
        })
    })
}


export default function sprites() {
    const spritesheetProm = createSheet()
    let spritesheet = null
    let assetId = null

    return {
        name: 'sprites',

        // TODO - use async when https://github.com/puleos/object-hash/issues/67 is fixed
        buildStart() {
            return spritesheetProm
                .then((ss) => {
                    spritesheet = ss
                    assetId = this.emitAsset('spritesheet.png', spritesheet.image)
                })
        },

        transform(_, id) {
            if (!id.endsWith('.png')) {
                return null
            }

            const lines = [
                'export default {',
            ]

            const coords = spritesheet.coordinates[id]
            Object.keys(coords).forEach((k) => {
                lines.push(`    ${k}: ${JSON.stringify(coords[k], null, 4)},`)
            })
            lines.push(`    backgroundImage: \`url("\${import.meta.ROLLUP_ASSET_URL_${assetId}}")\`,`)
            lines.push('}')

            console.log(lines.join('\n'))

            return lines.join('\n')
        },

        buildEnd() {
        },
    }
}
