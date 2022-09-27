<template>
  <div class="flex flex-col">
    <div class="my-6 ml-8 mr-8 text-stone-800">
      <h1 class="font-black text-5xl">Cart</h1>
      <div class="cart-list-container mt-8">
        <div
          class="flex flex-row justify-between mb-4 items-center bg-stone-100 rounded-xl shadow-md"
          v-for="cartEntry in cartStore.cart"
          :key="cartEntry.id"
        >
          <div class="flex flex-row">
            <img class="w-20 rounded-l-xl" :src="cartEntry.image" :alt="cartEntry.name" />
            <div class="flex flex-col ml-4">
              <div class="font-semibold text-sm my-2">{{ cartEntry.name }}</div>
              <div class="flex flex-row items-center">
                <div
                  class="quantity-selector flex flex-row rounded-xl items-center font-semibold w-fit bg-stone-200 border border-stone-300"
                >
                  <div
                    class="less-button touch-manipulation select-none px-2 py-1 cursor-pointer rounded-l-xl hover:bg-lightgreen"
                  >
                    -
                  </div>
                  <div
                    class="font-bold border-r border-l text-xs py-1 border-stone-300 px-2"
                  >
                    {{ cartEntry.quantity }}
                  </div>
                  <div
                    class="plus-button touch-manipulation select-none px-2 py-1 cursor-pointer rounded-r-xl hover:bg-lightgreen"
                  >
                    +
                  </div>
                </div>
                <div
                  class="ml-4 px-2 py-1 bg-stone-200 border border-stone-300 cursor-pointer rounded-xl hover:bg-meat hover:text-stone-50"
                >
                  <v-icon name="co-trash"></v-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-subprice flex flex-col items-end mr-4 mt-2">
            <div class="text-2xl">€</div>
            <div class="text-base font-semibold">
              {{
                (cartEntry.unitPrice * cartEntry.quantity)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<style></style>
