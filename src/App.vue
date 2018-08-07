<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  @import '~@/styles/handsontable.full.scss';

  // 输入框 默认填充 颜色修改
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
    background-color: #fff !important;
     -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
     -webkit-text-fill-color: #1f2d3d !important;
    color: #666 !important;
  }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-textarea__inner{
    border-color: #e6e6e6;
  }
  .el-button--danger.is-plain:focus{
    color: #e5604a !important;
    background: #fcefed !important;
    border-color: #f5bfb7 !important;
  }
</style>
