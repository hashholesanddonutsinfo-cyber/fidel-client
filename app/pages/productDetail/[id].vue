<template>
  <AppNavigation />
  <Head>
    <title>{{ product.title }} | HashHoles</title>
    <meta name="description" :content="product.description || 'Premium cannabis product from HashHoles. Fast CA delivery.'" />
    <meta name="keywords" content="hashholes, cannabis, weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes,, vapes, edibles, prerolls, concentrates, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, premium cannabis, {{ product.title }}" />
    <meta property="og:title" :content="product.title + ' | HashHoles'" />
    <meta property="og:description" :content="product.description || 'Premium cannabis product from HashHoles. Fast CA delivery.'" />
    <meta property="og:image" :content="product.images[0] || 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200'" />
    <meta property="og:type" content="product" />
    <meta property="og:url" :content="'https://fidelsclothings.com/productDetail/' + $route.params.id" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" :content="product.title + ' | HashHoles'" />
    <meta name="twitter:description" :content="product.description || 'Premium cannabis product from HashHoles. Fast CA delivery.'" />
    <meta name="twitter:image" :content="product.images[0] || 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200'" />
    <link rel="canonical" :href="'https://fidelsclothings.com/productDetail/' + $route.params.id" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="HashHoles" />
  </Head>
  <section class="w-full bg-white min-h-screen py-8">
    <Toast :message="toastMessage" :icon="toastIcon" :duration="toastDuration" :show="showToast" @close="showToast = false" />
    <OrderContactModal :visible="showOrderContactModal" @close="showOrderContactModal = false" />
    <!-- Overlay for Cart Sidebar (mobile & desktop) -->
    <div v-if="showCart" class="fixed inset-0 bg-black bg-opacity-30 z-[10000]" @click="showCart = false"></div>
    <!-- Cart Sidebar for mobile & desktop -->
    <CartSidebar :visible="showCart" @close="showCart = false" class="z-[10001]" />
    <Loader v-if="loading" />
    <template v-else>
      <!-- Mobile Header -->
      <div class="md:hidden flex items-center justify-between px-4 py-2">
        <div class="flex items-center gap-4">
          <button class="text-2xl text-gray-700" @click="$router.back()"><i class="pi pi-arrow-left"></i></button>
          <img src="/images/photo7.jpg" alt="Brand Logo" class="h-8" />
        </div>
        <div class="flex items-center gap-4">
          <button class="text-2xl text-gray-700"><i class="pi pi-search"></i></button>
          <button class="text-2xl text-gray-700"><i class="pi pi-heart"></i></button>
          <button class="text-2xl text-gray-700"><i class="pi pi-user"></i></button>
          <button class="text-2xl text-gray-700" @click="showCart = true"><i class="pi pi-shopping-cart"></i></button>
        </div>
      </div>
      <!-- Desktop Header -->
      <div class="hidden md:flex max-w-6xl mx-auto items-center justify-between px-4 mb-8">
        <div class="flex items-center gap-4">
          <button class="text-2xl text-gray-700 hover:text-green-600" @click="$router.back()">
            <i class="pi pi-arrow-left"></i>
          </button>
          <img src="/images/photo7.jpg" alt="Brand Logo" class="h-8" />
        </div>
        <div class="flex items-center gap-6">
          <button class="text-2xl text-gray-700 hover:text-green-600"><i class="pi pi-heart"></i></button>
          <button class="text-2xl text-gray-700 hover:text-green-600"><i class="pi pi-user"></i></button>
          <button class="text-2xl text-gray-700 hover:text-green-600" @click="showCart = true"><i class="pi pi-shopping-cart"></i></button>
        </div>
      </div>
      <!-- Mobile Product Details -->
      <div class="md:hidden px-4">
        <div class="flex flex-col items-center">
          <img :src="product.images[imageIndex]" :alt="product.title" class="w-full max-w-xs h-auto object-contain mx-auto" />
          <div v-if="product.images.length > 1" class="flex gap-2 mt-2">
            <button v-for="(img, idx) in product.images" :key="idx" @click="imageIndex = idx" class="w-3 h-3 rounded-full" :class="imageIndex === idx ? 'bg-green-500' : 'bg-gray-300'" />
          </div>
        </div>
        <h1 class="text-xl font-bold mt-4">{{ product.title }} <span class="text-base font-normal">| {{ product.weight }}</span></h1>
  <!-- Ensure product.title is always present and fallback to a default if missing -->
  <h1 class="text-xl font-bold mt-4">{{ product.title || 'Product' }} <span class="text-base font-normal">| {{ product.weight }}</span></h1>
  <div class="text-green-700 font-semibold mb-2">Product from {{ product.brand }} →</div>
        <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{{ product.type }}</span>
        <div class="flex items-center gap-2 mt-2 mb-2">
          <!-- Review Stars -->
          <div class="flex items-center mb-2">
            <span v-for="star in 5" :key="star" class="text-yellow-400 text-xl">
              <i :class="star <= (product.rating || 5) ? 'pi pi-star-fill' : 'pi pi-star'" />
            </span>
            <span v-if="product.rating" class="ml-2 text-xs text-gray-500">({{ product.rating }})</span>
          </div>
          <span class="text-2xl font-bold text-green-700">{{ product.price }}</span>
          <span v-if="product.oldPrice" class="text-lg text-gray-400 line-through">{{ product.oldPrice }}</span>
          <span v-if="product.sale" class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">SALE</span>
        </div>
        <div class="text-xs text-gray-500 mb-2">Tax Incl.</div>
        <div class="mb-4">
          <h2 class="text-base font-bold mb-2">{{ product.title }} <span class="font-normal text-sm">{{ product.description }} </span> </h2>
          <div class="text-xs text-gray-700 mb-2">About the Brand</div>
          <img src="/images/photo7.jpg" alt="Brand Logo" class="h-8 mb-2" />
          <p class="text-xs text-gray-700">Fidels is known as an innovative, award-winning, California-based cannabis brand. Founded in 2017 as a pioneering vape company, Fidels evolved into so much more. Today, Fidels has become one of the world's most treasured cannabis brands with its class defining retail stores and amazing cannabis products. Always innovating, always inspiring, always influencing: that's Fidels.</p>
          <span class="text-green-600 text-xs cursor-pointer">See More</span>
        </div>
        <div class="mb-4">
          <div class="text-xs font-bold mb-1">Disclaimer:</div>
          <ul class="text-xs text-gray-700 list-disc ml-4 mb-2">
            <li>An empty integrated cannabis vaporizer shall be properly disposed of as a hazardous waste at a household hazardous waste collection facility or other approved facility.</li>
            <li>A spent cannabis cartridge shall be properly disposed of as hazardous waste at a household hazardous waste collection facility or other approved facility.</li>
          </ul>
          <div class="text-xs font-bold mb-1">WARNING:</div>
          <p class="text-xs text-gray-700">This product can expose you to chemicals, including Cannabis Smoke, which are known to the State of California to cause cancer and birth defects or other reproductive harm. For more information go to <a href="https://www.P65Warnings.ca.gov" class="text-green-600 underline">www.P65Warnings.ca.gov</a></p>
        </div>
        <div v-if="!showCart" class="fixed bottom-0 left-0 w-full bg-white border-t flex items-center justify-between px-4 py-3">
          <button class="bg-green-600 text-white px-8 py-3 rounded font-bold flex items-center gap-2 text-lg w-full mx-2" @click="addToCart" :disabled="loadingCart">
            <i class="pi pi-shopping-cart"></i>
            <span v-if="!loadingCart">Add to cart</span>
            <span v-else>Adding...</span>
          </button>
          <button class="bg-yellow-500 text-white px-8 py-3 rounded font-bold flex items-center gap-2 text-lg w-full mx-2">Buy now</button>
        </div>
      </div>
      <!-- Desktop Product Details -->
      <div class="hidden md:grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-12 items-start px-4">
        <!-- ...existing code... -->
        <div class="flex flex-col items-center justify-center">
          <div class="relative w-full flex items-center justify-center">
            <div class="w-full flex items-center justify-center" style="height:600px;">
              <img :src="product.images[imageIndex]" :alt="product.title" class="w-full h-full object-contain" />
            </div>
            <div v-if="product.images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button v-for="(img, idx) in product.images" :key="idx" @click="imageIndex = idx" class="w-3 h-3 rounded-full" :class="imageIndex === idx ? 'bg-green-500' : 'bg-gray-300'" />
            </div>
          </div>
        </div>
        <!-- ...existing code for desktop details... -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <h1 class="text-2xl md:text-3xl font-bold">{{ product.title || 'Product' }}</h1>
            <span class="text-base font-normal">| {{ product.weight }}</span>
          </div>
          <div class="text-green-700 font-semibold mb-2 cursor-pointer">Product from {{ product.brand }}</div>
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{{ product.type }}</span>
            <span v-if="product.sale" class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">SALE</span>
          </div>
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl font-bold text-green-700">{{ product.price }}</span>
            <span v-if="product.oldPrice" class="text-lg text-gray-400 line-through">{{ product.oldPrice }}</span>
          </div>
          <div class="text-xs text-gray-500 mb-2">Tax Incl.</div>
          <div class="flex items-center gap-4 mb-4">
            <!-- Quantity Selector -->
            <div class="flex items-center gap-2">
              <button @click="decreaseQty" class="bg-gray-200 text-gray-700 px-3 py-2 rounded text-lg font-bold">-</button>
              <input type="number" v-model="quantity" min="1" class="w-12 text-center border border-gray-300 rounded py-2 text-lg" />
              <button @click="increaseQty" class="bg-gray-200 text-gray-700 px-3 py-2 rounded text-lg font-bold">+</button>
            </div>
            <button class="bg-green-600 text-white px-8 py-3 rounded font-bold flex items-center gap-2 text-lg" @click="addToCart" :disabled="loadingCart">
              <i class="pi pi-shopping-cart"></i>
              <span v-if="!loadingCart">Add to cart</span>
              <span v-else>Adding...</span>
            </button>
            <button class="bg-yellow-500 text-white px-8 py-3 rounded font-bold flex items-center gap-2 text-lg">Buy now</button>
          </div>
          <div class="mt-6">
            <h2 class="text-base font-bold mb-2">{{ product.title }}, <span class="font-normal text-sm"> {{ product.description }} </span></h2>
            <div class="text-xs text-gray-700 mb-2">About the Brand</div>
            <img src="/images/photo7.jpg" alt="Brand Logo" class="h-8 mb-2" />
            <p class="text-xs text-gray-700">Fidels is known as an innovative, award-winning, California-based cannabis brand. Founded in 2017 as a pioneering vape company, Fidels evolved into so much more. Today, Fidels has become one of the world's most treasured cannabis brands with its class defining retail stores and amazing cannabis products. Always innovating, always inspiring, always influencing: that's Fidels.</p>
            <span class="text-green-600 text-xs cursor-pointer">See More</span>
          </div>
          <div class="mt-6">
            <div class="text-xs font-bold mb-1">Disclaimer:</div>
            <ul class="text-xs text-gray-700 list-disc ml-4 mb-2">
              <li>An empty integrated cannabis vaporizer shall be properly disposed of as a hazardous waste at a household hazardous waste collection facility or other approved facility.</li>
              <li>A spent cannabis cartridge shall be properly disposed of as hazardous waste at a household hazardous waste collection facility or other approved facility.</li>
            </ul>
            <div class="text-xs font-bold mb-1">WARNING:</div>
            <p class="text-xs text-gray-700">This product can expose you to chemicals, including Cannabis Smoke, which are known to the State of California to cause cancer and birth defects or other reproductive harm. For more information go to <a href="https://www.P65Warnings.ca.gov" class="text-green-600 underline">www.P65Warnings.ca.gov</a></p>
          </div>
        </div>
      </div>
      <!-- More from Brand Carousel -->
      <div class="max-w-6xl mx-auto mt-12 px-4">
        <h2 class="text-lg font-bold mb-4">More from {{ product.brand }}</h2>
        <div class="flex gap-4 overflow-x-auto pb-4">
          <!-- Example cards, replace with real data -->
          <div v-for="n in 6" :key="n" class="min-w-[220px] bg-white border rounded-lg shadow p-4 flex flex-col items-center">
            <div class="w-full flex items-center justify-center" style="height:208px;">
              <img :src="product.images[0]" alt="Product" class="w-full h-full object-contain mb-2" />
            </div>
            <div class="font-bold text-sm mb-1">Fidels</div>
            <div class="text-xs text-gray-500 mb-1">Hybrid • THC Pod</div>
            <div class="text-green-700 font-bold text-lg mb-1">$20 <span class="text-gray-400 line-through text-sm">$25</span></div>
            <button class="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"><i class="pi pi-plus"></i></button>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CartSidebar from '../../components/CartSidebar.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Loader from '~/components/Loader.vue'
