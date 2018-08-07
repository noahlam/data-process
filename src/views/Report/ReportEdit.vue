<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表详情</h3>
    </div>
    <el-tabs type="border-card" v-model="tabIndex">
      <el-tab-pane name="1">
        <span slot="label">基础信息</span>
        <BaseInfo :data="report" :types="typeList" @next="nextStep"></BaseInfo>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">报表数据</span>
        <ReportData :data="report" :settings="importSetting" @next="nextStep" v-if="tabIndex === '2'"></ReportData>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">移动端生成图表</span>
        <ChartsEdit :data="report"></ChartsEdit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BaseInfo from './components/BaseInfo'
import ReportData from './components/ReportData'
import ChartsEdit from './components/ChartsEdit'

export default {
  components: {BaseInfo, ReportData, ChartsEdit},
  data () {
    return {
      report: {
        reportFormTypeId: '', // 类型ID
        reportFormName: '', // 报表名称
        reportFormTitle: '', // 副标题
        reportFormUnit: '', // 单位
        reportFormRemark: '', // 备注/说明
        reportDataContent: [], // 报表数据参数集
        reportFormItemArray: [], // 图表数据参数集
        axisXKeys: [], // X 轴的key
        axisYKeys: [] // Y 轴的key
      },
      typeList: [], // 报表类型 列表
      importSetting: {
        data: [],
        language: 'zh-CN',
        autoWrapRow: true,
        mergeCells: true,
        minRows: 1,
        manualColumnResize: true,
        manualRowResize: true,
        manualColumnMove: true,
        manualRowMove: true,
        rowHeaders: true,
        contextMenu: true,
        colHeaders: true
      }, // 报表导入设置
      tabIndex: '1'
    }
  },
  methods: {
    // 获取报表数据
    async getReportData () {
      let url = 'admin/reportForm/detail.do'
      let body = {reportFormId: 1}
      let res = await this.$post(url, body)
      if (res.code === '1') {
        this.report = res.data
        this.report.reportDataContent = JSON.parse(this.report.reportDataContent)
        this.importSetting.data = this.report.reportDataContent
        this.report.reportFormTypeId = 1
        this.getAxisData()
      }
      // console.log(res)
    },
    // 获取 2 轴的数据
    getAxisData () {
      this.report.axisXKeys = []
      this.report.axisYKeys = []
      Object.keys(this.report.reportDataContent[0]).forEach(key => this.report.axisXKeys.push(key))
      for (let i = 1; i <= this.report.reportDataContent.length; i++) {
        this.report.axisYKeys.push(i)
      }
    },
    // 获取报表类型列表
    async getReportTypes () {
      let url = 'admin/reportFormType/list.do'
      let body = {
        currentPage: 1,
        showCount: 99999
      }
      let res = await this.$post(url, body)
      if (res.code === '1') {
        this.typeList = res.data.reportFormTypeArray
      }
      // console.log(res)
    },
    // 下一步
    nextStep (idx) {
      this.tabIndex = idx
    }
  },
  created () {
    this.getReportTypes()
    this.getReportData()
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';

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

  i {
    color: red;
    margin-right: 5px;
  }

  code {
    font-size: 15px;
    color: #666666;
    margin-right: 25px;
  }

  .top-bottom-20px {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .button-top-bottom {
    margin-top: 40px;
    margin-bottom: 20px;
  }
</style>
