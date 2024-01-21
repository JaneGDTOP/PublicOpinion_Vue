import Main from '@/views/main'
import Login from '@/views/login'
// 2.定义一些路由规则
// 每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    component: Main,
    // 重定向 可以设置默认路径 也就是将根路径重定向到/home的路径下
    // 主路由的名字
    name: 'Main',
    redirect: '/home',
    children: [
      // 后端接口根据权限进入不同导航页面 mock接口返回
      //     {
      //       path: 'home',
      //       name: 'home',
      //       component: Home,
      //     },
      //     {
      //       path: 'user',
      //       name: 'user',
      //       component: User,
      //     },
      //     {
      //       path: 'mall',
      //       name: 'mall',
      //       component: Mall
      //     },
      //     {
      //       path: 'page1',
      //       name: 'page1',
      //       component: PageOne
      //     },
      //     {
      //       path: 'page2',
      //       name: 'page2',
      //       component: PageTwo
      //     }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default routes
