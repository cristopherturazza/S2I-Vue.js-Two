<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();

onBeforeMount(() => {
  productStore.fetchData();
});
</script>

<template>
  <main>
    <div v-for="(product, index) in productStore.products" :key="index">
      {{ product.name }}{{ product.description }}{{ product.price }}
    </div>
  </main>
</template>
