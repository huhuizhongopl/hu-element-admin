<template>
  <div class="home">
     <el-container>
      <el-header>
         <div class="logo">
            <img :src='logo' />美菜商城后台管理
         </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
           <el-menu
              :collapse-transition="false"	
              :collapse="isCollapse"
              router
              unique-opened
              :default-active='activeIndex'
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
             
              <el-submenu :index="subMenu.id +''" v-for="subMenu in menuList" :key="subMenu.id" >
                <template slot="title">
                  <i :class="subMenu.icon"></i>
                  <span>{{subMenu.name}}</span>
                </template>
                <el-menu-item :index="menuItem.path" v-for="menuItem in subMenu.children" :key="menuItem.id">
                   <template slot="title">
                     <i class="el-icon-menu"></i>
                      <span> {{menuItem.name}}</span>
                  </template>
                </el-menu-item>
                
              </el-submenu>
               
            </el-menu>
        </el-aside>
        <el-main>
           <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/assets/logo.png'

const menus = [
   {
      name:'商品',
      icon:'',
      pid:0,
      id:1,
      path:'',
      children:[
         
         {
            name:'分类管理',
            pid:1,
            path:'type_list',
            icon:''
         },
         {
            name:'商品管理',
            pid:1,
            path:'goods_list',
            icon:''
         },
          {
            name:'规格管理',
            pid:1,
            path:'sku_list',
            icon:''
         },
      ]
   },
   {
      name:'会员',
      id:2,
      pid:0,
      path:'',
      children:[
         {
            name:'会员管理',
            pid:2,
            path:'user_list',
            icon:''
         },
         {
            name:'团长管理',
            pid:2,
            path:'team_leader',
            icon:''
         },
      ]
   }
];

export default {
  name: 'Home',
  data(){
     return {
        isCollapse:false,
        menuList:menus,
        activeIndex:"type_list",
        logo:Logo
     }
  },
  components: {
   
  }
}
</script>


<style lang="less" scoped>
.home{
  height: 100vh;
  display: flex;
}
 .el-header{
      display:flex;
      justify-content:space-between;
      background:#393c41;
      height:60px;
  }

  .el-aside{
    background: #393c41;
  }

  .logo{
     height: 60px;
     display: flex;
     align-items: center;
     font-size: 18px;
     color:#bfbfbf;
     img{
       width:30px;
       height: 30px;
       margin-right:10px;
     }
  }
</style>