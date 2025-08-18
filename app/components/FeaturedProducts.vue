<template>
  <section class="w-full bg-white py-12">
    <h2 class="text-xl md:text-2xl font-bold text-center mb-10 tracking-wide">FEATURED PRODUCTS ( FIDELS WORLD WIDE DELIVERY)</h2>
    <div ref="productsRow" class="mx-auto w-full md:w-[80%] lg:w-[90%] xl:w-[80%] max-w-5xl relative">
      <button class="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full z-10 hover:bg-gray-100 transition" @click="scrollLeft">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <Loader v-if="loading" />
      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-16 w-full">
        <svg class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
        <div class="text-gray-500 text-lg">No products found</div>
      </div>
      <div v-else class="flex gap-8 overflow-x-auto no-scrollbar px-2" style="scroll-behavior: smooth;">
        <div v-for="(product, productIndex) in products" :key="product.id" class="flex flex-col items-center bg-white rounded-xl shadow p-4 relative transition hover:scale-105 hover:shadow-2xl flex-shrink-0 w-8/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-80">
          <div class="absolute top-4 left-4">
            <span v-if="product.badge" class="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">{{ product.badge }}</span>
          </div>
          <img :src="product.images && productImageIndexes[productIndex] !== undefined ? product.images[productImageIndexes[productIndex]] : product.image" :alt="product.title" class="h-24 md:h-44 w-full object-contain mb-2 rounded-lg border border-gray-100" style="max-height:11rem; min-height:8rem;" />
          <div class="text-xs text-gray-400 uppercase mb-0.5 w-full text-center">{{ getCategoryName(product.category) }}</div>
          <div class="font-bold text-lg mb-0.5 w-full text-center line-clamp-2" :title="product.title">{{ product.title }}</div>
          <div class="flex items-center mb-2">
            <span v-for="star in 5" :key="star" class="text-yellow-400 text-lg">
              <i :class="star <= (product.rating || 5) ? 'pi pi-star-fill' : 'pi pi-star'" />
            </span>
            <span v-if="product.rating" class="ml-2 text-xs text-gray-500">({{ product.rating }})</span>
          </div>
          <div class="border-b border-dashed border-gray-300 w-full my-2"></div>
          <div class="text-green-700 font-bold text-xl mb-1">{{ product.price }}</div>
          <div class="text-xs text-gray-500 mb-2">Tax included</div>
          <button class="w-full bg-green-600 text-white font-bold py-2 rounded mt-auto hover:bg-green-700 transition" @click="goToProduct(product.id)">View product</button>
        </div>
      </div>
      <button class="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full z-10 hover:bg-gray-100 transition" @click="scrollRight">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
const loading = ref(true)
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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
const productsRow = ref<HTMLElement | null>(null)
const productImageIndexes = ref<number[]>([])

const dummyProducts = [
  { id: 1, image: '/images/photo7.jpg', images: ['/images/photo7.jpg'], category: 'BATTERIES', title: 'BAR - Dual Pods Battery', type: '', price: '$30', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 2, image: '/images/photo2.jpg', images: ['/images/photo2.jpg'], category: 'EDIBLES', title: 'Original Fruit Punch Splash', type: 'HYBRID', price: '$12', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 3, image: '/images/photo3.jpg', images: ['/images/photo3.jpg'], category: 'PODS', title: 'Liquid Diamonds Pod - 1G Lemon Cherry Gelato', type: 'HYBRID', price: '$24', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 4, image: '/images/photo4.jpg', images: ['/images/photo4.jpg'], category: 'EXTRACTS', title: 'Crushed Diamond - 1G Cherry Mintz', type: 'HYBRID', price: '$11', oldPrice: '$17', discount: '35%', badge: 'SALE' },
  { id: 5, image: '/images/photo1.jpg', images: ['/images/photo1.jpg'], category: 'PRE-ROLLS', title: 'Gelato', type: 'HYBRID', price: '$23', oldPrice: '$28', discount: '17% OFF', badge: 'POPULAR' },
  { id: 6, image: '/images/photo5.jpg', images: ['/images/photo5.jpg'], category: 'PRE-ROLLS', title: 'Tigers Blood Hash Hole', type: 'INDICA', price: '$20', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 7, image: '/images/photo6.jpg', images: ['/images/photo6.jpg'], category: 'EDIBLES', title: 'Cannabis-Infused Gummies - Mixed Berry', type: 'SATIVA', price: '$15', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 8, image: '/images/photo8.jpg', images: ['/images/photo8.jpg'], category: 'FLOWERS', title: 'Blue Dream - 1/8 oz', type: 'HYBRID', price: '$35', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 9, image: '/images/photo9.jpg', images: ['/images/photo9.jpg'], category: 'EXTRACTS', title: 'Live Rosin Badder - OG Kush', type: 'INDICA', price: '$40', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 10, image: '/images/photo10.jpg', images: ['/images/photo10.jpg'], category: 'PRE-ROLLS', title: 'Tangerine Dream Preroll', type: 'SATIVA', price: '$18', oldPrice: '', discount: '', badge: 'POPULAR' },
  { id: 11, image: '/images/photo11.jpg', images: ['/images/photo11.jpg'], category: 'EDIBLES', title: 'Dark Chocolate Bar - 100mg THC', type: 'HYBRID', price: '$25', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 12, image: '/images/photo12.jpg', images: ['/images/photo12.jpg'], category: 'VAPES', title: 'Disposable Vape Pen - Mango Haze', type: 'SATIVA', price: '$30', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 13, image: '/images/photo13.jpg', images: ['/images/photo13.jpg'], category: 'FLOWERS', title: 'Purple Punch - 1/4 oz', type: 'INDICA', price: '$50', oldPrice: '', discount: '', badge: 'SALE' },
  { id: 14, image: '/images/photo14.jpg', images: ['/images/photo14.jpg'], category: 'EXTRACTS', title: 'THC Distillate - 1G', type: '', price: '$28', oldPrice: '', discount: '', badge: 'NEW' },
  { id: 15, image: '/images/photo15.jpg', images: ['/images/photo15.jpg'], category: 'EDIBLES', title: 'Sour Apple Chews', type: 'HYBRID', price: '$10', oldPrice: '', discount: '', badge: 'NEW' }
]

