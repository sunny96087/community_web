// https://nuxt.com/docs/api/configuration/nuxt-config
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    // 您的網站根 URL
    hostname: 'https://community-web-4l2.pages.dev',
    // 您希望在 sitemap 中包含的路徑
    routes: ['/', '/login']
  },

  imports: {
    dirs: [
      // 掃描 composables 目錄頂層
      'composables',
      // 掃描深度一層的特定檔案
      'composables/*/index.{ts,js,mjs,mts}',
      // 掃描整個 composables 目錄下的檔案
      'composables/**',
      'stores'
    ]
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })]
  }
})
