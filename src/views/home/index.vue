<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
      <el-card class="box-card">
          <div class="user">
            <img src='@/assets/images/user.png'/>
            <div class="userInfo">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间：<span>2021-7-19</span></p>
            <p>上次登录的地点：<span>武汉</span></p>
          </div>
      </el-card>

      <el-card style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column
              prop="name"
              label="课程">
            </el-table-column>
            <el-table-column
              prop="todayBuy"
              label="今日购买">
            </el-table-column>
            <el-table-column
              prop="monthBuy"
              label="本月购买">
            </el-table-column>】 -->
             <el-table-column v-for='(val, key) in tableLabel' :key="key" :prop="key" :label="val"/>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display : 'flex', padding: 0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <div>
          <el-card style="height: 280px">
            <!-- 折线图 -->
            <div ref="echarts1" style="height: 280px"></div>
          </el-card>
          <div class="graph">
            <el-card>
              <!-- 左边的柱状图 -->
              <div ref="barEcharts" style="height: 260px"></div>
            </el-card>
            <el-card>
              <!-- 右边的饼状图 -->
              <div ref="pieEcharts" style="height: 240px"></div>
            </el-card>
          </div>
        </div>
    </el-col>
</el-row>
</template>

<script>
import { getData } from '@/api'
// 引入echarts
import * as echarts from 'echarts'
export default {
  name: 'my-home',
  data (){
    return {
      tableData : [],
      tableLabel : {
        name : '课程',
        todayBuy : '今日购买',
        monthBuy : '本月购买',
        totalBuy : '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      orderData: {}
    } 

  },
  mounted () {
    getData().then((response)=>{
      const {data} = response.data;

      this.tableData = data.tableData;
      this.orderData = data.orderData;
      // console.log(data);
      const {orderData, userData, videoData} = data;
      //画折线图
      this.drawLine(orderData);
      //画条形图
      this.drawBar(userData);
      //画饼状图 
      this.drawPie(videoData);
    })
  },
  methods: {
    //画折线图
    drawLine (orderData) {
      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      //横坐标算出来
      
      const echarts1Options = {}
      echarts1Options.title = {text: '折线图'};
      //刚开始的时候 orderdata还是空的 所以会出现undefined
      const xAxis = Object.keys(orderData.data[0]);
      echarts1Options.xAxis = {data: orderData.date};
      echarts1Options.legend = {data: xAxis}
      echarts1Options.yAxis = {};
      echarts1Options.series = [];
      xAxis.forEach(key => {
        //key对应的苹果 小米等等
        echarts1Options.series.push({
          //对象 每一个种类的设置 以及数据
          name: key,
          data: orderData.data.map( item => item[key]),//此时变成数组 就是对应数字的数组
          type: 'line'
        })
      })

      //使用刚制定的配置项和数据显示图表
      echarts1.setOption(echarts1Options);
    },
    
    //画柱状图
    drawBar (userData) {
      // 基于准备好的dom，初始化echarts实例
      let barEcharts = echarts.init(this.$refs.barEcharts);
      //配置信息
      const barOptions = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            // 有两个类别
            {
              name: '新增用户',
              type: 'bar',
              data: userData.map(item => item.new)
            },
            {
              name: '活跃用户',
              type: 'bar',
              data: userData.map(item => item.active)
            }
          ],
        }

      //使用刚制定的配置项和数据显示图表
      barEcharts.setOption(barOptions);
    },
    //画饼状图
    drawPie (videoData) {
      //基于准备好的dom 初始化echarts实例
      let pieEcharts = echarts.init(this.$refs.pieEcharts);
      //配置信息
      const pieOptions = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: videoData,
              type: 'pie'
            }  
          ],
        }
      //使用刚制定的配置项和数据显示图表
      pieEcharts.setOption(pieOptions);
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px; //垂直居中
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    height: 260px;
  }
}

</style>