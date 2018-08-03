<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表类型</h3>
    </div>
    <el-row class="mainBtn">
      <el-button class="v-button" icon="el-icon-plus" type="primary" @click="toOpenEdit">添加报表类型</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%">
      <el-table-column align="center" label="编号" width="120px">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="报表类型"> </el-table-column>
      <el-table-column align="center" prop="name" label="移动端展示图片"> </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain  @click="toOpenEdit">编辑</el-button>
          <el-button size="small" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDialog v-model="editInfo.showDialog" />
  </div>
</template>
<script>
import EditDialog from './components/EditDialog'
export default {
  name: 'reportFormType',
  components: {EditDialog},
  data () {
    return {
      mainLoading: false,
      listData: [{}],
      editInfo: {
        showDialog: false
      }
    }
  },
  methods: {
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