import { useHead } from '@vueuse/head'
import Toast from '~/components/Toast.vue'
import OrderContactModal from '~/components/OrderContactModal.vue'

const showCart = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastIcon = ref('pi pi-check-circle')
const toastDuration = ref(2500)
const showOrderContactModal = ref(false)

const route = useRoute()
const product = ref({
  title: '',
  weight: '',
  brand: '',
  type: '',
  sale: false,
  price: '',
  oldPrice: '',
  images: [],
  thc: '',
  cbd: '',
  thcPerDollar: '',
  cbdPerDollar: '',
  description: '',
})
const imageIndex = ref(0)
const quantity = ref(1)
const loadingCart = ref(false)
const loading = ref(true)

function increaseQty() {
  quantity.value++
}
function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

function getSessionId() {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

async function addToCart() {
  loadingCart.value = true
  try {
    await axios.post('https://fidel-of6u.onrender.com/api/carts', {
      sessionId: getSessionId(),
      products: [{
        product: route.params.id,
        quantity: quantity.value
      }]
    })
    toastMessage.value = 'Added to cart!'
    toastIcon.value = 'pi pi-check-circle'
    showToast.value = true
  } catch (err) {
    toastMessage.value = 'Failed to add to cart.'
    toastIcon.value = 'pi pi-times-circle'
    showToast.value = true
    console.error('Failed to add to cart:', err)
  } finally {
    loadingCart.value = false
  }
}

onMounted(() => {
  window.addEventListener('order-success-toast', (e: any) => {
    toastMessage.value = e.detail.message
    toastIcon.value = e.detail.icon || 'pi pi-check-circle'
    toastDuration.value = e.detail.duration || 2500
    showToast.value = true
    showOrderContactModal.value = true
  })
})

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await axios.get(`https://fidel-of6u.onrender.com/api/products/${id}`)
    const p = res.data
    product.value = {
      title: p.name || '',
      weight: p.weight || '1gram',
      brand: p.brand || 'Fidels',
      type: p.category.name || '',
      sale: !!p.sale || !!p.discount,
      price: p.price ? `$${p.price}` : '',
      oldPrice: p.oldPrice ? `$${p.oldPrice}` : '',
      images: p.images && p.images.length ? p.images : [p.image || '/images/default.jpg'],
      thc: p.thc || '',
      cbd: p.cbd || '',
      thcPerDollar: p.thcPerDollar || '',
      cbdPerDollar: p.cbdPerDollar || '',
      description: p.description || '',
    }
  } catch (err) {
    console.error('Failed to fetch product:', err)
  } finally {
    loading.value = false
  }
})

