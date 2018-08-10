<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表列表</h3>
    </div>
    <div class="menu-bar">
      <span>报表类型</span>
      <el-select v-model="filter.reportFormTypeId" clearable placeholder="请选择">
        <el-option
          v-for="item in reportTypes"
          :key="item.reportFormTypeId"
          :label="item.reportFormTypeName"
          :value="item.reportFormTypeId">
        </el-option>
      </el-select>
      <span style="margin-left:20px;">报表名称</span>
      <el-input v-model="filter.reportFormName" style="width: 200px" placeholder="请输入报表名称"></el-input>

      <el-button type="primary" @click="getReportList" class="ml10">搜索</el-button>
      <el-button @click="chearSearch">清空</el-button>
    </div>
    <el-button class="addButton"
               @click="editReportChart"
               type="primary"
               style="width:150px;"
               icon="el-icon-plus">新增报表</el-button>
    <el-table :data="reportList" style="width: 100%">
      <el-table-column prop="reportFormName" label="报表名称" ></el-table-column>
      <el-table-column prop="reportFormTypeName" label="报表类型" ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editReportChart(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteReportChart(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        v-if="filter.total"
        class="v-page"
        @current-change="handleCurrentChange"
        :current-page.sync="filter.currentPage"
        :page-size="filter.showCount"
        layout="prev, pager, next, jumper"
        :total="filter.total">
      </el-pagination>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reportTypes: [], // 报表类型列表
      reportList: [], // 报表列表
      filter: {
        total: 0,
        currentPage: 0,
        showCount: 10,
        reportFormTypeId: undefined, // 报表类型ID
        reportFormName: undefined // 报表名称
      }
    }
  },
  methods: {
    // 分页
    handleCurrentChange (val) {
      if (val) {
        this.filter.currentPage = val
        this.getReportList()
      }
    },
    // 获取报表类型列表
    async getReportTypes () {
      let url = 'admin/reportFormType/list.do'
      let body = {
        currentPage: 0,
        showCount: 99999
      }
      let res = await this.$post(url, body)
      if (res.code === '1') {
        this.reportTypes = res.data.reportFormTypeArray
      }
      // console.log(res)
    },
    // 获取报表列表
    async getReportList () {
      let url = 'admin/reportForm/list.do'
      let res = await this.$post(url, this.filter)
      if (res.code === '1') {
        this.reportList = res.data.reportFormArray
        this.filter.total = res.data.totalResult
      }
      // console.log(res)
    },
    // 清空搜索条件
    chearSearch () {
      this.filter = {
        currentPage: 0,
        showCount: 10,
        reportFormTypeId: undefined, // 报表类型ID
        reportFormName: undefined // 报表名称
      }
      this.getReportList()
    },
    // 删除报表
    deleteReportChart (item) {
      this.$confirm('确认删除此报表吗？', {
      }).then(async () => {
        let url = 'admin/reportForm/delete.do'
        let body = {
          reportFormIdArray: JSON.stringify([{reportFormId: item.reportFormId}])
        }
        let res = await this.$post(url, body)
        if (res.code === '1') {
          this.$message({type: 'success', message: '删除成功!'})
          this.getReportList()
        } else {
          this.$message({type: 'error', message: '删除失败! ' + res.message})
        }
      }).catch()
    },
    // 编辑报表
    editReportChart (item) {
      let url = '/report/reportEdit'
      if (item && item.reportFormId) {
        url += `?id=${item.reportFormId}`
      }
      this.$router.push(url)
    }
  },
  created () {
    this.getReportTypes()
    this.getReportList()
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .ml10 {
    margin-left: 10px;
  }
  .listWrap {
    .mainBtn {
      padding: 20px 0 20px;
      border-top: 1px solid $border-base;
    }
    .showLongContent {
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .dialogContent {
      margin: 0 10px;
    }
  }

  .formWrap {
    padding: 40px 0 10px;
  }

  .refuseDialog {
    p {
      margin: 6px 0 0;
      text-align: right;
      color: $color-danger;
    }
    h4 {
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 6px;
    }

  }

  .addButton {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .menu-bar {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .menu-bar span {
    font-size: 14px;
    color: #333333;
    margin-right: 20px;
  }

  .footer {
    margin-top: 50px;
  }
</style>
