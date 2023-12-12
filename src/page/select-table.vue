<template>
  <div>
    <el-drawer
      :visible.sync="dialogVisible"
      :direction="direction"
      :append-to-body="true"
      :wrapperClosable="false"
      size="70%">
      <div slot="title" style="display: flex;align-content: center">
        <div style="display: flex;justify-content: center;flex-direction: column;">
          <span>表选择</span>
        </div>
        <el-input style="width: 300px;margin-left: 10px" v-model="searchTableKey" placeholder="搜索表"></el-input>
        <el-select v-model="searchTableType" style="margin-left: 10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" circle style="margin-left: 10px" @click="searchTableEvent"></el-button>
        <el-dropdown placement="top">
          <el-button type="primary" class="el-icon-download" style="margin-left: 10px" :loading="downFileLoading">下载文件</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="generateFileOpera('word')">word</el-dropdown-item>
            <el-dropdown-item @click.native="generateFileOpera('excel')">excel</el-dropdown-item>
            <el-dropdown-item @click.native="generateFileOpera('markdown')">markdown</el-dropdown-item>
            <el-dropdown-item @click.native="generateFileOpera('pdf')">pdf</el-dropdown-item>
            <el-dropdown-item @click.native="generateFileOpera('html')">html</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="drawer__content" v-loading="loading" element-loading-text="获取表,进行中...">
        <el-row :gutter="12">
          <el-col :span="6" v-for="(item,index) in gridData" v-show="item.show" :key="index" style="margin-bottom: 10px">
            <el-card @click.native="item.selected = !item.selected" style="cursor: pointer;" :class="item.selected ? 'selected-card':''">
              <div class="ellipsis"  :title="item.tableName">{{item.tableName}}</div>
            </el-card>
          </el-col>
        </el-row>
        <div class="drawer__footer">

        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'select-table',
  data() {
    return {
      dialogVisible: false,
      direction: 'rtl',
      searchTableKey: '',
      gridData: [],
      loading: false,
      downFileLoading: false,
      searchTableType: 0,
      options: [{
        value: 0,
        label: '全部'
      }, {
        value: '1',
        label: '仅显示已选择'
      }]
    };
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    showSelectTableDialog(){
      this.loading = true;
      this.dialogVisible = !this.dialogVisible;
    },
    emitParentEvent(){
      this.$emit('runParentShowEvent')
    },
    searchTableEvent(){
      if(this.searchTableKey != ''){
        for(let i=0;i<this.gridData.length;i++){
          this.$set(this.gridData[i],'show',false);
          let tableName = this.gridData[i].tableName;
          if(tableName.toLowerCase().includes(this.searchTableKey.toLowerCase())){
            if(this.searchTableType == 1){
              if(this.gridData[i].selected == true){
                this.$set(this.gridData[i],'show',true);
              }else{
                this.$set(this.gridData[i],'show',false);
              }
            }else{
              this.$set(this.gridData[i],'show',true);
            }
          }
        }
      }else{
        for(let i=0;i<this.gridData.length;i++){
          if(this.searchTableType == 1){
            if(this.gridData[i].selected == true){
              this.$set(this.gridData[i],'show',true);
            }else{
              this.$set(this.gridData[i],'show',false);
            }
          }else{
            this.$set(this.gridData[i],'show',true);
          }
        }
      }
    },
    downloadFile(fileName,dbName){
      const config={
        responseType: 'blob' //这个一定要设置，否则会出现文件下载后打不开的情况
      }
      let body = {'fileName': fileName};
      this.axios.post("/getFile",body,config).then(res=>{
        let blob=new Blob([res.data],{ //设置数据源
          type: 'application/octet-stream'  //设置文件格式
        })
        let objectUrl = URL.createObjectURL(blob); //创建下载的链接
        let a = document.createElement("a");
        a.href = objectUrl;
        a.download = dbName+'.'+fileName.split('.')[1]; //设置文件名
        //下面这个写法兼容火狐
        a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        window.URL.revokeObjectURL(blob); //释放bolb对象
      })

    },
    generateFileOpera(exportFileType){
      this.downFileLoading = true;
      this.$set(this.data,'exportFileType',exportFileType)
      let gridData = JSON.parse(JSON.stringify(this.gridData));
      let selectedTableArr = [];
      for(let i=0;i<gridData.length;i++){
        if(gridData[i].selected){
          selectedTableArr.push(gridData[i].tableName);
        }
      }
      this.axios.post("/makeFile",Object.assign(JSON.parse(JSON.stringify(this.data)),{"selectTableStr": selectedTableArr.join(",")})).then(resp =>{
        resp = resp.data;
        if (resp.resultCode == '000000') {
          let fileName = resp.params.fileName;
          let dbName = resp.params.dbName;
          this.downloadFile(fileName,dbName);
          this.downFileLoading = false;
        } else {
          this.downFileLoading = false;
          this.$message({
            message: resp.resultMsg,
            type: 'warning'
          }).catch(err =>{
            this.downFileLoading = false;
          });
        }
      });
    },
    getAllTables() {
      return new Promise((resolve, reject)=>{
        this.axios.post("/getAllTableInfo", Object.assign(this.data, {"exportFileType": "html"}))
          .then(resp => {
            resp = resp.data;
            this.loading = false;
            if (resp.resultCode === '000000') {
              for(let i=0;i<resp.params.length;i++){
                resp.params[i].show = true;
                resp.params[i].selected = false;
              }
              resolve(resp.params)
            } else {
              this.$message({
                message: resp.resultMsg,
                type: 'warning'
              });
              //reject(resp.resultMsg)
            }
          });
      });

    }
  },
  watch: {
    dialogVisible(val){
      if(val){
        this.emitParentEvent();
        this.getAllTables('html').then(res=>{
          this.gridData = res;
        });
      }
    },
  }
}
</script>
<style scoped>
  .drawer__content{
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
  }
  .drawer__footer{
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  .selected-card{
    border-color: green
  }
  .ellipsis {
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 使用省略号代替被隐藏的文本 */
  }
</style>
