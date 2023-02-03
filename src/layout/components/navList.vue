<template>

  <el-menu
      :default-active="activeMenuIndex"
      class="el-menu-navWarp"
      mode="horizontal"
      @select="handleSelect"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff">
    <template v-for="menus in menuList">
      <el-menu-item :index="menus.funcId"  :class="{'el-menu-item-selected':activeMenuIndex===menus.funcId}">{{menus.text}}</el-menu-item>
    </template>

<!--    <el-menu-item index="2"> 我的工作台</el-menu-item>-->
<!--    <el-menu-item index="3">消息中心</el-menu-item>-->
<!--    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
  </el-menu>

</template>

<script setup lang="ts">
import { useMenuStore} from "@/store";
import {storeToRefs} from "pinia";
import {set} from "vue";
import {useRouter} from "vue-router/composables";
import { getLeftMenu} from "@/util/menus";
const Router = useRouter()

const menuStore = useMenuStore()
const {menuList,activeMenuIndex} = storeToRefs(menuStore)

onMounted(()=>{
  menuStore.activeMenuIndex= menuList.value[0].funcId
  menuStore.setActiveMenuIndex(menuList.value[0].funcId)
  set(menuStore,'activeMenuList',menuList.value[0])
})
watch(activeMenuIndex,(n)=>{
  const activeMenuList = menuList.value.find((v)=>v.funcId===n)
  set(menuStore,'activeMenuList',activeMenuList)
})


function handleSelect(key, keyPath) {
  if(menuList.value){
    menuStore.setActiveMenuIndex(key)

    const menus = menuList.value .find(v=>v.funcId===key)
    if(menus){
      set(menuStore,'activeMenuList',menus)
      console.log(getLeftMenu(menus),menus)
      if(getLeftMenu(menus)){
        Router.push({path:getLeftMenu(menus)})
      }
      // Router.push({path:getLeftMenu(menus)})
      console.log(getLeftMenu(menus))
    }

  }
}
</script>

<style scoped lang="scss">
.el-menu-navWarp{
  .el-menu-item{
    height: 100%;
    &:hover{
      //background-image: linear-gradient(180deg,rgba(0,122,255,0) 0%, #007aff 100%)!important;
      background-color: transparent!important;
      border-bottom: 2px solid #007aff!important;

    }
  }
  ::v-deep{
    .el-menu-item.is-active{
      border:0!important;
      background-image: linear-gradient(180deg,rgba(0,122,255,0) 0%, #007aff 100%)!important;
      background-color: transparent!important;
      border-bottom: 0!important;
    }
  }
  .el-menu-item-selected{
    background-image: linear-gradient(180deg,rgba(0,122,255,0) 0%, #007aff 100%)!important;
    background-color: transparent!important;
    border-bottom: 0!important;
  }
    border-bottom: solid 0!important;

}
</style>