<template>
  <div class="card-container">
    <img :src="props.image" :alt="props.name" class="rounded-t-lg" />
    <h1
      class="my-2 mx-3 xl:mx-6 text-base md:text-lg xl:text-xl font-black leading-tight text-stone-800"
    >
      {{ props.name }}
    </h1>
    <div class="grid grid-cols-2 mx-3 xl:mx-6 mb-4 mt-2 items-center">
      <h3 class="text-sm md:text-base xl:text-xl font-semibold tracking-tight">
        {{ props.price?.toFixed(2).toString().replace(".", ",") }} €
      </h3>
      <RouterLink :to="{ name: 'product', params: { id: props.id } }">
        <div class="view-product-link bg-meat hover:bg-mediumgreen">View</div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: String,
  name: String,
  image: String,
  price: Number,
});
</script>

<style scoped>
.card-container {
  @apply flex flex-col rounded-lg shadow-lg m-4 2xl:mx-0 bg-stone-100;
}

.view-product-link {
  @apply flex justify-center px-4 py-1 sm:py-2 md:py-3 text-xs text-center text-stone-50 shadow-md rounded-lg cursor-pointer;
}
</style>
