const path = require('path')

module.exports = {
    extends: [
        'assignar-node',
    ],
    settings: {
        'import/resolver': {
            [path.resolve('./scripts/resolver-typescript.js')]: {},
        },
        'typescript/type-annotation-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
    },
}
