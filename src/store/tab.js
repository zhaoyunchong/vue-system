import Cookie from 'js-cookie'
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
    setMenu(state, val) {
      Cookie.set('menu', val)
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      console.log(menu)
      if (!menu) return

      let currentMenu = [
        {
          path: '/',
          component: () => import('@/views/Main'),
          children: []
        }
      ]
      state.menu = menu
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      console.log(currentMenu, 'cur')
      router.addRoutes(currentMenu)
    },
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
