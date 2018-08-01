<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">修改密码</h3>
    </div>
    <div class="top-bottom-20px">
      <span>旧密码</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:250px;">
      </el-input>
    </div>
    <div class="top-bottom-20px">
      <span>新密码</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:250px;">
      </el-input>
    </div>
    <div class="top-bottom-20px">
      <span style="margin-right:25px;">再次输入</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:250px;">
      </el-input>
    </div>
    <el-button type="primary" style="width:120px;">保存</el-button>
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
    .showLongContent{
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
    .dialogContent{
      margin: 0 10px;
    }
  }
  .formWrap{
    padding: 40px 0 10px;
  }
  .refuseDialog{
    p{
      margin: 6px 0 0;
      text-align: right;
      color: $color-danger;
    }
    h4{
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 6px;
    }
  }
  .top-bottom-20px{
    margin-top:20px;
    margin-bottom:20px;
  }
  .top-bottom-20px span{
    font-size:15px;
    color:#666666;
    margin-right:40px;
  }
</style>
