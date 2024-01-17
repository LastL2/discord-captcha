// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'last.community',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#00aba9' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },
  ssr: true,
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    './modules/ui-library/module.ts',
  ],
  i18n: {
    locales: [{ code: 'en', iso: 'en-US', file: 'en.json' }],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales',
    lazy: true,
    vueI18n: './i18n.config.ts',
  },
  vite: {
    optimizeDeps: {
      exclude: ['fsevents', 'zlib-sync'],
    },
  },
  runtimeConfig: {
    recaptchaSecret: '',
    discord: {
      appId: '',
      token: '',
      publicKey: '',
      guildId: 0,
      channelId: 0,
      roleId: 0,
    },
    redis: {
      host: '',
      password: '',
    },
    public: {
      siteUrl: '',
      recaptcha: {
        siteKey: '',
      },
      logLevel: 3, // defaults at info level
    },
  },
});
