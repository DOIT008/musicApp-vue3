import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
// 创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 路由全局守卫
// router.beforeEach((to, from, next) => {});
export default router;
