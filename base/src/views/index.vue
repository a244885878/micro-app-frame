<template>
  <template v-for="(item, index) in menuData" :key="index">
    <micro-app
      v-if="currentSubName === item.name"
      :name="item.name"
      :url="item.url"
      :baseroute="item.path"
      iframe
    ></micro-app>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { menuData } from "@/components/Menu/data";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";
import * as micro from "@micro-zoe/micro-app";

const route = useRoute();
const currentSubName = ref<string>("");

watch(
  () => route,
  (val: RouteLocationNormalizedLoaded) => {
    // 当前激活的子应用名称
    currentSubName.value = val.params.subApplicationName as string;
    // 同步子应用路由
    const microApp = new micro.MicroApp();
    microApp.router.push({
      name: currentSubName.value,
      path: val.path,
      replace: true,
    });
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss"></style>
