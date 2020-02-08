export default {
  state: {
    menu: [],
    isCollapse: false,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        label: '首页',
        name: 'home',
        icon: 's-home'
      }
    ]
  },
  mutations: {
    selectMenu(state, value) {
      if (value.name != 'home') {
        state.currentMenu = value
        let result = state.tabsList.findIndex(item => item.name == value.name)
        result == -1 ? state.tabsList.push(value) : ''
      } else {
        state.currentMenu = ''
      }
      // state.currentMenu = value.name == 'home' ? null : value
    },
    closeTab(state, value) {
      let result = state.tabsList.findIndex(item => item.name == value.name)
      state.tabsList.splice(result, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
