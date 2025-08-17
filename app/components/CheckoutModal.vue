<template>
  <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
  <div class="bg-[#f7f7f3] rounded-lg shadow-lg w-full max-w-[90vw] mx-4 p-10 relative flex flex-col md:flex-row gap-8" style="max-height:90vh; min-height:auto; overflow-y:auto;">
      <div class="w-full flex flex-col md:flex-row gap-8">
      <button @click="close" class="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl">
        <i class="pi pi-times"></i>
      </button>
      <!-- Billing Column -->
      <div class="w-full md:w-1/3 bg-white rounded-lg p-8 shadow border border-gray-200 flex-shrink-0">
        <h2 class="text-lg font-bold mb-6 text-gray-900">Billing details</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-gray-700 mb-1">First name <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.firstName" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Last name <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.lastName" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Company name (optional)</label>
            <input type="text" v-model="form.companyName" class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Country / Region <span class="text-red-500">*</span></label>
            <select v-model="form.country" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white">
              <option value="">Select a country / region…</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Street address <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.streetAddress" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white mb-2" placeholder="House number and street name" />
            <input type="text" v-model="form.apartment" class="w-full border border-gray-300 rounded px-4 py-2 bg-white" placeholder="Apartment, suite, unit, etc. (optional)" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Town / City <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.city" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">State / County <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.state" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Postcode <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.postcode" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Phone <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.phone" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Email address <span class="text-red-500">*</span></label>
            <input type="email" v-model="form.email" required class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Order notes (optional)</label>
            <textarea v-model="form.orderNotes" class="w-full border border-gray-300 rounded px-4 py-2 bg-white" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
          </div>
        </div>
      </div>
      <!-- Delivery & Payment Column -->
      <div class="w-full md:w-1/3 bg-white rounded-lg p-8 shadow border border-gray-200 flex-shrink-0">
        <h2 class="text-lg font-bold mb-6 text-gray-900">Delivery & Payment</h2>
        <!-- Schedule Delivery -->
        <div class="mb-6">
          <div class="flex items-center mb-2">
            <h3 class="font-semibold text-gray-900 mr-2">Schedule Delivery</h3>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.scheduleDelivery" class="sr-only peer" />
              <span class="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 transition"></span>
              <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition"></span>
            </label>
          </div>
          <div v-if="form.scheduleDelivery" class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-gray-700 mb-1">Dates</label>
              <input type="date" v-model="form.date" class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
            </div>
            <div>
              <label class="block text-gray-700 mb-1">Note</label>
              <input type="text" v-model="form.note" class="w-full border border-gray-300 rounded px-4 py-2 bg-white" />
            </div>
          </div>
        </div>
        <!-- Payment Method -->
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-2">Payment Method</h3>
          <div class="grid grid-cols-1 gap-4">
            <label class="flex items-center gap-2">
              <input type="radio" value="bank" v-model="form.paymentMethod" /> Direct bank transfer
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="bitcoin" v-model="form.paymentMethod" /> BITCOIN PAYMENT
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="paypal" v-model="form.paymentMethod" /> PAYPAL PAYMENT
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="zelle" v-model="form.paymentMethod" /> ZELLE
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="cashapp" v-model="form.paymentMethod" /> CASHAPP
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="applepay" v-model="form.paymentMethod" /> APPLE PAY
            </label>
          </div>
        </div>
      </div>
      <!-- Order Summary Column -->
      <div class="w-full md:w-1/3 bg-white rounded-lg p-8 shadow border border-gray-200 flex-shrink-0">
        <h2 class="text-lg font-bold mb-6 text-gray-900">Order Summary</h2>
        <div v-for="item in cartItems" :key="item._id" class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <img :src="(item.product.images && item.product.images.length) ? item.product.images[0] : (item.product.image || 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg')" alt="Product" class="w-16 h-16 object-cover rounded" />
            <div>
              <div class="font-semibold text-gray-900">{{ item.product.name }}</div>
              <div class="text-sm text-gray-500">{{ item.product.code || '' }}</div>
              <div class="text-sm text-gray-700">${{ item.product.price }}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 rounded bg-gray-200 text-gray-700 font-bold text-lg" @click="$emit('decrease', item)">-</button>
            <span class="mx-2">{{ item.quantity.toString().padStart(2, '0') }}</span>
            <button class="w-8 h-8 rounded bg-gray-200 text-gray-700 font-bold text-lg" @click="$emit('increase', item)">+</button>
          </div>
        </div>
        <div class="border-t border-gray-300 pt-6 mt-6">
          <div class="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>${{ subtotal }}</span>
          </div>
          <div class="flex justify-between mb-2 text-gray-700">
            <span>Shipping</span>
            <span>--</span>
          </div>
          <div class="flex justify-between font-bold text-lg text-gray-900">
            <span>Total (USD)</span>
            <span>${{ subtotal }}</span>
          </div>
        </div>
        <button
          id="confirm-order-btn"
          class="w-full py-3 rounded font-bold text-lg mt-8 transition-colors duration-200 bg-[#263c1e] text-white hover:bg-[#1a2a13] cursor-pointer"
          :disabled="submitting"
          @click="submitOrder"
        >
          {{ submitting ? 'Submitting...' : 'Confirm Order' }}
        </button>
  <!-- Removed unused successMessage -->
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
const props = defineProps<{ visible: boolean, cartItems: any[] }>();
const emit = defineEmits(['close', 'increase', 'decrease']);
const close = () => emit('close');

