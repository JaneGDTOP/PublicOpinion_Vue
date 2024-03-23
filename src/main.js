import Vue from 'vue'
// 1.全局引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 1.引入router
import router from './router'
// 引入vuex
import store from './store'
import App from './App.vue'
import '@/api/mock'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
// 使用element的插件
Vue.use(ElementUI)
// 在vue的实例上挂载router路由
new Vue({
  router,
  store,
  created () {
    // 生命周期钩子函数
    // 调用那个action函数 问题1 并没有涉及state的更改 如果是普通函数会怎么样？怎么样调用，
    store.dispatch('addMenu', router)
  },
  render: h => h(App)
}).$mount('#app')
