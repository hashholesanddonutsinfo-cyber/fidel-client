<template>
  <div class="flex flex-col items-center w-full py-6 bg-black">
    <!-- Main Product Image -->
    <div class="relative w-full flex items-center justify-center" style="height:100%;">
            <img
              src="/images/photo20.jpg"
              alt="Product"
              class="w-full h-full object-fit transition-transform duration-300"
              :style="{ transform: zoomed ? 'scale(1.3)' : 'scale(1)' }"
              @click="toggleZoom"
            />
    </div>
    <!-- Zoom Indicator -->
    <div class="text-xs text-gray-300 mt-2">Double tap to zoom</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const zoomed = ref(false)
let lastTap = 0

function toggleZoom(e) {
  const now = Date.now()
  if (now - lastTap < 300) {
    zoomed.value = !zoomed.value
  }
  lastTap = now
}
// No logic needed for static showcase
</script>