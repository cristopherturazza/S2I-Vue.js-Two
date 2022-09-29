<template>
  <div class="flex flex-row">
    <RouterLink :to="{ name: 'product', params: { id: props.id } }">
      <img class="w-20 sm:w-24 md:w-28 rounded-l-xl" :src="props.image" :alt="props.name"
    /></RouterLink>
    <div class="flex flex-col ml-4">
      <RouterLink :to="{ name: 'product', params: { id: props.id } }">
        <div class="font-semibold text-sm sm:text-base my-2 sm:my-3 md:text-lg md:my-4">
          {{ props.name }}
        </div>
      </RouterLink>
      <div class="flex flex-row items-center">
        <div
          class="quantity-selector flex flex-row rounded-xl items-center font-semibold w-fit bg-stone-200 border border-stone-300"
        >
          <div
            @click="$emit('removeQuantity', props.id)"
            class="less-button touch-manipulation select-none px-2 py-1 cursor-pointer rounded-l-xl hover:bg-lightgreen"
          >
            -
          </div>
          <div class="font-bold border-r border-l text-xs py-1 border-stone-300 px-2">
            {{ props.quantity }}
          </div>
          <div
            @click="$emit('addQuantity', props.id)"
            class="plus-button touch-manipulation select-none px-2 py-1 cursor-pointer rounded-r-xl hover:bg-lightgreen"
          >
            +
          </div>
        </div>
        <div
          @click="$emit('removeEntry', props.id)"
          class="ml-4 px-2 py-1 bg-stone-200 border border-stone-300 cursor-pointer rounded-xl hover:bg-meat hover:text-stone-50"
        >
          <v-icon name="co-trash"></v-icon>
        </div>
      </div>
    </div>
  </div>
  <div class="cart-subprice flex flex-col items-end mr-4 mt-2 lg:ml-12 xl:ml-36">
    <div class="text-2xl">€</div>
    <div class="text-base md:text-lg lg:text-xl font-semibold">
      {{ props.subTotal?.toFixed(2).toString().replace(".", ",") }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: String,
  name: String,
  image: String,
  unitPrice: Number,
  quantity: Number,
  subTotal: Number,
});

const emit = defineEmits(["removeQuantity", "addQuantity", "removeEntry"]);
</script>

<style scoped></style>
