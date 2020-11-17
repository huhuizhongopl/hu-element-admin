<template>
  <div>
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
         <el-row>
            <el-col :span="12">
                <el-carousel trigger="click" height="450px">
                    <el-carousel-item v-for="img in goods.image" :key="img">
                        <h3 class="small"><img :src='img' /></h3>
                    </el-carousel-item>
                </el-carousel>
                <div class="detail">
                    <h3 class="title">商品名称:{{goods.title}}</h3>
                    <dl class="group">
                        <dt>时间:</dt>
                        <dd>{{goods.updated_at}}</dd>
                    </dl>
                    <dl class="group">
                        <dt>价格:</dt>
                        <dd>{{goods.price}}</dd>
                    </dl>
                    <dl class="group">
                        <dt>销量:</dt>
                        <dd>{{goods.sold_count}}</dd>
                    </dl>
                    <dl class="group">
                        <dt>描述:</dt>
                        <dd>{{goods.description}}</dd>
                    </dl>
                </div>
               
            </el-col>
            
        </el-row> 
    
      </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            goods:{}
        }
    },
    created(){
        let id = this.$route.query.id;
        this.getDetail(id);
    },
    methods:{
        async getDetail(id){
            let {data:res} = await this.$http.post('products/detail',{id});
            console.log(res);
            this.goods = res;
        }
    }
}
</script>

 <style lang="less" scoped>
    

.el-card{
   margin-top:20px;
}

.detail .title{
    height: 60px;
    line-height: 60px;
    font-size: 24px;
}

.detail dl:first-child{
    border-top:1px #eee solid;
}

.detail dl{
    display: flex;
    min-height: 40px;
    line-height: 40px;
    border-left:1px #eee solid;
    dt{
        min-width:100px;
        text-align: center;
    }
    dd{
        flex-grow: 1;
        padding:10px;
    }
    dt,dd{
        border-right:1px #eee solid;
        border-bottom: 1px #eee solid;
    }
}

</style>