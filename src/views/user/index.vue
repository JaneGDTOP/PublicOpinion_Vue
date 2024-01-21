<template>
  <div class='manage'>
    <!-- 新增按钮 -->
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
    </div>
    <!-- title:对话框的名字
        visible：是否显示对话框
        before-close：关闭前的回调，会暂停 Dialog 的关闭 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <!-- 对话框里面的内容 -->
        <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
                v-model="form.birth"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 用户信息表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
        </el-table-column>
         <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
  </div>
</template>

<script>
export default {
  name: 'my-user',
  data (){
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
            { required: true, message: '请输入性别', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur'}
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur'}
        ],
        birth: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        addr: [
          {required: true, message: '请输入地址', trigger: 'blur' },
        ]
      },
      tableData: [],
      modalStatus: 0,
    }
  },
  methods: {
    // 关闭对话框之前的操作
    handleClose (){
      // 在关闭之前要清空表单数据
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 提交表单的函数
    submit (){
      // 选中表单
      this.$refs.form.validate( (valid) => {
        if (valid) {
          if (this.modalStatus === 0) {
            // false表示是新增 调用新增接口
            // 派发新增action
            this.$store.dispatch('create', this.form).then(() => {
                //然后重新渲染表格
              this.getData()
            });
            
          }else {
            // true表示是编辑 调用修改的接口
            // 然后重新渲染表格
            this.$store.dispatch('edit', this.form).then(() => {
              //重新渲染表格
              console.log('有问题')
              this.getData()
            })
          }
          // 关闭弹窗
          this.dialogVisible = false
          // 关闭之后也要清除表单数据
          // this.$refs.form.resetFields();
        } else {
          return false
        }
      })
    },
    // 获取服务器列表里面的数据
    getData () {
      this.$store.dispatch('getUserList')
      this.tableData = this.$store.state.user.userData
    },
    // 新增的按钮
    handleAdd () {
       // 更改模式 看是新增还是修改 显示对话框
       this.dialogVisible = true
       // 同时修改modalStatus
       this.modalStatus = 0
    },
    // 编辑列表 index是索引 row是这一行的内容
    handleEdit (index, row) {
      this.modalStatus = 1
      this.dialogVisible = true
      // 注意需要对当前行数据进行深拷贝 否则会出错 因为共享同一个对象 会直接修改
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 删除这一条记录
    handleDelete () {
    }
  },
  // 挂载的时候发送ajax请求 来请求数据
  mounted () {
    // 派发一个action
    this.getData()
  },
}
</script>

<style>

</style>