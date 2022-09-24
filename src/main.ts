import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoTrash } from "oh-vue-icons/icons";

addIcons(CoTrash);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
