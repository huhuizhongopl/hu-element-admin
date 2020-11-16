<template>
  <div class="about">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

        <el-row>
            <el-col :span="12">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品分类">
                        <el-select v-model="form.pid" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
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
                            :auto-upload='false'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="是否上架">
                        <el-switch v-model="form.on_sale"></el-switch>
                    </el-form-item>
                    
                
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">发布商品</el-button>
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
            form:{
               pid:0,
               title:'',
               price:'',
               description:'',
               on_sale:true 
            }
        }
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>

<style lang="less" scoped>

.el-card{
   margin-top:20px;
}


</style>
