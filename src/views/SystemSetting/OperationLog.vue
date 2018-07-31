<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">操作日志</h3>
    </div>
    <h5 style="color:#333;">· 列表</h5>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="序号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作者"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="IP地址"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作记录"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'reportFormType',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎'
      }, {
        date: '2016-05-04',
        name: '王小虎'
      }, {
        date: '2016-05-01',
        name: '王小虎'
      }, {
        date: '2016-05-03',
        name: '王小虎'
      }]
    }
  }
}
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
  .addButton{
    margin-top:10px;
    margin-bottom:10px;
  }

</style>
