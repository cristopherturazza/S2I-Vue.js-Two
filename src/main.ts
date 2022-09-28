import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  CoTrash,
  MdShoppingcartcheckoutSharp,
  MdDone,
  MdShoppingcartTwotone,
  FaHome,
  MdDiscountTwotone,
  MdErroroutlineOutlined,
  BiChevronLeft,
  BiChevronRight,
} from "oh-vue-icons/icons";

addIcons(
  FaHome,
  CoTrash,
  MdShoppingcartcheckoutSharp,
  MdDone,
  MdShoppingcartTwotone,
  MdDiscountTwotone,
  MdErroroutlineOutlined,
  BiChevronLeft,
  BiChevronRight
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
