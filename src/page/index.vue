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
            <span style="margin-top: 10px">数据库表结构导出工具V4.1.0</span>
          </div>
        </div>
        <div style="width: 50%;display: flex;flex-direction: row-reverse;justify-items: center;align-items: center">
          <get-money></get-money>
          <add-douyin></add-douyin>
          <add-wx></add-wx>
          <div style="margin-left: 20px;">
            <el-tooltip class="item" effect="dark" content="CSDN" placement="bottom">
              <img onclick="window.open('https://blog.csdn.net/huanguta1178/article/details/83690318')" :src="csdnIconImg" style="width: 30px;height: 30px;cursor: pointer;">
            </el-tooltip>
          </div>
          <div style="margin-left: 20px;">
            <el-tooltip class="item" effect="dark" content="Gitee" placement="bottom">
              <img onclick="window.open('https://gitee.com/pomz/database-export')" :src="giteeIconImg" style="width: 30px;height: 30px;cursor: pointer;">
            </el-tooltip>
          </div>
          <div style="margin-left: 20px;">
            <el-tooltip class="item" effect="dark" content="Github" placement="bottom">
              <img onclick="window.open('https://github.com/PomZWJ/database-export/')" :src="githubIconImg" style="width: 30px;height: 30px;cursor: pointer;">
            </el-tooltip>
          </div>
          <div style="margin-left: 20px;">
            <el-tooltip class="item" effect="dark" content="给我发邮件" placement="bottom">
              <img onclick="window.open('mailto:1513041820@qq.com')" :src="emailIconImg" style="width: 30px;height: 30px;cursor: pointer;">
            </el-tooltip>
          </div>
        </div>
      </el-header>
      <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)">
      </el-aside>
      <el-main>
        <el-row>
          <mysql></mysql>
          <oracle></oracle>
          <sqlserver></sqlserver>
          <postgresql></postgresql>
          <clickhouse></clickhouse>
          <sqlite></sqlite>
          <db2></db2>
          <dm></dm>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import logoImgPath from '../assets/logo.png'
import giteeIconPath from '../assets/images/Gitee-icon.png'
import githubIconPath from '../assets/images/Github-icon.png'
import emailIconPath from '../assets/images/email-icon.png'
import csdnIconPath from '../assets/images/csdn.png'


import AddWx from "./add-wx.vue";
import GetMoney from "./get-money.vue";
import Mysql from "./db/mysql.vue";
import Oracle from "./db/oracle.vue";
import Sqlserver from "./db/sqlserver.vue";
import Postgresql from "./db/postgresql.vue";
import Clickhouse from "./db/clickhouse.vue";
import Sqlite from "./db/sqlite.vue";
import AddDouyin from "./add-douyin.vue";
import Db2 from "./db/db2.vue";
import Dm from "./db/dm.vue";
export default {
  name: 'index',
  components: {Dm, Db2, AddDouyin, Sqlite, Clickhouse, Postgresql, Sqlserver, Oracle, Mysql, AddWx,GetMoney},
  data(){
    return{
      logoImg: logoImgPath,
      giteeIconImg: giteeIconPath,
      githubIconImg: githubIconPath,
      emailIconImg: emailIconPath,
      csdnIconImg: csdnIconPath
    }
  },
  methods:{

  }
}
</script>
<style scoped>

</style>
