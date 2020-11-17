<template>
  <div class="about">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <div class="btn_wrap">
        <el-button type="warning" icon="el-icon-minus" @click='delSel'>删除商品</el-button>
        <el-button type="primary" icon="el-icon-plus" @click='createGoods'>创建商品</el-button>
        <el-select v-model="pid" placeholder="请选择分类" class="types">
              <el-option
                :disabled='type.disabled' 
                :label="type.title" 
                :value="type.id"
                v-for="type in types"
                :key='type.id' 
                ></el-option>
          </el-select>
        
          <el-input class="words" v-model="words" placeholder="请输入关键词"></el-input>
           <el-button type="primary" @click='search'>搜索</el-button>   
         
      </div>

      <el-table
        border
        stripe
        row-key="id"
        :data="goods"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >

      <el-table-column
      type="selection"
      width="55">
     </el-table-column>
      
      <el-table-column
          prop="id"
          label="ID"
          width="80">
      </el-table-column>
      <el-table-column
          prop="pid"
          label="PID"
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
        size:5,
        id_arr:[],
        goods_arr:[],
        pid:"请选择分类",
        types:[],
        words:''
      }
   },
      
   created(){
      this.getGoods();
      this.getTypes();
   },

   methods:{

     async search(){
        console.log(this.pid,this.words);
        let pid = this.pid=='请选择分类' ? 0:this.pid;
        let words = this.words;
        let {data:res } = await this.$http.post('products/search',{pid,words});
        this.goods = res.data;

     },

     async getTypes(){

            let {data:res} = await this.$http.get('cate/list');
            //console.log(res);
            res.forEach(type=>{
                this.types.push(type);
                type.disabled = true;
                if(type.children.length>0){
                    type.children.forEach(subType=>{
                        subType.title = '|--'+subType.title
                        subType.disabled = false;
                        this.types.push(subType);
                    })
                }
            })

            this.types.unshift({title:'全部分类',id:0});
            
        },

    async detail(id){
     
       this.$router.push({
          path:'/goods_detail',
          query:{id}
       });

    }, 
    
    async delSel(){

      let res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

       if(!res) return false;
       
        this.goods_arr.forEach(goods=>{
           this.id_arr.push(goods.id);
        })

        let result = await this.$http.post('products/del_all',{"id_arr":this.id_arr});
        console.log(result);
        if(result.status!=200) return this.$message.error('删除失败!');
        this.$message.success(result.data.msg);
        this.id_arr=[];
        this.getGoods();
        
     },

     handleSelectionChange(arr){
        this.goods_arr = arr;
     },

     editGood(id){

        this.$router.push({
           path:'/edit_goods',
           query:{id}
        });

     },

     async delGood(id){

       //console.log(id);
       let res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

       if(!res) return false;

       let {data:result} = await this.$http.post('products/del',{id});
       //console.log(result);
       if(result.status!=200) return this.$message.error('删除失败!');
       this.$message.success(result.msg);
       this.getGoods();

     },

     async updateStatus(goods){

       let {id,on_sale} = goods;
       let {data:res} = await this.$http.post('products/state',{id,on_sale});
      // console.log(res);
       if(res.meta.status!=200) return this.$message.error('更新失败!');
       this.$message.success(res.meta.msg);

     },

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
          //console.log(res);
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

.types{
   margin:0 20px;
}

.words{
  width:150px;
}

</style>
