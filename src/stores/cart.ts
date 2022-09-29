import { computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type CartProduct from "@/types/CartProduct";

export const useCartStore = defineStore("cart", () => {
  //useStorage syncs the store with LocalStorage

  const cart = useStorage<CartProduct[]>("cart", []);

  // Cart Add Products method

  function addProduct(props: CartProduct) {
    const data: CartProduct = {
      id: props.id,
      name: props.name,
      image: props.image,
      unitPrice: props.unitPrice,
      quantity: props.quantity,
      subTotal: props.unitPrice * props.quantity,
    };

    // if the product still exist in the cart, only add quantities

    if (cart.value.find((entry) => entry.id === props.id)) {
      const index = cart.value.findIndex((entry) => entry.id === props.id);
      cart.value[index].quantity += props.quantity;
    } else cart.value.push(data);
  }

  // Cart Remove Products method

  function removeProduct(index: number) {
    cart.value.splice(index, 1);
  }

  // Check how many products were added

  const productCounter = computed<number>(() => {
    const quantities: number[] = cart.value.map((product) => {
      return product.quantity;
    });
    const totalQuantiy: number = quantities.reduce(
      (partial, q) => partial + q,
      0
    );
    return totalQuantiy;
  });

  // Check how many cart Entries were added

  const cartCounter = computed<number>(() => {
    return cart.value.length;
  });

  // Check if the products are more than 3 for the 10% discount

  const discount = computed<boolean>(() => {
    return productCounter.value > 3 ? true : false;
  });

  // Cart Total (without discount)

  const total = computed<number>(() => {
    const subPrices: number[] = cart.value.map((product) => {
      if (product.subTotal) return product.subTotal;
      else return 0;
    });
    const total: number = subPrices.reduce(
      (partial, price) => partial + price,
      0
    );
    return total;
  });

  // Cart Real Total (with discount if present)

  const finalTotal = computed<number>(() => {
    const subPrices: number[] = cart.value.map((product) => {
      if (product.subTotal) return product.subTotal;
      else return 0;
    });
    const total: number = subPrices.reduce(
      (partial, price) => partial + price,
      0
    );
    if (discount.value) return total * 0.9;
    else return total;
  });

  return {
    cart,
    addProduct,
    removeProduct,
    productCounter,
    cartCounter,
    discount,
    finalTotal,
    total,
  };
});
