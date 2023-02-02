// 路由配置对象
import NotFound from "components/404/index.vue";
export default [
  {
    path: "/",
    name: "main",
    redirect: "/home", // 当为空路由的时候默认重定向到/home所代表的组件
  },
  {
    path: "/home",
    name: "home",
    component: () => import("views/home/index.vue"),
    redirect: "/home/my", // 表示在该页面的router-view中要默认展示的是/my所指向的组件
    children: [
      {
        path: "my",
        name: "my",
        component: () => import("views/home/pages/my/index.vue"),
      },
      {
        path: "find",
        name: "find",
        component: () => import("views/home/pages/find/index.vue"),
      },
      {
        path: "cloudVillage",
        name: "cloudVillage",
        component: () => import("views/home/pages/cloudVillage/index.vue"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("views/home/pages/video/index.vue"),
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: () => import("views/search/index.vue"),
  },
  {
    path: "/musicListDetail",
    name: "musicListDetail",
    component: () => import("views/home/pages/find/musicListDetail.vue"),
  },
  // 一般放到最后，啥也没匹配到的时候使用404组件
  { path: "/:pathMatch(.*)", name: "notFound", component: NotFound },
];
