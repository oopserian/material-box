import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@renderer': path.resolve(__dirname, 'src/renderer'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
