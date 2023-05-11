import * as path from "path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/tiptap-markdown',
    plugins: [vue()],
    resolve: {
        alias: {
            'tiptap-markdown': path.resolve(__dirname, '..'),
        }
    },
    server: {
        fs: {
            strict: false
        }
    },
    build: {
        rollupOptions: {
            plugins: [
                // analyzer(),
            ]
        }
    }
})
