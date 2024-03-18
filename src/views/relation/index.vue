<template>
    <div class="container">
        <div class="input-section">
            <div class="left-section" style="margin-right: 10px;">
                <el-card>
                    <span>请输入第一条事件文本和触发词位置:</span><br />
                    <!-- <textarea v-model="inputText1" placeholder="输入文本" style="width: 400px; height: 200px;" rows="100%"></textarea> -->
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入文本"
                        v-model="inputText1" style="margin-top: 20px;">
                    </el-input>
                    <div class="button-container" style="margin-top: 20px;">
                        <div class="button-section" style="margin-right: 20px;">
                            <el-input v-model="p1_start" placeholder="输入触发词起始位置"></el-input>

                        </div>
                        <div class="button-section">
                            <el-input v-model="p1_end" placeholder="输入触发词结尾位置"></el-input>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="right-section">
                <el-card>
                    <span>请输入第二条事件文本和触发词位置:</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入文本"
                        v-model="inputText2" style="margin-top: 20px;">
                    </el-input>
                    <div class="button-container" style="margin-top: 20px;">
                        <div class="button-section" style="margin-right: 20px;">
                            <el-input v-model="p2_start" placeholder="输入触发词起始位置"></el-input>
                        </div>
                        <div class="button-section">
                            <el-input v-model="p2_end" placeholder="输入触发词结尾位置"></el-input>
                        </div>
                    </div>
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
        <div class="result-section" style="margin-top: 20px; height: 200px;">
            <el-card style="height: 100%;">
                <span>两个事件之间的关系为:</span>
                <p>{{ result }}</p>
            </el-card>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    const Fpath = 'http://localhost:5000'
    export default {
        name: 'my-relation',
        data () {
            return {
                inputText1: '',
                p1_start: null,
                p1_end: null,
                p2_start: null,
                p2_end: null,
                inputText2: '',
                result: ''
            }
        },
        methods: {
            sendText () {
                // console.log(this.inputText1, this.inputText2)
                axios.post(Fpath + '/process', { text1: this.inputText1, text2: this.inputText2, p1_start: this.p1_start, p1_end: this.p1_end, p2_start: this.p2_start, p2_end: this.p2_end, result: this.result })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log("连接失败")
                        console.error(error)
                    })
            },
            runMethod () {
                console.log('1')
                axios.get(Fpath + '/result').then(response => {
                    this.result = response.data.relation
                })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }
    }
</script>

<style>
    .input-section {
        display: flex;
    }

    .leftsection {
        width: 100px;
        margin-right: 10px;
    }

    .right {
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
        height: 300px;
    }
</style>