<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表列表</h3>
    </div>
    <div class="menu-bar">
      <span style="margin-left:20px;">报表名称</span>
      <el-input v-model="filter.reportFormName" style="width: 200px" placeholder="请输入报表名称"></el-input>

      <el-button type="primary" @click="getReportList" class="ml10">搜索</el-button>
      <el-button @click="chearSearch">清空</el-button>
    </div>

    <div class="buttonBar">
      <el-button type="primary" plain @click="editReportChart">新增报表</el-button>
      <el-button type="success" plain @click="openBatchEdit">批量编辑</el-button>
    </div>

    <el-button-group>
      <el-button plain
                 :type="item.reportFormTypeId === filter.reportFormTypeId ? 'primary' : 'default'"
                 v-for="(item, index) in reportTypes"
                 :key="index"
                 @click="setReportType(item)">
        {{item.reportFormTypeName}}
      </el-button>
    </el-button-group>

    <el-table :data="reportList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60" label="编号"></el-table-column>
      <el-table-column prop="reportFormName" label="报表名称"></el-table-column>
      <el-table-column prop="reportFormTypeName" label="报表类型"></el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <!--<i class="icon el-icon-download r180" @click="moveTop(scope.row)"></i>-->
          <!--<i class="icon el-icon-download" @click="moveTail(scope.row)"></i>-->
          <!--<i class="icon el-icon-back r90" @click="moveUp(scope.row)"></i>-->
          <!--<i class="icon el-icon-back r270" @click="moveDown(scope.row)"></i>-->
          <el-input type="number"
                    v-model="scope.row.sort"
                    size="mini"
                    style="width: 100px"
                    @keydown.enter.native="editSort(scope.row)">
            <div slot="suffix">
              <i class="el-icon-success" style="line-height: 28px" @click="editSort(scope.row)"></i>
            </div>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editReportChart(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteReportChart(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        v-if="filter.total"
        class="v-page"
        @current-change="handleCurrentChange"
        :current-page.sync="filter.currentPage"
        :page-size="filter.showCount"
        layout="prev, pager, next, jumper"
        :total="filter.total">
      </el-pagination>

    </div>

    <!--批量编辑对话框-->
    <el-dialog title="批量编辑" :visible.sync="showBatchEdit" center width="350px">
      <span>报表类型 </span>
      <el-select v-model="batchEditReportFormTypeId" placeholder="请选择">
        <el-option
          v-for="item in reportTypes"
          :key="item.reportFormTypeId"
          :label="item.reportFormTypeName"
          :value="item.reportFormTypeId">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchEditFormType">确 定</el-button>
        <el-button @click="showBatchEdit = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      showBatchEdit: false, // 批量编辑
      batchEditReportFormTypeId: '', // 批量编辑id
      reportTypes: [], // 报表类型列表
      reportList: [], // 报表列表
      multipleSelection: [], // 表格多选
      filter: {
        total: 0,
        currentPage: 0,
        showCount: 20,
        reportFormTypeId: undefined, // 报表类型ID
        reportFormName: undefined // 报表名称
      }
    }
  },
  methods: {
    // 选择报表类型
    setReportType (item) {
      this.filter.reportFormTypeId = item.reportFormTypeId
      this.filter.currentPage = 0
      this.filter.showCount = 20
      this.getReportList()
    },
    // 分页
    handleCurrentChange (val) {
      if (val) {
        this.filter.currentPage = val
        this.getReportList()
      }
    },
    // 表格选中操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 获取报表类型列表
    async getReportTypes () {
      let url = 'admin/reportFormType/list.do'
      let body = {
        currentPage: 0,
        showCount: 99999
      }
      let res = await this.$post(url, body)
      if (res.code === '1') {
        this.reportTypes = res.data.reportFormTypeArray
        if (this.reportTypes.length) {
          this.filter.reportFormTypeId = this.reportTypes[0].reportFormTypeId
        }
      }
      // console.log(res)
    },
    // 获取报表列表
    async getReportList () {
      let url = 'admin/reportForm/list.do'
      let res = await this.$post(url, this.filter)
      if (res.code === '1') {
        this.reportList = res.data.reportFormArray
        this.filter.total = res.data.totalResult
      }
      // console.log(res)
    },
    // 清空搜索条件
    chearSearch () {
      this.filter = {
        currentPage: 0,
        showCount: 20,
        reportFormName: undefined // 报表名称
      }
      this.getReportList()
    },
    // 删除报表
    deleteReportChart (item) {
      this.$confirm('确认删除此报表吗？', {}).then(async () => {
        let url = 'admin/reportForm/delete.do'
        let body = {
          reportFormIdArray: JSON.stringify([{reportFormId: item.reportFormId}])
        }
        let res = await this.$post(url, body)
        if (res.code === '1') {
          this.$message({type: 'success', message: '删除成功!'})
          this.getReportList()
        } else {
          this.$message({type: 'error', message: '删除失败! ' + res.message})
        }
      }).catch()
    },
    // 编辑报表
    editReportChart (item) {
      let url = '/report/reportEdit'
      if (item && item.reportFormId) {
        url += `?id=${item.reportFormId}`
      }
      this.$router.push(url)
    },
    // 打开批量编辑
    openBatchEdit () {
      if (!this.multipleSelection.length) {
        this.$message.error('请至少选择一条记录')
        return
      }
      this.batchEditReportFormTypeId = this.filter.reportFormTypeId
      this.showBatchEdit = true
    },
    // 批量编辑
    async batchEditFormType () {
      if (this.batchEditReportFormTypeId === this.filter.reportFormTypeId) {
        this.$message.error('您选择的分类与当前分类一致,无需改变')
        return
      }
      let idArr = this.multipleSelection.map(item => {
        return {reportFormId: item.reportFormId}
      })
      let url = 'admin/reportForm/editTypeId.do'
      let body = {
        reportFormIdArray: JSON.stringify(idArr),
        reportFormTypeId: this.batchEditReportFormTypeId
      }
      let res = await this.$post(url, body)
      if (+res.code === 1) {
        this.$message.success('修改成功!')
        this.showBatchEdit = false
        this.getReportList()
      } else {
        this.$message.error(res.message)
      }
      // console.log('控制台打印:', res)
    },
    // 编辑序号
    async editSort (item) {
      let url = 'admin/reportForm/editSort.do'
      let body = {
        reportFormId: item.reportFormId,
        sort: item.sort
      }
      let res = await this.$post(url, body)
      if (+res.code === 1) {
        this.getReportList()
      } else {
        this.$message.error(res.message)
      }
    }
    // // 置顶
    // async moveTop (item) {
    //   let url = 'admin/reportForm/moveTop.do'
    //   let body = {reportFormId: item.reportFormId}
    //   let res = await this.$post(url, body)
    //   if (+res.code === 1) {
    //     this.getReportList()
    //   } else {
    //     this.$message.error(res.message)
    //   }
    // },
    // // 置底
    // async moveTail (item) {
    //   let url = 'admin/reportForm/moveTail.do'
    //   let body = {reportFormId: item.reportFormId}
    //   let res = await this.$post(url, body)
    //   if (+res.code === 1) {
    //     this.getReportList()
    //   } else {
    //     this.$message.error(res.message)
    //   }
    // },
    // // 上移
    // async moveUp (item) {
    //   let url = 'admin/reportForm/moveUp.do'
    //   let body = {reportFormId: item.reportFormId}
    //   let res = await this.$post(url, body)
    //   if (+res.code === 1) {
    //     this.getReportList()
    //   } else {
    //     this.$message.error(res.message)
    //   }
    // },
    // // 下移
    // async moveDown (item) {
    //   let url = 'admin/reportForm/moveDown.do'
    //   let body = {reportFormId: item.reportFormId}
    //   let res = await this.$post(url, body)
    //   if (+res.code === 1) {
    //     this.getReportList()
    //   } else {
    //     this.$message.error(res.message)
    //   }
    // }
  },
  async created () {
    await this.getReportTypes()
    this.getReportList()
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  /*排序icon*/
  .icon {
    cursor: pointer;
    padding: 5px;
    font-size: 16px;
  }

  .r90 {
    transform: rotate(90deg);
  }

  .r180 {
    transform: rotate(180deg);
  }

  .r270 {
    transform: rotate(270deg);
  }

  .ml10 {
    margin-left: 10px;
  }

  .buttonBar {
    margin: 30px 0;
  }

  .listWrap {
    .mainBtn {
      padding: 20px 0 20px;
      border-top: 1px solid $border-base;
    }
    .showLongContent {
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .dialogContent {
      margin: 0 10px;
    }
  }

  /*.typeList {*/
  /*border-bottom:2px solid #ebf2fc;*/
  /*margin: 15px 0;*/
  /*display: flex;*/
  /*}*/

  /*.typeItem {*/
  /*font-size: 16px;*/
  /*color: #333;*/
  /*margin-right: 10px;*/
  /*padding: 10px 20px;*/
  /*background: #ebf2fc;*/
  /*border-radius: 5px 5px 0 0;*/
  /*}*/
  /*.typeItemActive{*/
  /*color: #fff;*/
  /*background:#3c89ff;*/
  /*}*/

  .typeList {
    /*border-bottom:2px solid #ebf2fc;*/
    margin-top: 15px;
    display: flex;
  }

  .typeItem {
    font-size: 16px;
    color: #fff;
    background: #3c89ff;
    margin-right: 10px;
    padding: 10px 20px;
    border-radius: 5px 5px 0 0;
  }

  .typeItemActive {
    color: #333;
    background: #ebf2fc;
  }

  .formWrap {
    padding: 40px 0 10px;
  }

  .refuseDialog {
    p {
      margin: 6px 0 0;
      text-align: right;
      color: $color-danger;
    }
    h4 {
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 6px;
    }

  }

  .addButton {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .menu-bar {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .menu-bar span {
    font-size: 14px;
    color: #333333;
    margin-right: 20px;
  }

  .footer {
    margin-top: 50px;
  }
</style>
