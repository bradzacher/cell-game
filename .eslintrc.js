const path = require('path')

module.exports = {
    extends: [
        'assignar-node',
    ],
    settings: {
        'import/resolver': {
            [path.resolve('./scripts/resolver-typescript.js')]: {},
        },
    },
}
