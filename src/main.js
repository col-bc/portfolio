import { createApp } from "vue";
import { createPinia } from "pinia";

import SvgIcon from "@jamescoyle/vue-icon";
import App from "./App.vue";
import router from "./router";

import "@/assets/tailwind.css";
import "flowbite";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("svg-icon", SvgIcon);

app.mount("#app");
