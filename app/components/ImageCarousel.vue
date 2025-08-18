<template>
  <div class="relative w-full h-[500px] md:h-[900px] overflow-hidden">
    <!-- Carousel Container -->
    <div 
      class="flex h-full transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="relative w-full h-full flex-shrink-0"
      >
        <img 
          :src="image.src" 
          :alt="image.alt"
          class="w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out"
          :style="{
            transform: currentIndex === index ? 'scale(1.08)' : 'scale(0.92)',
            zIndex: currentIndex === index ? 2 : 1
          }"
          @load="onImageLoad(index)"
          @error="onImageError(index)"
        />
        
        <!-- Overlay removed for clear image display -->
        
        <!-- Content -->
        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 class="text-3xl md:text-4xl font-bold mb-2">{{ image.title }}</h3>
          <p class="text-xl">{{ image.description }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      @click="previousSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    
    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
      <button 
        v-for="(image, index) in images" 
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-200"
        :class="currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
let intervalId: NodeJS.Timeout | null = null

const images = ref([
  {
    src: '/images/carousel.jpg',
    alt: 'Premium Products',
    title: 'Premium Quality',
    description: 'Discover our finest selection'
  },
  {
    src: '/images/photo4.jpg',
    alt: 'Premium Products',
    title: 'Premium Quality',
    description: 'Discover our finest selection'
  },
  {
    src: '/images/photo8.jpg',
    alt: 'Exclusive Collection',
    title: 'Exclusive Collection',
    description: 'Handpicked for you'
  },
  {
    src: '/images/photo19.jpg',
    alt: 'Premium Experience',
    title: 'Premium Experience',
    description: 'Unmatched quality and service'
  },
  {
    src: '/images/photo7.jpg',
    alt: 'Luxury Selection',
    title: 'Luxury Selection',
    description: 'The best of the best'
  },
  {
    src: '/images/photo5.jpg',
    alt: 'Premium Brands',
    title: 'Premium Brands',
    description: 'Trusted and reliable'
  } 
  // {
  //   src: '/images/photo21.jpg',
  //   alt: 'Luxury Selection',
  //   title: 'Luxury Selection',
  //   description: 'The best of the best'
  // },
  // {
  //   src: '/images/photo22.jpg',
  //   alt: 'Premium Brands',
  //   title: 'Premium Brands',
  //   description: 'Trusted and reliable'
  // }
])

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const previousSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? images.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const onImageLoad = (index: number) => {
  const image = images.value[index]
  if (image) {
    console.log(`Image ${index + 1} loaded successfully:`, image.src)
  }
}

const onImageError = (index: number) => {
  const image = images.value[index]
  if (image) {
    console.error(`Image ${index + 1} failed to load:`, image.src)
  }
}

const startAutoPlay = () => {
  intervalId = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>
