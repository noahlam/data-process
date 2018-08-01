<template>
  <div class="v-wrap listWrap">
    <el-button class="addButton" style="width:150px;" icon="el-icon-arrow-left">返回</el-button>
    <div class="main">
      <div class="main-title">
        <p>姓名:</p>
        <p>手机号:</p>
        <p>性别:</p>
        <p>微信OpenID:</p>
        <p>部门:</p>
        <p>微信授权:</p>
      </div>
      <div class="main-content">
        <p>张三</p>
        <p>18699999999</p>
        <p>女</p>
        <p>123456</p>
        <p>****</p>
        <p>待审核</p>
      </div>
    </div>
    <div class="floot">
      <i>*</i><span>共计登录次数：66</span><br>
      <i>*</i><span>创建时间:2018-07-10 16:10:21</span><br>
      <i>*</i><span>最后登录时间：2018-07-10 17：51：51</span>
    </div>
    <el-button class="floot-button" style="width:150px;">返回</el-button>
  </div>
</template>
<script>
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .listWrap{
    .mainBtn{
      padding: 20px 0 20px;
      border-top: 1px solid $border-base;
    }
  }
  .addButton{
    margin-top:10px;
    margin-bottom:10px;
  }
  .main{
    display:flex;
    font-size:16px;
    color:#666666;
    line-height:3;
  }
  .main-title{
    text-align:right;
    margin-left:30px;
    margin-right:30px;
  }
  .main-content{
    margin-left:20px;
  }
  i{
    color:red;
  }
  .floot{
    color:#666666;
    font-size:15px;
    line-height:2;
    margin-left:50px;
  }
  .floot-button{
    margin:30px 50px;
  }
</style>
