<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">用户列表</h3>
    </div>
    <el-form :model="formData" label-width="70px" class="v-form" @submit.native.prevent>
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户ID" >
            <el-input v-model="formData.memberId" :maxlength="10" @keyup.enter.native="toSearch"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" >
            <el-input v-model="formData.mobile" :maxlength="20" @keyup.enter.native="toSearch"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名" >
            <el-input v-model="formData.name" :maxlength="20" @keyup.enter.native="toSearch"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="toSearch">查询</el-button>
            <el-button icon="el-icon-delete" @click="toClear">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mainBtn">
      <el-button class="v-button" icon="el-icon-close" type="danger" @click="toAllDelete">批量删除</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column align="center" prop="memberId" label="用户ID" width="120px"> </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号"> </el-table-column>
      <el-table-column align="center" prop="name" label="姓名"> </el-table-column>
      <el-table-column align="center" prop="nickname" label="昵称"> </el-table-column>
      <el-table-column align="center" prop="sex" label="性别">
        <template slot-scope="scope">
          <!--0:女;1:男;2:保密-->
          <span v-if="scope.row.sex === 1">男</span>
          <span v-else-if="scope.row.sex === 0">女</span>
          <span v-else>保密</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="departmentName" label="部门"> </el-table-column>

      <el-table-column align="center" prop="date" label="状态" width="120px">
        <template slot-scope="scope">
          <!-- 0:未审核;1:审核通过;2:审核拒绝 -->
          <span v-if="scope.row.examineStatus === 1">已通过</span>
          <el-button v-else-if="scope.row.examineStatus === 0" type="text" @click="toAudit(scope.row.memberId)">待审核</el-button>
          <el-button v-else-if="scope.row.examineStatus === 2" type="text" @click="toAudit(scope.row.memberId)">未通过</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="150px">
        <template slot-scope="scope">
          <router-link :to="`/user/userDetail?memberId=${scope.row.memberId}`"><el-button size="small" type="primary" plain>查看</el-button></router-link>
          <el-button size="small" type="danger" plain @click="toSingleDelete(scope.row.memberId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data () {
    return {
      formData: {
        memberId: '',
        mobile: '',
        name: ''
      },
      listData: [],
      multiSelectList: [], // 多选
      mainLoading: false
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
      reqData = Object.assign({}, reqData, this.formData)
      this.mainLoading = true
      let res = await this.$post('admin/member/list.do', reqData)
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.listData = res.data.memberArray || []
      } else {
        this.$message.error(res.message)
      }
    },
    toSearch () {
      this.getList()
    },
    toClear () {
      this.formData = {
        memberId: '',
        mobile: '',
        name: ''
      }
      this.getList()
    },
    handleSelectionChange (val) {
      this.multiSelectList = val
    },
    // 去审核
    toAudit (memberId) {
      this.$confirm('该用户是否审核通过？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          console.log(action, instance)
          if (action === 'confirm' || action === 'cancel') {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
            } else {
              instance.cancelButtonLoading = true
              instance.cancelButtonText = '执行中...'
            }
            let memberIdArray = []
            memberIdArray.push({
              memberId
            })
            let url = action === 'confirm' ? 'admin/member/pass.do' : 'admin/member/refuse.do'
            let res = await this.$post(url, {memberIdArray: JSON.stringify(memberIdArray)})
            if (action === 'confirm') {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '通过'
            } else {
              instance.cancelButtonLoading = false
              instance.cancelButtonText = '不通过'
            }
            if (parseInt(res.code) === 1) {
              this.$message.success('审核成功')
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
    // 单个删除
    toSingleDelete (memberId) {
      let memberIdArray = []
      memberIdArray.push({
        memberId
      })
      this.toDeleteData(memberIdArray, 1)
    },
    // 多个删除
    toAllDelete () {
      if (!this.multiSelectList.length) {
        this.$message.error('请选择数据')
        return false
      }
      let memberIdArray = []
      this.multiSelectList.map(item => {
        memberIdArray.push({
          memberId: item.memberId
        })
      })
      this.toDeleteData(memberIdArray)
    },
    // 删除数据
    toDeleteData (memberIdArray, isSingle) {
      let text = isSingle ? '是否确认删除该用户信息？' : `是否删除选中的${memberIdArray.length}个用户信息？`
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'
            let res = await this.$post('admin/member/delete.do', {memberIdArray: JSON.stringify(memberIdArray)})
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
  }
</style>
