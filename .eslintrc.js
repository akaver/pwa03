module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "space-before-function-paren": 'off',
        "comma-dangle": 'off',
        "quotes": 'off',
        "@typescript-eslint/naming-convention": [
            "always",
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "custom": {
                    "regex": "^I[A-Z]",
                    "match": true
                }
            }
        ],
    }
}
