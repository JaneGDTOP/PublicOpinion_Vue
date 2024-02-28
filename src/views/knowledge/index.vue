<template>
  <div>
        <!-- <h1>知识图谱模块</h1> -->
    <!-- <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="知识图谱检索" name="second"> -->
          <Display />
        <!-- </el-tab-pane>
      </el-tabs>
    </el-card> -->
  </div>
</template>

<!-- <script src="https://rawgit.com/neo4j-contrib/neovis.js/master/dist/neovis.js"></script> -->
<script>
import Display from './knowledge-display'
export default {
  components: {
    Display
  },
  data () {
    return {
      activeName: 'qv'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 95%;
}
</style>
