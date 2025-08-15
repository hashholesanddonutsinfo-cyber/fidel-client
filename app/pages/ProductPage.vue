<template>
  <Head>
    <title>Shop Premium Cannabis Products | Fidels</title>
    <meta name="description" content="Browse and buy premium cannabis products including flowers, vapes, edibles, prerolls, concentrates, and more. Fast CA delivery. HashHoles is the leading lifestyle brand in cannabis." />
    <meta name="keywords" content="cannabis, hashholes, premium weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes,, vapes, edibles, prerolls, concentrates, topicals, tinctures, capsules, accessories, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, best cannabis products" />
    <meta property="og:title" content="Shop Premium Cannabis Products | HashHoles" />
    <meta property="og:description" content="Browse and buy premium cannabis products including flowers, vapes, edibles, prerolls, concentrates, and more. Fast CA delivery. HashHoles is the leading lifestyle brand in cannabis." />
    <meta property="og:image" content="https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://fidelsclothings.com/products" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shop Premium Cannabis Products | HashHoles" />
    <meta name="twitter:description" content="Browse and buy premium cannabis products including flowers, vapes, edibles, prerolls, concentrates, and more. Fast CA delivery. HashHoles is the leading lifestyle brand in cannabis." />
    <meta name="twitter:image" content="https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200" />
    <link rel="canonical" href="https://fidelsclothings.com/products" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="HashHoles" />
  </Head>
  <div class="min-h-screen flex flex-col bg-white">
    <AppNavigation />
    <div class="container mx-auto px-2 py-6 flex-1">
      <h1 class="text-2xl font-bold mb-4">Products</h1>

      <!-- Search & Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <!-- Search Bar -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <!-- Sort Dropdown -->
        <select
          v-model="sortOption"
          class="border rounded-lg px-4 py-2 focus:outline-none w-full md:w-1/3 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

      </div>

      <Loader v-if="loading" />
      <div v-else>
        <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-16">
          <svg class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
          <div class="text-gray-500 text-lg">No products found</div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
          <NuxtLink
            v-for="product in filteredProducts"
            :key="product._id"
            :to="`/productDetail/${product._id}`"
            class="relative flex flex-col items-center bg-white rounded-xl shadow-lg p-4 transition hover:scale-105 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <div class="absolute top-4 right-4">
              <span v-if="product.badge" class="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">Available</span>
            </div>
            <img :src="(product.images && product.images.length) ? product.images[0] : '/images/default.jpg'"
              :alt="product.name"
              class="w-40 h-40 object-cover mb-2 rounded-lg border border-gray-100" />
            <div class="text-gray-500 text-xs mb-1 text-center uppercase tracking-wide mt-2">
              {{ typeof product.category === 'object' && product.category !== null ? product.category.name : product.category }}
            </div>
            <div class="font-bold text-lg mb-1 text-center truncate w-full">{{ product.name }}</div>
            <!-- Review Stars -->
            <div class="flex items-center mb-2">
              <span v-for="star in 5" :key="star" class="text-yellow-400 text-lg">
                <i :class="star <= (product.rating || 5) ? 'pi pi-star-fill' : 'pi pi-star'" />
              </span>
              <span v-if="product.rating" class="ml-2 text-xs text-gray-500">({{ product.rating }})</span>
            </div>
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
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import AppFooter from '~/components/AppFooter.vue'
import AppNavigation from '~/components/AppNavigation.vue'
import Loader from '~/components/Loader.vue'

type Product = {
  _id: string
  name: string
  price: number
  createdAt?: string
  badge?: string
  images?: string[]
  category?: string | { name: string }
}

const products = ref<Product[]>([])
const loading = ref(true)
const route = useRoute()

// Search & Filter states
const searchQuery = ref('')
const sortOption = ref('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

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

// Computed for search + filter
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Search filter
  if (searchQuery.value.trim()) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Price filter
  if (minPrice.value !== null) {
    result = result.filter(p => p.price >= minPrice.value!)
  }
  if (maxPrice.value !== null) {
    result = result.filter(p => p.price <= maxPrice.value!)
  }

  // Sorting
  if (sortOption.value === 'newest') {
    result.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
  }
  if (sortOption.value === 'lowToHigh') {
    result.sort((a, b) => a.price - b.price)
  }
  if (sortOption.value === 'highToLow') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

onMounted(() => {
  fetchProducts(route.query.category as string || '')
})

watch(() => route.query.category, (newCat) => {
  fetchProducts(newCat as string || '')
})

// SEO meta tags
useHead({
  title: 'Shop Premium Cannabis Products | HashHoles',
  meta: [
    { name: 'description', content: 'Browse and buy premium cannabis products including flowers, vapes, edibles, prerolls, concentrates, and more. Fast CA delivery. HashHoles is the leading lifestyle brand in cannabis.' },
    { name: 'keywords', content: 'cannabis, hashholes, premium weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes,, vapes, edibles, prerolls, concentrates, topicals, tinctures, capsules, accessories, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, best cannabis products' },
    { property: 'og:title', content: 'Shop Premium Cannabis Products | HashHoles' },
    { property: 'og:description', content: 'Browse and buy premium cannabis products including flowers, vapes, edibles, prerolls, concentrates, and more. Fast CA delivery. HashHoles is the leading lifestyle brand in cannabis.' },
    { property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://hashholes.com/products' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Shop Premium Cannabis Products | HashHoles' },
    { name: 'twitter:description', content: 'Browse and buy premium cannabis products including flowers, vapes, edibles, prerolls, concentrates, and more. Fast CA delivery. HashHoles is the leading lifestyle brand in cannabis.' },
    { name: 'twitter:image', content: 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Fidels' }
  ],
  link: [
    { rel: 'canonical', href: 'https://hashholes.com/products' }
  ]
})

// Structured data script injection
if (process.client) {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "HashHoles Cannabis Store",
    "url": "https://fidelsclothings.com/products",
    "image": "https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200",
    "description": "Premium cannabis products delivered fast in California. Shop flowers, vapes, edibles, prerolls, concentrates, and more.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "California",
      "addressCountry": "USA"
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "telephone": "+1-800-555-4200"
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(ldJson);
  document.head.appendChild(script);
}
</script>
