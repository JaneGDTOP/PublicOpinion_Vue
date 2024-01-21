<template>
  <div>
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.path"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="skipRouter(tag)"
      @close="handleClose(tag, index)">
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'CommonTag',
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
    }),
  },
  methods: {
    // 点击tag可以跳转路由
    skipRouter (tag) {
      this.$router.push({name: tag.name})
    },
    // 点击删除 tag删除 同时页面自动向前补齐
    handleClose (tag, index) {
      // tabsList要将这个tag的信息删除 所有我们需要知道对应的索引 因为这里是修改state的数据
      // 所以我们要通过store三连环来修改state
      // tag是否为最后一个 处理的逻辑不一样
      this.$store.dispatch( 'deleteTab', tag)
      const length = this.tags.length // 数组中最后一个值的索引
      // 如果当前点击的item不是当前的路由界面
      if (tag.name !== this.$route.name) {
        // 就直接删除就好了
        return
      }

      // 如果当前点击的最后一个tag  
      if (length === index) {
        // 最后一个删除之后 要跳转到最后一个
        this.$router.push({name: this.tags[index-1].name})
      }else {
        // 如果删除的不是最后一个 删除之后就要跳到后面一个上
        this.$router.push({name: this.tags[index].name});
      }
    }
  }
}
</script>

<style>

</style>