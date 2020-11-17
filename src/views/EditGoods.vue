<template>
  <div class="about">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

        <el-row>
            <el-col :span="12">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品分类">
                        <el-select v-model="form.pid" placeholder="请选择活动区域">
                            <el-option
                              :disabled='type.disabled' 
                              :label="type.title" 
                              :value="type.id"
                              v-for="type in types"
                              :key='type.id' 
                              ></el-option>
                            
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品名称">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            multiple
                            :auto-upload='false'
                            :http-request='uploadImg'
                             ref='input'
                             :file-list="fileList"
                             :on-remove='removeImg'
                            >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="是否上架">
                        <el-switch v-model="form.on_sale"></el-switch>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存商品</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>
            </el-col>
         
        </el-row>

    </el-card>
  </div>
</template>

<script>

export default {
    data(){
        return{
            types:[],
            form:{
               pid:"选择分类",
               title:'',
               price:'',
               description:'',
               on_sale:true 
            },
            formData:new FormData(),
            fileList:[]
        }
    },

    async created(){

        let id =  this.$route.query.id;
        let {data:res} = await this.$http.post('products/detail',{id});
        this.form = res;
        let imgArr = [];
        this.form.image.forEach(img=>{
            let obj = {};
            obj.url = img;
            obj.is_del = true; 
            imgArr.push(obj);
        })
        this.fileList = imgArr;
        this.getTypes();
        
    },

    methods:{

       async  removeImg(file,fileList){

            if(!file.is_del) return false;

            let index = file.url.lastIndexOf('/');
            let img = file.url&&file.url.substr(index+1);
            let id = this.form.id;
            let {data:res} = await this.$http.post('products/del_img',{id,img});
           // console.log(res);
            if(res.meta.status!=200) return this.$message.error('图片删除失败!');
            this.$message.success(res.meta.msg);

        },
        
        uploadImg(pic){
           // console.log(pic);
            this.formData.append('pic[]',pic.file);
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
        },

        async onSubmit(){
            
            this.$refs.input.submit();
            this.formData.append('form',JSON.stringify(this.form));
            let {data:res} = await this.$http.post('products/update',this.formData);
           // console.log(res);
            if(res.meta.status!=200) return this.$message.error('发布失败!');
            this.$message.success(res.meta.msg);
            this.$router.push('/goods_list');
            
        }
    }
}
</script>

<style lang="less" scoped>

.el-card{
   margin-top:20px;
}


</style>
