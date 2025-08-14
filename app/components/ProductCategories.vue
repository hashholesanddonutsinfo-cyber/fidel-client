<template>
  <section class="w-full bg-black py-16">
    <h2 class="text-4xl font-bold text-center text-white mb-12 tracking-wide">PRODUCTS</h2>
    <div class="w-full overflow-x-auto scrollbar-hide">
      <div class="flex flex-row gap-6 md:gap-12 items-end min-w-max md:justify-center" style="-ms-overflow-style: none; scrollbar-width: none;">
        <div v-for="category in categories" :key="category.name" class="flex flex-col items-center min-w-[140px] w-40">
          <img :src="category.image" :alt="category.name" class="mb-4 h-32 object-contain" />
          <span class="text-white text-base md:text-lg font-semibold tracking-wide uppercase text-center">{{ category.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  {
    name: 'BATTERIES',
    image: '/images/photo7.jpg',
  },
  {
    name: 'PODS',
    image: '/images/photo8.jpg',
  },
  {
    name: 'FLOWERS',
    image: '/images/photo9.jpg',
  },
  {
    name: 'EXTRACTS',
    image: '/images/photo10.jpg',
  },
  {
    name: 'EDIBLES',
    image: '/images/photo11.jpg',
  },
]
</script>

<style scoped>
section {
  min-height: 500px;
}
</style>
