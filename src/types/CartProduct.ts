interface CartProduct {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  subTotal?: number;
}

export default CartProduct;
