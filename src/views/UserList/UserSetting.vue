<template>
  <div class="v-wrap">
    <div class="v-title-box">
      <h3 class="v-title">用户详情</h3>
    </div>
    <el-form :model="formData" label-width="120px" class="v-form userInfoWrap" size="mini" @submit.native.prevent>
      <el-form-item label="姓名">张三 </el-form-item>
      <el-form-item label="手机号">18699999999 </el-form-item>
      <el-form-item label="性别">女 </el-form-item>
      <el-form-item label="微信OpenID">155632356adasdasasgagasgasga </el-form-item>
      <el-form-item label="部门">部门部门部门部门部门部门部门部门部门部门部门部门部门 </el-form-item>
      <el-form-item label="微信授权">待审核 </el-form-item>
      <el-form-item label="">
        <p>共计登录次数：66</p>
        <p>创建时间:2018-07-10 16:10:21</p>
        <p>最后登录时间：2018-07-10 17：51：51</p>
      </el-form-item>
      <el-form-item label="" style="margin-top: 30px">
        <el-button class="v-button" @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default{
  data () {
    return {
      formData: {}
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .userInfoWrap{
    margin-top: 20px;
    p{
      margin: 0;
      &:before{
        content: '• ';
      }
    }
    .el-form-item{
      margin-bottom: 10px;
    }
  }
</style>
