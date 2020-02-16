import axios from 'axios'
// 创建一个axios实例
const service = axios.create({
  // 请求超时事件
  timeout: 3000
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)
// 响应的拦截器
service.interceptors.response.use(
  response => {
    let res = {}
    // if(response.status==200)  判断状态吗
    res.status = response.status
    res.data = response.data
    return res
  },
  err => {
    console.log(err)
  }
)
export default service
