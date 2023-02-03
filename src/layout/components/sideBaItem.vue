<template>
  <div v-if="item.items">
    <template v-if="item.items.length === 0">
<!--      <app-link  :to="item.name">-->
        <el-menu-item :index="item.path">
          <i class="el-icon-menu"></i>
          {{ item.text }}
        </el-menu-item>
<!--      </app-link>-->
    </template>

    <el-submenu v-else :index="item.funcId">
      <template slot="title">
        <i class="el-icon-menu"></i>
        {{ item.text }}
      </template>

      <template v-for="child in item.items">
        <sidebar-item
            v-if="child.items&&child.items.length>0"
            :item="child"
            :key="child.funcId"/>
          <el-menu-item  :key="child.funcId" :index="child.path">
            <i class="el-icon-location"></i>
            {{ child.text }}
          </el-menu-item><!--<el-menu-item  :key="child.funcId" :index="replacePathUrl(child.url)||('/'+routeBaseStr+'/'+child.name)">
            <i class="el-icon-location"></i>
            {{ child.text }}
          </el-menu-item>-->
      </template>
    </el-submenu>
  </div>
</template>

<script setup lang="ts">
import {useTagsViewStore} from "@/store";


defineProps({
  item: {
    type: Object,
    required: true
  }
})
import {useMenuStore} from "@/store";

const menuStore =  useMenuStore()
const routeBaseStr = 'factoryLayout/'+menuStore.activeMenuList.name
function replacePathUrl(str:string|undefined) {

  if(str){
    return '/'+str.replace(/\./g,'/')
  }
  return str
}
</script>