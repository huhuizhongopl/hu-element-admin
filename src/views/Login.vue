<template>
    <div class='login_wrap'>
        <div class='login_form'>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click='login'>登录</el-button>
                    <el-button type='default'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>    
    </div>
  

</template>
<<script>
export default {
    data(){
        return {
            form:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        async login(){
            let { data:res } = await this.$http.post('user/login',this.form);
            console.log(res);
            if(res.meta.status==200){
                sessionStorage.removeItem('acIndex');
                sessionStorage.setItem('token',res.data.api_token);
                sessionStorage.setItem('user', JSON.stringify(res.data));
                this.$router.push('/default');
            }
        }
    }
}
</script>


<style lang="less" scoped>

    .login_wrap{
        width:100vw;
        height:100vh;
        background:#2b4b6b;
    }
    
    .login_form{
        width:400px;
        height:200px;
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        margin:auto;
        border:1px #409EFF solid;
        border-radius:10px;
        padding:50px;
        background:#fff;
    }

</style>
