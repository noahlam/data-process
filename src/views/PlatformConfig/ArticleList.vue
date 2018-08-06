<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">文章列表</h3>
    </div>
    <el-row class="mainBtn">
      <router-link to="/platformConfig/articleContent">
        <el-button class="v-button" icon="el-icon-plus" type="primary">添加</el-button>
      </router-link>
      <el-button class="v-button" icon="el-icon-close" type="danger">批量删除</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column align="center" prop="name" label="标题"> </el-table-column>
      <el-table-column align="center" prop="name" label="内容"> </el-table-column>
      <el-table-column align="center" prop="name" label="发布时间"> </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain>编辑</el-button>
          <el-button size="small" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data () {
    return {
      listData: [{}],
      multiSelectList: [], // 多选
      mainLoading: false
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multiSelectList = val
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .listWrap{
    .mainBtn{
      padding: 20px 0 10px;
    }
  }

</style>
