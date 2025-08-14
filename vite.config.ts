import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 3000,
    host: true, // 确保可以通过局域网访问
    proxy: {
      '/proxy': {
        target: 'https://spark-api-open.xf-yun.com', // 确保地址和端口正确
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
