<template>
  <nav class="w-full">
    <!-- Shipping Banner -->
    <div class="bg-black text-white py-3 text-center font-medium text-sm tracking-wide">
      <div class="container mx-auto px-4">
        <p class="m-0 font-sans text-xs sm:text-sm">25% DISCOUNT ON ORDERS OVER $100</p>
      </div>
    </div>

    <!-- Category Navigation -->
    <div class="bg-gradient-to-b from-blue-50 from-0% via-blue-50 via-33% to-white to-33% py-6 border-b border-gray-200">
      <div class="container mx-auto px-4 flex items-center justify-between h-full">
        <div class="flex flex-nowrap mt-10 overflow-x-auto scrollbar-hide gap-4 sm:gap-6 lg:gap-8 items-center justify-start sm:justify-center w-full" style="-ms-overflow-style: none; scrollbar-width: none;">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.id"
            :to="getCategoryLink(category)"
            class="text-gray-400 hover:text-gray-600 transition-all duration-200 font-sans text-xs sm:text-sm font-medium py-2 relative group whitespace-nowrap flex-shrink-0"
            active-class="text-blue-500 font-semibold"
          >
            {{ category.name }}
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </NuxtLink>
        </div>
          <button class="ml-4 text-2xl text-gray-700 hover:text-green-600 flex items-center" aria-label="Cart" @click="showCart = true">
            <i class="pi pi-shopping-cart"></i>
          </button>
          <div v-if="showCart" class="fixed inset-0 bg-black bg-opacity-30 z-40" @click="showCart = false"></div>
          <CartSidebar :visible="showCart" @close="showCart = false" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartSidebar from './CartSidebar.vue'

const showCart = ref(false)

function getCategoryLink(category: { name: string }) {
  if (category.name === 'Products') {
    return '/ProductPage'
  }
  return {
    path: '/ProductPage',
    query: { category: category.name.toLowerCase() }
  }
}

// Category data based on the image
const categories = ref([
  { id: 1, name: 'Flower', path: '/category/flower' },
  { id: 2, name: 'Vapes', path: '/category/vapes' },
  { id: 3, name: 'Edibles', path: '/category/edibles' },
  { id: 4, name: 'Prerolls', path: '/category/prerolls' },
  { id: 5, name: 'Concentrates', path: '/category/concentrates' },
  { id: 6, name: 'Topicals', path: '/category/topicals' },
  { id: 7, name: 'Capsules', path: '/category/capsules' },
  { id: 8, name: 'Tinctures', path: '/category/tinctures' },
  { id: 9, name: 'Beverages', path: '/category/beverages' },
  { id: 10, name: 'Accessories', path: '/category/accessories' },
  { id: 99, name: 'Products', path: '/ProductPage' },
])
</script>
