import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@preload': path.resolve(__dirname, 'src/preload'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
