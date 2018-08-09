<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">Banner设置</h3>
    </div>
    <el-row class="mainBtn">
      <el-button class="v-button" icon="el-icon-plus" type="primary" @click="toOpenEdit(null)">添加</el-button>
      <el-button class="v-button" icon="el-icon-close" type="danger" @click="toAllDelete">批量删除</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column align="center" prop="bannerImage" label="图片" width="310px">
        <template slot-scope="scope">
          <div class="imgBox">
            <img :src="scope.row.bannerImage" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="bannerName" label="Banner名称"> </el-table-column>
      <el-table-column align="center" prop="name" label="是否跳转">
        <template slot-scope="scope">
          {{scope.row.isJump ? '是':'否'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="jumpUrl" label="跳转链接"> </el-table-column>
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="moveUp(scope.row.bannerId)" v-if="scope.$index > 0">上移</el-button>
          <el-button type="text" @click="moveDown(scope.row.bannerId)" v-if="scope.$index < listData.length-1">下移</el-button>
          <el-button type="text" @click="toOpenEdit(scope.row)">编辑</el-button>
          <el-button type="text" class="v-red" @click="toSingleDelete(scope.row.bannerId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDialog v-model="editInfo.showDialog" :itemInfo="editInfo.itemInfo" @success="getList"/>
  </div>
</template>
<script>
import EditDialog from './components/EditDialog'
export default {
  components: {EditDialog},
  data () {
    return {
      listData: [],
      multiSelectList: [], // 多选
      mainLoading: false,
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
      let res = await this.$post('admin/banner/list.do', reqData)
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.listData = res.data.bannerArray || []
      } else {
        this.$message.error(res.message)
      }
    },
    handleSelectionChange (val) {
      this.multiSelectList = val
    },
    // 显示编辑弹窗
    toOpenEdit (item) {
      if (!item && this.listData.length >= 10) {
        this.$message.error('已达到10个，无法添加')
        return false
      }
      this.editInfo.showDialog = true
      this.editInfo.itemInfo = item || null
    },
    // 单个删除
    toSingleDelete (bannerId) {
      let bannerIdArray = []
      bannerIdArray.push({
        bannerId
      })
      this.toDeleteData(bannerIdArray, 1)
    },
    // 多个删除
    toAllDelete () {
      if (!this.multiSelectList.length) {
        this.$message.error('请选择数据')
        return false
      }
      let bannerIdArray = []
      this.multiSelectList.map(item => {
        bannerIdArray.push({
          bannerId: item.bannerId
        })
      })
      this.toDeleteData(bannerIdArray)
    },
    // 删除数据
    toDeleteData (bannerIdArray, isSingle) {
      let text = isSingle ? '是否删除该banner？' : `是否删除选中的${bannerIdArray.length}个banner？`
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'
            let res = await this.$post('admin/banner/delete.do', {bannerIdArray: JSON.stringify(bannerIdArray)})
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
    },
    // 上移
    moveUp (bannerId) {
      this.toMoveData(bannerId, -1)
    },
    moveDown (bannerId) {
      this.toMoveData(bannerId, 1)
    },
    async toMoveData (bannerId, step) {
      let url = step > 0 ? 'admin/banner/moveDown.do' : 'admin/banner/moveUp.do'
      let res = await this.$post(url, {bannerId})
      if (parseInt(res.code) === 1) {
        this.getList()
      } else {
        this.$message.error(res.message)
      }
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
    .imgBox{
      margin: 0 auto;
      width: 280px;
      height: 150px;
      border: 1px solid $border-base;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
