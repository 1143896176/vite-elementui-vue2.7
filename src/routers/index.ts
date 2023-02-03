import routes from '~pages'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
import {useMenuStore, useTagsViewStore} from "@/store";

console.log(routes)

export const constantRoutes = [
    {
        path: '/home',
        component: () => import('@/views/home.vue'),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/errorPage/404.vue'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/errorPage/401.vue'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'home',
        children: [
            {
                path: '/index',
                component: () => import('@/pages/first/index.vue'),
                name: 'home',
                meta: { title: '首页', icon: 'home', noCache: true, affix: true }
            },
            ...routes,
            // { path: '*', redirect: '/error/404', hidden: true }
        ]
    },

]
export const asyncRoutes = [
   /* {
        path: '/example',
        component: Layout,
        redirect: '/example/list',
        name: 'Example',
        meta: {
            title: 'example',
            icon: 'example'
        },
        children: [
            {
                path: 'create',
                component: () => import('@/views/example/create.vue'),
                name: 'CreateArticle',
                meta: { title: 'createArticle', icon: 'edit' }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/example/edit.vue'),
                name: 'EditArticle',
                meta: { title: 'editArticle', noCache: true },
                hidden: true
            },
            {
                path: 'list',
                component: () => import('@/views/example/list.vue'),
                name: 'ArticleList',
                meta: { title: 'articleList', icon: 'list' }
            }
        ]
    },

    {
        path: '/tab',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/tab/index.vue'),
                name: 'Tab',
                meta: { title: 'tab', icon: 'tab' }
            }
        ]
    },

    {
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        name: 'ErrorPages',
        meta: {
            title: 'errorPages',
            icon: '404'
        },
        children: [
            {
                path: '401',
                component: () => import('@/views/errorPage/401.vue'),
                name: 'Page401',
                meta: { title: 'page401', noCache: true }
            },
            {
                path: '404',
                component: () => import('@/views/errorPage/404.vue'),
                name: 'Page404',
                meta: { title: 'page404', noCache: true }
            }
        ]
    },

    {
        path: '/error-log',
        component: Layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'log',
                component: () => import('@/views/errorLog/index.vue'),
                name: 'ErrorLog',
                meta: { title: 'errorLog', icon: 'bug' }
            }
        ]
    },

    {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
            title: 'excel',
            icon: 'excel'
        },
        children: [
            {
                path: 'export-excel',
                component: () => import('@/views/excel/exportExcel.vue'),
                name: 'ExportExcel',
                meta: { title: 'exportExcel' }
            },
            {
                path: 'export-selected-excel',
                component: () => import('@/views/excel/selectExcel.vue'),
                name: 'SelectExcel',
                meta: { title: 'selectExcel' }
            },
            {
                path: 'export-merge-header',
                component: () => import('@/views/excel/mergeHeader.vue'),
                name: 'MergeHeader',
                meta: { title: 'mergeHeader' }
            },
            {
                path: 'upload-excel',
                component: () => import('@/views/excel/uploadExcel.vue'),
                name: 'UploadExcel',
                meta: { title: 'uploadExcel' }
            }
        ]
    },

    {
        path: '/zip',
        component: Layout,
        redirect: '/zip/download',
        alwaysShow: true,
        meta: { title: 'zip', icon: 'zip' },
        children: [
            {
                path: 'download',
                component: () => import('@/views/zip/index.vue'),
                name: 'ExportZip',
                meta: { title: 'exportZip' }
            }
        ]
    },

    {
        path: '/pdf',
        component: Layout,
        redirect: '/pdf/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/pdf/index.vue'),
                name: 'PDF',
                meta: { title: 'pdf', icon: 'pdf' }
            }
        ]
    },
    {
        path: '/pdf/download',
        component: () => import('@/views/pdf/download.vue'),
        hidden: true
    },

    {
        path: '/theme',
        component: Layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'index',
                component: () => import('@/views/theme/index.vue'),
                name: 'Theme',
                meta: { title: 'theme', icon: 'theme' }
            }
        ]
    },

    {
        path: '/clipboard',
        component: Layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'index',
                component: () => import('@/views/clipboard/index.vue'),
                name: 'ClipboardDemo',
                meta: { title: 'clipboardDemo', icon: 'clipboard' }
            }
        ]
    },

    {
        path: '/i18n',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/i18n-demo/index.vue'),
                name: 'I18n',
                meta: { title: 'i18n', icon: 'international' }
            }
        ]
    },

    /!*{
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://github.com/PanJiaChen/vue-element-admin',
                meta: { title: 'externalLink', icon: 'link' }
            }
        ]
    },*!/
*/
    // { path: '*', redirect: '/404', hidden: true }
]

// routes .unshift(...constantRoutes)
export const router = new VueRouter({
    // ...
    routes:[...constantRoutes,...asyncRoutes],
})

router.beforeEach((to, from, next) => {
    console.log(to)
    const menuStore =  useMenuStore()

    const tagsViewStore =  useTagsViewStore()
    const list = tagsViewStore.menuNames
    console.log()
    if(to.name&&list[to.name]){
        menuStore.setActiveMenuIndex(list[to.name].parentsFuncId)
    }
    if(to.path==='/index'&&list['factoryLayout-home']){
        menuStore.setActiveMenuIndex(list['factoryLayout-home'].parentsFuncId)
    }
    next()
})