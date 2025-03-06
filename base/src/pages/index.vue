<template>
  <div class="container">
    <div class="loading-box" v-loading="loading"></div>
    <template v-for="(item, index) in menuData" :key="index">
      <micro-app
        v-if="currentSubName === item.name"
        :name="item.name"
        :url="item.url"
        iframe
        router-mode="pure"
        keep-alive
        :data="{
          query,
          userInfo
        }"
        @mounted="mounted"
        @aftershow="afterShow"
        @datachange="handleDataChange"
      ></micro-app>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import {
  useRoute,
  type RouteLocationNormalizedLoaded,
  useRouter
} from "vue-router"
import micro from "@micro-zoe/micro-app"
import useStore from "@/store"

const router = useRouter()
const route = useRoute()
const currentSubName = ref<string>("")
const currentSubPath = ref<string>("")
const loading = ref(false)
const loadSubArr: string[] = [] // 记录加载过的子应用
const query = ref<Record<string, any>>({})
const {
  state: { menuData, userInfo }
} = useStore()

watch(
  () => route,
  (newVal: RouteLocationNormalizedLoaded) => {
    // 当前子应用名称
    const subName = newVal.params.subName as string
    // 当前子应用路径
    const subPath = newVal.params.subPath as string[]
    // query参数记录
    query.value = newVal.query
    // 判断是否需要加载
    if (!loadSubArr.includes(subName)) {
      loading.value = true
      loadSubArr.push(subName)
    }
    currentSubPath.value = subPath?.join("/")
    currentSubName.value = subName
    // 通知激活子应用更新路由
    micro.setData(currentSubName.value, {
      currentSubName: currentSubName.value,
      currentSubPath: currentSubPath.value
    })
  },
  { deep: true, immediate: true }
)

// 子应用通知跳转
const handleDataChange = (e: any) => {
  const path = e.detail.data.path
  router.push(path)
}

const afterShow = () => {
  loading.value = false
}

const mounted = () => {
  loading.value = false
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .loading-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
