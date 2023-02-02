import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible/index.js";
import "public/fonts/iconfont.css";
import "public/css/common.css";
import router from "@/router/index";
import store from "@/store/index";
const app = createApp(App);
// 将变量axios抛出去
app.use(router);
app.use(store);
app.mount("#app");
