// 这个文件封装了关于用户的api方法

// 引入封装的axios
import axios from '@/utils/myAxios.js'

// 用户登录
export const userLogin = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
