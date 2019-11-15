import Vue from 'vue'
import Router from 'vue-router'

const app = () => import('@/components/app.vue');
const login = () =>  import('@/components/login.vue');
const register = () => import('@/components/register.vue');

const menuList = () => import('@/components/menuList.vue');
const todoList = () => import('@/components/todoList.vue');
const addList = () => import('@/components/addList.vue');
const account = () => import('@/components/account.vue'); 

Vue.use(Router)

export default new Router({
  routes: [ 
    {path: '/', redirect: '/home/register'}, 
    {
      path: '/home',
      component: app,
      children: [
        {path: 'login', component: login},
        {path: 'register', component: register},
      ]
    }, 
    {
      path: '/list',
      component: menuList, 
      children: [
        {
            path: '', 
            component: todoList, 
            meta: { logined: true }
        },
        {path: 'addlist', component: addList},
        {path: 'account', component: account},
      ]
    }
  ]
})
