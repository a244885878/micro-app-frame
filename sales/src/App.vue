<template>
  <!-- <router-view #default="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

window.microApp?.addDataListener((data: any) => {
  // TODO:暂时使用这种方式保证生命周期正常触发
  router.replace({
    path: "/",
  });
  const timer = setTimeout(() => {
    clearTimeout(timer);
    router.replace({
      path: data.currentSubPath,
    });
  }, 10);
}, true);
</script>

<style scoped lang="scss"></style>
