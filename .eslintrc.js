const path = require('path')

module.exports = {
    extends: [
        'assignar-node',
    ],
    settings: {
        'import/resolver': {
            'typescript': {},
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
