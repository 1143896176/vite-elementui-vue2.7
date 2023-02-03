<template>
  <el-container>
    <el-header class="header-wrapper" height="80px">
      <div>logo</div>
      <NavList></NavList>
      <div>nav</div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="slider-wrapper" v-if="activeMenuList.items&&activeMenuList.items.length">
        <MenuList></MenuList>
      </el-aside>
      <el-main style="padding: 0">
        <tags-view />
<div class="main-content">
  <transition name="fade-transform" mode="out-in">
    <keep-alive >
      <router-view :key="key" />
    </keep-alive>
  </transition>
</div>

      </el-main>
    </el-container>
  </el-container>
</template>


<script setup lang="ts">

import {useMenuStore} from "@/store";
import MenuList from './components/menuList.vue'
import NavList from './components/navList.vue'
import TagsView from './components/TagsView/index.vue'
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router/composables";
const Route = useRoute()
const menuStore = useMenuStore()
const { activeMenuList} = storeToRefs(menuStore)
watch(activeMenuList,(n)=>{
  console.log(n)
})
const key = computed(()=> {
  return Route.fullPath
})
</script>
<style scoped lang="scss">
.slider-wrapper {
  color: #FFF;
}
.main-content{
  min-height: calc(100% - 35px);padding: 0 15px;
}
.header-wrapper {
  background: #163172;
  color: #FFF;
  display: flex;
  justify-content: center;
}
</style>