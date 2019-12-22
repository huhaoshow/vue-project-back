// 引入vue
import Vue from 'vue'
// 引入vue-router模块
import VueRouter from 'vue-router'
// 引入需要映射的vue组件
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Welcome from '@/views/Welcome.vue'
import ArticleList from '@/views/ArticleList.vue'
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
      redirect: { name: 'index' }
    },
    // 登录页面
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    // 首页
    {
      name: 'index',
      path: '/index',
      component: Index,
      // 重定向到嵌套路由内的welcome
      redirect: { name: 'welcome' },
      children: [
        // 欢迎页面
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        // 文章列表页面
        {
          name: 'articleList',
          path: 'articleList',
          component: ArticleList
        }
      ]
    }
  ]
})

// 添加导航守卫
// 除了登录页面都需要进行验证
router.beforeEach((to, from, next) => {
  // 若是进登录页面则直接通过,否则判断是是否有token,没有则退回登录页
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('back_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})
// 暴露路由实例
export default router
