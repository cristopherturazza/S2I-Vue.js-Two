<template>
  <div class="bg-meat flex flex-row justify-between items-center h-28 shadow-xl z-10 p-8">
    <div class="flex flex-col leading-3">
      <RouterLink to="/">
        <h1 class="font-black text-stone-50 text-4xl text-white tracking-tighter">
          Kreas
        </h1>
      </RouterLink>
      <h5 class="text-stone-50 font-extralight tracking-widest">Marketplace</h5>
    </div>
    <RouterLink to="/cart">
      <div class="cart-link mt-2 relative">
        <v-icon
          name="md-shoppingcartcheckout-sharp"
          scale="2"
          class="text-stone-50 hover:drop-shadow-xl"
        ></v-icon>
        <div
          v-if="cartStore.productCounter > 0"
          class="cart-counter rounded-full text-stone-800 bg-lightgreen absolute text-xs px-1 -top-2 -right-1 drop-shadow-xl"
        >
          {{ cartStore.cartCounter }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<style scoped></style>
