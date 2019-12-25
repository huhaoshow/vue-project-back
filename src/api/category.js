// 这个文件封装了关于栏目的api方法
import axios from '@/utils/myAxios.js'
// 获取栏目列表
export const getCategory = () => {
  return axios({
    url: '/category',
    method: 'get'
  })
}
