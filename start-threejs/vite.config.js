import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    server: {
        allowedHosts: [
            'gsap-macbook-threejs.onrender.com',
            'localhost',
            '0.0.0.0',
            '.onrender.com'
        ]
    },

    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    'react-three': ['@react-three/fiber', '@react-three/drei'],
                    gsap: ['gsap', '@gsap/react'],
                    vendor: ['react', 'react-dom', 'zustand', 'react-responsive', 'clsx'],
                }
            }
        }
    }
})
