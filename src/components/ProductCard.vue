<template>
  <div class="card-container">
    <img :src="props.image" :alt="props.name" />
    <h1>{{ props.name }}</h1>
    <h3>{{ props.price }}</h3>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  image: String,
  price: Number,
});
</script>

<style scoped></style>
