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
    base: '/build/', // หรือปล่อยว่างเป็น '' เพื่อให้ Vite ใช้ relative path
    build: {
        outDir: 'public/build',
        assetsDir: '', // ทำให้ assets ไม่อยู่ในโฟลเดอร์ย่อย
    },
    esbuild: {
        jsx: 'automatic',
    },
})