<template>
  <div class="font-black">
    <h1>This is Cart View</h1>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<style></style>
