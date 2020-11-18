<template>
  <div>会员管理</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    created(){
        this.$http.post('order/list').then(res=>{
            console.log(res);
        })
    }
}
</script>

<style>

</style>