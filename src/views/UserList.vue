<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

        <div>
          
            <el-row class="search_wrap">
                <el-col :span='4'>
                    <el-input class="words" v-model="words" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span='4' class="seach_btn">
                    <el-button type="primary" @click='getUsers' class="search">搜索</el-button> 
                </el-col>
            </el-row>

            <el-table
            :data="users"
            border
            width='900px'
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    
                    <dl v-for="addr in props.row.address" :key='addr.id' class="addr">
                        <dt class="dd50">{{addr.id}}</dt>
                        <dd class="dd80">{{addr.contact_name}}</dd>
                        <dd class="dd50">{{addr.gender==1?'男':'女'}}</dd>
                        <dd class="dd100">{{addr.contact_phone}}</dd>
                        <dd class="dd300">{{addr.address}}</dd>
                        <dd class="dd50">{{addr.label}}</dd>
                    </dl>
                    
                </template>
            </el-table-column>        
            <el-table-column
                prop="id"
                label="ID"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="150">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                 width="180">
            </el-table-column>
            <el-table-column
                label="状态"
                 width="80">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" @change='change(scope.row)'></el-switch>
                </template>
            </el-table-column>

             <el-table-column
                prop="updated_at"
                label="注册时间"
                 width="180">
            </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
           
        </div>

    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            words:'',
            users:[],
            page:1,
            total:0,
            size:5
        }
    },
    created(){
       this.getUsers();
    },
    methods:{
        
        async getUsers(){
            let size = this.size;
            let page = this.page;
            let words = this.words;
            let {data:res} = await this.$http.post('users/list',{size,words,page});
            console.log(res);
            this.users = res.users.data;
            this.users.forEach(user=>{
                user.status = user.status==1 ?true:false;
            })
            this.total = res.users.total;
        },
         
        handleSizeChange(size){
            this.size = size;
            this.getUsers();
        },
        
        handleCurrentChange(page){
            this.page = page;
            this.getUsers();
        },

        async change(user){

            let {id,status} = user;
            let {data:res} = await this.$http.post('users/update',{id,status});
            console.log(res);
            if(res.status!=200) return this.$message.error('更新失败!');
            this.$message.success(res.msg);

        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-top:20px;
}
.search_wrap{
    padding-bottom: 20px;
}

.seach_btn{
    padding-left:20px;
}

.pagination{
    padding-top:20px;
}

.addr{
    height: 30px;
    display: flex;
    border-bottom: 1px #eee solid;
    dt{
        width:50px;
        height: 30px;
        display: flex;
        align-items: center;
    }
    dd{
        width:120px;
        height: 30px;
        display: flex;
        align-items: center;
    }
    dt,dd{
        border-right:1px #eee solid;
        padding:0 10px;
    }
    .dd50{
        width:50px;
        display: flex;
        justify-content: center;
    }
    .dd80{
        width:80px;
         display: flex;
        justify-content: center;
    }
    .dd100{
        width:100px;
    }
    .dd150{
        width:150px;
    }
    .dd300{
        width:300px;
    }
}
</style>>

