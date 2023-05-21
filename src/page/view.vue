<template>
  <el-container v-loading="loading" element-loading-text="数据获取中...">
    <el-header style="height: 120px;border-bottom: solid rgba(0,0,0,0.22) 1px">
      <div style="width: 100%;display: flex">
        <div style="display: flex;flex-direction: row;width: 50%;margin-left: 20px;margin-top: 10px;">
          <div>
            <img :src="logoImg" style="width: 100px;height: 100px">
          </div>
          <div style="display: flex;flex-direction: column;align-items: flex-start;margin-left: 15px">
            <span style="font-size: 46px;font-weight: bolder">database-export</span>
            <span style="margin-top: 10px">数据库表结构导出工具V4.0.0</span>
          </div>
        </div>
        <div style="width: 50%;cursor:pointer;display: flex;flex-direction: row-reverse;justify-items: center;align-items: center">
          <el-tooltip class="item" effect="dark" content="数据库" placement="bottom-start">
            <h1>{{dbInfo.dbName}}</h1>
          </el-tooltip>
          <img :src="databaseIconImg" style="width: 30px;height: 30px;margin-right: 10px;"/>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside style=" height: calc(100vh - 140px);padding-top: 10px;">
        <el-container style="height: 100%;">
          <el-header style="height: 50px;padding: 0;">
            <el-input v-model="searchTableName" :clearable="true" placeholder="搜索表名"  size="medium" style="width: 100%"></el-input>
          </el-header>
          <el-main style="padding: 0;height: calc(100vh - 140px);">
            <el-menu style="border: none">
              <el-menu-item @click.native="selectItem(item.value)" :title="item.value" style="text-align: left;overflow: hidden;text-overflow: ellipsis;color: black;" v-for="(item,index) in selectOptions" :key="index">
                <img :src="tableIconImg" style="width: 15px;height: 15px;margin-right: 5px;"/>{{index+1}}.{{ item.label }}
              </el-menu-item>
            </el-menu>
          </el-main>
        </el-container>
      </el-aside>
      <el-main id="scrollMain" class="my-content" style="padding: 30px;height: calc(100vh - 140px);padding-top: 10px;">
        <div :ref="item.tableName" v-for="(item,index) in tableData.tableDetailInfo" :key="index" style="margin-top: 50px;">
          <div style="display: flex;justify-content: left;align-items: center">
            <img :src="tableIconImg" style="width: 25px;height: 25px;margin-right: 10px;"/>
            <h1 style="font-size: 30px;">{{index+1}}.{{ item.tableName }}({{ item.tableComments }})</h1>
          </div>
          <el-table :data="item.tabsColumn" border style="width: 100%"
                    :header-cell-style="{
                      /*background:'#38a4ed',height:'50px',*/color:'#000000'
                    }">
            <el-table-column v-for="(item2,index2) in tableData.fieldList" :key="index2" :prop="item2.prop" :label="item2.label"></el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-backtop target=".my-content" :bottom="100">
        <div style="height: 100%;width: 100%;background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center;line-height: 40px;color: #1989fa;">UP</div>
      </el-backtop>
    </el-container>
  </el-container>
</template>

<script>
import logoImgPath from '../assets/logo.png'
import tableIconImgPath from '../assets/table-icon.png'
import databaseIconImgPath from '../assets/database-icon.png'
export default {
  name: 'htmlView',
  data() {
    return {
      logoImg: logoImgPath,
      tableIconImg: tableIconImgPath,
      databaseIconImg: databaseIconImgPath,
      searchTableName: '',
      tableData: [],
      loading: false,
      currentKey: 'ref1',
      itemOffsetTop: [],
      firstOffsetTop: 0
    }
  },
  computed: {
    dbInfo(){
      return JSON.parse(window.atob(this.$route.query.base64Params))
    },
    selectOptions() {
      let data = this.tableData.tableDetailInfo;
      if (data == undefined) {
        return [];
      }
      let a = [];
      for (let i = 0; i < data.length; i++) {
        let text = data[i].tableName + '(' + data[i].tableComments + ')';
        if(this.searchTableName && text.indexOf(this.searchTableName) == -1){
          continue
        }
        a.push({"value": data[i].tableName, 'label': text});
      }
      return a;
    },
  },
  mounted() {
    this.loadInfo();
    /*this.$nextTick(() => {
      this.changeView()
    });*/
  },
  methods: {
    /*initScrollData(){
      let data = this.tableData.tableDetailInfo;
      if (data == undefined) {
        return [];
      }
      this.itemOffsetTop = [];
      for (let i = 0; i < data.length; i++) {
        this.itemOffsetTop.push({
          key: data[i].tableName,
          num: this.$refs[ data[i].tableName][0].offsetTop - this.firstOffsetTop,
          height: this.$refs[data[i].tableName][0].clientHeight
        });
      }
    },*/
    onScroll(){
      return;
      const scrollTop = document.getElementById('scrollMain').scrollTop;
      this.itemOffsetTop.forEach((val, index) => {
        if(scrollTop > val.num && scrollTop - val.num > val.height / 2){
          if(index == this.itemOffsetTop.length - 1){
            this.currentKey = this.itemOffsetTop[index].key;
          }else {
            this.currentKey = this.itemOffsetTop[index + 1].key;
          }
        }else if(scrollTop < this.itemOffsetTop[0].height / 2){
          this.currentKey = this.itemOffsetTop[0].key;
        }
      })
    },
    //点击锚点定位
    selectItem(key){
      document.removeEventListener('scroll', this.onScroll);
      this.currentKey = key;
      let to = this.$refs[key][0].offsetTop - this.firstOffsetTop - 180;
      this.animationScrollTo(document.getElementById('scrollMain'), to);
    },
    //锚点定位动画滚动
    animationScrollTo(el, to) {
      let scrollY = 0;
      const beginY = el.scrollTop;
      const raf = window.requestAnimationFrame || (func => setTimeout(func, 10));
      const moveFn = () => {
        if (beginY - to < 0) {
          scrollY += (to - beginY) / 30;
          if(scrollY <= (to - beginY)){
            el.scrollTop = beginY + scrollY;
            raf(moveFn);
          }else {
            el.scrollTop = to;
            document.getElementById('scrollMain').addEventListener('scroll', this.onScroll);
          }
        }else if(beginY - to > 0){
          scrollY += (beginY - to) / 30;
          if(scrollY <= (beginY - to)){
            el.scrollTop = beginY - scrollY;
            raf(moveFn);
          }else {
            el.scrollTop = to;
            document.getElementById('scrollMain').addEventListener('scroll', this.onScroll);
          }
        }
      };
      raf(moveFn);
    },
    loadInfo: function () {
      this.loading = true;
      this.axios.get("/getTableData", {
        params: {base64Params: this.$route.query.base64Params}
      }).then(resp => {
        resp = resp.data;
        if (resp.resultCode == '000000') {
          this.tableData = resp.params;
         /* setTimeout(()=>{
            this.initScrollData();
          },2000)*/
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({
            message: resp.resultMsg,
            type: 'warning'
          });
        }
      }).catch(err => {
        this.loading = false;
      });
    }
  }
}
</script>
<style scoped>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: rgba(241, 238, 238, 0.96);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #ffffff;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
</style>
