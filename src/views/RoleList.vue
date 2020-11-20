<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table
            :data="roles"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
               <el-row v-for="(item1,i1) in props.row.children" :key='item1.id' class="border_bottom vcenter">
                   <el-col :span='5' >
                       <el-tag>{{item1.name}}</el-tag>
                       <i class="el-icon-caret-right"></i>
                    </el-col>
                   <el-col :span='19'>
                       <el-row v-for="(item2,i2) in item1.children" :key='item2.id' :class="i2==0? '':'border_top'">
                           <el-col :span='6'>
                               <el-tag type="success">{{item2.name}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                           <el-col :span='18'>
                               <el-tag type="warning" closable v-for="(item3,i3) in item2.children" :key='item3.id' >{{item3.name}}</el-tag>
                           </el-col>
                       </el-row>
                   </el-col>
               </el-row>
            </template>
            </el-table-column>
            <el-table-column
            label="角色 ID"
            prop="id">
            </el-table-column>
            <el-table-column
            label="角色名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="角色描述"
            prop="des">
            </el-table-column>
             <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="primary" icon="el-icon-edit" size="mini" @click="editRole(scope.row)"></el-button>
                    <el-button  type="danger" icon="el-icon-delete" size="mini" @click="delRole(scope.row.id)"></el-button>
                    <el-button  type="warning"  icon="el-icon-setting" size="mini" @click="permission(scope.row)"></el-button>
                </template>
                
                </el-table-column>
        </el-table>
        </el-card>

        <el-dialog
            title="权限列表"
            :visible.sync="pmsShow"
            width="30%"
            >
            <el-tree
            :data='pmsList'
            :props="props"
            show-checkbox
            node-key="id"
            :default-checked-keys="defkeys"
            >
            </el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            roles:[],
            pmsShow:false,
            pmsList:[],
            defkeys:[],
            props: {
                label: 'name',
                children: 'children'
            }
        }
    },
    created(){
       this.getRoles();
       this.getPmsList();
    },
    methods:{
        editRole(){},
        delRole(){},
        permission(role){
            this.defkeys=[];
            this.getDefKeys(role);
            this.pmsShow = true;
        },
        removePmsById(){},
        
        getDefKeys(role){

            if(!role.children) return false;
         
            if(role.children.length>0){
                role.children.forEach(pms=>{
                    this.defkeys.push(pms.id);
                })
            }

        },

        async getRoles(){
            let {data:res} = await this.$http.get('role/list');
            console.log(res);
            this.roles = res.data;
        },
        async getPmsList(){
            let {data:res} = await this.$http.post('permission/list',{type:'tree'});
            this.pmsList =res.data;
            console.log(res);
        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-top:20px;
}

.el-tag{
    margin:7px;
}

.border_bottom{
    border-bottom: 1px #eee solid;
}

.border_top{
    border-top: 1px #eee solid;
}

.vcenter{
    display: flex;
    align-items: center;
}

</style>