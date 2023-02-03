import {defineStore} from 'pinia'

export class MenuTree {
    name: string
    text: string
    url?: string
    funcId: string
    path?:string
    items: Array<MenuTree>
}

interface IMenuStore {
    isCollapse: boolean
    menuList: MenuTree[]
    activeMenuList: MenuTree | any
    activeMenuIndex: string
}

export const useMenuStore = defineStore('menu', {
    state: (): IMenuStore => ({
        isCollapse: false,
        menuList: [],
        activeMenuList: {},
        activeMenuIndex: ''
    }),
    actions: {
        setIsCollapse(status: boolean) {
            this.isCollapse = status
        },
        setMenuList(menuList: MenuTree[]) {
            console.log(menuList.length)
            this.menuList = menuList
        },
        setActiveMenuList(menuList: MenuTree) {
            console.log(menuList)
            this.activeMenuList = menuList
        },
        setActiveMenuIndex(index) {
            this.activeMenuIndex = index
        }
    }
})
