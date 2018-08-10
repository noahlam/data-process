<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">操作日志</h3>
    </div>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%">
      <el-table-column align="center" label="序号" width="60px">
        <template slot-scope="scope">
          {{(pageInfo.currentPage - 1)*pageInfo.showCount +  scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label="操作者"> </el-table-column>
      <el-table-column align="center" prop="createTime" label="操作日期">
        <template slot-scope="scope">
          {{$moment(scope.row.createTime).format('YYYY-MM-DD HH:mm')}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ip" label="IP地址"> </el-table-column>
      <el-table-column align="center" prop="content" label="操作记录" min-width="300px"> </el-table-column>
    </el-table>
    <el-pagination
       v-if="pageInfo.total"
       class="v-page"
       @current-change="handleCurrentChange"
       :current-page.sync="pageInfo.currentPage"
       :page-size="pageInfo.showCount"
       layout="prev, pager, next, jumper"
       :total="pageInfo.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'reportType',
  data () {
    return {
      mainLoading: false,
      listData: [],
      pageInfo: {
        currentPage: 1,
        showCount: 20,
        total: 0
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let reqData = {
        currentPage: this.pageInfo.currentPage,
        showCount: this.pageInfo.showCount
      }
      this.mainLoading = true
      let res = await this.$post('admin/log/list.do', reqData)
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.listData = res.data.logArray || []
        this.pageInfo.total = res.data.totalResult
      } else {
        this.$message.error(res.message)
      }
    },
    handleCurrentChange (val) {
      if (val) {
        this.pageInfo.currentPage = val
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';

</style>
