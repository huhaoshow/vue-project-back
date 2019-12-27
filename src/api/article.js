// 这个文件封装了关于文章的api方法

// 引入封装的axios
import axios from '@/utils/myAxios.js'

// 获取文章列表
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    method: 'get',
    params
  })
}

// 发表文章
export const postArticle = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
