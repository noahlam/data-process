<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">操作日志</h3>
    </div>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%">
      <el-table-column align="center" label="编号" width="120px">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="操作者"> </el-table-column>
      <el-table-column align="center" prop="name" label="操作日期"> </el-table-column>
      <el-table-column align="center" prop="name" label="IP地址"> </el-table-column>
      <el-table-column align="center" prop="name" label="操作记录"> </el-table-column>
    </el-table>
    <el-pagination
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
      listData: [{}],
      pageInfo: {
        currentPage: 1,
        showCount: 20,
        total: 155
      }
    }
  },
  methods: {
    handleCurrentChange () {}
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';

</style>
