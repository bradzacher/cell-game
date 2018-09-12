'use strict'

const path = require('path')
const resolve = require('resolve')
const tsconfigPaths = require('tsconfig-paths')
const debug = require('debug')

const log = debug('eslint-resolver-typescript')

/**
 * @param {string} source the module to resolve; i.e './some-module'
 * @param {string} file the importing file's full path; i.e. '/usr/local/bin/file.js'
 */
function resolveFile(source, file, config) {
    log('looking for:', source)

    if (resolve.isCore(source)) {
        log('matched core:', source)

        return {
            found: true,
            path: null,
        }
    }

    const searchStart = config.directory || process.cwd()
    const configLoaderResult = tsconfigPaths.loadConfig(searchStart)
    if (configLoaderResult.resultType !== 'success') {
        throw new Error(`Unable to find tsconfig in ${searchStart}: ${configLoaderResult.message}`)
    }
    const matchPath = tsconfigPaths.createMatchPath(
        configLoaderResult.absoluteBaseUrl,
        configLoaderResult.paths,
    )

    const extensions = Object.keys(require.extensions).concat('.ts', '.tsx')
    const foundTsPath = matchPath(
        source,
        undefined,
        undefined,
        extensions,
    )

    if (foundTsPath) {
        log('matched ts path:', foundTsPath)
    }

    const foundNodePath = resolve.sync(foundTsPath || source, {
        extensions,
        basedir: path.dirname(path.resolve(file)),
    })

    if (foundNodePath) {
        log('matched node path:', foundNodePath)

        return {
            found: true,
            path: foundNodePath,
        }
    }

    log('didnt find', source)

    return { found: false }
}

module.exports = {
    interfaceVersion: 2,
    resolve: resolveFile,
}
