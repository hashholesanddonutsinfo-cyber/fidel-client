<template>
  <div class="min-h-screen flex flex-col bg-white">
    <AppNavigation />
    <div class="container mx-auto px-2 py-6 flex-1">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <Loader v-if="loading" />
      <div v-else>
        <div v-if="products.length === 0" class="flex flex-col items-center justify-center py-16">
          <svg class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
          <div class="text-gray-500 text-lg">No products found</div>
        </div>
  <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          <NuxtLink
            v-for="product in products"
            :key="product._id"
            :to="`/productDetail/${product._id}`"
            class="relative flex flex-col items-center bg-white rounded-xl shadow-lg p-4 transition hover:scale-105 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <div class="absolute top-4 right-4">
              <span v-if="product.badge" class="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">Avaliable</span>
            </div>
            <img :src="(product.images && product.images.length) ? product.images[0] : '/images/default.jpg'" :alt="product.name" class="w-40 h-40 object-cover mb-2 rounded-lg border border-gray-100" />
            <div class="text-gray-500 text-xs mb-1 text-center uppercase tracking-wide mt-2">
              {{ typeof product.category === 'object' && product.category !== null ? product.category.name : product.category }}
            </div>
            <div class="font-bold text-lg mb-1 text-center truncate w-full">{{ product.name }}</div>
            <div class="border-b border-dashed border-gray-300 w-full my-2"></div>
            <div class="text-green-700 font-bold text-xl mb-1">${{ product.price }}</div>
            <div class="text-xs text-gray-500 mb-2">Tax included</div>
            <button class="w-full bg-green-600 text-white font-bold py-2 rounded mt-auto hover:bg-green-700 transition" @click.stop>BUY NOW</button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '~/components/AppFooter.vue'
import AppNavigation from '~/components/AppNavigation.vue'
import Loader from '~/components/Loader.vue'

type Product = {
  id: string
  name: string
  price: number
  oldPrice?: number
  save?: string
  sale?: boolean
  status?: string
  badge?: string
  images?: string[]
  category?: string | { name: string }
}

const products = ref<Product[]>([])
const loading = ref(true)
const route = useRoute()

async function fetchProducts(category = '') {
  loading.value = true
  let url = 'https://fidel-of6u.onrender.com/api/products'
  if (category) {
    url += `?category=${encodeURIComponent(category)}`
  }
  try {
    const res = await fetch(url)
    const data = await res.json()
    products.value = Array.isArray(data) ? data : (data.products || [])
  } catch (e) {
    products.value = []
  }
  loading.value = false
}

onMounted(() => {
  fetchProducts(route.query.category as string || '')
})

watch(() => route.query.category, (newCat) => {
  fetchProducts(newCat as string || '')
})
</script>

<style scoped>
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
