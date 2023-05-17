<template>
  <el-col :span="6">
    <el-popover
      placement="right"
      width="700"
      trigger="click"
      v-model="visible">
      <div style="margin: 30px 40px;">
        <el-form :model="data" class="el-form-default" :validate-on-rule-change="false">
          <el-form-item>
            <el-input placeholder="127.0.0.1" v-model="data.ip">
              <template slot="prepend">IP地址</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="3306" v-model="data.port">
              <template slot="prepend">端&nbsp;&nbsp;&nbsp;口</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="data.dbName">
              <template slot="prepend">数据库</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="root" v-model="data.userName">
              <template slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="" v-model="data.password">
              <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row style="justify-content: center;align-items: center;display: flex">
          <el-popover placement="top" trigger="click" width="340">
            <el-row>
              <el-button class="el-icon-download" type="primary" plain @click="generateFile('word')">word</el-button>
              <el-button class="el-icon-download" type="primary" plain @click="generateFile('excel')">excel</el-button>
              <el-button class="el-icon-download" type="primary" plain @click="generateFile('markdown')">markdown</el-button>
            </el-row>
            <el-button type="primary" class="el-icon-download" slot="reference">生成文档</el-button>
          </el-popover>
          <el-button type="primary" style="margin-left: 20px;" class="el-icon-view" @click="generateHtmlView()">HTML预览</el-button>
          <el-button style="margin-left: 20px;" class="el-icon-circle-close" @click="visible = !visible">关闭</el-button>
        </el-row>
      </div>
      <el-card slot="reference" shadow="hover" style="padding: 0;margin: 10px 10px;cursor: pointer">
        <div style="width: 100%;height: 200px;display: flex;justify-content: center;align-items: center;">
          <img :src="iconImg" style="width: 100px;height: 100px;">
        </div>
        <div style="padding: 14px;">
          <h1>{{text}}</h1>
        </div>
      </el-card>
    </el-popover>
  </el-col>
</template>
<script>
import sqlserverIconPath from '../../assets/images/sqlserver-icon-click.png'
export default {
  name: 'sqlserver',
  data(){
    return{
      iconImg: sqlserverIconPath,
      text: 'SQL Server',
      data: {
        'dbKind':'sqlserver'
      },
      visible: false
    }
  },
  methods:{
    generateFile(){

    },
    generateHtmlView(){
      debugger
      if (!this.data.ip) {
        this.$message.error('IP不能为空');
        return;
      }else if (!this.data.port) {
        this.$message.error('端口不能为空');
        return;
      }else if (!this.data.dbName) {
        this.$message.error('实例/数据库名称不能为空');
        return;
      }else if (!this.data.userName) {
        this.$message.error('用户名不能为空');
        return;
      }else if (!this.data.password) {
        this.$message.error('密码不能为空');
        return;
      }
      let path = '/view' // 路由
      let {href} = this.$router.resolve({path, query: {'base64Params': btoa(JSON.stringify(this.data))}})
      window.open(href, '_blank')


    }
  }
}
</script>
<style scoped>

</style>
