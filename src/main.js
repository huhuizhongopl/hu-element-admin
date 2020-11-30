import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
Vue.prototype.$http = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios.defaults.headers.common['Authorization'] = 'Bearer 94e5f7ff93f2226179f34a418c3da686'; 

Vue.config.productionTip = false

axios.interceptors.request.use(config=>{
   config.headers.Authorization = "Bearer "+ sessionStorage.getItem('token');
   return config;   
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
