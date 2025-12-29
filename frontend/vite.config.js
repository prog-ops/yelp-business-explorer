import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react()
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'api-client': ['axios'],
                },
            },
        },
        chunkSizeWarningLimit: 500, // Split chunk besar
    },
    // Add compression
    server: {
        headers: {
            'Cache-Control': 'public, max-age=31536000',
        },
    },
})
