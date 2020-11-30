<template>
  <div class="home">
     <el-container>
      <el-header>
        <div class="logo">
          <img :src='logo' />美菜商城后台管理
        </div>
        <div class='user_wrap'>
          <span>{{user.username}}</span>
          <img :src='user.icon' class='icon'/>
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
import Logo from '@/assets/logo.png';
import Bus from './Bus.js';

export default {
  name: 'Home',
  data(){
     return {
        isCollapse:false,
        menuList:[],
        activeIndex:"type_list",
        logo:Logo,
        user:{}
     }
  },
  
  created(){
     this.getMenus();
     Bus.$on('iconChange',(user)=>{
       console.log('home');
       console.log(user);
       this.user = user;
     })
  },

  methods: {
     async getMenus(){
         let {data:res} = await this.$http.post('permission/menus');
         console.log('home');
         console.log(res);
         this.menuList = res.data;
     }
    
  },

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

  .icon{
    width:40px;
    height:40px;
    border-radius:50%;
  }

  .user_wrap{
    display:flex;
    width:150px;
    height:60px;
    align-items:center;
    justify-content:flex-end;
    span{
      padding-right:10px;
      color:#bfbfbf;
    }
  }

</style>