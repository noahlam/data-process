<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">Banner设置</h3>
    </div>
    <el-row class="mainBtn">
      <el-button class="v-button" icon="el-icon-plus" type="primary" @click="toOpenEdit">添加</el-button>
      <el-button class="v-button" icon="el-icon-close" type="danger">批量删除</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column align="center" prop="name" label="图片"> </el-table-column>
      <el-table-column align="center" prop="name" label="Banner名称"> </el-table-column>
      <el-table-column align="center" prop="name" label="是否跳转"> </el-table-column>
      <el-table-column align="center" prop="name" label="跳转链接"> </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text">上移</el-button>
          <el-button type="text">下移</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDialog v-model="editInfo.showDialog" />
  </div>
</template>
<script>
import EditDialog from './components/EditDialog'
export default {
  components: {EditDialog},
  data () {
    return {
      listData: [{}],
      multiSelectList: [], // 多选
      mainLoading: false,
      editInfo: {
        showDialog: false
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multiSelectList = val
    },
    toOpenEdit () {
      this.editInfo.showDialog = true
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
