<template>
  <div class="v-wrap">
    <div class="v-title-box">
      <h3 class="v-title">用户详情</h3>
    </div>
    <el-form :model="detailInfo" label-width="120px" class="v-form userInfoWrap" size="mini" @submit.native.prevent v-loading="mainLoading">
      <el-form-item label="姓名">{{detailInfo.name}} </el-form-item>
      <el-form-item label="昵称">{{detailInfo.nickname}} </el-form-item>
      <el-form-item label="手机号">{{detailInfo.mobile}} </el-form-item>
      <el-form-item label="性别">
        <span v-if="detailInfo.sex === 1">男</span>
        <span v-else-if="detailInfo.sex === 2">女</span>
        <span v-else>保密</span>
      </el-form-item>
      <el-form-item label="微信OpenID">{{detailInfo.wxOpenId}} </el-form-item>
      <el-form-item label="部门">{{detailInfo.departmentName}} </el-form-item>
      <el-form-item label="微信授权">
        <span v-if="detailInfo.examineStatus === 1">已通过</span>
        <el-button type="text" v-else-if="detailInfo.examineStatus === 2" @click="toAudit">未通过</el-button>
        <el-button type="text" v-else-if="detailInfo.examineStatus === 0" @click="toAudit">待审核</el-button>
      </el-form-item>
      <el-form-item label="">
        <p>共计登录次数：{{detailInfo.loginNum}}</p>
        <p>创建时间：{{$moment(detailInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
        <p>最后登录时间：{{detailInfo.loginTime ? $moment(detailInfo.loginTime).format('YYYY-MM-DD HH:mm:ss') : ''}}</p>
      </el-form-item>
      <el-form-item label="" style="margin-top: 30px">
        <el-button class="v-button" @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default{
  data () {
    return {
      memberId: this.$route.query.memberId,
      mainLoading: false,
      detailInfo: {}
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      this.mainLoading = true
      let res = await this.$post('admin/member/detail.do', {memberId: this.memberId})
      this.mainLoading = false
      if (parseInt(res.code)) {
        this.detailInfo = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    // 去审核
    toAudit () {
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
              memberId: this.memberId
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
              this.getDetail()
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
  .userInfoWrap{
    margin-top: 20px;
    p{
      margin: 0;
      &:before{
        content: '• ';
      }
    }
    .el-form-item{
      margin-bottom: 10px;
    }
  }
</style>
