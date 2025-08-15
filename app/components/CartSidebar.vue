<template>
  <transition name="cart-slide-fade">
    <div v-if="visible" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col">
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-bold">Your Cart</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="loading" class="flex justify-center items-center h-full">
          <Loader />
        </div>
        <div v-else>
          <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center h-full">
            <i class="pi pi-shopping-cart text-4xl text-gray-400 mb-2"></i>
            <span class="text-gray-500">Your cart is empty</span>
          </div>
          <div v-else>
            <div v-for="item in cartItems" :key="item._id" class="flex items-center mb-4">
              <img :src="(item.product.images && item.product.images.length) ? item.product.images[0] : (item.product.image || '/images/default.jpg')" alt="Product" class="w-16 h-16 object-cover rounded mr-3" />
              <div class="flex-1">
                <div class="font-semibold">{{ item.product.name }}</div>
                <div class="text-sm text-gray-500">Qty: {{ item.quantity }}</div>
                <div class="text-sm text-gray-700">${{ item.product.price }}</div>
              </div>
              <button @click="removeFromCart(item._id)" class="ml-2 text-red-500 hover:text-red-700">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t">
        <button v-if="cartItems.length > 0" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" @click="showCheckout = true">
          Checkout
        </button>
      </div>
      <CheckoutModal :visible="showCheckout" :cartItems="cartItems" @close="showCheckout = false" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CheckoutModal from './CheckoutModal.vue';
import axios from 'axios';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['close']);

const cartItems = ref<any[]>([]);
const loading = ref(false);
const showCheckout = ref(false);

function getSessionId() {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

const fetchCart = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`https://fidel-of6u.onrender.com/api/carts?sessionId=${getSessionId()}`);
    const cart = Array.isArray(res.data) ? res.data.find((c: any) => c.sessionId === getSessionId()) : res.data;
    cartItems.value = cart && cart.products ? cart.products : [];
  } catch (err) {
    cartItems.value = [];
  } finally {
    loading.value = false;
  }
};

const removeFromCart = async (cartItemId: string) => {
  try {
    // Remove product from cart by updating cart document
    const res = await axios.get(`https://fidel-of6u.onrender.com/api/carts?sessionId=${getSessionId()}`);
    const cart = Array.isArray(res.data) ? res.data.find((c: any) => c.sessionId === getSessionId()) : res.data;
    if (!cart || !cart._id) return;
    const updatedProducts = cart.products.filter((p: any) => p._id !== cartItemId);
    await axios.put(`https://fidel-of6u.onrender.com/api/carts/${cart._id}`, { products: updatedProducts });
    fetchCart();
  } catch (err) {
    // handle error
  }
};

const close = () => emit('close');

watch(() => props.visible, (val: boolean) => {
  if (val) fetchCart();
});

onMounted(() => {
  if (props.visible) fetchCart();
  if (typeof window !== 'undefined') {
    window.addEventListener('clear-cart', async () => {
      // Clear cart on backend
      try {
        const res = await axios.get(`https://fidel-of6u.onrender.com/api/carts?sessionId=${getSessionId()}`);
        const cart = Array.isArray(res.data) ? res.data.find((c: any) => c.sessionId === getSessionId()) : res.data;
        if (cart && cart._id) {
          await axios.put(`https://fidel-of6u.onrender.com/api/carts/${cart._id}`, { products: [] });
        }
        cartItems.value = [];
      } catch (err) {
        // handle error
      }
    });
  }
});
</script>

<style scoped>
/* Slide and fade for cart sidebar */
.cart-slide-fade-enter-active {
  transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s cubic-bezier(.4,0,.2,1);
}
.cart-slide-fade-leave-active {
  transition: transform 0.25s cubic-bezier(.4,0,.2,1), opacity 0.2s cubic-bezier(.4,0,.2,1);
}
.cart-slide-fade-enter-from {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
}
.cart-slide-fade-enter-to {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.cart-slide-fade-leave-from {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.cart-slide-fade-leave-to {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
}
</style>
