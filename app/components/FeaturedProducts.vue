<template>
  <section class="w-full bg-white py-12">
    <h2 class="text-xl md:text-xl font-bold text-center mb-10 tracking-wide">FEATURED PRODUCTS (CA DELIVERY ONLY)</h2>
    <div ref="productsRow" class="mx-auto w-full md:w-[60%] max-w-5xl flex justify-center relative">
      <button class="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full z-10" @click="scrollLeft">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <Loader v-if="loading" />
      <div v-else-if="pagedProducts.length === 0" class="flex flex-col items-center justify-center py-16 w-full">
        <svg class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
        <div class="text-gray-500 text-lg">No products found</div>
      </div>
      <div v-else class="flex gap-8 overflow-x-hidden no-scrollbar px-2" style="scroll-behavior:smooth;">
        <div v-for="(product, productIndex) in pagedProducts" :key="product.id" class="flex flex-col items-center bg-white rounded-xl shadow p-4 min-w-[160px] max-w-[160px] h-[320px] md:p-6 md:min-w-[220px] md:max-w-[220px] md:h-[370px] relative transition hover:scale-105 hover:shadow-2xl">
          <div class="absolute top-4 left-4">
            <span v-if="product.badge" class="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">{{ product.badge }}</span>
          </div>
          <img :src="product.images && productImageIndexes[productIndex] !== undefined ? product.images[productImageIndexes[productIndex]] : product.image" :alt="product.title" class="h-28 md:h-36 w-full object-contain mb-2 rounded-lg border border-gray-100" style="max-height:9rem; min-height:7rem;" />
          <div class="text-xs text-gray-400 uppercase mb-0.5 truncate w-full text-center">{{ getCategoryName(product.category) }}</div>
          <div class="font-bold text-lg mb-0.5 truncate w-full text-center" title="{{ product.title }}">{{ product.title }}</div>
          <div class="border-b border-dashed border-gray-300 w-full my-2"></div>
          <div class="text-green-700 font-bold text-xl mb-1">{{ product.price }}</div>
          <div class="text-xs text-gray-500 mb-2">Tax included</div>
          <button class="w-full bg-green-600 text-white font-bold py-2 rounded mt-auto hover:bg-green-700 transition" @click="goToProduct(product.id)">BUY NOW</button>
        </div>
      </div>
      <button class="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full z-10" @click="scrollRight">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
const loading = ref(true)
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProduct = (id: string | number) => {
  router.push({ path: `/productDetail/${id}` })
}

function getCategoryName(category: any) {
  if (typeof category === 'object' && category !== null && 'name' in category) {
    return category.name
  }
  return category || ''
}

interface Product {
  id: number;
  image: string;
  images?: string[];
  category: string;
  title: string;
  type: string;
  price: string;
  oldPrice: string;
  discount: string;
  badge: string;
}

const products = ref<Product[]>([])
const currentPage = ref(0)
const pageSize = 5
const productsRow = ref<HTMLElement | null>(null)

// Track carousel index for each product
const productImageIndexes = ref<number[]>([])

const dummyProducts = [
  {
    id: 1,
    image: '/images/photo7.jpg',
    images: ['/images/photo7.jpg'],
    category: 'BATTERIES',
    title: 'BAR - Dual Pods Battery',
    type: '',
    price: '$30',
    oldPrice: '',
    discount: '',
    badge: 'NEW'
  },
  {
    id: 2,
    image: '/images/photo2.jpg',
    images: ['/images/photo2.jpg'],
    category: 'EDIBLES',
    title: 'Original Fruit Punch Splash',
    type: 'HYBRID',
    price: '$12',
    oldPrice: '',
    discount: '',
    badge: 'NEW'
  },
  {
    id: 3,
    image: '/images/photo3.jpg',
    images: ['/images/photo3.jpg'],
    category: 'PODS',
    title: 'Liquid Diamonds Pod - 1G Lemon Cherry Gelato',
    type: 'HYBRID',
    price: '$24',
    oldPrice: '',
    discount: '',
    badge: 'NEW'
  },
  {
    id: 4,
    image: '/images/photo4.jpg',
    images: ['/images/photo4.jpg'],
    category: 'EXTRACTS',
    title: 'Crushed Diamond - 1G Cherry Mintz',
    type: 'HYBRID',
    price: '$11',
    oldPrice: '$17',
    discount: '35%',
    badge: 'SALE'
  },
  {
    id: 5,
    image: '/images/photo1.jpg',
    images: ['/images/photo1.jpg'],
    category: 'PRE-ROLLS',
    title: 'Gelato',
    type: 'HYBRID',
    price: '$23',
    oldPrice: '$28',
    discount: '17% OFF',
    badge: 'POPULAR'
  }
]

const pagedProducts = computed(() => {
  const start = currentPage.value * pageSize
  return products.value.slice(start, start + pageSize)
})

// Initialize carousel indexes when products change
watch(pagedProducts, (newProducts) => {
  productImageIndexes.value = newProducts.map(() => 0)
})

// Automatic carousel for product images
onMounted(() => {
  setInterval(() => {
    productImageIndexes.value = productImageIndexes.value.map((idx, i) => {
      const imagesArr = pagedProducts.value[i]?.images || [pagedProducts.value[i]?.image]
      return imagesArr && imagesArr.length > 1 ? (idx + 1) % imagesArr.length : 0
    })
  }, 3000)
})

const nextPage = () => {
  if ((currentPage.value + 1) * pageSize < products.value.length) {
    currentPage.value++
  }
}
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const scrollLeft = () => {
  if (productsRow.value) {
    const flexEl = productsRow.value.querySelector('.flex');
    if (flexEl) {
      flexEl.scrollBy({ left: -220, behavior: 'smooth' });
    }
  }
}
const scrollRight = () => {
  if (productsRow.value) {
    const flexEl = productsRow.value.querySelector('.flex');
    if (flexEl) {
      flexEl.scrollBy({ left: 220, behavior: 'smooth' });
    }
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('https://fidel-of6u.onrender.com/api/products')
    products.value = res.data.map((p: any) => ({
      id: p._id || p.id,
      image: p.images && p.images.length ? p.images[0] : (p.image || '/images/default.jpg'),
      images: p.images || [],
      category: p.category || '',
      title: p.name || '',
      type: p.type || '',
      price: p.price ? `$${p.price}` : '',
      oldPrice: p.oldPrice ? `$${p.oldPrice}` : '',
      discount: p.discount || '',
      badge: p.badge || ''
    }))
    if (!products.value.length) {
      products.value = dummyProducts
    }
  } catch (err) {
    console.error('Failed to fetch products:', err)
    products.value = dummyProducts
  } finally {
    loading.value = false
  }
})
</script>
