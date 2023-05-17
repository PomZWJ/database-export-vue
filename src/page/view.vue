<template>
  <div style="margin: 20px 50px;">
    <el-container style="height: 100%;width: 100%">
      <el-header height="100px" style="display: flex;flex-direction: row;">
        <div style="display: flex;flex-direction: row;width: 50%">
          <div>
            <img :src="logoImg" style="width: 100px;height: 100px">
          </div>
          <div style="display: flex;flex-direction: column;align-items: flex-start;margin-left: 15px">
            <span style="font-size: 46px;font-weight: bolder">database-export</span>
            <span style="margin-top: 10px">数据库表结构导出工具V4.0.0</span>
          </div>
        </div>
        <div style="width: 50%;display: flex;flex-direction: row-reverse;justify-items: center;align-items: center">
          <el-select v-model="selectDefaultValue" @change="selectItem" filterable placeholder="搜索表名" size="medium">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-header>
      <el-main v-loading="loading">
        <div  v-for="(item,index) in tableData.tableDetailInfo" :key="index" style="margin-top: 50px;">
          <a :href="'#'+item.tableName" v-show="false"></a>
          <h1>{{item.tableName}}({{item.tableComments}})</h1>
          <el-table :data="item.tabsColumn" border style="width: 100%">
            <el-table-column v-for="(item2,index2) in tableData.fieldList" :key="index2" :prop="item2.prop" :label="item2.label"></el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import logoImgPath from '../../build/logo.png'
export default {
  name: 'view',
  data(){
    return{
      logoImg: logoImgPath,
      selectDefaultValue: '',
      tableData: [],
      loading: false
    }
  },
  computed:{
    selectOptions() {
      let data = this.tableData.tableDetailInfo;
      if(data == undefined) {
        return [];
      }
      let a = [];
      for(let i=0;i<data.length;i++){
        let text = data[i].tableName + '('+data[i].tableComments+')';
        a.push({"value": data[i].tableName,'label': text});
      }
      return a;
    }
  },
  mounted() {
    this.loadInfo();
  },
  methods:{
    selectItem(val){
      window.location.href = "/#" + val;
    },
    loadInfo:function(){
      this.loading = true;
      this.axios.get("/getTableData",{
        params:{base64Params: this.$route.query.base64Params}
      }).then(resp =>{
        resp = resp.data;
        if (resp.resultCode == '000000') {
          this.tableData = resp.params;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({
            message: resp.resultMsg,
            type: 'warning'
          });
        }
      }).catch(err =>{
        this.loading = false;
      });
    }
  }
}
</script>
<style scoped>

</style>
