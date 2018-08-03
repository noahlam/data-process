<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表详情</h3>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">基础信息</span>
        <BaseInfo></BaseInfo>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">报表数据</span>
        <ReportData></ReportData>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">移动端生成图表</span>
        <ChartsEdit></ChartsEdit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BaseInfo from './components/BaseInfo'
import ReportData from './components/ReportData'
import ChartsEdit from './components/ChartsEdit'
export default {
  components: {BaseInfo, ReportData, ChartsEdit},
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value4: '',
      value1: '',
      textarea: '',
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
  i{
    color:red;
    margin-right:5px;
  }
  code{
    font-size:15px;
    color:#666666;
    margin-right:25px;
  }
  .top-bottom-20px{
    margin-top:10px;
    margin-bottom:10px;
  }
  .button-top-bottom{
    margin-top:40px;
    margin-bottom:20px;
  }
</style>
<style>
  .el-textarea .el-textarea__inner{
    height:100px;
  }
</style>
