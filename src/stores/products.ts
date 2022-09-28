import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type Product from "@/types/Product";

export const useProductStore = defineStore("products", () => {
  const products = useStorage<Product[]>("products", []);
  async function fetchData() {
    try {
      const data = await axios.get(
        "https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json"
      );
      products.value = await data.data;
      products.value?.forEach((p) => {
        p.id = uuidv4();
      });
    } catch (error) {
      console.log(error);
    }
  }
  return { products, fetchData };
});
