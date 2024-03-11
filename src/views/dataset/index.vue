<template>
  <div>
    <el-table
      :data="tableData1"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="content"
        label="文本"
        :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
    <el-card class="footer" v-if="this.tableData.length > 0">
      <!-- 分页插件 -->
      <div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="totalPage.pageNum"
          :page-size="totalPage.pageSize"
          layout="total, prev, pager, next"
          :total="this.tableData.length"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDataList } from '../../utils/interface'
export default {
  name: 'myDataset',
  data () {
    return {
      tableData1: [],
      tableData: [],
      totalPage: {
        pageNum: 1,
        pageSize: 12
      }
    }
  },
  created () {
    getDataList().then((response) => {
      if (response.status === 200) {
        this.tableData = response.data.message
        this.tableData1 = this.getPageData(1, this.totalPage.pageSize)
      }
    }, () => {
      console.log('失败了')
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.tableData1 = this.getPageData(val, this.totalPage.pageSize)
    },
    // 前端简单实现分页 固定死
    getPageData (val, pageSize) {
      // 输入当前页数
      return this.tableData.slice(pageSize * (val - 1), pageSize * val)
    }
  }
}
</script>

<style scoped>
.footer {
  z-index: 500;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  color: #fff;
}
</style>
