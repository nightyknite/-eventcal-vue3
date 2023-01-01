import vue from '@vitejs/plugin-vue'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
module.exports = {
  root: './',
  base: './',
  build: {
    sourcemap: 'true'
  },
  plugins: [
    vue(),
    ViteMinifyPlugin({})
  ],
  css: {
    devSourcemap: true,
  },
}
