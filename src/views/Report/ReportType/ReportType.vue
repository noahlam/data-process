<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表类型</h3>
    </div>
    <el-row class="mainBtn">
      <el-button class="v-button" icon="el-icon-plus" type="primary" @click="toOpenEdit(null)">添加报表类型</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%">
      <el-table-column align="center" label="编号" width="120px">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="reportFormTypeName" label="报表类型"> </el-table-column>
      <el-table-column align="center" prop="reportFormTypeImage" label="移动端展示图片">
        <template slot-scope="scope">
          <img :src="scope.row.reportFormTypeImage" class="typeImg" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain  @click="toOpenEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" plain @click="toDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDialog v-model="editInfo.showDialog" :itemInfo="editInfo.itemInfo" @success="getList"/>
  </div>
</template>
<script>
import EditDialog from './components/EditDialog'
export default {
  name: 'reportType',
  components: {EditDialog},
  data () {
    return {
      mainLoading: false,
      listData: [],
      editInfo: {
        showDialog: false,
        itemInfo: null
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let reqData = {
        currentPage: 1,
        showCount: 10000
      }
      this.mainLoading = true
      let res = await this.$post('admin/reportFormType/list.do', reqData)
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.listData = res.data.reportFormTypeArray || []
      } else {
        this.$message.success(res.message)
      }
    },
    // 显示弹窗
    toOpenEdit (item) {
      this.editInfo.showDialog = true
      this.editInfo.itemInfo = item || null
    },
    // 删除
    toDelete (item) {
      this.$confirm('确认删除此报表类型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'
            let reportFormTypeIdArray = []
            reportFormTypeIdArray.push({
              reportFormTypeId: item.reportFormTypeId
            })
            let res = await this.$post('admin/reportFormType/delete.do', {reportFormTypeIdArray: JSON.stringify(reportFormTypeIdArray)})
            instance.confirmButtonLoading = false
            instance.confirmButtonText = '确定'
            if (parseInt(res.code) === 1) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        return true
      }).catch(() => {
        return false
      })
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
    .typeImg{
      vertical-align: top;
      width: 150px;
      height: 90px;
    }
  }

</style>
