// 注意  vue.config.js文件修改的话 一定要重启服务器才生效
module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";` //引入全局变量
      },
      scss: {
        prependData: `@import "@/assets/scss/_variable.scss";` //引入全局变量
      }
    }
  }
}
