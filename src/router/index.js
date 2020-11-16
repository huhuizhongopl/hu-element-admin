import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GoodsList from '../views/GoodsList.vue'
import TypeList from '../views/TypeList.vue'
import CreateGoods from '../views/CreateGoods.vue'

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
        path: '/type_list',
        name: 'TypeList',
        component: TypeList
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
