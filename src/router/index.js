import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import EditGoods from '../views/EditGoods.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import UserList from '../views/UserList.vue'
import OrderList from '../views/OrderList.vue'
import AdminList from '../views/AdminList.vue'
import PermissionList from '../views/PermissionList.vue'
import RoleList from '../views/RoleList.vue'
import Login from '../views/Login.vue'
import UserUploadIcon from '../views/UserUploadIcon.vue'
import Default from '../views/Default.vue'

//import CreateGoods from '../views/CreateGoods.vue'
//import GoodsList from '../views/GoodsList.vue'
//import TypeList from '../views/TypeList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/default',
        name: 'default',
        component: Default
      },
      {
        path: '/goods_list',
        name: 'GoodsList',
        component: ()=>import( '../views/GoodsList.vue')
        
      },
      {
        path: '/create_goods',
        name: 'CreateGoods',
        component: ()=>import( '../views/CreateGoods.vue')
      },
      {
        path: '/edit_goods',
        name: 'EditGoods',
        component: EditGoods
      },
      {
        path: '/goods_detail',
        name: 'GoodsDetail',
        component: GoodsDetail
      },
      {
        path: '/type_list',
        name: 'TypeList',
        component: ()=>import('../views/TypeList.vue')
      },
      {
        path: '/user_list',
        name: 'UserList',
        component: UserList
      },
      {
        path: '/order_list',
        name: 'OrderList',
        component: OrderList
      },
      {
        path: '/admin_list',
        name: 'AdminList',
        component: AdminList

      },
      {
        path: '/permission_list',
        name: 'PermissionList',
        component: PermissionList
      },
      {
        path: '/role_list',
        name: 'RoleList',
        component: RoleList
      },
      {
        path: '/user_upload_icon',
        name: 'UserUploadIcon',
        component: UserUploadIcon
      },
      

    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})


//全局路由钩子函数;
router.beforeEach((to,from,next)=>{
   
   let token = sessionStorage.getItem('token');
   if(to.path=='/login') {
      if(token){
         return next('/default');
      }else{
         return next();
      }
   }
   if(!token) return next('/login');
   next();
   
})

export default router
