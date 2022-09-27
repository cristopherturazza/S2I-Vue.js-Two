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
    <div
      v-if="cartStore.discount"
      class="flex flex-row justify-between items-end my-6 ml-8 mr-2"
    >
      <h1 class="font-bold text-3xl">Total:</h1>
      <div class="discount-total-price flex flex-col items-end">
        <div class="mr-8 bg-lightmeat rounded-lg py-1 px-2 mb-2">
          <span class="font-semibold text-meat">10%</span>
          <v-icon name="md-discount-twotone" class="mx-2 text-meat"></v-icon>
          <span class="line-through text-meat"
            >{{ cartStore.total.toFixed(2).toString().replace(".", ",") }} €</span
          >
        </div>
        <div class="total-cart-price mr-8 text-4xl text-mediumgreen font-black">
          {{ cartStore.finalTotal.toFixed(2).toString().replace(".", ",") }} €
        </div>
      </div>
    </div>
    <div v-else class="flex flex-row justify-between items-end my-6 ml-8 mr-2">
      <h1 class="font-bold text-3xl">Total:</h1>
      <div class="total-cart-price mr-8 text-4xl font-black">
        {{ cartStore.finalTotal.toFixed(2).toString().replace(".", ",") }} €
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col min-h-[75vh] text-stone-800">
    <div class="flex flex-row justify-center mt-12">
      <v-icon name="md-shoppingcart-twotone" scale="4" class="text-meat"></v-icon>
    </div>
    <div class="flex flex-col items-center mt-2">
      <h1 class="font-bold text-xl">The cart is empty</h1>
      <RouterLink to="/"
        ><p class="mt-12 hover:text-mediumgreen">&lt Back Home</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import CartEntryCard from "@/components/CartEntryCard.vue";
import { GiTargetArrows } from "oh-vue-icons/icons";
import type CartProduct from "@/types/CartProduct";

const cartStore = useCartStore();

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
