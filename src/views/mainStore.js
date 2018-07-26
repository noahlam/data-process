const MainStore = {
  state: {
    menuInfo: { // 菜单的所有信息
      currentFirstMenu: 0, // 当前选中的一级带单
      currentThirdMenu: '0-0' // 当前选中的三级菜单
    }
  },
  mutations: {
    SET_CURRENTMENU (state, index) {
      state.menuInfo.currentFirstMenu = Number(index)
    },
    SET_CURRENTTHIRDMENU (state) {
      state.menuInfo.currentThirdMenu = String('0-0')
    }
  },
  actions: {
    SetFirstMenu ({commit}, index) {
      commit('SET_CURRENTMENU', index)
      commit('SET_CURRENTTHIRDMENU')
    }
  },
  getters: {
    currentFirstMenu: state => state.menuInfo.currentFirstMenu,
    menuInfo: state => state.menuInfo
  }
}

export default MainStore
