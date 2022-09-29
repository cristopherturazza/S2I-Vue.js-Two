<template>
  <div
    class="bg-meat flex flex-row justify-between items-center h-28 shadow-xl z-10 p-8 sm:p-12 md:px-20 lg:px-28 xl:px-48 2xl:px-80"
  >
    <RouterLink to="/">
      <div class="flex flex-row items-center">
        <v-icon
          v-if="!isHome && !isCart"
          name="bi-chevron-left"
          scale="2"
          class="text-stone-50"
        ></v-icon>
        <div class="flex flex-col leading-3">
          <h1 class="font-black text-stone-50 text-4xl text-white tracking-tighter">
            Kreas
          </h1>
          <h5 class="text-stone-50 font-extralight tracking-widest">Marketplace</h5>
        </div>
      </div>
    </RouterLink>
    <div v-if="!isCart" divss="cart-link mt-2 relative">
      <RouterLink to="/cart">
        <v-icon
          name="md-shoppingcartcheckout-sharp"
          scale="2"
          class="text-stone-50 hover:drop-shadow-xl"
        ></v-icon>
        <div
          v-if="cartStore.productCounter > 0"
          class="cart-counter rounded-full text-stone-800 bg-lightgreen absolute text-xs px-1 -top-5 -right-1 drop-shadow-xl"
        >
          {{ cartStore.cartCounter }}
        </div>
      </RouterLink>
    </div>
    <div v-else class="flex flex-row cart-link mt-2 relative">
      <RouterLink to="/">
        <v-icon name="bi-chevron-left" scale="2" class="text-stone-50"></v-icon>
        <v-icon
          name="fa-home"
          scale="2"
          class="text-stone-50 hover:drop-shadow-xl"
        ></v-icon>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { computed } from "vue";
import { useRoute } from "vue-router";

const cartStore = useCartStore();
const route = useRoute();

// if isCart show toHome Icon

const isCart = computed<boolean>(() => {
  return route.path === "/cart" ? true : false;
});

// if isHome don't show left arrow

const isHome = computed<boolean>(() => {
  return route.path === "/" ? true : false;
});
</script>
