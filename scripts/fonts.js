/* eslint-disable import/no-nodejs-modules */
import * as path from 'path'
import { dataToEsm } from 'rollup-pluginutils'

const root = path.resolve(`${__dirname}/sprites`)

export default function sprites() {
    return {
        name: 'fonts',

        transform(raw, id) {
            if (!id.endsWith('.ttf')) {
                return null
            }

            const name = path.basename(id)
            const assetId = this.emitAsset(name, raw)

            return [
                'export default {',
                '    "@font-face": {',
                '        fontFamily: "pokemon-gb",',
                // this is a special url to give a nice reference to the emitted file
                // https://github.com/rollup/rollup/wiki/Plugins#asset-urls
                `        src: \`url('\${import.meta.ROLLUP_ASSET_URL_${assetId}}') format('truetype')\`,`,
                '    },',
                '}',
            ].join('\n')
        },
    }
}
