import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'TokenFlight Receive \u00b7 Nuxt + AppKit',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Intent-based trading powered by TokenFlight, Nuxt 4, and Reown AppKit.',
        },
      ],
      link: [],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) =>
        tag.startsWith('tokenflight-') || tag.startsWith('appkit-'),
    },
  },

  runtimeConfig: {
    public: {
      walletConnectProjectId: '',
    },
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: '2024-12-01',
});
