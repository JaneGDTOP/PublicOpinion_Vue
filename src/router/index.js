// 重复点击同一个路由会报错 虽说不会影响功能
// 要对路由原型方法进行改写 这样就不会报错了
import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
// 引入路由信息
import routes from './route'

Vue.use(VueRouter)

// 重写路由方法 这里是解决重复点击路由不能跳转的问题， 但是vuerouter 有个新属性:router可以直接index跳转
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push|replace
// arg1：告诉原来push方法，往哪里跳转，需要传递哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // 这样的话调用原来的push方法
    originReplace.call(this, location, resolve, reject)
  } else {
    // 因为保存的时候 在window里面 所以要改变this指向 这里相当于 修改了一下原方法
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 3.创建路由实例并传递routes配置
const router = new VueRouter({
  routes // `routes: routes` 的缩写
})

// 全局前置导航守卫 在进入之前判断是否登录
router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = Cookies.get('token')
  // 判断结果token不存在 就是没有登录 应该跳转登录页面
  // 但是刚开始未登录且在登录页面的时候 就会陷入死循环
  if (!token && to.name !== 'login') {
    // 说明没有登录 返回登录页面
    next({name : 'login'})
  } else if (token && to.name === 'login') {
    // token存在 说明已经登录 此时跳转首页  不能再登录 需要退出登录 才能重新登录
    next({name : 'home'})
  } else {
    next()
  }
})

// 配置路由
export default router
