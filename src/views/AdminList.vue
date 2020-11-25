<template>
  <div>管理员管理</div>
</template>

<script>
export default {
   data(){
      return {
         form:{
            username:'peter',
            email:'peter@126.com',
            password:'123'
         }
      }
   },
   created(){
      this.getUsers();
   },
   methods:{

      async getUsers(){
          let params = {user_id:21,role_id:3};
          let res= await this.$http.post('permission/list',{type:'tree'});
          console.log(res);
      }

   }
}
</script>

<style>

</style>