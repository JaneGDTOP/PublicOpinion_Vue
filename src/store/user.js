// user的小仓库
// 导入接口
import {getUserList, createUser, updateUser} from '../api/index'

const state = {
  // 用户的数据
  userData: []
}
const mutations = {
  //获得服务器的数据
  GETUSERLIST (state, data) {
    state.userData = data
  }
}

const actions = {
  // 获取服务器用户的列表
  async getUserList ({ commit }) {
    // 在这里处理异步请求 返回的是一个promise对象
    let {data} = await getUserList()
    
    if (data.code === 20000) {
      // 修改state 交给mutations
      commit('GETUSERLIST', data.list)
    }
  },
  // 新增用户数据
  async create (data) {
    // 处理异步请求 
    // 发送请求这里出现了问题 到底是哪里有问题呢
    let result = await createUser(data)
    if (result.code === 200) {
      // 说明新增成功
      return 'OK'
    }else {
      // 返回失败
      return new Promise.reject(new Error('fail'))
    }
  },
  async edit (data) {
    let result = await updateUser(data)
    if (result.code === 200) {
      return 'ok';
    }else {
      // 返回失败
      return new Promise.reject(new Error('fail'))
    }
  }
}
const getters = {};

// 暴露出去
export default {
  state,
  mutations,
  actions,
  getters
}
