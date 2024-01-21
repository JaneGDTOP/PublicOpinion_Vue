import Cookie from "js-cookie"

const state = {
  isCollapse: false, // 控制菜单的折叠与展开
  // 转换列表的数据 面包屑的内容不能重复
  tabsList: [
    {
      // 初始化数据
      path: '/',
      name: 'home',
      label: '首页',
      icon: 's-home',
      url: 'Home/Home' // 为什么是这个呢
    }
  ],
  // 初始状态的数据形式
  menu : []
}

const mutations ={
  // 修改state的函数
  COLLAPSE_MENU(state){
    state.isCollapse = !state.isCollapse
  },
  // 修改tabslist
  UPDATETABSLIST(state, val) {
    // 判断点击的是否已经在数组中存在 存在返回索引 不存在返货-1
    const index = state.tabsList.findIndex(item => item.name === val.name)
    // 如果不存在
    if (index === -1) {
      state.tabsList.push(val)
    }
  },
  // 删除tag的mutation
  DELETETAG(state, tag) {
    state.tabsList = state.tabsList.filter( item => item.name !== tag.name)
  },
  // 修改state状态的mutation 参数状态 载荷
  DEALMENU(state, menu) {
    // 提交的时候 把menu放到了store当中 但是同时也放入到cookie当中去了
    state.menu = menu
  }
}

const actions = {
  // 可以提交mutations 可以包含任意的异步操作
  collapse_menu({commit}) {
    commit('COLLAPSE_MENU')
  },
  // 更改tabsList的action
  unpdateTabslist({commit}, item) {
    if (item.name !== 'home'){
      commit('UPDATETABSLIST', item)
    } 
  },
  // 删除tabsList
  deleteTab({commit}, tag) {
    commit('DELETETAG', tag)
  },
  // 一个action 处理异步操作 来改变mutation 上下文对象context
  dealMenu({commit}, menu) {
    //将menu动态传到store里面 异步操作 或者是改变state前 需要做的操作
    //将menu永久化存储 一个是本地存储 另一个是cookie 最好不用cookie
    //cookie只能存储字符串类型  如果是存储对象类型 就要将对象类型转换为字符串类型
    //进行序列化
    Cookie.set('menu', JSON.stringify(menu));
    commit('DEALMENU', menu)
  },
  //动态添加路由 点击登录的时候 注册了路由 但是并不是持久化 怎么解决
  addMenu({commit}, router) {
    // 这里不输出 eslint校验会报错
    console.log(commit)
    //先判断cookie中是否有menu 如果没有 就不添加路由
    if (!Cookie.get('menu')) return;
    const menu = JSON.parse(Cookie.get('menu'))
    //如果有路由信息 就动态添加路由
    //我觉得这一步多余
    //组装动态路由的数据
    const menuArray = []
    
    menu.forEach( item => {
      //判断每一个路由 是否有子路由
      if (item.children) {
        //有子路由 跟每一个子路由动态添加 map返回一个新数组
        item.children = item.children.map( route => {
          route.component = () => import(`../views/${route.url}`)
          return route
        })
        //给有子路由的动态添加好了 但是一级路由没有配置呢
        menuArray.push(...item.children)
      } else {
        item.component = () => import(`../views/${item.url}`)
        menuArray.push(item)
      }
    })
    //路由的动态添加
    menuArray.forEach(item => {
      router.addRoute('Main',item)
    });

    console.log(menuArray)
    console.log(router.options.routes)
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}