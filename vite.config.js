import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const commonBuildConfig = {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactWebGuide',
      fileName: 'index',
      formats: ['es', 'umd']
    },
    sourcemap: true,
    minify: mode === 'production',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        },
        manualChunks: undefined,
      },
    }
  };

  return {
    plugins: [react()],
    build: commonBuildConfig,
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  };
})