const form = ref({
  firstName: '',
  lastName: '',
  companyName: '',
  country: '',
  streetAddress: '',
  apartment: '',
  city: '',
  state: '',
  postcode: '',
  phone: '',
  email: '',
  orderNotes: '',
  scheduleDelivery: false,
  date: '',
  note: '',
  paymentMethod: 'bank',
});
const subtotal = computed(() => props.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0));

const submitting = ref(false);
// Removed manual event listeners for confirm order button. Vue's native click handling will ensure submitOrder is called when the button is active.

const requiredFields: (keyof typeof form.value)[] = [
  'firstName', 'lastName', 'country', 'streetAddress', 'city', 'state', 'postcode', 'phone', 'email'
];
function validateForm() {
  return requiredFields.every(field => form.value[field] && form.value[field].toString().trim() !== '');
}

async function submitOrder() {
  if (submitting.value) return;
  if (!validateForm()) {
    alert('Please fill in all required fields.');
    return;
  }
  submitting.value = true;
  try {
    // Fetch cartId using sessionId
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now();
      localStorage.setItem('sessionId', sessionId);
    }
    const cartRes = await axios.get(`https://fidel-of6u.onrender.com/api/carts?sessionId=${sessionId}`);
    const cart = Array.isArray(cartRes.data) ? cartRes.data.find((c) => c.sessionId === sessionId) : cartRes.data;
    if (!cart || !cart._id) throw new Error('Cart not found');
    // Build payload with flat fields and cartId
    const payload = {
      cartId: cart._id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      companyName: form.value.companyName,
      country: form.value.country,
      city: form.value.city,
      state: form.value.state,
      postcode: form.value.postcode,
      phone: form.value.phone,
      email: form.value.email,
      orderNote: form.value.orderNotes,
      scheduledDelivery: form.value.scheduleDelivery ? {
        date: form.value.date,
        note: form.value.note
      } : null,
      paymentMethod: form.value.paymentMethod
    };
    await axios.post('https://fidel-of6u.onrender.com/api/orders', payload);
    // Use local toast logic: dispatch a custom event for productDetail/[id].vue to handle
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('order-success-toast', {
        detail: {
          message: 'Your order has been confirmed, we will contact you with further instructions.',
          icon: 'pi pi-check-circle',
          duration: 2500
        }
      }));
      window.dispatchEvent(new CustomEvent('clear-cart'));
    }
    emit('close');
  } catch (err: any) {
    alert('Order failed. ' + (err?.response?.data?.error || err?.message || 'Please try again.'));
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.bg-lime-700 { background-color: #6b8e23; }
.border-lime-600 { border-color: #a3c744; }
</style>
