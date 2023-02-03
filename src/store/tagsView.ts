import {defineStore} from "pinia";
import {MenuTree} from "@/store/menu";
import {createMenuNamesCollect} from "@/util/menus";

export interface ITag {
    fullPath: string,
    path: string,
    name: string,
    meta: any
}


export const useTagsViewStore = defineStore('tagsView', {
    state: (): { visitedViews: any[], cachedViews: any[], menuNames: { [k in string]: any } } => ({
        visitedViews: [],  // 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存。
        cachedViews: [],
        menuNames: {}
    }),
    actions: {
        addView(view) {
            this.addVisitedView(view)
            this.addCachedView(view)
        },  // 新增当前路由标签
        addVisitedView(view) {
            this.ADD_VISITED_VIEW(view)
        },  // 新增当前路由标签缓存
        addCachedView(view) {
            this.ADD_CACHED_VIEW(view)
        },  // 删除当前路由标签和标签缓存
        delView(view) {
            return new Promise(resolve => {
                this.delVisitedView(view)
                this.delCachedView(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },  // 删除当前路由标签
        delVisitedView(view) {
            return new Promise(resolve => {
                this.DEL_VISITED_VIEW(view)
                resolve([...this.visitedViews])
            })
        },  // 删除当前路由标签缓存
        delCachedView(view) {
            return new Promise(resolve => {
                this.DEL_CACHED_VIEW(view)
                resolve([...this.cachedViews])
            })
        },  // 删除其他路由标签和标签缓存
        delOthersViews(view) {
            return new Promise(resolve => {
                this.delOthersVisitedViews(view)
                this.delOthersCachedViews(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },  // 删除其他路由标签
        delOthersVisitedViews(view) {
            return new Promise(resolve => {
                this.DEL_OTHERS_VISITED_VIEWS(view)
                resolve([...this.visitedViews])
            })
        },  // 删除其他路由标签缓存
        delOthersCachedViews(view) {
            return new Promise(resolve => {
                this.DEL_OTHERS_CACHED_VIEWS(view)
                resolve([...this.cachedViews])
            })
        },  // 删除所有路由标签和标签缓存
        delAllViews(view) {
            return new Promise(resolve => {
                this.delAllVisitedViews(view)
                this.delAllCachedViews(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },  // 删除所有路由标签
        delAllVisitedViews() {
            return new Promise(resolve => {
                this.DEL_ALL_VISITED_VIEWS()
                resolve([...this.visitedViews])
            })
        },  // 删除所有路由标签缓存
        delAllCachedViews() {
            return new Promise(resolve => {
                this.DEL_ALL_CACHED_VIEWS()
                resolve([...this.cachedViews])
            })
        },

        updateVisitedView(view) {
            this.UPDATE_VISITED_VIEW(view)
        },  // 删除右侧路由标签缓存
        delRightTags(view) {
            return new Promise(resolve => {
                this.DEL_RIGHT_VIEWS(view)
                resolve([...this.visitedViews])
            })
        },  // 删除左侧路由标签缓存
        delLeftTags(view) {
            return new Promise(resolve => {
                this.DEL_LEFT_VIEWS(view)
                resolve([...this.visitedViews])
            })
        },
        ADD_VISITED_VIEW(view) {    // 如果标签跳转的路由存在就不添加，否则就添加进标签组
            if (this.visitedViews.some(v => v.path === view.path)) return
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || this.menuNames[view.name].title||'no-name'
                })
            )
        },  // 添加缓存标签
        ADD_CACHED_VIEW(view) {    // 已存在缓存就不缓存了
            if (this.cachedViews.includes(view.name)) return
            if (view.meta && !view.meta.noCache) {
                this.cachedViews.push(view.name)
            }
        },  // 删除选择的标签
        DEL_VISITED_VIEW(view) {
            for (const [i, v] of this.visitedViews.entries()) {
                if (v.path === view.path) {
                    this.visitedViews.splice(i, 1)
                    break
                }
            }
        },  // 删除缓存标签
        DEL_CACHED_VIEW(view) {
            const index = this.cachedViews.indexOf(view.name)
            index > -1 && this.cachedViews.splice(index, 1)
        },  // 删除其它标签
        DEL_OTHERS_VISITED_VIEWS(view) {
            this.visitedViews = this.visitedViews.filter(v => {
                return v.meta.affix || v.path === view.path
            })
        },  // 删除其它缓存标签
        DEL_OTHERS_CACHED_VIEWS(view) {
            const index = this.cachedViews.indexOf(view.name)
            if (index > -1) {
                this.cachedViews = this.cachedViews.slice(index, index + 1)
            } else {
                this.cachedViews = []
            }
        },  // 删除所有标签
        DEL_ALL_VISITED_VIEWS() {    // 过滤出固定的标签，只保留固定标签
            const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
            this.visitedViews = affixTags
        },  // 删除所有缓存标签
        DEL_ALL_CACHED_VIEWS() {
            this.cachedViews = []
        },

        UPDATE_VISITED_VIEW(view) {
            for (let v of this.visitedViews) {
                if (v.path === view.path) {
                    v = Object.assign(v, view)
                    break
                }
            }
        },  // 删除右侧标签
        DEL_RIGHT_VIEWS(view) {
            const index = this.visitedViews.findIndex(v => v.path === view.path)
            if (index === -1) {
                return
            }
            this.visitedViews = this.visitedViews.filter((item, idx) => {
                if (idx <= index || (item.meta && item.meta.affix)) {
                    return true
                }
                const i = this.cachedViews.indexOf(item.name)
                if (i > -1) {
                    this.cachedViews.splice(i, 1)
                }
                return false
            })
        },  // 删除左侧标签
        DEL_LEFT_VIEWS(view) {
            const index = this.visitedViews.findIndex(v => v.path === view.path)
            if (index === -1) {
                return
            }
            this.visitedViews = this.visitedViews.filter((item, idx) => {
                if (idx >= index || (item.meta && item.meta.affix)) {
                    return true
                }
                const i = this.cachedViews.indexOf(item.name)
                if (i > -1) {
                    this.cachedViews.splice(i, 1)
                }
                return false
            })
        },


        //将 菜单 扁平化

        setMenuNames(menus: MenuTree[]) {
            this.menuNames = createMenuNamesCollect(menus)
        }

    }
})
