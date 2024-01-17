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
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
          crossorigin: 'use-credentials',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
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
