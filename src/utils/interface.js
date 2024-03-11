import request from './request'

// 获取服务端数据集数据
export const getDataList = () => request.get('/getDataList')
