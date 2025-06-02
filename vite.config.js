import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactWebGuide',
      fileName: 'index',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    // Development settings
    ...(command === 'serve' ? {
      sourcemap: true,
      minify: false
    } : {
      // Production settings
      sourcemap: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    })
  }
}))
