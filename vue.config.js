const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true, // 关闭eslint的校验
  // 可以在这里配置跨域proxy 查看官网配置 同时也可以用cors
  devServer:{
    host: 'localhost',
    port: 8082,
    proxy: {
      '/api':{
        target:'http://127.0.0.1:5001',
        changeOrigin: true,
        // pathRewrite:{'^/api':''}
      },
    }
  },
});
