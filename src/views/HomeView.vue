<template>
  <main>
    <div class="wrapper flex justify-evenly">
      <div class="product-cards-container">
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
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import { useProductStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import ProductCard from "@/components/ProductCard.vue";

const cartStore = useCartStore();

const productStore = useProductStore();

onBeforeMount(() => {
  productStore.fetchData();
});
</script>

<style scoped>
.product-cards-container {
  @apply grid grid-cols-2 m-4;
}
</style>
