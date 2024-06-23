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
            action
            :http-request="uploadImage"
            :limit="3"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :show-file-list="false"
            :file-list="fileList"
            style="margin-left: 40px"
          >
            <el-button type="primary" style="height: 40px">上传图片</el-button>
          </el-upload>
          <el-button type="primary" style="height: 40px; margin-left: 40px" @click="send"
            >开始抽取</el-button>
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
                <img
                v-for="file in fileList"
                :key="file.name"
                style="
                  width: 80px;
                  height: 80px;
                  margin-left: 20px;
                  vertical-align: middle;
                "
                :src="file.url"
                :alt="file.name"
              />
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
                      <span>{{position}}</span>
                    </el-form-item>
                    <el-form-item label="事件类型">
                      <span>{{ content }}</span>
                    </el-form-item>
                    <!-- <el-form-item
                      label="事件类型描述"
                      style="white-space: nowrap"
                    >
                      <span>it occurs when two or more people interact</span>
                    </el-form-item> -->
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
                        <span>{{ arguments_list[0] }}</span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>{{ roles[0] }}</span>
                      </el-form-item>
                      <el-form-item v-if="roles.length > 0" label="角色描述">
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
                        <span>{{ arguments_list[1] }}</span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>{{ roles[1] }}</span>
                      </el-form-item>
                      <el-form-item  v-if="roles.length > 0" label="角色描述">
                        <span>[Participant] met face-to-face at [Place]</span>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
              <div style="margin-top: 59px"></div>
            </div>
            <!-- <div v-if = "arguments.length > 0" style="width: 100%">
              <div v-for="(arg, index) in arguments" :key="index" style="margin-top: 20px">
                <el-row>
                  <el-col :span="24">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="论元">
                        <span v-text="arg"></span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>{{ roles[index] }}</span>
                      </el-form-item>
                      <el-form-item label="角色描述">
                        <span>[Participant] met face-to-face at [Place]</span>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
            </div> -->
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//   import { sendText } from '@/api'
import { upload } from '@/utils/interface'
import { sendMultiData } from '@/utils/interface'
// const Fpath = 'http://127.0.0.1:5000';
export default {
  name: 'my-extraction',
  data() {
    return {
      input: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      fileList: [],
      ImageList:[],
      position: 0,
      content: '',
      arguments_list: [],
      roles: [],
    };
  },
  methods: {
    send() {
        console.log("input",this.input)
        console.log("ImageList",this.ImageList)
        sendMultiData ({ text: this.input, image: this.ImageList }).then(({ data }) => {
            
            // const { code, message, non_O_content, results} = data;
            // console.log('res', res)
            console.log('Response data:', data);
            // [this.position, this.content] = data.non_O_content[0];
            const eventType_list = data.data.non_O_content
            console.log('event_type', eventType_list)
            // [this.position, this.content] = eventType_list[0]
            const event_type = eventType_list[0]
            this.position = event_type[0]
            this.content = event_type[1]
            // console.log('this.position', this.position)
            console.log("Positions:", this.position);
            // 使用正则表达式匹配单词
            const wordRegex = /\b\w+\b/g;
            const words = this.input.match(wordRegex);
            
            // 根据位置查找对应的单词
            this.position = words[this.position - 1];

            // const [positions, contents] = data.non_O_content[0];
            console.log("Positions:", this.position);
            console.log("Contents:", this.content);

            let argument_list = data.data.arguments_list
            argument_list = argument_list[0]
            argument_list = JSON.parse(argument_list.replace(/'/g, "\""))
            
            this.arguments_list = argument_list
            console.log('argument_list', this.arguments)
            let roles_list = data.data.roles_list
            roles_list = roles_list[0]
            roles_list = JSON.parse(roles_list.replace(/'/g, "\""))
            
            this.roles = roles_list
            console.log('roles_list', this.roles)
        })
    },
    uploadImage(obj) {
      const formData = new FormData();
      formData.append('image', obj.file); // 将图片文件添加到 FormData
      this.ImageList.push(obj.file.name);
      console.log("ImageList", this.ImageList)
      console.log("obj.file:", obj.file);
      console.log([...formData]); // 将 FormData 转换为数组以查看内容
      upload(formData).then(({ data }) => {
        this.fileList.push({ name: data.name, url: data.dataURL })
        console.log("fileList",this.fileList)
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
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
