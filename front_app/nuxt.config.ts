// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  routeRules: {
    // ルートパス '/' へのアクセスがあった場合に '/home' へリダイレクトする
    '/': { redirect: '/home' },
  },
})
