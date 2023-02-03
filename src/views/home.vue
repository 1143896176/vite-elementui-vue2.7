<template>

</template>

<script setup lang="ts">
import {MenuTree, useMenuStore, useTagsViewStore} from "@/store";
import {useRouter} from "vue-router/composables";
import {transformMenus} from "@/util/menus";
const Router= useRouter()
const menus: MenuTree[] = [
  {
    name: 'home',
    funcId: '123',
    items: [],
    text: '首页'
  },
  {
    name: 'assets',
    funcId: '1234',
    text: '资源管理',

    items: [
      {
        funcId: '12341',
        name: 'vehicleinfo',
        text: '基本信息',
        items: [
          {
            funcId: '123411',
            name: 'runningvehicle',
            text: '运行台账',
            items: [],
            url:'factoryLayout.assets.addvehicleapply'
          },
          {
            funcId: '123412',
            name: 'assetsvehicle',
            text: '资产台账',
            items: []
          }
        ]
      }
    ],
  },
  {
    name: 'running',
    funcId: '1235',
    text: '运行管理',
    items: [
      {
        funcId: '12351',
        name: 'userapply',
        text: '用车管理',
        items: [
          {
            funcId: '123511',
            name: 'useapply',
            text: '用车申请',
            items: []
          },
          {
            funcId: '123512',
            name: 'useapplyaudit',
            text: '用车审批',
            items: []
          }
        ]
      }
    ],
  }
]
console.log()
const _menus = transformMenus(menus)
const menuStore = useMenuStore()
const tagsViewStore = useTagsViewStore()
menuStore.setMenuList(_menus)
tagsViewStore.setMenuNames(_menus)
onMounted(()=>{
  Router.push('/index')
})
</script>

<style scoped>

</style>