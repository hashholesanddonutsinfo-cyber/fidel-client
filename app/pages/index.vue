<template>
  <FloatIn><AppNavigation /></FloatIn>
  <FloatIn><ImageCarousel /></FloatIn>
  <FloatIn><FeaturedProducts /></FloatIn>
  <FloatIn><ProductCategories /></FloatIn>
  <FloatIn><MainVideo /></FloatIn>
  <FloatIn><StoreShowcase /></FloatIn>
  <FloatIn><FeaturedBanner /></FloatIn>
  <FloatIn><AppFooter /></FloatIn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import FeaturedBanner from '~/components/FeaturedBanner.vue';
import FloatIn from '~/components/FloatIn.vue';
import MainVideo from '~/components/MainVideo.vue';

// SEO meta tags
useHead({
  title: 'Buy Fidels Product Cheap Price - Fidels Hash Hole',
  meta: [
    { name: 'description', content: 'Shop HashHoles for the best cannabis products:flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
    { name: 'keywords', content: 'hashholes, cannabis, weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, Buy Fidels Product Cheap Price - Fidels Hash Hole hash, holes,, vapes, edibles, prerolls, concentrates, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, premium cannabis' },
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
})

// Featured categories for the home page
const featuredCategories = ref([
  {
    id: 1,
    name: 'Flower',
    description: 'Premium quality flowers for the ultimate experience',
    path: '/category/flower'
  },
  {
    id: 2,
    name: 'Vapes',
    description: 'Convenient and discreet vaping solutions',
    path: '/category/vapes'
  },
  {
    id: 3,
    name: 'Edibles',
    description: 'Delicious treats with perfect dosing',
    path: '/category/edibles'
  },
  {
    id: 4,
    name: 'Concentrates',
    description: 'High-potency extracts for experienced users',
    path: '/category/concentrates'
  },
  {
    id: 5,
    name: 'Accessories',
    description: 'Everything you need for the perfect setup',
    path: '/category/accessories'
  },
  {
    id: 6,
    name: 'Beverages',
    description: 'Refreshing drinks with a special twist',
    path: '/category/beverages'
  }
])
</script>
