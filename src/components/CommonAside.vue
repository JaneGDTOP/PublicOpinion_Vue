<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
         <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template v-slot:title>
          <i :class="`el-icon-${item.icon}`"></i>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group  v-for="subItem in item.children" :key="subItem.name" >
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'CommonAside',
  data () {
    return {
      // 初始空数据
    }
  },
  // 计算属性
  computed: {
    // 通常store里面的数据 直接写比较复杂 所以用mapState计算一下
    // 有两种传递方式 一个是对象  一个是数组前提是命名方式是一样的
    // 函数的返回值 返回一个对象
    // ...mapState(['menu'])
    menuData () {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    // 根据children属性来分开是否有二级菜单
    // 无二级菜单
    noChildren () {
      return this.menuData.filter(item => !item.children)
    },
    // 有二级菜单
    hasChildren () {
      return this.menuData.filter(item => item.children)
    },
    // 是否折叠
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  },
  methods: {
    mounted () {
      console.log(this.menuData)
    },
    handleOpen () {
      // console.log(key, keyPath)
    },
    handleClose () {
      // console.log(key, keyPath)
    },
    // 点击导航 显示对应页面 item是路由的信息 编程式导航
    clickMenu (item) {
      // 当页面的路由与跳转的路由不一致的时候才允许跳转 $route是当前路由
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        // 可以传如字符串 也可以传入对象 也可以命名路由name属性 params和query参数 对象形式的参数支持name属性  path需要在路径后面拼接
        this.$router.push(item.path)
      }
      // console.log(item)
      // 可以获得点击的路由 跳转的时候 派发一个action 同时传过去一个载荷
      this.$store.dispatch('unpdateTabslist', item)
    }
  }
}
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
