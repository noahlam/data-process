<template>
  <div class="wrap">
    <div class="mtb20">
      <el-button class="w150" type="primary" icon="el-icon-plus" @click="addCharts">添加图表</el-button>
    </div>

    <Chart v-for="(item,index) in data.reportFormItemArray"
           :key="index"
           :data="item"
           :report="data"
           @delete="deleteChart"
    ></Chart>

    <div class="mtb20">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import Chart from './Chart'
export default {
  components: {Chart},
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    // 添加图标
    addCharts () {
      this.data.reportFormItemArray.push({
        type: null,
        name: null,
        xMin: null,
        xMax: null,
        yMin: null,
        yMax: null
      })
    },
    // 保存
    async onSave () {
      let isValid = true
      this.data.reportFormItemArray.map((item, index) => {
        isValid = isValid && this.validateCharts(item, index)
      })
      let url = 'admin/reportForm/save.do'
      if (this.data.reportFormId) {
        url = 'admin/reportForm/edit.do'
      }
      let body = JSON.parse(JSON.stringify(this.data))
      body.reportDataContent = JSON.stringify(body.reportDataContent)
      body.reportFormItemArray = JSON.stringify(body.reportFormItemArray)
      body.xData = undefined
      body.yData = undefined
      body.xyData = undefined
      let res = await this.$post(url, body)
      if (res.code === '1') {
        this.$message.success('保存成功!')
        this.$router.push('/report/reportList')
      } else {
        this.$message.error('保存失败!' + res.message)
      }
      // console.log('控制台打印:', res)
    },
    // 取消
    onCancel () {
      this.$confirm('确定要放弃保存吗?', '提示').then(() => {
        history.back()
      }).catch(() => {})
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
    // 删除图表
    deleteChart (item) {
      this.data.reportFormItemArray = this.data.reportFormItemArray.filter(i => i !== item)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {width: 400px;}
  .w150{width: 150px;}
  .mtb20 {margin: 20px 0;}
</style>
