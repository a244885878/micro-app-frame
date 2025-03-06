<template>
  <div class="home-box">
    <Menu></Menu>
    <div class="views-box">
      <h1 v-if="route.path === '/'">欢迎访问！</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu/index.vue"
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<style scoped lang="scss">
.home-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  background: #fafcff;

  .views-box {
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
    padding: 20px;
  }
}
</style>
