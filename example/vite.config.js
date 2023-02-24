import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/tiptap-markdown',
    plugins: [vue()],
    build: {
        rollupOptions: {
            plugins: [
                // analyzer(),
            ]
        }
    }
})
