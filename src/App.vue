<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <div class="relative min-h-screen bg-sand">
    <div class="flex flex-col pb-20">
      <header>
        <TheHeader />
      </header>
      <RouterView />
    </div>
    <footer class="absolute bottom-0 w-full h-20">
      <TheFooter />
    </footer>
  </div>
</template>
