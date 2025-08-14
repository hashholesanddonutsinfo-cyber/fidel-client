// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  components: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
