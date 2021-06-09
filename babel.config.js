module.exports = {
    presets: [
        '@babel/preset-env',
    ],
    plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
    ],
    env: {
        test: {
            presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
        }
    },
};
