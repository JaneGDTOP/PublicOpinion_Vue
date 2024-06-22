<template xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <div class="input-section">
            <div class="left-section" style="margin-right: 10px;">
                <el-card>
                  <span>请输入第一条事件文本,触发词使用&lt;trigger&gt;&lt;/trigger&gt;标注:</span><br/>
                    <!-- <textarea v-model="inputText1" placeholder="输入文本" style="width: 400px; height: 200px;" rows="100%"></textarea> -->
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入文本"
                        v-model="inputText1" style="margin-top: 20px;">
                    </el-input>
                </el-card>
            </div>
            <div class="right-section">
                <el-card>
                    <span>请输入第二条事件文本,触发词使用&lt;trigger&gt;&lt;/trigger&gt;标注:</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入文本"
                        v-model="inputText2" style="margin-top: 20px;">
                    </el-input>
                </el-card>
            </div>
        </div>
        <div class="button-container" style="margin-top: 20px;">
            <div class="button-section" style="margin-right: 20px;">
                <el-button type="primary" round @click="sendText">发送</el-button>
            </div>
            <div class="button-section">
                <el-button type="primary" round @click="runMethod">运行</el-button>
            </div>
        </div>
<!--        <div class="result-section" style="margin-top: 20px; height: 200px;">-->
<!--            <el-card style="height: 100%;">-->
<!--                <span>两个事件之间的关系为:</span> <br/> <br/>-->
<!--                <el-radio-group v-model="radio">-->
<!--                  <el-radio :label="0"><b><el-tag>因果关系 CAUSAL</el-tag></b></el-radio>-->
<!--                  <el-radio :label="1"><b><el-tag type="success">时序/父子关系 FOLLOW</el-tag></b></el-radio>-->
<!--                  <el-radio :label="2"><b><el-tag type="info">无关关系 NORELATION</el-tag></b></el-radio>-->
<!--                </el-radio-group>-->
<!--&lt;!&ndash;                <p>{{ result }}</p>&ndash;&gt;-->
<!--            </el-card>-->
<!--        </div>-->
        <div class="Echarts">
          <div id="result" style="width: 600px;height:400px;"></div>
        </div>
    </div>
</template>

<script>
import { sendTextRelation } from '@/utils/interface'
export default {
  name: 'my-relation',
  data () {
    return {
      inputText1: '',
      inputText2: '',
      result: [],
      radio: '3'
    }
  },
  methods: {
    sendText () {
      sendTextRelation({ text1: this.inputText1, text2: this.inputText2, result: this.result, radio: this.radio })
        .then(response => {
          console.log(response.data)
          this.result = response.data.relation
          this.radio = parseInt(response.data.radio)
        })
        .catch(error => {
          console.log('连接失败')
          console.error(error)
        })
    },
    runMethod () {
      // axios.get(Fpath + '/result').then(response => {
      //   this.result = response.data.relation
      //   this.radio = parseInt(response.data.radio)
      //   console.log(typeof this.result)
      // })
      //   .catch(error => {
      //     console.error(error)
      //   })
      let myChart = this.$echarts.init(document.getElementById('result'))
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.result
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.input-section {
  display: flex;
}

.left-section {
  flex: 1;
}

.right-section {
  flex: 1;
}

.button-container {
  display: flex;
  justify-content: center;
}

.button-section {
  display: flex;
}
.result-section{
  height: 100px;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #424346;
  background-color: #424346;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #424346;
}
.el-radio__input.is-checked .el-radio__inner:after {
  transform: rotate(45deg) scaleY(1);
}
.el-radio__label {
  color: #80838a;
}
.el-radio__inner::after {
  box-sizing: content-box;
  content: "";
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 4px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
  border-radius: unset;
  background-color: transparent;
}
.Echarts {
  margin: 0 auto;
}
</style>
