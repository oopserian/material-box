import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@main': path.resolve(__dirname, 'src/main'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
