<template>
  <div>
    <h1>单模态事件抽取</h1>
    <el-input type="textarea" placeholder="请输入你想要抽取的句子。/Please input your sentences." v-model="textarea" maxlength="256"
      show-word-limit>
    </el-input>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-button class="eeBtn" type="primary" :loading="isExtractStatus" @click="startExtract">开始抽取</el-button>
    <json-viewer :value="jsonData" :expand-depth="5" copyable boxed sort></json-viewer>
  </div>
</template>

<script>
import Vue from "vue";
import JsonViewer from "vue-json-viewer";
// import axios from 'axios'
import { sendEvent } from '../../utils/interface'

Vue.use(JsonViewer);

export default {
  data () {
    return {
      textarea:
        "蒙牛表示,他们将以每股12.65澳元收购贝拉米全部的股份,且收购理由为市场需求增长。",
      //   textarea: "",
      options: [
        {
          value: "chinese",
          label: "ZN/Chinese",
        },
        {
          value: "english",
          label: "EN/English",
        },
      ],
      value: "chinese",
      jsonData: "",
      isExtractStatus: false,
    };
  },
  methods: {
    startExtract () {
      this.isExtractStatus = true;
      sendEvent({ text: this.textarea, language: this.value }).then(({ data }) => {
        console.log(data)
        console.log(data.result)
        this.isExtractStatus = false;
        this.jsonData = data.result
      })
    },
  },
};
</script>
<style scoped>
.eeBtn {
  margin: 20px;
}
</style>
