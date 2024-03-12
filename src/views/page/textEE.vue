<template>
  <div>
    <h1>单模态事件抽取</h1>
    <el-input type="textarea" placeholder="请输入你想要抽取的句子。/Please input your sentences." v-model="textarea" maxlength="512"
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
// const Fpath = 'http://127.0.0.1:5000'

export default {
  data () {
    return {
      textarea:
        "蒙牛表示,他们将以每股12.65澳元收购贝拉米全部的股份,且收购理由为市场需求增长。",
      //   textarea: "",
      options: [
        {
          value: "选项1",
          label: "ZN/Chinese",
        },
        {
          value: "选项2",
          label: "EN/English",
        },
      ],
      value: "",
      jsonData: "",
      isExtractStatus: false,
    };
  },
  methods: {
    startExtract () {
      this.isExtractStatus = true;
      setTimeout(() => {
        this.isExtractStatus = false;
        sendEvent({ text: this.textarea }).then(({ data }) => {
          console.log("success")
          console.log(data)
        })
        const result =
          '{ "id": "1d2a00db869d2cea239113f77dfc4482", "content": "蒙牛表示,他们将以每股12.65澳元收购贝拉米全部的股份,且收购理由为市场需求增长。", "events": [{ "type": "投资", "trigger": { "span": [18, 20], "word": "收购" }, "args": { "sub": [{ "span": [0, 2], "word": "蒙牛" }], "obj": [{ "span": [20, 23], "word": "贝拉米" }] } }, { "type": "股份股权转让", "trigger": { "span": [18, 20], "word": "收购" }, "args": { "proportion": [{ "span": [23, 25], "word": "全部" }], "obj-org": [{ "span": [0, 2], "word": "蒙牛" }], "collateral": [{ "span": [26, 28], "word": "股份" }], "target-company": [{ "span": [20, 23], "word": "贝拉米" }] } }] }';
        this.jsonData = JSON.parse(result);
      }, 2000);
    },
  },
};
</script>
<style>
.eeBtn {
  margin: 20px;
}
</style>
