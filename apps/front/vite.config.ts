/// <reference types="vite/client" />

import * as process from 'process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'


export default defineConfig({
    cacheDir: '../../node_modules/.vite/front',
    plugins: [
        react({ tsDecorators: true }),
        svgr({
            include: "**/*.svg"
        }),
        checker({
            enableBuild: false,
            typescript: {
                tsconfigPath: './tsconfig.app.json'
            }
        }),
        ViteTsConfigPathsPlugin({
            root: '../../'
        })
    ],
    optimizeDeps: {
        include: ['@mui/icons-material']
    },
    define: {
        'process.env': process.env
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
})
