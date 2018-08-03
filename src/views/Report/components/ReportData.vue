<template>
  <div class="wrap">

    <el-button type="primary">
      <i class="el-icon-upload2 icon"></i>Excel导入
    </el-button>

    <div class="mtb20">表格数据</div>

    <el-table :data="tableData" style="width: 100%; margin: 20px 0;">
      <el-table-column prop="date" label="编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="报表类型" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger"  size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mtb20">
      <el-button type="primary" @click="gotoNext">下一步</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {width: 400px;}
  .mtb20 {margin: 20px 0;}
</style>
