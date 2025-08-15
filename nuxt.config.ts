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

  app: {
    head: {
      title: 'Buy Fidels Product Cheap Price - Fidels Hash Hole',
      meta: [
        { name: 'description', content: 'Shop HashHoles for the best cannabis products:flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
        { name: 'keywords', content: 'hashholes, cannabis, weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes,, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, vapes, edibles, prerolls, concentrates, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, premium cannabis' },
        { property: 'og:title', content: 'Buy Fidels Product Cheap Price - Fidels Hash Hole' },
        { property: 'og:description', content: 'Shop HashHoles for the best cannabis products: flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
        { property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://fidelsclothings.com/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Buy Fidels Product Cheap Price - Fidels Hash Hole' },
        { name: 'twitter:description', content: 'Shop HashHoles for the best cannabis products: flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
        { name: 'twitter:image', content: 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Fidels' }
      ],
      link: [
        { rel: 'canonical', href: 'https://fidelsclothings.com/' }
      ]
    }
  },
})
