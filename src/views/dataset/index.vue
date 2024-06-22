<template>
  <div>
    <div class="container">
      <div class="item">事件类别<br/>33种</div>
      <div class="item">数据集名称<br/>俄乌战争</div>
      <div class="item">数据量<br/>{{tableData.length}}</div>
    </div>
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
      return this.tableData.slice(pageSize * (val - 1), pageSize * val+1)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-item: center;
  background-color: #ffffff;
  margin: 15px 0;
  border-radius: 4px;
  box-shadow: 0 0 10px #e9e9e9;
}

.item {
  flex: 1;
  height: 80px;
  border-right: 1px solid #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.container > :nth-child(3) {
  border-right: 0;
}
.footer {
  z-index: 500;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  color: #fff;
}
</style>
