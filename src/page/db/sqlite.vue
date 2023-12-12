<template>
  <el-col :span="6">
    <el-popover
      placement="right"
      width="700"
      trigger="click"
      v-model="visible">
      <div style="margin: 30px 40px;">
        <el-form :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
          <el-form-item prop="dbName">
            <el-input v-model="data.dbName">
              <template slot="prepend">文件地址</template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row style="justify-content: center;align-items: center;display: flex">
          <el-tooltip class="item" effect="dark" content="Html预览" placement="top">
            <el-button type="success" style="margin-left: 20px;" icon="el-icon-view" circle @click="generateHtmlView()"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <el-button type="primary" style="margin-left: 20px;" icon="el-icon-download" circle @click="validateForm"></el-button>
          </el-tooltip>
          <select-table ref="selectTable" :data="data" @runParentShowEvent="runParentShowEvent"></select-table>
          <el-button style="margin-left: 20px;" type="danger" circle class="el-icon-circle-close" @click="visible = !visible"></el-button>
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
import sqliteIconPath from '../../assets/images/sqlite-icon-click.png'
import commonMixin from "./common-mixin";
import selectTable from "../select-table.vue";
export default {
  name: 'sqlite',
  mixins: [commonMixin],
  components: {selectTable},
  data(){
    return{
      ref: 'form',
      iconImg: sqliteIconPath,
      text: 'Sqlite',
      data: {
        'dbKind':'sqlite'
      },
      Rules: {
        dbName: [
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
