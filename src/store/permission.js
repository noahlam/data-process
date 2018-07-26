/**
 *  权限管理
 */
import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissionList  要展示的菜单（第三级的菜单menuId）数组
 */
function filterAsyncRouter (asyncRouterMap, permissionList) {
  const ShowAccessedRouters = []
  asyncRouterMap.map(firstMenu => {
    let secondChild = []
    firstMenu.children.map(secondMenu => {
      let thirdChild = []
      secondMenu.children.map(thirdMenu => {
        permissionList.map(menuId => {
          if (menuId === thirdMenu.meta.menuId) {
            thirdChild.push(thirdMenu)
          }
        })
      })
      if (thirdChild.length) {
        let secondMenuCopy = {
          children: thirdChild,
          redirect: `${firstMenu.path}/${secondMenu.path}/${thirdChild[0].path}`
        }
        secondMenuCopy = Object.assign({}, secondMenu, secondMenuCopy)
        secondChild.push(secondMenuCopy)
      }
      if (!secondMenu.children || !secondMenu.children.length) {
        permissionList.map(menuId => {
          if (menuId === secondMenu.meta.menuId) {
            secondChild.push(secondMenu)
          }
        })
      }
    })
    if (secondChild.length) {
      let firstMenuCopy = {
        children: secondChild
      }
      firstMenuCopy = Object.assign({}, firstMenu, firstMenuCopy)
      ShowAccessedRouters.push(firstMenuCopy)
    }
    if (!firstMenu.children || !firstMenu.children.length) {
      permissionList.map(menuId => {
        if (menuId === firstMenu.meta.menuId) {
          ShowAccessedRouters.push(firstMenu)
        }
      })
    }
  })
  return ShowAccessedRouters
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      const { roles, menuList } = data
      let accessedRouters = []
      if (roles.indexOf('系统管理员') > -1) {
        accessedRouters = asyncRouterMap
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, menuList)
      }
      commit('SET_ROUTERS', accessedRouters)
    }
  },
  getters: {
    addRouters: state => state.addRouters
  }
}

export default permission
