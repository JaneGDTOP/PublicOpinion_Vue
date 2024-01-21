<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu"></el-button>
      <!-- 面包屑 先完成面包屑的样式-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="tab in tabsList" :key="tab.path" :to="{ path: tab.path }" >{{ tab.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            <img class='userImg' src='@/assets/images/user.png'/>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: 'CommonHeader',
  computed: {
    ...mapState({
      tabsList: state => state.tab.tabsList,
    }) 
  },
  methods: {
    handleMenu () {
      //控制折叠与展开 分发一个action
      this.$store.dispatch('collapse_menu')
    },
    //退出函数 
    handleCommand (command) {
      //要将cookies中存储的token删除掉
      //这里command是一个标识
      //这里退出会有一个bug 就是cookie里面存储的跟用户相关的所有东西是否都要删除 不然就暴露了
      //清除所有的cookie
      if (command === 'logout') {
        Cookie.remove('token')
        //删除之后 要返回登录界面 重新登录
        //同时清除menu
        Cookie.remove('menu')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header-container{
  background-color: #333;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between; //水平方向如何对齐
  align-items: center; //交叉轴方向 如何对齐
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 16px;
  }
  .r-content {
    .userImg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff
        }
      }
    }
  }
}
</style>