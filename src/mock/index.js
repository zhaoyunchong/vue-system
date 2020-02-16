import Mock from 'mockjs'
import home from './home'
import userApi from './user'
import permissionApi from './permission'
// 设置200-2000请求延时  毫秒
// Mock.setup({
//   timeout: '200-2000'
// })
// 首页相关
// 拦截的是   /home/getData
Mock.mock(/\/home\/getData/, 'get', home.getHomeData)
// 用户相关的
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', home.getHomeData)

// 权限相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
