import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve, dirname } from 'path';
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components/'),
      '@utils': resolve(__dirname, './src/utils/'),
      '@api': resolve(__dirname, './src/api/'),
      '@app': resolve(__dirname, './src/app/'),
      '@constants': resolve(__dirname, './src/constants/'),
      '@config': resolve(__dirname, './src/config/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
    },
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 8080,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})