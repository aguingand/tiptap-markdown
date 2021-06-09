import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/tiptap-markdown.es.js',
        format: 'es'
    },
    plugins: [
        commonjs(),
        nodeResolve({
            preferBuiltins: false,
        }),
        json(),
    ],

}
