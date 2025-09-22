import tailwindcss from '@tailwindcss/vite';

import './server/lib/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],
  plugins: ['~/plugins/init-auth.client', '~/plugins/init-auth.server'],
  pinia: {
    storesDirs: ['stores'], // or whatever folder you use for your stores
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    dataValue: 'theme',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  nitro: {
    publicAssets: [
      {
        baseURL: '/uploads', // URL path
        dir: 'public/uploads', // directory inside container
      },
    ],
  },
});
