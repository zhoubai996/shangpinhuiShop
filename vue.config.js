// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
//跨域问题解决
module.exports = {
  devServer: {
    proxy: {
      //请求路径中带有api，则代理服务器发挥作用
      '/api': {
        target: 'http://39.98.123.211',
      },
    },
  },
}