<template>
  <div>
    <el-container>
      <div class="t2i-container">
        <div class="search-container">
          <div class="search">
            <el-input v-model="input" placeholder="请输入搜索内容" maxlength="20"
              style="width:350px;margin-right:10px;"></el-input>
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </div>
        <div>
          <el-row v-if="result.length > 0" :style="{ 'margin-top': '20px' }">
            <el-col :span="8" v-for="(item, index) in result" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <div class="image-container">
                  <img :src="'/' + item.filePath" class="image">
                  <!-- <span style="font-weight: 700">图片名称：</span> -->
                  <!-- <br> -->
                  <div class="text-container">
                    <span class="text">相似度：{{ item.value }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <!-- 其余的模板代码 -->
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import { searchPicture } from '@/utils/interface'
export default {
  data() {
    return {
      input: '',
      result: []
    };
  },
  methods: {
    search() {
      if (this.input === '') {
        alert('请输入搜索内容');
        return;
      }
      if (this.result) this.result = []; // 添加此行创建空数组
      var vm = this; // 保存组件实例的引用
      searchPicture({ query: this.input })
      // axios.post('http://127.0.0.1:5000/api/search', { query: this.input })
        .then(response => {
          // 处理响应结果
          // console.log(response.data);
          Object.keys(response.data).forEach(function (key) {
            var value = response.data[key];
            // 在这里处理每个属性的值
            console.log(key, value);
            // 输出结果"result" 
            // "resources/Result/LOCAL1658392121409AQZKGAWE7K.jpg 0.14738580584526062
            // resources/Result/LOCAL16596980070065Q0QBGRQKS.jpg 0.1394435465335846
            // resources/Result/LOCAL202206011637000393774478684.jpg 0.1284731924533844
            // resources/Result/LOCAL166003616637070TMKYURNH.jpg 0.03178783878684044
            // resources/Result/12899887654473581762.jpg 0.022384094074368477
            // "
            var lines = value.split('\n');
            var result = lines
              .filter(function (line) {
                var parts = line.split(' ');
                return parts.length === 2;
              })
              .map(function (line) {
                var parts = line.split(' ');
                return {
                  filePath: parts[0],
                  value: parseFloat(parts[1])
                };
              });
            vm.result.push(...result); // 将对象数组推送到this.result中
            console.log(vm.result);
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.t2i-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-container {
  display: flex;
  flex-direction: column;
}

.search {
  position: relative;
}

.image-container {
  position: relative;

}

.image {
  width: 350px;
  /* 设置图片宽度 */
  height: 220px;
  /* 设置图片高度 */
}

.text-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: #000;
  text-align: center;
}

.text {
  color: #fff;
  padding: 10px;
  font-size: large;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.el-col {
  justify-content: space-evenly
}

.el-card {
  display: flex;
  min-height: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