// Shuffles the array using the Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to fetch and shuffle products
const fetchAndShuffleProducts = async () => {
  loading.value = true;
  try {
    const res = await axios.get('https://fidel-of6u.onrender.com/api/products');
    const fetchedProducts = res.data.map((p: any) => ({
      id: p._id || p.id,
      image: p.images && p.images.length ? p.images[0] : (p.image || 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'),
      images: p.images || [],
      category: p.category || '',
      title: p.name || '',
      type: p.type || '',
      price: p.price ? `$${p.price}` : '',
      oldPrice: p.oldPrice ? `$${p.oldPrice}` : '',
      discount: p.discount || '',
      badge: p.badge || ''
    }));

    if (fetchedProducts.length) {
      shuffleArray(fetchedProducts);
      products.value = fetchedProducts;
    } else {
      shuffleArray(dummyProducts);
      products.value = dummyProducts;
    }
  } catch (err) {
    console.error('Failed to fetch products:', err);
    shuffleArray(dummyProducts);
    products.value = dummyProducts;
  } finally {
    loading.value = false;
  }
};

// Track carousel index for each product
watch(products, (newProducts) => {
  productImageIndexes.value = newProducts.map(() => 0);
});

// Automatic carousel logic
const autoScrollInterval = ref(null as number | null);

const startAutoScroll = () => {
  if (autoScrollInterval.value === null) {
    autoScrollInterval.value = window.setInterval(() => {
      if (productsRow.value) {
        const scrollContainer = productsRow.value.querySelector('.flex');
        if (scrollContainer) {
          const card = scrollContainer.querySelector('.flex-shrink-0');
          if (card) {
            const cardWidth = card.clientWidth;
            const gap = 32;
            const scrollAmount = cardWidth + gap;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            // Check if at the end, and if so, scroll back to the beginning
            if (scrollContainer.scrollLeft >= maxScroll) {
              scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
          }
        }
      }
    }, 4000); // Scrolls every 4 seconds
  }
};

const stopAutoScroll = () => {
  if (autoScrollInterval.value !== null) {
    clearInterval(autoScrollInterval.value);
    autoScrollInterval.value = null;
  }
};

const scrollLeft = () => {
  stopAutoScroll();
  if (productsRow.value) {
    const scrollContainer = productsRow.value.querySelector('.flex');
    if (scrollContainer) {
      const card = scrollContainer.querySelector('.flex-shrink-0');
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = 32;
        scrollContainer.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      }
    }
  }
};

const scrollRight = () => {
  stopAutoScroll();
  if (productsRow.value) {
    const scrollContainer = productsRow.value.querySelector('.flex');
    if (scrollContainer) {
      const card = scrollContainer.querySelector('.flex-shrink-0');
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = 32;
        scrollContainer.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
      }
    }
  }
};

onMounted(() => {
  fetchAndShuffleProducts();
  startAutoScroll();
});

watch(() => route.path, (newPath, oldPath) => {
  if (newPath !== oldPath) {
    fetchAndShuffleProducts();
    stopAutoScroll(); // Stop auto-scroll before leaving
    startAutoScroll(); // Restart on new page
  }
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>