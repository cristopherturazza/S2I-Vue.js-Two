<template>
  <div v-if="productData" class="flex flex-col">
    <div
      class="flex flex-col lg:flex-row lg:justify-center lg:shadow-md lg:my-20 lg:mx-28 xl:mx-48 2xl:mx-80 lg:rounded-xl"
    >
      <div>
        <img
          :src="productData?.image"
          :alt="productData?.name"
          class="lg:rounded-l-xl lg:max-w-md lg:object-fill 2xl:max-w-xl"
        />
      </div>
      <div
        class="flex flex-col justify-between my-6 mx-8 sm:mx-12 md:mx-20 lg:mx-12 xl:mr-32 xl:ml-20 2xl:mr-56 text-stone-800"
      >
        <div>
          <h1 class="mb-4 font-black text-4xl xl:text-5xl 2xl:text-6xl">
            {{ productData?.name }}
          </h1>
          <p class="lg:text-lg xl:text-xl 2xl:text-2xl">
            {{ productData?.description }}
          </p>
        </div>
        <div>
          <div class="flex flex-row justify-between mt-8 mb-4">
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
              class="button-cart text-stone-50 font-bold bg-meat hover:bg-mediumgreen cursor-pointer rounded-xl my-4 sm:my-6 md:my-8 lg:my-4 shadow-xl py-3 md:py-4 w-full max-w-sm text-center"
            >
              Add to Cart
            </div>
            <div
              v-else
              class="button-cart text-stone-50 bg-darkgreen cursor-pointer rounded-xl my-4 sm:my-6 md:my-8 shadow-xl py-3 md:py-4 lg:my-4 w-full max-w-sm text-center"
            >
              Added
              <v-icon name="md-done" animation="pulse" speed="fast"></v-icon>
            </div>
          </div>
        </div>
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
