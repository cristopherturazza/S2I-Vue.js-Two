<template>
  <div
    v-if="cartStore.cart.length"
    class="flex flex-col lg:flex-row justify-between lg:justify-none min-h-[75vh] text-stone-800"
  >
    <div
      class="my-6 mx-8 sm:mx-12 md:mx-20 lg:mb-16 lg:mt-12 lg:ml-28 lg:mr-0 lg:pr-32 xl:pr-24 xl:ml-48 2xl:ml-80 2xl:pr-40 lg:border-r lg:border-stone-300"
    >
      <h1 class="font-black text-5xl">Cart</h1>
      <div class="cart-list-container mt-8">
        <div
          class="flex flex-row justify-between mb-4 xl:mb-8 items-center bg-stone-100 rounded-xl shadow-md"
          v-for="cartEntry in cartStore.cart"
          :key="cartEntry.id"
        >
          <CartEntryCard
            :id="cartEntry.id"
            :name="cartEntry.name"
            :image="cartEntry.image"
            :quantity="cartEntry.quantity"
            :unitPrice="cartEntry.unitPrice"
            :subTotal="cartEntry.subTotal"
            @remove-entry="removeEntry"
            @remove-quantity="removeQuantity"
            @add-quantity="addQuantity"
          />
        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-end mx-8 sm:mx-12 md:mx-20 lg:mr-28 lg:ml-24 xl:mr-48 2xl:mr-80 lg:mb-12"
    >
      <div v-if="cartStore.discount" class="flex flex-col my-6">
        <div
          class="bg-verylightgreen w-full rounded-xl py-4 xl:px-16 flex flex-row justify-center items-center"
        >
          <v-icon name="md-done" scale="1.5" class="ml-4 text-darkgreen"></v-icon>
          <div class="flex flex-row mx-2">
            <h1 class="text-darkgreen font-black">10% PROMO:</h1>
            <span class="line-through text-meat ml-4"
              >{{ cartStore.total.toFixed(2).toString().replace(".", ",") }} €</span
            >
          </div>
        </div>
        <div class="flex flex-row w-full justify-between items-end mt-4">
          <h1 class="font-bold text-3xl xl:text-4xl">Total:</h1>
          <div class="discount-total-price flex flex-row items-end">
            <div class="total-cart-price text-4xl xl:text-5xl font-black">
              {{ cartStore.finalTotal.toFixed(2).toString().replace(".", ",") }}
              €
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col justify-between items-start my-6">
        <div
          class="bg-lightmeat w-full rounded-xl py-4 xl:px-10 flex flex-row items-center"
        >
          <v-icon name="md-discount-twotone" scale="1.5" class="ml-4 text-meat"></v-icon>
          <div class="flex flex-col mx-4">
            <h1 class="text-meat text-xl font-black">10% OFF PROMO</h1>
            <p class="text-meat font-medium">
              if you buy at least
              <strong class="text-darkgreen text-xl">4</strong> products
            </p>
          </div>
        </div>
        <div class="flex flex-row w-full items-end justify-between mt-4">
          <h1 class="font-bold text-3xl xl:text-4xl">Total:</h1>
          <div class="total-cart-price text-4xl xl:text-5xl font-black">
            {{ cartStore.finalTotal.toFixed(2).toString().replace(".", ",") }} €
          </div>
        </div>
      </div>
      <div class="flex justify-center w-full my-12">
        <div
          @click="buyButton"
          class="text-stone-50 font-bold bg-meat w-full max-w-sm hover:bg-mediumgreen cursor-pointer rounded-xl shadow-xl py-3 text-center"
        >
          {{ buyText }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col min-h-[75vh] text-stone-800">
    <div class="flex flex-row justify-center mt-20">
      <v-icon name="md-shoppingcart-twotone" scale="4" class="text-meat"></v-icon>
    </div>
    <div class="flex flex-col items-center mt-2">
      <h1 class="font-bold text-xl">The cart is empty</h1>
      <RouterLink to="/"
        ><p
          class="mt-16 text-lg text-stone-50 bg-meat py-2 px-4 rounded-xl hover:bg-mediumgreen"
        >
          Back Home
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";
import CartEntryCard from "@/components/CartEntryCard.vue";

const cartStore = useCartStore();
const buyText = ref("Buy");

const buyButton = () => {
  buyText.value = "Thank you! This is a sample project!";
};

const addQuantity = (id: string) => {
  const target = cartStore.cart.find((cartEntry) => cartEntry.id === id);
  if (target) {
    target.quantity++;
    target.subTotal = target.unitPrice * target.quantity;
  }
};

const removeQuantity = (id: string) => {
  const target = cartStore.cart.find((cartEntry) => cartEntry.id === id);
  if (target && target.quantity > 1) {
    target.quantity--;
    target.subTotal = target.unitPrice * target.quantity;
  }
};

const removeEntry = (id: string) => {
  const index = cartStore.cart.findIndex((cartEntry) => cartEntry.id === id);
  cartStore.cart.splice(index, 1);
};
</script>

<style></style>
