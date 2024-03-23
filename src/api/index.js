// 封装好的axios
import request from '@/utils/request'

// 定义接口
export const getData = () => {
  // 返回一个promise对象
  return request.get('/home/getData')
}

// 获取用户列表数据
export const getUserList = (params) => {
  return request.get('/user/getList', params)
}
// 编辑更新
export const updateUser = (data) => {
  return request.post('/user/updateUser', data)
}
// 新增用户
export const createUser = (data) => {
  return request.post('/user/add', data)
}

export const deleteUser = (data) => {
  return request.post('/user/deleteUser', data)
}
// 调用用户权限认证api
export const getMenu = (data) => {
  return request.post('/permission/getMenu', data)
}
// 多模态事件抽取api
// export const sendText = (data) => {
//   return request.post('/send', data)
// }
