import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
    // Load env berdasarkan mode (development/production)
    const env = loadEnv(mode, process.cwd(), '');

    // Extract origin untuk preconnect
    const apiOrigin = env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : '';

    return {
        plugins: [
            react()
        ],

        // Inject variable ke JavaScript
        define: {
            // __APP_ENV__: JSON.stringify(env), // REMOVED: Security risk, exposes all env vars
        },

        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                        'api-client': ['axios'],
                    },
                },
            },
            chunkSizeWarningLimit: 500, // ⚡️ Split chunk besar
            minify: 'esbuild',
            // terserOptions: { // ⚡️ Lebih agresif dari default (esbuild)
            //     compress: {
            //         drop_console: true, // ⚡️ Hapus console.log di production
            //         drop_debugger: true,
            //     },
            // },
        },
        // Add compression
        server: {
            port: 5173,
            strictPort: false, // Allow fallback
            headers: {
                'Cache-Control': 'public, max-age=31536000', // HANYA UNTUK DEV SERVER - TIDAK IMPACT PRODUCTION
            },
        },
    }
})
