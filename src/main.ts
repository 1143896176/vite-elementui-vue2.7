import Vue  from 'vue'
import './style.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {PiniaVuePlugin, createPinia} from 'pinia'
import {router} from "@/routers";
import SidebarItem from '@/layout/components/sideBaItem.vue'
const pinia = createPinia()
Vue.use(PiniaVuePlugin)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Element)
Vue.component('sidebar-item',SidebarItem)
new Vue({
    pinia,
    router,
    render: h => h(App),
}).$mount('#app')
