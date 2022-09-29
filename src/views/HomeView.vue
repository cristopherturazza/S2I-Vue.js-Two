<template>
  <main>
    <div v-if="productStore.products.length" class="wrapper flex justify-evenly my-4">
      <div
        class="grid grid-cols-2 lg:grid-cols-3 m-4 sm:mx-8 sm:gap-8 md:mx-16 md:gap-12 lg:mx-24 xl:mx-44 2xl:mx-80 2xl:gap-20"
      >
        <div
          v-for="product in productStore.products"
          :key="product.id"
          class="product-card-list"
        >
          <ProductCard
            :id="product.id"
            :name="product.name"
            :image="product.image"
            :price="product.price"
          />
        </div>
      </div>
    </div>
    <div v-else class="wrapper flex justify-center w-full">
      <div class="flex flex-col items-center mt-12 max-w-lg">
        <v-icon name="md-erroroutline-outlined" scale="5" class="text-meat"></v-icon>
        <h1 class="text-2xl font-bold mt-4">Data or server unavalaible.</h1>
        <p class="text-lg mx-8 mt-4 text-center">
          Try to
          <a href="." class="underline font-semibold">reload the page</a> or check your
          connection. If the problem persist the service is actually down, we apologize
          for the inconvenient.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import { useProductStore } from "@/stores/products";
import ProductCard from "@/components/ProductCard.vue";

const productStore = useProductStore();

// fetch from APIs if the store is empty

onBeforeMount(() => {
  if (productStore.products.length) return null;
  else productStore.fetchData();
});
</script>
