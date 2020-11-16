<template>
  <div class="about">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <div class="btn_wrap">
        <el-button type="primary" icon="el-icon-minus">删除商品</el-button>
        <el-button type="primary" icon="el-icon-plus" @click='createGoods'>创建商品</el-button>
      </div>

      <el-table
        border
        stripe
        row-key="id"
        :data="goods"
        style="width: 100%"
      >
      
      <el-table-column
          prop="id"
          label="ID"
          width="80">
      </el-table-column>
      <el-table-column
          prop="title"
          label="商品名称"
          width="200">
      </el-table-column>
       <el-table-column
          prop="price"
          label="价格"
          width="100">
      </el-table-column> 
       <el-table-column
          prop="sold_count"
          label="销量"
          width="50">
      </el-table-column>      
        <el-table-column
          prop="state"
          width="100"
          label="是否上架">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.on_sale" @change='updateStatus(scope.row)'>
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
              <el-button  type="primary" icon="el-icon-edit" size="mini" @click="editGood(scope.row.id)"></el-button>
              <el-button  type="danger" icon="el-icon-delete" size="mini" @click="delGood(scope.row.id)"></el-button>
              <el-button  type="warning"  icon="el-icon-setting" size="mini" @click="detail(scope.row.id)"></el-button>
          </template>
      </el-table-column>

      </el-table>

      <div class="footer">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
             layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
       
    </el-card>

  </div>
</template>

<script>
export default {

   data(){
      return {
        goods:[],
        page:1,
        total:0,
        size:5
      }
   },
   created(){
      this.getGoods();
   },
   methods:{

     handleSizeChange(size){
        this.size = size;
        this.getGoods();
     },

     handleCurrentChange(page){
       this.page = page;
       this.getGoods(); 
     },

     createGoods(){
        this.$router.push('/create_goods');
     },

      async getGoods(){
          let size= this.size;
          let page = this.page;
          let {data:res} = await this.$http.post('products/list',{size,page});
          console.log(res);
          this.goods = res.data;
          this.total = res.total;
      }

   }

   
}
</script>

<style lang="less" scoped>

.el-card{
   margin-top:20px;
}

.btn_wrap{
  padding:5px 20px 20px;
}

.footer{
  padding:20px;
}

</style>
