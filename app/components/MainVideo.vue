<template>
  <div ref="videoContainer" class="relative w-full h-96 md:h-[40rem] flex items-center bg-black justify-center overflow-hidden">
    <video 
      ref="mainVideo"
      class="absolute inset-0 w-full h-full object-cover md:object-fit"
      src="/images/main.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>
    <!-- Optional overlay content can go here -->
    <div class="absolute bottom-4 right-4 flex gap-2 z-10">
      <button @click="toggleMute" class="bg-black bg-opacity-60 text-white px-3 py-2 rounded shadow hover:bg-opacity-80 transition">
        {{ isMuted ? 'Unmute' : 'Mute' }}
      </button>
      <button @click="togglePause" class="bg-black bg-opacity-60 text-white px-3 py-2 rounded shadow hover:bg-opacity-80 transition">
        {{ isPaused ? 'Play' : 'Pause' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoContainer = ref<HTMLElement | null>(null)
const mainVideo = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null

const isMuted = ref(true)
const isPaused = ref(false)

function toggleMute() {
  if (mainVideo.value) {
    mainVideo.value.muted = !mainVideo.value.muted
    isMuted.value = mainVideo.value.muted
  }
}

function togglePause() {
  if (mainVideo.value) {
    if (mainVideo.value.paused) {
      mainVideo.value.play()
      isPaused.value = false
    } else {
      mainVideo.value.pause()
      isPaused.value = true
    }
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (mainVideo.value) {
          if (entry.isIntersecting) {
            mainVideo.value.muted = false
            mainVideo.value.play()
          } else {
            mainVideo.value.muted = true
          }
        }
      })
    },
    { threshold: 0.5 }
  )
  if (videoContainer.value) {
    observer.observe(videoContainer.value)
  }
})

onBeforeUnmount(() => {
  if (observer && videoContainer.value) {
    observer.unobserve(videoContainer.value)
  }
})
</script>

<style scoped>
/* Responsive height for mobile */
@media (max-width: 640px) {
  .h-96 {
    height: 500px;
  }
}
</style>
