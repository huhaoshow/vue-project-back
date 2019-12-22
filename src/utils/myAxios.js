// 这个文件封住了axios的基本配置

// 引入axios
import axios from 'axios'

// 配置axios的基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 暴露axios
export default axios
