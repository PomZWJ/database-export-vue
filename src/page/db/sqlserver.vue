<template>
  <el-col :span="6">
    <el-popover
      placement="right"
      width="700"
      trigger="click"
      v-model="visible">
      <div style="margin: 30px 40px;">
        <el-form :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
          <el-form-item prop="ip">
            <el-input placeholder="127.0.0.1" v-model="data.ip">
              <template slot="prepend">IP地址</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="port">
            <el-input placeholder="1443" v-model="data.port">
              <template slot="prepend">端&nbsp;&nbsp;&nbsp;口</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="dbName">
            <el-input v-model="data.dbName">
              <template slot="prepend">数据库</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="data.userName">
              <template slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="" v-model="data.password">
              <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row style="justify-content: center;align-items: center;display: flex">
          <el-dropdown placement="top">
            <el-button type="primary" class="el-icon-download">下载文件</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="generateFile('word')">word</el-dropdown-item>
              <el-dropdown-item @click.native="generateFile('excel')">excel</el-dropdown-item>
              <el-dropdown-item @click.native="generateFile('markdown')">markdown</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" style="margin-left: 20px;" class="el-icon-view" @click="generateHtmlView()">HTML预览</el-button>
          <el-button style="margin-left: 20px;" class="el-icon-circle-close" @click="visible = !visible">关闭</el-button>
        </el-row>
      </div>
      <el-card slot="reference" shadow="hover" style="padding: 0;margin: 10px 10px;cursor: pointer" v-loading="loading"  element-loading-text="生成文件中...">
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
import commonMixin from "./common-mixin";
export default {
  name: 'sqlserver',
  mixins: [commonMixin],
  data(){
    return{
      ref: 'form',
      iconImg: sqlserverIconPath,
      text: 'SQL Server',
      data: {
        'dbKind':'sqlserver'
      },
      Rules: {
        ip: [
          {required: true, message: '不能为空'}
        ],
        port: [
          {required: true, message: '不能为空'}
        ],
        dbName: [
          {required: true, message: '不能为空'}
        ],
        userName: [
          {required: true, message: '不能为空'}
        ],
        password: [
          {required: true, message: '不能为空'}
        ]
      },

    }
  },
  methods:{

  }
}
</script>
<style scoped>

</style>
