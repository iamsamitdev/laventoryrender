import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        https: true, // Enable HTTPS
    },
    build: {
        outDir: 'public/build', // ตรวจสอบว่า output อยู่ใน public/build
    },
    esbuild: {
        jsx: 'automatic',
    },
})