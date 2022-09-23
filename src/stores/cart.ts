import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type CartProduct from "@/types/CartProduct";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<CartProduct[]>([]);

  function addProduct(props: CartProduct) {
    const data: CartProduct = {
      id: props.id,
      name: props.name,
      image: props.image,
      unitPrice: props.unitPrice,
      quantity: props.quantity,
    };
    cart.value.push(data);
  }

  function removeProduct(index: number) {
    cart.value.splice(index, 1);
  }

  const discount = computed<boolean>(() => {
    const quantities: number[] = cart.value.map((product) => {
      return product.quantity;
    });
    const totalQuantiy: number = quantities.reduce(
      (partial, q) => partial + q,
      0
    );
    return totalQuantiy >= 3 ? true : false;
  });

  return { cart, addProduct, removeProduct, discount };
});
