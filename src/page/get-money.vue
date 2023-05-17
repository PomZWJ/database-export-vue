<template>
  <el-popover
    placement="bottom"
    width="620"
    trigger="hover">
    <div style="display: flex;flex-direction: row">
      <div>
        <img :src="wxPayImg" style="width: 300px;height: 400px;cursor: pointer;">
      </div>
      <div style="margin-left: 20px">
        <img :src="aliPayIconImg" style="width: 300px;height: 400px;cursor: pointer;">
      </div>
    </div>
    <div style="margin-left: 20px;" slot="reference">
      <img :src="getMoneyIconImg" style="width: 30px;height: 30px;cursor: pointer;">
    </div>
  </el-popover>
</template>
<script>
import wxPayImgPath from "../assets/images/wechat_pay.png";
import aliPayIconPath from '../assets/images/ali_pay.jpg'
import getMoneyIconPath from '../assets/images/get_money.png'
export default {
  name: 'get-money',
  data(){
    return{
      wxPayImg: wxPayImgPath,
      aliPayIconImg: aliPayIconPath,
      getMoneyIconImg: getMoneyIconPath
    }
  },
  methods:{
  }
}
</script>
<style scoped>

</style>
