<template>
  <div class="type_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>类型管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-table
      border
      stripe
      row-key="id"
      :data="types"
      style="width: 100%"
       default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
          prop="id"
          label="ID"
          width="50">
      </el-table-column>
      <el-table-column
          prop="title"
          label="菜单名称"
          width="300">
      </el-table-column>      
        <el-table-column
          prop="state"
          width="100"
          label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change='updateHouseState(scope.row)'>
          </el-switch>
          </template>
      </el-table-column>
      <el-table-column
          prop="updated_at"
          width="200"
          label="创建时间">
      </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
              <el-button  type="primary" icon="el-icon-edit" size="mini" @click="editHouse(scope.row.id)"></el-button>
              <el-button  type="danger" icon="el-icon-delete" size="mini" @click="delHouse(scope.row.id)"></el-button>
              <el-button  type="warning"  icon="el-icon-setting" size="mini" @click="detail(scope.row.id)"></el-button>
          </template>
      </el-table-column>

      </el-table>

    </el-card>

    

  </div>
</template>

<script>
export default {
    data(){
       return {
           types:[]
       }
    },
    created(){
       this.getTypes();
    },
    methods:{
        async getTypes(){
            let {data:res } = await this.$http.get('cate/list');
            console.log(res);
            this.types = res;
        },
        handleSelectionChange(){

        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
   margin-top:20px;
}
</style>
