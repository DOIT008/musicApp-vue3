import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// 初始化
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public",
  // 别名
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "views",
        replacement: resolve(__dirname, "src/views"),
      },
      {
        find: "components",
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: "public",
        replacement: resolve(__dirname, "public"),
      },
    ],
  },
  // 开发服务器设置
  server: {
    host: "169.254.104.135",
    port: 8080,
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 相当于前端在请求的时候，所有的接口使用api进行标识，但是后台没有api这个字符串，所以替换成了空
      },
    },
  },
  plugins: [vue()],
});
