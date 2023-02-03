import {MenuTree} from "@/store";

export function getLeftMenu(menu: MenuTree) {
    const _menu = JSON.parse(JSON.stringify(menu)).items
    const _menuName = menu.name
    if(_menu.length){
        for (let i = 0; i < _menu.length; i++) {
            const item = _menu[i]
            if (item.items.length) {
                item.items = item.items.map(v => {
                    v.parentsName = item.parentsName || _menuName;
                    return v
                })
                _menu.push(...item.items)

            } else {

                return  item.path
            }
        }

    }else {
        if(menu.path==='/factorylayout/home'){
            return '/index'
        }
        return  menu.path
    }
}
function createRoutePath(menu: MenuTree &{ parentsName?:string }):string {
    if(menu.url){
        return  menu.url.replace(/\./g,'/').toLowerCase().replace('factorylayout','')
    }
    return  `/${menu.parentsName?menu.parentsName+'/':''}${menu.name}`
}
function createRouteName(menu: MenuTree &{ parentsName?:string }):string {
    if(menu.path){
        const str  = menu.path.replace(/\//g,'-')
        return  str.slice(1)
    }
    return  `${menu.parentsName?menu.parentsName+'-':''}${menu.name}`
}
export function transformMenus (list:MenuTree[]){
    let _menus = JSON.parse(JSON.stringify(list))
    const _len = _menus.length
    for (let i = 0; i < _menus.length; i++) {
        const item = _menus[i]
        if (item.items.length) {
            item.items = item.items.map(v=>{
                v.parentsFuncId = item.parentsFuncId||item.funcId;
                v.parentsName = item.parentsName||item.name;
                return v
            })
            _menus.push(...item.items)
        }else {
            item.path = createRoutePath(item)
        }
    }

    return _menus.splice(0,_len)
}

export function createMenuNamesCollect(menus: MenuTree[]) {
    let _menus = JSON.parse(JSON.stringify(menus))
    let obj = {}
    for (let i = 0; i < _menus.length; i++) {
        const item = _menus[i]
        if (item.items.length) {
            item.items = item.items.map(v=>{
                v.parentsFuncId = item.parentsFuncId||item.funcId;
                v.parentsName = item.parentsName||item.name;
                return v
            })
            _menus.push(...item.items)

        }
        else {
            obj[createRouteName(item)] = {title:item.text,parentsFuncId:item.parentsFuncId||item.funcId,parentsName:item.parentsName}
        }
    }
    console.log(obj)
    return  obj
}