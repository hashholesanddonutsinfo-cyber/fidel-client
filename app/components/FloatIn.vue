<template>
  <div ref="el" :class="[visible ? 'float-in-active' : 'float-in-init']">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const visible = ref(false)
const el = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})
onBeforeUnmount(() => {
  if (observer && el.value) observer.unobserve(el.value)
})
</script>

<style scoped>
.float-in-init {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.float-in-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
</style>
