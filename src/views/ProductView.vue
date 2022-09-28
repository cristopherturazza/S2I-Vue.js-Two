<template>
  <div v-if="productData" class="flex flex-col">
    <img :src="productData?.image" :alt="productData?.name" />
    <div class="info-container my-6 ml-8 mr-8 text-stone-800">
      <h1 class="mb-4 font-black text-4xl">
        {{ productData?.name }}
      </h1>
      <p>
        {{ productData?.description }}
      </p>
      <div class="flex flex-row justify-between items-center mt-8 mb-4">
        <span class="font-semibold text-2xl"
          >{{ productData?.price.toFixed(2).toString().replace(".", ",") }} €</span
        >
        <div
          class="quantity-selector flex flex-row rounded-xl text-xl items-center font-semibold bg-stone-100 border border-stone-200"
        >
          <div
            @click="removeQuantity"
            class="less-button touch-manipulation select-none px-3 py-1 cursor-pointer rounded-l-xl hover:bg-lightgreen"
          >
            -
          </div>
          <div class="font-bold border-r border-l border-stone-200 px-3 py-1">
            {{ currentQuantity }}
          </div>
          <div
            @click="currentQuantity++"
            class="plus-button touch-manipulation select-none px-3 py-1 cursor-pointer rounded-r-xl hover:bg-lightgreen"
          >
            +
          </div>
        </div>
      </div>
      <div
        class="button-container flex flex-row justify-center transition-all ease-in duration-300"
      >
        <div
          v-if="!isAdded"
          @click="addToCart"
          class="button-cart text-stone-50 font-bold bg-meat hover:bg-mediumgreen cursor-pointer rounded-xl mt-4 shadow-xl py-3 w-full text-center"
        >
          Add to Cart
        </div>
        <div
          v-else
          class="button-cart text-stone-50 bg-darkgreen cursor-pointer rounded-xl mt-4 shadow-xl py-3 w-full text-center"
        >
          Added <v-icon name="md-done" animation="pulse" speed="fast"></v-icon>
        </div>
      </div>
      <div class="navbar flex flex-row font-light justify-between mt-6">
        <RouterLink to="/">
          <div
            class="text-sm text-stone-50 bg-darkgreen py-2 pr-4 pl-2 rounded-xl hover:bg-mediumgreen"
          >
            <v-icon name="bi-chevron-left"></v-icon>
            Back
          </div></RouterLink
        >
        <RouterLink to="/cart">
          <div
            class="text-sm text-stone-50 bg-darkgreen py-2 pl-4 pr-2 rounded-xl hover:bg-mediumgreen"
          >
            Cart
            <v-icon name="bi-chevron-right"></v-icon></div
        ></RouterLink>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center mt-12">
    <v-icon name="md-erroroutline-outlined" scale="5" class="text-meat"></v-icon>
    <h1 class="text-xl font-bold text-center mx-12 mt-4">
      This product not exist or is actually unavalaible
    </h1>
    <RouterLink to="/"
      ><div
        class="mt-16 text-lg text-stone-50 bg-meat py-2 px-4 rounded-xl hover:bg-mediumgreen"
      >
        Back Home
      </div></RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/products";
import type CartProduct from "@/types/CartProduct";

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();

const productData = ref();
const currentQuantity = ref(1);
const isAdded = ref<boolean>(false);

// search correct product by params

onMounted(() => {
  productData.value = productStore.products?.find(
    (product) => product.id == route.params.id
  );
});

// remove quantity check >= 1

const removeQuantity = () => {
  if (currentQuantity.value === 1) return null;
  else currentQuantity.value--;
};

const addToCart = () => {
  const add: CartProduct = {
    id: productData.value.id,
    name: productData.value.name,
    image: productData.value.image,
    unitPrice: productData.value.price,
    quantity: currentQuantity.value,
  };
  cartStore.addProduct(add);
  isAdded.value = true;
  setTimeout(() => {
    isAdded.value = false;
  }, 2000);
  currentQuantity.value = 1;
};
</script>

<style></style>
