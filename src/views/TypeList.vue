<template>
  <div class="type_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>类型管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <div class="btn_wrap">
        <el-button type="primary" icon="el-icon-minus">删除分类</el-button>
        <el-button type="primary" icon="el-icon-plus" @click='createType'>创建分类</el-button>
      </div>

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
          prop="id"
          label="ID"
          width="110">
      </el-table-column>

       <el-table-column
          label="图片"
          width="80">
          <template slot-scope="scope">
             <img :src='scope.row.img' class="img" />
          </template>
      </el-table-column> 

      <el-table-column
          prop="title"
          label="菜单名称"
          width="250">
      </el-table-column> 

       <el-table-column
          prop="ord"
          label="排序"
          width="50">
      </el-table-column>  

        <el-table-column
          prop="state"
          width="100"
          label="状态">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.status"
               @change='updateStatus(scope.row)'>
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
              <el-button  type="primary" icon="el-icon-edit" size="mini" @click="editType(scope.row)"></el-button>
              <el-button  type="danger" icon="el-icon-delete" size="mini" @click="delType(scope.row.id)"></el-button>
          </template>
      </el-table-column>

      </el-table>

    </el-card>

    <el-dialog
      title="创建分类"
      :visible.sync="createShow"
      width="30%"
      >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="父级分类">
          <el-select v-model="form.pid" placeholder="请选择分类">
            <el-option 
              :label="type.title" 
              :value="type.id" 
              v-for="type in selTypes" 
              :key='type.id'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.ord"></el-input>
        </el-form-item>
         
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :http-request='uploadImg'
            ref='input'
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="分类状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click='reset'>取消</el-button>
        </el-form-item>
      </el-form>
    
    </el-dialog>

     <el-dialog
      title="编辑分类"
      :visible.sync="editShow"
      width="30%"
      >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="父级分类">
          <el-select v-model="form.pid" placeholder="请选择分类">
            <el-option 
              :label="type.title" 
              :value="type.id" 
               v-for="type in selTypes" 
              :key='type.id'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.ord"></el-input>
        </el-form-item>
         
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :http-request='uploadImg'
            :file-list="fileList"
            ref='edit_input'
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="分类状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveType">保存修改</el-button>
          <el-button @click='reset'>取消</el-button>
        </el-form-item>
      </el-form>
    
    </el-dialog>

  </div>
</template>

<script>

export default {
    data(){
       return {
           types:[],
           selTypes:[],
           createShow:false,
           editShow:false,
           fileList:[],
           form:{
              pid:"选择分类",
              title:'',
              ord:0,
              status:true
           },
           formData:new FormData()
       }
    },
    created(){
       this.getTypes();
    },

    methods:{

     async saveType(){

          // 1准备上传图片
        this.$refs.edit_input.submit();

        // 2上传表单数据
        this.formData.append('form',JSON.stringify(this.form));
        console.log(this.form);

        // 3提交请求
        let {data:res} = await this.$http.post('cate/update',this.formData);

        
        // 4 交互反馈 
        if(res.status!==200) return this.$message.error('更新失败！');
        this.$message.success(res.msg);

        // 5 初始化

        this.editShow = false;
       
        this.form.title='';
        this.form.pid='选择分类';
        this.form.ord=0;
        this.form.status= true;
        this.createShow = false;
        this.fileList = [];

        // 6 刷新页面
        this.getTypes();

      },

      async delType(id){

        let res = await this.$confirm('永久删除该分类吗?', '提示', {
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

            let {data:result} = await this.$http.post('cate/delete',{id});
            if(result.status!=200) this.$message.error('删除失败!');
            this.$message.success(result.msg);
            this.getTypes();

      },
      editType(type){
        this.form = type;
        this.fileList=[];
        this.editShow = true;
      },

      uploadImg(pic){
        this.formData.append('pic',pic.file);
      },

      async onSubmit(){
        
        // 1准备上传图片
        this.$refs.input.submit();

        // 2上传表单数据
        this.formData.append('form',JSON.stringify(this.form));

        // 3提交请求
        let {data:res} = await this.$http.post('cate/store',this.formData);
       
        // 4 交互反馈 
        if(res.status!==200) return this.$message.error('发布失败！');
        this.$message.success(res.msg);

        // 5 初始化
       
        this.form.title='';
        this.form.pid='选择分类';
        this.form.ord=0;
        this.form.status= true;
        this.createShow = false;

        // 6 刷新页面
        this.getTypes();

      },

      createType(){
        this.createShow=true;
      },

      reset(){
          this.createShow=false;
      },
        
      async getTypes(){
        let {data:res } = await this.$http.get('cate/list');
        //console.log(res);
        res.forEach(type=>{
          type.status = type.status == 1 ? true:false;
          if(type.children.length>0){
              type.children.forEach(subtype=>{
                subtype.status =  subtype.status==1 ?true:false;
              })
          }
        })
        //console.log(res);
        this.types = res;
        this.selTypes = [...this.types];
        this.selTypes.unshift({'title':'根分类',id:0});
      },
        
      handleSelectionChange(){

      },

      async updateStatus(type){

        let tmp = {...type};
        tmp.status = tmp.status ? 1:0;
        let {data:res} = await this.$http.post('cate/update_state',tmp);
        if(res.status!==200) return this.$message.error('更新失败!');
        this.$message.success(res.msg);
        if(res.status!==200) return this.$message.error('发布失败！');
        this.$message.success(res.msg);
         
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

.img{
  width:50px;
  height: 50px;
  border-radius: 5px;
}

</style>
