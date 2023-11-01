/// <reference types="vitest" />
import * as path from 'node:path';
import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import packageJson from './package.json'

export default defineConfig(() => {
    const deps = {
        ...(packageJson.dependencies || {}),
        ...(packageJson.peerDependencies || {}),
    }
    return {
        build: {
            lib: {
                entry: path.resolve(__dirname, 'src/index.js'),
                name: 'tiptap-markdown',
                fileName: (format) => `tiptap-markdown.${format}.js`,
                formats: ['es', 'umd'],
            },
            rollupOptions: {
                external: [
                    ...Object.keys(deps),
                    /^@tiptap/,
                ],
            },
            sourcemap: true,
            minify: false,
        },
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
            }),
        ],
        test: {
            environment: 'jsdom',
            setupFiles: [
                path.resolve(__dirname, '__tests__/utils/setup.js'),
                path.resolve(__dirname, '__tests__/utils/setup-dom.js'),
            ],
        }
    }
});
