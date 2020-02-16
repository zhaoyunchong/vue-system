import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/config'
// 第三方包
import ElementUI from 'element-ui'
import '@/mock'
Vue.use(ElementUI)
Vue.prototype.$http = http
// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  let token = store.state.user.token
  if (!token & (to.name !== 'login')) {
    next({ name: 'login' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
