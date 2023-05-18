<template>
  <el-popover
    placement="bottom"
    width="300"
    trigger="hover">
    <img :src="douyinImg" style="width: 300px;height: 450px;cursor: pointer;">
    <div style="margin-left: 20px;" slot="reference">
      <img :src="douyinIconImg" style="width: 30px;height: 30px;cursor: pointer;">
    </div>
  </el-popover>
</template>
<script>
import douyinImgPath from "../assets/images/douyin-qr.png";
import douyinIconPath from '../assets/images/douyin.png'
export default {
  name: 'add-douyin',
  data(){
    return{
      douyinImg: douyinImgPath,
      douyinIconImg: douyinIconPath
    }
  },
  methods:{
  }
}
</script>
<style scoped>

</style>
