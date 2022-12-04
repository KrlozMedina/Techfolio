module.exports = {
    root: true,
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:jsx-a11t/recommended',
        'plugin:prettier/recommended',
        'next',
        'nex/core-web-vitals'
    ],
    rules: {
        'semi': ['error', 'always']
    }
}