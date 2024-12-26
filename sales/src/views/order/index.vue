<template>
  <div class="home-box">
    <h1>订单页面</h1>
  </div>
</template>

<script setup lang="ts">
console.log("订单页面-加载了");
</script>

<style scoped lang="scss">
.home-box {
  box-sizing: border-box;

  .margin-box {
    margin: 10px 0;
    & > div {
      margin: 10px 0;
    }
  }
}
</style>
