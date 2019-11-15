// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/vuex.js' 

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if(to.meta.logined){
        if(sessionStorage.login == 1){
            next();
        }else{
            next({
                path: '/home/login',
            });
        }
    }else{
        next();
    }
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }, 
})
