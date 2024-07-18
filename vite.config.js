import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => {
            return path.replace(/^\/api/, "")
          }
        },
        '/geo':{
          target: 'https://geo.datav.aliyun.com/areas_v3/bound',
          changeOrigin: true,
          rewrite: path => {
            return path.replace(/^\/geo/, "")
          }
        },
        '/hotCity':{
          target:'http://39.103.151.139:8000',
          changeOrigin: true,
          rewrite: path => {
            return path.replace(/^\/hotCity/, "")
          }
        }
      }
    }
  }
})

