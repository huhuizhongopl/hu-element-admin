<template>
    <div>权限列表</div>
</template>

<script>
export default {
    data(){
        return {
            permissions:[]
        }
    },
    created(){
        this.getPermissions()
    },
    methods:{
        async getPermissions(){
            let {data:res } = await this.$http.post('permission/list',{type:'list'});
            console.log(res);
        }
    }
}
</script>