import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        port: 10086,
        strictPort: true
    },
    build: {
        emptyOutDir: true,
        outDir: 'docs'
    },
    css: {
        modules: {
            hashPrefix: 'prefix',
            scopeBehaviour: "local"
        }
    }
})
