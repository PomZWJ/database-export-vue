// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI);

// 挂载一个自定义属性$http
Vue.prototype.axios = axios
// 全局配置axios请求根路径(axios.默认配置.请求根路径)
if(process.env.NODE_ENV == 'production'){
  axios.defaults.baseURL = window.location.protocol+'//'+window.location.host
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:9999'
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
