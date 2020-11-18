import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GoodsList from '../views/GoodsList.vue'
import TypeList from '../views/TypeList.vue'
import CreateGoods from '../views/CreateGoods.vue'
import EditGoods from '../views/EditGoods.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/goods_list',
        name: 'GoodsList',
        component: GoodsList
      },
      {
        path: '/create_goods',
        name: 'CreateGoods',
        component: CreateGoods
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
        component: TypeList
      },
      {
        path: '/user_list',
        name: 'UserList',
        component: UserList
      },
    ]
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

export default router
