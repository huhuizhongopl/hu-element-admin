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
        <el-select v-model="pid" 
                   placeholder="请选择分类" 
                   @change='changeType'
                   class="types">
              <el-option
                :disabled='type.disabled' 
                :label="type.title" 
                :value="type.id"
                v-for="type in types"
                :key='type.id' 
                ></el-option>
          </el-select>
        
          <el-input class="words" v-model="words" placeholder="请输入关键词"></el-input>
           <el-button type="primary" @click='getGoods' class="search">搜索</el-button>   
         
      </div>

      <el-table
        border
        stripe
        row-key="id"
        :data="goods"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >

      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="sku_wrap" v-if="props.row.skus.length>0">
            <dl class="sku">
               <dt>规格</dt>
               <dd>价格</dd>
               <dd>库存</dd>
               <dd>操作</dd>
            </dl>
           
             <dl class="sku" v-for="sku in props.row.skus" :key='sku.id'>
                <dt>{{ sku.title }}</dt>
                <dd>{{sku.price}}</dd>
                <dd>{{sku.stock}}</dd>
                <dd class="sku_btn"> 
                  <span @click='editSku(sku)'>编辑</span> 
                  <span class="line">|</span> 
                  <span @click='delSku(sku.id)'>删除</span>
                </dd>
             </dl>
        </el-form>
        <p v-else> 当前商品暂无规格！</p>
      </template>
    </el-table-column>
    
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
              <el-button  type="success"   size="mini"  @click="createSku(scope.row.id)"><i class="plus">+</i>规格</el-button>
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

    <el-dialog
      title="创建规格"
      :visible.sync="skuShow"
      width="30%"
      >
      <el-form ref="addSkuRef" :rules="skuRules" :model="sku" label-width="80px">
        <el-form-item label="规格名称" prop="title">
          <el-input v-model="sku.title"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number" v-model.number="sku.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input type="number"  v-model.number="sku.stock"></el-input>
        </el-form-item>
        <el-form-item label="描述" type="textarea">
          <el-input v-model="sku.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSku('sku')">立即创建</el-button>
          <el-button>取消</el-button>
      </el-form-item>
      </el-form>  
    
    </el-dialog>

     <el-dialog
      title="编辑规格"
      :visible.sync="editSkuShow"
      width="30%"
      >
      <el-form ref="form" :model="sku" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="sku.title"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="sku.price" ></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input  v-model="sku.stock"></el-input>
        </el-form-item>
        <el-form-item label="描述" type="textarea">
          <el-input v-model="sku.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateSku">保存规格</el-button>
          <el-button @click="cancelEdit">取消</el-button>
      </el-form-item>
      </el-form>  
    
    </el-dialog>

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
        pid:"全部分类",
        types:[],
        words:'',
        skuShow:false,
        editSkuShow:false,
        sku:{
           product_id:undefined,
           title:'',
           description:'',
           price:undefined,
           stock:undefined
        },
        skuRules:{
           title:[
               { required: true, message: '请输入规格名称', trigger: 'blur' },
               { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
           ],
           price:[
                { required: true, message: '请输入价格', trigger: 'blur' },
                { type: 'number', message: '类型必须为数值', trigger: 'blur' }
           ],
           stock:[
                { required: true, message: '请输入库存', trigger: 'blur' },
                { type: 'number', message: '类型必须为数值', trigger: 'blur' }
           ],
        }
      }
   },
      
   created(){
      this.getGoods();
      this.getTypes();
   },

   methods:{

    async delSku(id){

       let text = await this.$confirm('确认删除当前规格吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        if(!text) return false;
       
       let {data:res} = await this.$http.post('sku/del',{id});
       if(res.status!=200) return this.$message.error('删除失败');
       this.$message.success(res.msg);
       this.getGoods();

     },

     cancelEdit(){
        this.resetForm();
        this.editSkuShow = false;
     },

      resetForm(){
        this.skuShow = false;
        this.sku.title="";
        this.sku.price=undefined;
        this.sku.stock=undefined;
        this.sku.description="";
      },

      editSku(sku){
         this.sku = {...sku};
         this.editSkuShow = true;
      },

      async updateSku(){

         let {data:res} = await this.$http.post('sku/update',this.sku);
         
         if(res.status!=200) return this.$message.error('编辑失败!');
         this.resetForm();
         this.editSkuShow = false;
         this.getGoods();
         this.$message.success(res.msg);
        
      },
      
      createSku(id){
         this.sku.product_id = id;
         this.skuShow = true;   
      },

      async saveSku(formName){
          
        // 1 验证数据
        this.$refs.addSkuRef.validate((bool)=>{
           if(bool){
              this.doSaveForm();
           }else{
              this.$message.error('请输入正确表单信息!');
           }
        }) 

      },

      async doSaveForm(){
        // return console.log(this.sku);
        let {data:res } = await this.$http.post('sku/add',this.sku);
        //console.log(res);
        if(res.status!=200) return this.$message.error('创建失败!');
        this.$message.success(res.msg);
        
        this.resetForm();
        
        this.getGoods();
        this.skuShow = false;
      },


     
      changeType(){
        this.words='';
        this.page = 1;
        this.getGoods();
      },
     
     async getTypes(){

            let {data:res} = await this.$http.get('cate/list');
            //console.log(res);
            res.forEach(type=>{
                this.types.push(type);
                //console.log(type);
                type.disabled = true;
                if(type.children.length>0){
                    type.children.forEach(subType=>{
                        subType.title = '|--'+subType.title
                        subType.disabled = false;
                        this.types.push(subType);
                    })
                }
            })

            this.types.unshift({'title':'全部分类',id:0});

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
        //console.log(result);
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
          let words = this.words;
          let pid = this.pid=='全部分类' ? 0:this.pid;

          let {data:res} = await this.$http.post('products/list',{size,page,pid,words});
         // console.log(res);
          this.goods = res.data;
          this.total = res.total;
      }

   }

   
}
</script>

<style lang="less" scoped>

dl,dt,dd{
  margin:0;
  padding:0;
}

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

.search{
  margin-left:20px;
}

.sku_wrap{
  display: inline-flex;
  flex-direction: column;
  border-top:1px #e6ba78 solid;
  border-left:1px #e6ba78 solid;
}

.sku{
   display: flex;
   min-height: 30px;
   align-items: center;
 
   dt,dd{
    width:100px; 
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right:1px #e6ba78 solid;
    border-bottom:1px #e6ba78 solid;
   }

   dt{
     width:150px;
   }

   
}

.plus{
  font-size: 14px;
  padding-right: 2px;
}

.line{
  padding:0 3px;
}

.sku_btn span{
  cursor: pointer;
}

</style>
