<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">模板审核</h3>
    </div>
    <el-form :model="formData"  class="v-form v-forTree formWrap" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商家">
            <el-input v-model="formData.customerName" :maxlength="40" @keyup.enter.native="toSearch"  placeholder="请输入"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模板名称">
            <el-input v-model="formData.templateName" :maxlength="40" @keyup.enter.native="toSearch" placeholder="请输入"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Key">
            <el-input v-model="formData.templateKey" :maxlength="40" @keyup.enter.native="toSearch" placeholder="请输入"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="内容">
            <el-input v-model="formData.templateContent" :maxlength="200" @keyup.enter.native="toSearch" placeholder="请输入"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核状态">
            <el-select v-model="formData.examineStatus" placeholder="请选择">
              <el-option label="全部" value=""> </el-option>
              <el-option label="审核通过" :value="1"> </el-option>
              <el-option label="审核拒绝" :value="2"> </el-option>
              <el-option label="审核中" :value="0"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button class="v-button" type="primary" icon="el-icon-search" @click="toSearch">搜 索</el-button>
            <el-button class="v-button" plain icon="el-icon-delete" @click="toClearForm">清空条件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mainBtn">
      <el-button class="v-button" type="primary" plain   @click="toPassModule()"  >批量通过</el-button>
      <el-button class="v-button" type="danger" plain   @click="toRefuseModule()" >批量拒绝</el-button>
    </el-row>
    <el-table class="listTable" v-loading="mainLoading"  :data="listData" @selection-change="handleSelection" style="width: 100%">
      <div slot="empty">暂时还没有短信模板</div>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="模板名称" prop="templateName"  align="center"> </el-table-column>
      <el-table-column label="Key" prop="templateKey"  align="center"> </el-table-column>
      <el-table-column label="内容" prop="content"  align="center">
        <template slot-scope="scope">
          <p class="showLongContent" @click="toShowContentDialog(scope.row.templateContent)">{{scope.row.templateContent}}</p>
        </template>
      </el-table-column>
      <el-table-column label="商家" prop="enterpriseName"  align="center"> </el-table-column>
      <el-table-column label="审核状态" prop="examineStatus"  align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.examineStatus === 0">审核中</span>
          <span v-if="scope.row.examineStatus === 1">审核通过</span>
          <span v-if="scope.row.examineStatus === 2">审核拒绝</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain v-if="scope.row.examineStatus === 0"  @click="toSinglePassModule(scope.row.templateId)"  >通过</el-button>
          <el-button size="small" type="danger" plain v-if="scope.row.examineStatus !== 2"   @click="toRefuseModule(scope.row.templateId)"  >拒绝</el-button>
          <span v-if="scope.row.examineStatus === 2"> - </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="v-page" v-if="pageInfo.totalResult">
      <el-pagination
         :current-page="pageInfo.currentPage"
         :page-size="pageInfo.showCount"
         layout=" prev, pager, next, jumper"
         @current-change="handleCurrentChange"
         :total="pageInfo.totalResult">
      </el-pagination>
    </div>
    <!-- 内容的弹窗 -->
    <el-dialog title="查看内容" :visible.sync="contentDialog.dialogVisible" v-if="contentDialog.dialogVisible" center width="30%">
      <div>
        <p class="dialogContent">{{contentDialog.content}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="contentDialog.dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 拒绝的弹窗 -->
    <el-dialog title="确认" :visible.sync="refuseDialog.dialogVisible" v-if="refuseDialog.dialogVisible" center width="600px" class="refuseDialog">
      <el-form :model="refuseDialog" :rules="refuseDialog.refuseRules" ref="refuseDialogRef">
        <el-form-item label="请填写拒绝原因：" prop="refuseContent">
          <el-input type="textarea" :rows="8" resize="none" :maxlength="200" placeholder="请输入" v-model="refuseDialog.refuseContent"> </el-input>
          <p>{{refuseDialog.refuseContent.length > 200 ? 200 : refuseDialog.refuseContent.length}}/200</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="refuseDialog.submitLoading" @click="toSubmitRefuse">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'template-list',
  data () {
    return {
      mainLoading: false,
      formData: {
        examineStatus: '',
        templateName: '',
        templateKey: '',
        templateContent: '',
        customerName: ''
      },
      pageInfo: {
        currentPage: 1,
        showCount: 20,
        totalResult: 0
      },
      listData: [],
      multipleSelection: [], // 多选的数组
      contentDialog: {
        dialogVisible: false,
        content: ''
      },
      refuseDialog: { // 拒绝弹窗的信息
        currentId: -1, // 当前要拒绝的id 有代表是单个拒绝， 没有就是批量拒绝
        dialogVisible: false,
        refuseContent: '',
        submitLoading: false,
        refuseRules: {
          refuseContent: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]
        }
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获得列表
    async getList () {
      let reqDate = {
        currentPage: this.pageInfo.currentPage,
        showCount: this.pageInfo.showCount
      }
      reqDate = Object.assign({}, reqDate, this.formData)
      this.mainLoading = true
      let res = await this.$post('admin/mobileSmsTemplate/searchTemplate.do', reqDate)
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.listData = res.templateArray
        this.pageInfo.totalResult = res.totalResult
      } else {
        this.$message.error(res.message)
      }
    },
    // 查询
    toSearch () {
      this.pageInfo.currentPage = 1
      this.getList()
    },
    // 清空
    toClearForm () {
      this.formData = {
        examineStatus: '',
        templateName: '',
        templateKey: '',
        templateContent: '',
        customerId: ''
      }
      this.pageInfo.currentPage = 1
      this.getList()
    },
    // 切换页面
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      document.querySelector('.mainContent').scrollTo(0, 0)
      this.getList()
    },
    // 处理多选
    handleSelection (val) {
      this.multipleSelection = val
    },
    // 查看内容
    toShowContentDialog (content) {
      this.contentDialog.content = content
      this.contentDialog.dialogVisible = true
    },
    // 单个通过模板
    toSinglePassModule (templateId) {
      this.$confirm('确认通过该短信模板吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

            let res = await this.$post('admin/mobileSmsTemplate/pass.do', {templateId})
            if (parseInt(res.code) === 1) {
              this.$message.success('成功审核通过')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
            instance.confirmButtonLoading = false
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        console.log('执行了')
      }).catch(() => {
        console.log('失败')
      })
    },
    // 批量通过模板
    toPassModule () { // type 1:单个通过 2:是批量通过
      if (!this.multipleSelection || !this.multipleSelection.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm(`确认通过选中的 ${this.multipleSelection.length} 条短信模板吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

            let templateIdArrayStr = []
            this.multipleSelection.map(item => {
              templateIdArrayStr.push({
                templateId: item.templateId
              })
            })
            let res = await this.$post('admin/mobileSmsTemplate/passBatch.do', {templateIdArrayStr: JSON.stringify(templateIdArrayStr)})
            if (parseInt(res.code) === 1) {
              this.$message.success(`已成功通过 ${res.successNum || 0} 条，失败 ${res.failNum || 0} 条！`)
              this.getList()
            } else {
              this.$message.error(res.message)
            }
            instance.confirmButtonLoading = false
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        console.log('执行了')
      }).catch(() => {
        console.log('失败')
      })
    },
    // 拒绝模板
    toRefuseModule (id) { // type 1:单个通过 2:是批量通过
      if (!id && (!this.multipleSelection || !this.multipleSelection.length)) {
        this.$message.warning('请选择数据')
        return
      }

      this.refuseDialog.currentId = id || -1
      this.refuseDialog.dialogVisible = true
      this.refuseDialog.refuseContent = ''
    },
    // 提交拒绝
    toSubmitRefuse () {
      this.$refs['refuseDialogRef'].validate(async valid => {
        if (!valid) {
          return false
        }
        let url = ''
        let reqData = {
          reason: this.refuseDialog.refuseContent
        }
        if (this.refuseDialog.currentId !== -1) { // 单个拒绝
          url = 'admin/mobileSmsTemplate/refuse.do'
          reqData.templateId = this.refuseDialog.currentId
        } else {
          url = 'admin/mobileSmsTemplate/refuseBatch.do'
          let templateIdArrayStr = []
          this.multipleSelection.map(item => {
            templateIdArrayStr.push({
              templateId: item.templateId
            })
          })
          reqData.templateIdArrayStr = JSON.stringify(templateIdArrayStr)
        }
        this.refuseDialog.submitLoading = true
        let res = await this.$post(url, reqData)
        this.refuseDialog.submitLoading = false
        if (parseInt(res.code) === 1) {
          if (this.refuseDialog.currentId !== -1) { // 单个拒绝
            this.$message.success('成功拒绝审核')
          } else {
            this.$message.success(`已成功拒绝 ${res.successNum || 0} 条，失败 ${res.failNum || 0} 条！`)
          }
          this.getList()
          this.refuseDialog.dialogVisible = false
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .listWrap{
    .mainBtn{
      padding: 20px 0 20px;
      border-top: 1px solid $border-base;
    }
    .showLongContent{
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
    .dialogContent{
      margin: 0 10px;
    }
  }
  .formWrap{
    padding: 40px 0 10px;
  }
  .refuseDialog{
    p{
      margin: 6px 0 0;
      text-align: right;
      color: $color-danger;
    }
    h4{
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 6px;
    }

  }

</style>
<style lang="scss"  rel="stylesheet/scss">
  .refuseDialog{
    .el-dialog__body{
      padding: 10px 30px ;
    }
  }
</style>
