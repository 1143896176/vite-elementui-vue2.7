import {defineConfig} from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue2'
import Pages from 'vite-plugin-pages'
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        // https://github.com/hannoeru/vite-plugin-pages
        Pages({
            // dirs: 'src/views',  //default  src/pages
            dirs: [
                { dir: 'src/pages/assets', baseRoute: 'assets' },
                { dir: 'src/pages/running', baseRoute: 'running' },
                // { dir: 'src/pages', baseRoute: 'factoryLayout' },
                // { dir: 'src/admin/pages', baseRoute: 'admin' },
            ],
            exclude: ['**/pageComp/*.vue', '**/pageComp/*.ts'],
        }),

        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
            dts: true,
            dirs: ['./src/composables'],
            vueTemplate: true,
        }),

        // https://github.com/antfu/vite-plugin-components
        Components({
            dts: true,
        }),

        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),],
    resolve: {
        alias: {
            // '~/': `${path.resolve(__dirname, 'src')}/`,
            '@/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 全局引入scss文件, 无需在每个组件中再次手动导入
                // additionalData: '@use "./src/styles/index.scss" as *;'
            }
        }
    },
})
