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
      subTotal: props.unitPrice * props.quantity,
    };

    if (cart.value.find((entry) => entry.id === props.id)) {
      const index = cart.value.findIndex((entry) => entry.id === props.id);
      cart.value[index].quantity += props.quantity;
    } else cart.value.push(data);
  }

  function removeProduct(index: number) {
    cart.value.splice(index, 1);
  }

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

  const cartCounter = computed<number>(() => {
    return cart.value.length;
  });

  const discount = computed<boolean>(() => {
    return productCounter.value >= 3 ? true : false;
  });

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
