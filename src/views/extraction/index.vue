<template>
  <div class="container">
    <div class="top">
      <el-card class="dataset">
        <div style="display: flex; align-items: center">
          <div class="rounded-box">
            <span>Data</span>
          </div>
          <el-input
            v-model="input"
            placeholder="请输入事件的文本"
            style="width: 500px"
          ></el-input>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            style="margin-left: 40px"
          >
            <el-button type="primary" style="height: 40px">上传图片</el-button>
          </el-upload>
          <el-button type="primary" style="height: 40px; margin-left: 40px"
            >开始抽取</el-button
          >
        </div>
        <!-- <el-divider style="height: 30px;"></el-divider> -->
      </el-card>
    </div>
    <div class="event-container">
      <div class="event">
        <div class="left-half" style="margin-right: 20px">
          <div>
            <el-card class="box-card1">
              <span class="text1">样本信息</span>
              <el-divider></el-divider>
              <div>
                <!-- <el-divider></el-divider> -->
                <div>
                  <span class="text" style="font-size: 16px">文本</span>
                  <span
                    class="text"
                    style="margin-left: 20px; color: #99a9bf"
                    >{{ input }}</span
                  ><br />
                </div>
                <div style="margin-top: 18px">
                  <span
                    class="text"
                    style="font-size: 16px; vertical-align: middle"
                    >图片</span
                  >
                  <el-image
                    style="
                      width: 80px;
                      height: 80px;
                      margin-left: 20px;
                      vertical-align: middle;
                    "
                    :src="url"
                    :fit="fit"
                  ></el-image>
                  <el-image
                    style="
                      width: 80px;
                      height: 80px;
                      margin-left: 20px;
                      vertical-align: middle;
                    "
                    :src="url"
                    :fit="fit"
                  ></el-image>
                  <el-image
                    style="
                      width: 80px;
                      height: 80px;
                      margin-left: 20px;
                      vertical-align: middle;
                    "
                    :src="url"
                    :fit="fit"
                  ></el-image>
                </div>
              </div>
            </el-card>
          </div>

          <div style="margin-top: 20px; height: 400px">
            <el-card class="box-card1">
              <span class="text1">触发词信息</span>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <el-form-item label="触发词">
                      <span>conference</span>
                    </el-form-item>
                    <el-form-item label="事件类型">
                      <span>Contact:Meet</span>
                    </el-form-item>
                    <el-form-item
                      label="事件类型描述"
                      style="white-space: nowrap"
                    >
                      <span>it occurs when two or more people interact</span>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
        <div class="right-half">
          <el-card class="box-card1">
            <span class="text1">论元信息</span>
            <el-divider></el-divider>
            <div style="width: 100%">
              <div>
                <el-row>
                  <el-col :span="24">
                    <el-form
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item label="论元1">
                        <span>New York</span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>Place</span>
                      </el-form-item>
                      <el-form-item label="角色描述">
                        <span>[Participant] met face-to-face at [Place]</span>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
              <div style="margin-top: 20px">
                <el-row>
                  <el-col :span="24">
                    <el-form
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item label="论元2">
                        <span>Hassan Rouhani</span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>Entity</span>
                      </el-form-item>
                      <el-form-item label="角色描述">
                        <span>[Participant] met face-to-face at [Place]</span>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
              <div style="margin-top: 59px"></div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//   import { sendText } from '@/api'
const Fpath = 'http://127.0.0.1:5000';
export default {
  name: 'my-extraction',
  data() {
    return {
      tableData: [
        {
          data: 'On October 3,1992,0bama and Michelle got married at the Trinity United Christian Church',
          name: '王小虎',
          date: '2016-05-02',
        },
      ],
      input: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    };
  },
  methods: {
    send() {
      axios
        .post(Fpath + '/send', {
          text: this.input,
          image: this.fileList[0].url,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      //   sendText({ text: this.input, image: this.fileList[0].url }).then(({ data }) => {
      //       console.log(data)
      //     })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
.rounded-box {
  height: 40px;
  width: 40px;
  background-color: #409eff;
  margin-right: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rounded-box span {
  font-size: 16px;
  color: white;
}

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
  height: 100px;
}

.event-container {
  flex: 1;
}

.event {
  display: flex;
}

.left-half {
  width: 500px;
  margin-right: 10px;
}

.right-half {
  flex: 1;
  top: 0;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 70px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
</style>
