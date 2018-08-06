<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表列表</h3>
    </div>
    <div class="menu-bar">
      <span>报表类型</span>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span style="margin-left:20px;">报表名称</span>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="searchReportCharts">搜索</el-button>
      <el-button>清空</el-button>
    </div>
    <router-link to="/report/reportEdit">
      <el-button class="addButton" type="primary" style="width:150px;" icon="el-icon-plus">新增报表</el-button>
    </router-link>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="编号" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="报表类型" width="180" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editReportChart(scope.row)">编辑</el-button>
          <el-button type="danger"  size="small" @click="deleteReportChart(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
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
  },
  methods: {
    // 搜索报表
    searchReportCharts () {},
    // 清空搜索条件
    chearSearchConditions () {},
    // 删除报表
    deleteReportChart (item) {
      console.log(item)
    },
    // 编辑报表
    editReportChart (item) {
      console.log(item)
    }
  },
  created () {
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
  .menu-bar{
    margin-top:20px;
    margin-bottom:20px;
  }
  .menu-bar span{
    font-size:14px;
    color:#333333;
    margin-right:20px;
  }
  .footer{
    margin-top:50px;
    float:right;
  }
</style>
