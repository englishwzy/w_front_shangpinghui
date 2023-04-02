const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包上线不需要map文件
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    hot: false,
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  }

})
