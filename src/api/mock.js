import Mock from 'mockjs'
import homeAPi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
// 定义mock请求拦截
Mock.mock('/api/home/getData', homeAPi.getStatisticalData)

// 发送请求 获取用户数据的接口
Mock.mock('/api/user/getList', user.getUserList)
// 增加数据的接口
Mock.mock('/api/user/add', user.createUser)
// 删除
Mock.mock('/api/user/deleteUser', 'post', user.deleteUser)
// 批量删除
Mock.mock('/api/user/batchRemove', 'post', user.batchremove)
// 更新 也就是修改用户
Mock.mock('/api/user/updateUser', 'post', user.updateUser)
// 判断用户权限
Mock.mock('/api/permission/getMenu', permission.getMenu)
