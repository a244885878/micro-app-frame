// @ts-ignore
import eslint from "vite-plugin-eslint"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === "micro-app"
        }
      }
    }),
    eslint({
      failOnError: true, // 关键配置：错误阻断构建
      fix: true, // 自动修复可修复问题
      include: ["src/**/*.js", "src/**/*.ts", "src/**/*.vue"] // 指定校验范围
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  server: {
    host: "0.0.0.0",
    port: 6001,
    strictPort: true // 如果端口被占用则直接退出
  }
})
