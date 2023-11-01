import * as path from "path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            'tiptap-markdown': path.resolve(__dirname, '..'),
        }
    },
    build: {
        rollupOptions: {
            plugins: [
                // analyzer(),
            ]
        }
    },
})
