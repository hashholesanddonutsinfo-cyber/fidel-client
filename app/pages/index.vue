<template>
  <FloatIn><AppNavigation /></FloatIn>
  <FloatIn><ImageCarousel /></FloatIn>
  <FloatIn><FeaturedProducts /></FloatIn>
  <FloatIn><ProductCategories /></FloatIn>
  <FloatIn><MainVideo /></FloatIn>
  <FloatIn><StoreShowcase /></FloatIn>
  <FloatIn><FeaturedBanner /></FloatIn>
  <FloatIn><AppFooter /></FloatIn>

  <div v-if="showModal" class="fixed bottom-4 left-4 z-50">
    <div class="bg-black text-white p-4 rounded-lg shadow-lg relative max-w-xs">
      <button @click="closeModal" class="absolute top-2 right-2 text-white hover:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="mt-2 text-center">
        <p class="text-sm md:text-base font-semibold mb-2">Exclusive Offer!</p>
        <p class="text-xs md:text-sm">Use this coupon code for 25% off your next order.</p>
        <div class="bg-white text-black font-bold px-3 py-1 mt-2 rounded">
          <code class="text-sm">FIDELS25</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import FeaturedBanner from '~/components/FeaturedBanner.vue';
import FloatIn from '~/components/FloatIn.vue';
import MainVideo from '~/components/MainVideo.vue';

const showModal = ref(true);

function closeModal() {
  showModal.value = false;
}

// SEO meta tags
useHead({
  title: 'Buy Fidels Product Cheap Price - Fidels Hash Hole',
  meta: [
    { name: 'description', content: 'Shop HashHoles for the best cannabis products:flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
    { name: 'keywords', content: 'hashholes, cannabis, weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, Buy Fidels Product Cheap Price - Fidels Hash Hole hash, holes,, vapes, edibles, prerolls, concentrates, CA delivery, buy weed, fidels, fidelsclothings, fidelclothing, fidel, clothing, fidel events, events, products, hash and holes, hash, holes, online, premium cannabis' },
    { property: 'og:title', content: 'Buy Fidels Product Cheap Price - Fidels Hash Hole' },
    { property: 'og:description', content: 'Shop HashHoles for the best cannabis products: flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
    { property: 'og:image', content: 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://fidelshashhole.ai/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Buy Fidels Product Cheap Price - Fidels Hash Hole' },
    { name: 'twitter:description', content: 'Shop HashHoles for the best cannabis products: flowers, vapes, edibles, prerolls, concentrates, and more. Fast California delivery. Trusted lifestyle brand.' },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Fidels' }
  ],
  link: [
    { rel: 'canonical', href: 'https://fidelshashhole.ai/' }
  ]
})
</script>