import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"
import type Product from '@/types/Product'

export const useProductStore = defineStore('products', () => {
  let products = ref<Product[]>()
  async function fetchData() {
    try {
      const data = await axios.get("https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json")
      products.value = await data.data
    } catch (error) {
      console.log(error)
    }
  }

  return { products, fetchData }


})
