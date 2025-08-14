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
import FeaturedBanner from '~/components/FeaturedBanner.vue';
import FloatIn from '~/components/FloatIn.vue';
import MainVideo from '~/components/MainVideo.vue';
// ...existing code...

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
