import { asyncRoutes, constantRoutes } from '@/routers'
import {defineStore} from "pinia";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            // @ts-ignore
            res.push(tmp)
        }
    })

    return res
}


export const usePermissionStore = defineStore('permission', {
    state: ():{} => ({
        routes: [],
        addRoutes: []
    }),
    actions: {
        SET_ROUTES ( routes) {
            this.addRoutes = routes
            this.routes = constantRoutes.concat(routes)
        },
        generateRoutes( roles) {
            return new Promise(resolve => {
                let accessedRoutes
                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                this.SET_ROUTES( accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }
})