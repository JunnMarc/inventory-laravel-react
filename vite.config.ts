import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

import os from 'node:os';

const networkInterfaces = os.networkInterfaces();

const localIP =
  Object.values(networkInterfaces)
    .flat()
    .find((iface) => iface?.family === 'IPv4' && !iface.internal)?.address || 'localhost';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
            // Force HTTPS for assets
            url: process.env.APP_URL || 'https://inventory-laravel-react.onrender.com',
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    // server: {
    //     host: localIP,
    //     port: 5175,
    //     hmr: {
    //       protocol: 'ws',
    //       host: localIP, // <- YOUR COMPUTER'S LOCAL IP
    //       port: 5175,
    //     },
    //   },
    // Force HTTPS for assets in production
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
