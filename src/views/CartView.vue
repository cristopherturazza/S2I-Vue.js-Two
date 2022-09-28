<template>
  <div
    v-if="cartStore.cart.length"
    class="flex flex-col justify-between min-h-[75vh] text-stone-800"
  >
    <div class="my-6 ml-8 mr-8">
      <h1 class="font-black text-5xl">Cart</h1>
      <div class="cart-list-container mt-8">
        <div
          class="flex flex-row justify-between mb-4 items-center bg-stone-100 rounded-xl shadow-md"
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
    <div class="mx-8">
      <div
        v-if="cartStore.discount"
        class="flex flex-col justify-between items-start mt-6"
      >
        <div class="bg-verylightgreen w-full rounded-xl py-4 flex flex-row items-center">
          <v-icon name="md-done" scale="1" class="ml-4 text-darkgreen"></v-icon>
          <div class="flex flex-row mx-2">
            <h1 class="text-darkgreen font-black">10% PROMO ACTIVE:</h1>
            <span class="line-through text-meat ml-4"
              >{{ cartStore.total.toFixed(2).toString().replace(".", ",") }} €</span
            >
          </div>
        </div>
        <div class="flex flex-row w-full justify-between items-center mt-4">
          <h1 class="font-bold text-3xl">Total:</h1>
          <div class="discount-total-price flex flex-row items-end">
            <div class="total-cart-price text-4xl font-black">
              {{ cartStore.finalTotal.toFixed(2).toString().replace(".", ",") }}
              €
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col justify-between items-start my-6">
        <div class="bg-lightmeat w-full rounded-xl py-4 flex flex-row items-center">
          <v-icon name="md-discount-twotone" scale="1.5" class="ml-4 text-meat"></v-icon>
          <div class="flex flex-col mx-4">
            <h1 class="text-meat text-xl font-black">10% OFF PROMO</h1>
            <p class="text-meat font-medium">
              if you buy at least
              <strong class="text-darkgreen text-xl">4</strong> products
            </p>
          </div>
        </div>
        <div class="flex flex-row w-full items-center justify-between mt-4">
          <h1 class="font-bold text-3xl">Total:</h1>
          <div class="total-cart-price text-4xl font-black">
            {{ cartStore.finalTotal.toFixed(2).toString().replace(".", ",") }} €
          </div>
        </div>
      </div>
      <div class="flex justify-center w-full my-8">
        <div
          @click="buyButton"
          class="text-stone-50 font-bold bg-meat w-full hover:bg-mediumgreen cursor-pointer rounded-xl shadow-xl py-3 text-center"
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
