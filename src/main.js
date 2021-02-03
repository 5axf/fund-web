// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入elementui
import ElementUI from 'element-ui'
// 引入elementui
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

//  引入axios 发送请求
import axios from 'axios'
Vue.prototype.$http = axios
// 关键代码
// axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
// 使用elementui
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 引入elementui
  render: h => h(App)
})
