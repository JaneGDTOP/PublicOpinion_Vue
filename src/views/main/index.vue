<template>
<!-- Main 主要的布局 -->
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <el-main>
          <!-- tag标签 -->
          <CommonTag/>
          <!-- Main组件 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader'
import CommonTag from '@/components/CommonTag.vue'

export default {
  name: 'my-main',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }

}
</script>

<style lang='less' scoped>
.el-header {
  padding: 0;
}
</style>
