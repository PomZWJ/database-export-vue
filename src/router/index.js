import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index'
import view from '../page/view'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/view',
      name: 'view',
      component: view
    }
  ]
})
