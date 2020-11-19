<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row class="search_wrap">
                <el-col :span='4'>
                    <el-select v-model="selStatus" placeholder="请选择" @change='getOrders'>
                        <el-option
                        v-for="item in status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                
                <el-col :span='4'>
                    <el-input class="words" v-model="words" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span='4' class="seach_btn">
                    <el-button type="primary" @click='getOrders' class="search">搜索</el-button> 
                </el-col>
            </el-row>
            <div>
                <el-button type="primary" size='small' @click='sendGoods'>批量发货</el-button>
            </div>

            <div class="wrap">
          <el-table
            :data="orders"
            @selection-change="handleSelectionChange"
            style="width: 100%">
                <el-table-column
                 type="selection"
                 width="55">
                </el-table-column>
                <el-table-column type="expand">
                    
                <template slot-scope="props">
                    <dl class="order_item header">
                        <dt>ID</dt>
                        <dd>商品名称</dd>
                        <dd>商品规格</dd>
                        <dd>价格</dd>
                        <dd>数量</dd>
                    </dl>
                   <dl v-for="item in props.row.items" :key="item.id" class="order_item">
                       <dt>{{item.id}}</dt>
                       <dd>{{item.goods_title}}</dd>
                       <dd>{{item.sku_title}}</dd>
                       <dd>{{item.price}}</dd>
                       <dd>{{item.amount}}</dd>
                   </dl> 
                </template>
                </el-table-column>

                <el-table-column
                label="订单ID"
                width='80px'
                prop="id">
                </el-table-column>

                <el-table-column
                label="订单编号"
                 width='250px'
                prop="order_sn">
                </el-table-column>

                <el-table-column
                label="用户名"
                width='100px'
                prop="user.name">
                </el-table-column>

                 <el-table-column
                label="手机号"
                width='200px'
                prop="user.tel">
                </el-table-column>

                <el-table-column
                label="订单金额"
                width='100px'
                prop="order_money">
                </el-table-column>

                <el-table-column
                label="订单状态"
                width='100px'
                >
                <template slot-scope="scope">
                   {{scope.row.order_status|myformat}}
                </template>
                </el-table-column>

                <el-table-column
                label="创建时间"
                width='200px'
                prop="updated_at">
                </el-table-column>
                
            </el-table>
            </div>

            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
            
        </el-card>    
    </div>
</template>

<script>

const status = [
    {label:'已关闭-2',value:-2},
    {label:'已取消-1',value:-1},
    {label:'全部订单0',value:0},
    {label:'待付款1',value:1},
    {label:'已付款2',value:2},
    {label:'已发货3',value:3},
    {label:'已收货4',value:4},
    {label:'已退货11',value:11},
    {label:'退货成功12',value:12}
]

let text = {
    '1':'待付款',
    '2':'已付款',
    '3':'已发货'
}

export default {

    data(){
    
        return {
            status:status,
            selStatus:1,
            selType:'order_sn',
            orders:[],
            selOrders:[],
            page:1,
            total:0,
            size:5,
            words:''
        }

    },
    created(){
        this.getOrders();
    },
    methods:{

        // 批量发货
        async sendGoods(){
           // console.log(this.selOrders);
            let ids = [];
            this.selOrders.forEach(order=>{
                ids.push(order.id);
            })
            
            let {data:res} = await this.$http.post('order/send',{ids});
            console.log(res);
        },
        
        // 订单选择变化触发
        handleSelectionChange(selOrders){
            this.selOrders = selOrders;
        },

        statusChange(){
            console.log(this.selStatus);
        },

        changeType(){
            console.log(this.selType);
        },
         
        async getOrders(){

            let size = this.size;
            let page = this.page;
            let words = this.words; 
            let status = this.selStatus

            let {data:res} = await this.$http.post('order/list',{size,page,words,status});
            this.orders = res.orders.data;
            console.log(res);
            this.total = res.orders.total;
        },

        handleSizeChange(size){
            this.size = size;
            this.getOrders();
        },
        
        handleCurrentChange(page){
            this.page = page;
            this.getOrders();
        }

    },

    filters:{
        myformat(status){
           return text[status];
        }
    }

}

</script>

<style lang="less" scoped>

.search_wrap{
    margin-bottom: 20px;
}

.el-card{
    margin-top:20px;
}

.seach_btn{
    padding-left:20px;
}

.wrap{
    width:1200px;
}

.pagination{
    padding-top:20px;
}

.order_item{
    display: flex;
    height: 30px;
    border-bottom: 1px #eee solid;
    dt,dd{
        border-right:1px #eee solid;
        padding:0 10px;
    }
    dt{
        width:50px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    dd{
        width:100px;
        height: 30px;
        display: flex;
        align-items: center;
    }
}

.header{
    text-align: center;
}



</style>