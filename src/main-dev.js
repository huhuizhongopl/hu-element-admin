import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
Vue.prototype.$http = axios;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//axios.defaults.headers.common['Authorization'] = 'Bearer 94e5f7ff93f2226179f34a418c3da686'; 

Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use(config=>{
   NProgress.start();
   config.headers.Authorization = "Bearer "+ sessionStorage.getItem('token');
   return config;   
})

// 响应拦截器
axios.interceptors.response.use(config=>{
   NProgress.done();
   return config;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log('main-dev.js');
