<template>
  <nav class="w-full sticky top-0 z-50 bg-white">
    <!-- Shipping Banner -->
    <div class="bg-black text-white py-3 font-medium text-sm tracking-wide">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <p class="m-0 font-sans text-xs sm:text-sm">25% DISCOUNT ON ORDERS OVER $100</p>
        <a href="tel:+17182185533" class="ml-auto flex items-center font-semibold text-xs sm:text-sm hover:underline">
          <i class="pi pi-phone mr-1"></i>
          +1 718-218-5533
        </a>
      </div>
    </div>

    <!-- Category Navigation -->
    <div class="bg-gradient-to-b from-blue-50 via-blue-50 to-white py-6 border-b border-gray-200">
      <div class="container mx-auto px-4 flex items-center justify-between h-full">
        
        <!-- Categories -->
        <div
          class="flex flex-nowrap overflow-x-auto scrollbar-hide gap-4 sm:gap-6 lg:gap-8 items-center justify-start sm:justify-center w-full"
          style="-ms-overflow-style: none; scrollbar-width: none;"
        >
          <!-- Home Link -->
          <NuxtLink
            to="/"
            class="text-gray-900 hover:text-gray-600 transition-all duration-200 font-sans text-sm sm:text-md font-medium py-2 relative group whitespace-nowrap flex-shrink-0"
            active-class="text-blue-500 font-semibold"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/ProductPage"
            class="text-gray-900 hover:text-gray-600 transition-all duration-200 font-sans text-sm sm:text-md font-medium py-2 relative group whitespace-nowrap flex-shrink-0"
            active-class="text-blue-500 font-semibold"
          >
            All Products
          </NuxtLink>
          <!-- Dynamic Categories -->
          <NuxtLink 
            v-for="category in categories" 
            :key="category.id"
            :to="getCategoryLink(category)"
            class="text-gray-900 hover:text-gray-600 transition-all duration-200 font-sans text-sm sm:text-md font-medium py-2 relative group whitespace-nowrap flex-shrink-0"
            active-class="text-blue-500 font-semibold"
          >
            {{ category.name }}
            <div
              class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            </div>
          </NuxtLink>
          <NuxtLink
            to="/blogs"
            class="text-gray-900 hover:text-gray-600 transition-all duration-200 font-sans text-sm sm:text-md font-medium py-2 relative group whitespace-nowrap flex-shrink-0"
            active-class="text-blue-500 font-semibold"
          >
            Blogs
          </NuxtLink>
        </div>

        <!-- Cart Button (hidden on / route) -->
        <button
          v-if="route.path !== '/'"
          class="ml-4 text-2xl text-gray-700 hover:text-green-600 flex items-center"
          aria-label="Cart"
          @click="showCart = true"
        >
          <i class="pi pi-shopping-cart"></i>
        </button>

        <!-- Cart Overlay -->
        <div
          v-if="showCart"
          class="fixed inset-0 bg-black bg-opacity-30 z-40"
          @click="showCart = false"
        ></div>

        <!-- Cart Sidebar -->
        <CartSidebar :visible="showCart" @close="showCart = false" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CartSidebar from './CartSidebar.vue'

const showCart = ref(false)
const route = useRoute()

// Always generate link dynamically
function getCategoryLink(category: { name: string }) {
  if (category.name === 'Products') {
    return '/ProductPage'
  }
  return {
    path: '/ProductPage',
    query: { category: category.name.toLowerCase() }
  }
}

const categories = ref([
  { id: 1, name: 'Tickets' },
  { id: 2, name: 'HashHoles' },
  { id: 3, name: '70/30 prerolls' },
  { id: 4, name: 'Rosin 2G jars' },
  { id: 5, name: 'Hash Rosin pens/Vapes' },
  { id: 6, name: 'flowers by fidels' },
  { id: 7, name: 'Events' },
  { id: 8, name: 'Sponsorships' },
])
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
