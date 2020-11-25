<template>

  <div class="about">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="btn_wrap">
        <el-button type="primary">添加用户</el-button>
      </div>
      <el-table
    :data="users"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.state" @change='changeState(scope.row)'></el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button  type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)"></el-button>
        <el-button  type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.id)"></el-button>
        <el-button  type="warning"  icon="el-icon-setting" size="mini" @click="role(scope.row)"></el-button>
      </template>
      
    </el-table-column>
  </el-table>

    </el-card>

    <el-dialog
      title="分配角色"
      :visible.sync="roleShow"
      width="30%"
      >
      <dl class="user_info">
        <dt>用户名: {{user.username}}</dt>
        <dd>邮箱： {{user.email}}</dd>
        <dd>角色名: {{user.role_name}}</dd>
        <dd>分配角色：
          <el-select v-model="role_id" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </dd>
      </dl>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
   data(){
      return {
        users:[],
        roleShow:false,
        user:{},
        roles:[],
        role_id:1
      }
   },
   created(){
       this.getUsers();
       this.getRoles();
   },
   methods:{

     editUser(){},
     delUser(){},

     role(user){
      // console.log(user);
       this.user = user;
       this.roleShow = true;
     },
      
     async getRoles(){
        let {data:res} = await this.$http.get('role/list');
        console.log(res);
        this.roles = res.data;
     },

     async getUsers(){
        let {data:res} = await this.$http.post('user/list');
        this.users = res.data.data;
        this.users.forEach(user=>{
           user.state = user.state==1? true:false;
        })

     },
     async changeState(user){
        console.log(user);
        let {data:res} = await this.$http.post('user/update',user);
        console.log(res);
     }

   }
}
</script>


<style lang="less" scoped>
.el-card{
  margin-top:20px;
}

.user_info{
  display: flex;
  flex-direction: column;
  dt,dd{
    height: 40px;
    display: flex;
    align-items: center;
  }
}

.btn_wrap{
  padding-bottom:20px;
}
</style>

