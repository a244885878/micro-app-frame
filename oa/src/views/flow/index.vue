<template>
  <div class="home-box">
    <h1>流程页面</h1>
    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-button>Hover to activate</el-button>
      </template>
    </el-popover>
    <el-button type="primary" @click="toClint()"
      >去销售模块的客户页面</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { getQuery, routerChange } from "@/utils/tools";

console.log("流程页面-加载了", getQuery());

const toClint = () => {
  routerChange("/sales/client");
};
</script>

<style scoped lang="scss"></style>
