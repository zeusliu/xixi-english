import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // 这个 base 是 GitHub Pages 必须配置的，跟你的仓库名保持一致
  base: '/xixi-english/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'XiXi English for Kids',
        short_name: 'XiXi English',
        description: '专属溪溪的英语学习软件',
        theme_color: '#8ec5fc',
        background_color: '#8ec5fc',
        display: 'standalone',
        icons: [
          {
            src: 'apple-touch-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
