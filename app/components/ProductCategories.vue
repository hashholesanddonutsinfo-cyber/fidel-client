<template>
  <section class="w-full bg-black py-16">
    <h2 class="text-4xl font-bold text-center text-white mb-12 tracking-wide">PRODUCT CATEGORIES</h2>
    <div class="w-full overflow-x-auto scrollbar-hide">
      <div class="flex flex-row gap-6 md:gap-12 items-end min-w-max md:justify-center" style="-ms-overflow-style: none; scrollbar-width: none;">
        <NuxtLink
          v-for="category in categories"
          :key="category.name"
          :to="getCategoryLink(category)"
          class="flex flex-col items-center min-w-[140px] w-40 hover:scale-105 transition-transform duration-200"
        >
          <img :src="category.image" :alt="category.name" class="mb-4 h-32 object-contain" />
          <span class="text-white text-base md:text-lg font-semibold tracking-wide uppercase text-center">{{ category.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const categories = [
  {
    name: 'Tickets',
    image: '/images/cat5.jpg',
  },
  {
    name: 'HashHoles',
    image: '/images/cat1.jpg',
  },
  {
    name: '70/30 prerolls',
    image: '/images/cat2.jpg',
  },
  {
    name: 'Rosin 2G jars',
    image: '/images/cat3.jpg',
  },
  {
    name: 'Flowers',
    image: '/images/cat4.jpg',
  },
  {
    name: 'Events',
    image: '/images/carousel.jpg',
  },
  {
    name: 'Sponsorships',
    image: '/images/cat6.jpg',
  },
]

function getCategoryLink(category: { name: string }) {
  if (category.name === 'Products') {
    return '/ProductPage'
  }
  return {
    path: '/ProductPage',
    query: { category: category.name.toLowerCase() }
  }
}
</script>

<style scoped>
section {
  min-height: 500px;
}
</style>
