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
  </div>
</template>

<script setup lang="ts">
console.log("流程页面-加载了");
</script>

<style scoped lang="scss"></style>
