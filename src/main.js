import Vue from 'vue'
import App from './App.vue'
// 引入根组件样式
import '@/styles/index.less'
// 引入路由实例
import router from '@/router/index.js'
// 引入完整Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 注入路由实例
  router,
  render: h => h(App)
}).$mount('#app')
