// 引入vue
import Vue from 'vue'
// 引入vue-router模块
import VueRouter from 'vue-router'
// 引入需要映射的vue组件
import Login from '@/views/Login.vue'
// 将vue-router挂载到vue中
Vue.use(VueRouter)
// 创建路由实例
let router = new VueRouter({
  // 配置路由
  routes: [
    // 重定向
    {
      name: 'first',
      path: '/',
      redirect: { name: 'login' }
    },
    // 登录页面
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

// 暴露路由实例
export default router
