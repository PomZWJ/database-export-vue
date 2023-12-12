export default {
  data() {
    return {
      data: {},
      visible: false,
    }
  },
  props: {

  },
  methods: {
    runParentShowEvent(){
      this.visible = !this.visible
    },
    validateForm(){
      this.$refs[this.ref].validate(valid => {
        if (valid) {
          this.$refs.selectTable.showSelectTableDialog();
        }
      })
    },
    generateHtmlView() {
      this.$refs[this.ref].validate(valid => {
        if (valid) {
          let path = '/view' // 路由
          let data = JSON.parse(JSON.stringify(this.data));
          data.exportFileType = 'html';
          let {href} = this.$router.resolve({path, query: {'base64Params': btoa(JSON.stringify(data))}})
          window.open(href, '_blank')
        }
      })
    },
  },
  watch: {
    visible: function (newValue, oldValue) {
      if (newValue) {

      } else {

      }
    }
  }
}
