/* eslint-disable import/no-unresolved, import/no-self-import, import/no-extraneous-dependencies */
import * as glob from 'glob'
import Spritesmith from 'spritesmith'

// rollup requires relative to the root....
const resolverTypescript = require('./scripts/resolver-typescript.js')

function createSheet(rootPath) {
    return new Promise((resolve, reject) => {
        const images = glob.sync(rootPath)

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


export default function sprites({ rootPath }) {
    const spritesheetProm = createSheet(rootPath)
    let spritesheet = null
    let assetId = null

    return {
        name: 'sprites',

        resolveId(importee, importer) {
            if (!importee.endsWith('.png')) {
                return null
            }

            // use typescript to resolve the path to the file!
            const resolveRes = resolverTypescript.resolve(importee, importer)

            if (resolveRes.found) {
                return resolveRes.path
            }

            return null
        },

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
                'const image = new Image()',
                // this is a special url to give a nice reference to the emitted file
                // https://github.com/rollup/rollup/wiki/Plugins#asset-urls
                `image.src = import.meta.ROLLUP_ASSET_URL_${assetId}`,
                '',
                'export default {',
                '    image,',
            ]

            const coords = spritesheet.coordinates[id]
            Object.keys(coords).forEach((k) => {
                lines.push(`    ${k}: ${JSON.stringify(coords[k], null, 4)},`)
            })
            lines.push('}')

            return {
                code: lines.join('\n'),
                map: null,
            }
        },
    }
}
