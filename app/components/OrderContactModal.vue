<template>
  <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-8 flex flex-col items-center justify-center gap-6">
      <h2 class="text-2xl font-bold text-center mb-4">Contact the Admin to Complete Your Order</h2>
      <div class="flex flex-col items-center gap-4">
       <a href="sms:+17182185533" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition">
  <i class="pi pi-phone text-2xl"></i>
  <span>Text Message</span>
      </a>
        <a href="mailto:INFO@FIDELSCLOTHINGS.COM" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition">
          <i class="pi pi-envelope text-2xl"></i>
          <span>Email</span>
        </a>
      </div>
      <div class="mt-6 w-full flex justify-center">
        <button @click="close" class="text-gray-500 hover:text-black text-lg font-bold px-4 py-2 rounded border border-gray-300">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<style scoped>
.bg-white {
  background: #fff;
}
</style>
