<template>
  <div class="container">
    <!-- <div class="top">
      <el-card class="dataset">
        <div class="text item">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="data" label="Data" width="860">
            </el-table-column>
            <el-table-column prop="name" label="Owner" width="180">
            </el-table-column>
            <el-table-column prop="date" label="开始时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div> -->
    <div class="eventcontainer">
      <div class="event">
        <div class="left-half">
          <el-card class="box-card1">
            <span class="text1">样本信息</span><br />
            <span class="text">文本</span>
            <div>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
              <span class="text">图片</span>
              <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-button type="primary" plain @click="send" class="button">发送</el-button>
            </div>
          </el-card>
          <div>
            <el-card class="box-card1">
              <span class="text1">触发词信息</span>

            </el-card>
          </div>
        </div>
        <div class="right-half">
          <el-card class="box-card1">
            <span class="text1">论元信息</span>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column>
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="触发词">
                      <span>obama, Michelle</span>
                    </el-form-item>
                    <el-form-item label="角色分类">
                      <span>spouse</span>
                    </el-form-item>
                    <el-form-item label="角色描述">
                      life在该事件类创中的含义
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'
//   import { sendText } from '@/api'
  const Fpath = 'http://127.0.0.1:5000'
  export default {
    name: 'my-extraction',
    data () {
      return {
        tableData: [{
          data: 'On October 3,1992,0bama and Michelle got married at the Trinity United Christian Church',
          name: '王小虎',
          date: '2016-05-02'
        }],
        input: '',
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      }
    },
    methods: {
      send () {
        axios.post(Fpath + '/send', { text: this.input, image: this.fileList[0].url })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.error(error)
          })
    //   sendText({ text: this.input, image: this.fileList[0].url }).then(({ data }) => {
    //       console.log(data)
    //     })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      }
    }
  }
</script>

<style>
  .text1 {
    font-size: 16px;
  }

  .text {
    font-size: 14px;
  }

  .button {
    margin-right: 10px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card1 {
    margin-bottom: 10px;
    padding: 20px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .top {
    height: 230px;
  }

  .eventcontainer {
    flex: 1;
  }

  .event {
    display: flex;
  }

  .left-half {
    width: 550px;
    margin-right: 10px;
  }

  .right-half {
    flex: 1;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>