useHead({
  title: product.value.title + ' | HashHoles',
  meta: [
    { name: 'description', content: product.value.description || 'Premium cannabis product from HashHoles. Fast CA delivery.' },
    { name: 'keywords', content: 'hashholes, cannabis, weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes,, vapes, edibles, prerolls, concentrates, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, premium cannabis, ' + product.value.title },
    { property: 'og:title', content: product.value.title + ' | HashHoles' },
    { property: 'og:description', content: product.value.description || 'Premium cannabis product from HashHoles. Fast CA delivery.' },
    { property: 'og:image', content: product.value.images[0] || 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200' },
    { property: 'og:type', content: 'product' },
    { property: 'og:url', content: 'https://hashholes.com/productDetail/' + route.params.id },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: product.value.title + ' | HashHoles' },
    { name: 'twitter:description', content: product.value.description || 'Premium cannabis product from HashHoles. Fast CA delivery.' },
    { name: 'twitter:image', content: product.value.images[0] || 'https://cdn.shopify.com/s/files/1/0276/6569/4860/files/FIDELS_GREEN_LOGO.png?height=628&pad_color=ffffff&v=1733808591&width=1200' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Fidels' }
  ],
  link: [
    { rel: 'canonical', href: 'https://hashholes.com/productDetail/' + route.params.id }
  ]
})
</script>

<style scoped>
section {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
