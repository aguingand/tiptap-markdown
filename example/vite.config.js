import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/tiptap-markdown',
    plugins: [vue()],
    server: {
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['..'],
        },
    },
    build: {
        rollupOptions: {
            plugins: [
                // analyzer(),
            ]
        }
    }
})
