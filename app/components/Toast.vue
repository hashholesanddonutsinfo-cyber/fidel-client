<template>
  <transition name="toast-fade">
    <div v-if="visible" class="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded px-6 py-3 z-[9999] flex items-center gap-2 min-w-[220px] max-w-[90vw] border border-green-500">
      <i v-if="icon" :class="icon" class="text-green-600 text-xl"></i>
      <span class="text-green-700 font-semibold">{{ message }}</span>
      <button @click="close" class="ml-2 text-gray-400 hover:text-gray-700 text-lg"><i class="pi pi-times"></i></button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{ message: string, icon?: string, duration?: number, show: boolean }>();
const emit = defineEmits(['close']);

const visible = ref(props.show);
let timer: any = null;

watch(() => props.show, (val) => {
  visible.value = val;
  if (val && props.duration) {
    clearTimeout(timer);
    timer = setTimeout(() => close(), props.duration);
  }
});

function close() {
  visible.value = false;
  emit('close');
}

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.toast-fade-enter-to, .toast-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
