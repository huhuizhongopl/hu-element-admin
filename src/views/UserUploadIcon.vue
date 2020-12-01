<template>
   <div>

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>头像上传</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-upload
                ref = 'input'
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload= 'false'
                :http-request = 'upload'
                list-type="picture-card"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button type='primary' @click='onSubmit'>上传头像</el-button>
        </el-card>
    
   </div>
</template>

<script>

import Bus from './Bus.js';

export default {
    data(){
        return {
            imageUrl:'',
            formData:new FormData()
        }
    },
    methods:{

        upload(img){
            console.log(img);
            this.formData.append('pic',img.file);
        },

        async onSubmit(){

            this.$refs.input.submit();
            let { data:res } = await this.$http.post('user/upload_icon',this.formData);
            console.log(res);
            
            Bus.$emit('iconChange',res.meta.user);
            sessionStorage.setItem('user',JSON.stringify(res.meta.user));
            this.$refs.input.clearFiles();
            
        }

    }
}
</script>

<style lang="less">
    
    .el-card{
        margin-top:20px;
    }

    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>