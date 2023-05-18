export default {
  data() {
    return {
      data: {},
      loading: false,
      visible: false,
    }
  },
  props: {

  },
  methods: {
    initData(){
      this.loading = false
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
      this.loading = true;
      this.$set(this.data,'exportFileType',exportFileType)
      this.axios.get("/makeFile",{
        params:{base64Params: btoa(JSON.stringify(this.data))}
      }).then(resp =>{
        resp = resp.data;
        if (resp.resultCode == '000000') {
          let fileName = resp.params.fileName;
          let dbName = resp.params.dbName;
          this.downloadFile(fileName,dbName);
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({
            message: resp.resultMsg,
            type: 'warning'
          }).catch(err =>{
            this.loading = false;
          });
        }
      });
    },
    generateFile(exportFileType){
      this.$refs[this.ref].validate(valid => {
        if (valid) {
          this.generateFileOpera(exportFileType);
        }
      })

    },
    generateHtmlView(){
      this.$refs[this.ref].validate(valid => {
        if (valid) {
          let path = '/view' // 路由
          let {href} = this.$router.resolve({path, query: {'base64Params': btoa(JSON.stringify(this.data))}})
          window.open(href, '_blank')
        }
      })
    }
  },
  watch: {
    visible: function (newValue, oldValue) {
      if (newValue) {

      } else {

      }
    },
    loading(val){
      if(val){
        this.visible = false;
      }
    }
  }
}
