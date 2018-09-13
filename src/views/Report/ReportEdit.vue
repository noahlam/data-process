<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表详情</h3>
      <el-button type="primary" @click="printReport">打印</el-button>
    </div>
    <el-tabs type="border-card" v-model="tabIndex">
      <el-tab-pane name="1">
        <span slot="label">报表数据</span>
        <ReportData :data="report"
                    :settings="importSetting"
                    @next="nextStep"
                    v-if="tabIndex === '1'">
        </ReportData>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">移动端生成图表</span>
        <ChartsEdit :data="report"></ChartsEdit>
      </el-tab-pane>
    </el-tabs>
    <PrintReport :data="report" :types="typeList" v-if="showPrint" @cb="closePrint"></PrintReport>
  </div>
</template>
<script>
import ReportData from './components/ReportData'
import ChartsEdit from './components/ChartsEdit'
import PrintReport from './components/PrintReport'

export default {
  components: {ReportData, ChartsEdit, PrintReport},
  data () {
    return {
      report: {
        reportFormId: 0, // 报表id,如果有说明的编辑
        reportFormTypeId: '', // 类型ID
        reportFormName: '', // 报表名称
        reportFormTitle: '', // 副标题
        reportFormUnit: '万美元', // 单位
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
        colHeaders: []
        // colWidths: 100
      }, // 报表导入设置
      tabIndex: '1',
      showPrint: false
    }
  },
  methods: {
    // 验证整个表单
    validForm () {
      let isValid = true
      if (!this.report.reportFormName) {
        this.$message.error(`请输入报表名称`)
        return false
      }
      if (!this.report.reportFormTypeId) {
        this.$message.error(`请选择报表类型`)
        return false
      }
      if (!this.report.reportDataContent.length) {
        this.$message.error(`请上传报表`)
        return
      }
      this.report.reportFormItemArray.map((item, index) => {
        isValid = isValid && this.validateCharts(item, index)
      })
      return isValid
    },
    // 验证 图表 表单
    validateCharts (chart, index) {
      if (!chart.name) {
        this.$message.error(`请输入第${index + 1}个图表的图表名称`)
        return false
      }
      if (!chart.type) {
        this.$message.error(`请选择第${index + 1}个图表: [${chart.name}] 的图表类型`)
        return false
      }
      if (!chart.xMin || !chart.xMax) {
        this.$message.error(`请输入第${index + 1}个图表: [${chart.name}] 的横轴数据范围`)
        return false
      }
      if (!chart.yMin || !chart.yMax) {
        this.$message.error(`请输入第${index + 1}个图表: [${chart.name}] 的纵轴数据范围`)
        return false
      }
      let xMinColumn = /^\D+(?=\d)/.exec(chart.xMin)[0].toUpperCase()
      let xMaxColumn = /^\D+(?=\d)/.exec(chart.xMax)[0].toUpperCase()
      if (xMinColumn !== xMaxColumn) {
        this.$message.error(`第${index + 1}个图表: [${chart.name}] 的 X 轴 起点跟终点不在同一列`)
        return false
      }
      let xMinRowBegin = /\d+/.exec(chart.xMin)[0] - 1
      let xMinRowEnd = /\d+/.exec(chart.xMax)[0] - 1
      if (xMinRowBegin >= xMinRowEnd) {
        this.$message.error(`第${index + 1}个图表: [${chart.name}] 的 X 轴 起点必须在终点之前`)
        return false
      }
      let yMinColumn = /^\D+(?=\d)/.exec(chart.yMin)[0].toUpperCase()
      let yMAxColumn = /^\D+(?=\d)/.exec(chart.yMax)[0].toUpperCase()

      if (yMinColumn !== yMAxColumn) {
        this.$message.error(`第${index + 1}个图表: [${chart.name}] 的 Y 轴 起点跟终点不在同一列`)
        return false
      }
      let yMinRowBegin = /\d+/.exec(chart.yMin)[0] - 1
      let yMinRowEnd = /\d+/.exec(chart.yMax)[0] - 1
      if (yMinRowBegin >= yMinRowEnd) {
        this.$message.error(`第${index + 1}个图表: [${chart.name}] 的 Y 轴 起点必须在终点之前`)
        return false
      }
      if (xMinRowBegin !== yMinRowBegin || xMinRowEnd !== yMinRowEnd) {
        this.$message.error(`第${index + 1}个图表: [${chart.name}] 的 X 轴和 Y 轴的范围必须一致`)
        return false
      }
      return true
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
    // 下一步
    nextStep (idx) {
      this.tabIndex = idx
    },
    // 打印
    printReport () {
      this.showPrint = true
    },
    // 关闭打印
    closePrint () {
      this.showPrint = false
    }
  },
  created () {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~@/styles/handsontable.full.scss';
</style>

<style lang="scss" scoped rel="stylesheet/scss">

  .listWrap {
    .mainBtn {
      padding: 20px 0 20px;
      border-top: 1px solid #e6e6e6;
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
      color: #f40009;
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
