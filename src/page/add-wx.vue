<template>
  <el-popover
    placement="bottom"
    width="300"
    trigger="hover">
    <img :src="wxImg" style="width: 300px;height: 400px;cursor: pointer;">
    <div style="margin-left: 20px;" slot="reference">
      <img :src="wxIconImg" style="width: 30px;height: 30px;cursor: pointer;">
    </div>
  </el-popover>
</template>
<script>
import wxImgPath from "../assets/images/mywxqr.png";
import wxIconPath from '../assets/images/wx-icon-click.png'
export default {
  name: 'add-wx',
  data(){
    return{
      wxImg: wxImgPath,
      wxIconImg: wxIconPath
    }
  },
  methods:{
  }
}
</script>
<style scoped>

</style>
