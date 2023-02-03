<script setup lang="ts">
</script>

<template>
  <div style="height: 100vh;
    display: flex;">
  <router-view/>
  </div>
</template>
<script setup lang="ts">
import {useMenuStore} from "@/store";
import {useRouter} from "vue-router/composables";

const menuStore = useMenuStore();
const Router = useRouter();
if(!menuStore.menuList.length){
  Router.replace('/home')
}

</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
