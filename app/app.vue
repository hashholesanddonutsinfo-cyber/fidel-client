<template>
  <div>
    <NuxtRouteAnnouncer />
    <Toast v-if="showToast" :message="toastMessage" :icon="toastIcon" :duration="toastDuration" :show="showToast" @close="showToast = false" />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import Toast from '~/components/Toast.vue'
import { ref, onMounted } from 'vue'

const showToast = ref(false)
const toastMessage = ref('')
const toastIcon = ref('')
const toastDuration = ref(4000)

onMounted(() => {
  window.addEventListener('show-toast', (e: any) => {
    toastMessage.value = e.detail.message
    toastIcon.value = e.detail.icon || ''
    toastDuration.value = e.detail.duration || 4000
    showToast.value = true
  })
})
</script>


