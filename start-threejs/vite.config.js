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
    }
})
