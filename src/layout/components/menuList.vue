<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :default-active="Route.path"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          :collapse="isCollapse"
          text-color="#fff"
          router
          active-text-color="#ffd04b">
        <!--    <menu-tree :menu-list="activeMenuList.items" v-if="initMenu"></menu-tree>-->
        <sidebar-item v-for="menu in activeMenuList.items" :key="menu.funcId" :item="menu"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">

import {useMenuStore} from "@/store";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router/composables";

const Route = useRoute()
const initMenu = ref(false)

function handleOpen(key, keyPath) {
  console.log(key, keyPath);
}

function handleClose(key, keyPath) {
  console.log(key, keyPath);
}

const menuStore = useMenuStore()
const {isCollapse, activeMenuList} = storeToRefs(menuStore)

watch(activeMenuList, (n) => {
  console.log('watch', n)
  initMenu.value = false

  nextTick(() => {
    initMenu.value = true
  })
})
</script>

<style scoped lang="scss">
.sidebar-container {
  transition: width 0.28s;
  width: 200px !important;
  height: 100%;
  //position: fixed;
  font-size: 0px;
  //bottom: 0;
  //left: 0;
  //z-index: 1001;
  overflow: hidden;


  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .el-scrollbar {
    height: 100%;
  }



  ::v-deep .scrollbar-wrapper {
    overflow-x: hidden !important;
    overflow-x: hidden;

    .el-scrollbar__view {
      height: 100%;
    }
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  .is-active > .el-submenu__title {
    color: #f4f4f5 !important;
  }
}
</style>