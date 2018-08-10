<template>
  <div class="wrap">
    <el-form :model="data" :rules="rules" ref="ruleForm" label-width="100px" class="form">

      <el-form-item label="图表名称" prop="name">
        <el-input v-model="data.name" class="w320"></el-input>
      </el-form-item>

      <el-form-item label="图表选择" prop="type">
        <el-select v-model="data.type" clearable placeholder="请选择"  class="w320">
          <el-option
            v-for="item in chartTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="数据源" ></el-form-item>

      <el-form-item label="横轴(x)" prop="unit">
        <el-input v-model="data.xMin"  class="w150"></el-input>
        -
        <el-input v-model="data.xMax"  class="w150"></el-input>
      </el-form-item>

      <el-form-item label="纵轴(y)" prop="unit">
        <el-input v-model="data.yMin"  class="w150"></el-input>
        -
        <el-input v-model="data.yMax"  class="w150"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="onPreview"  type="primary">预览</el-button>
        <el-button size="small" @click="onDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <div class="chart" ref="chart" v-show="!rendering"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      rendering: false,
      chartTypes: [
        {value: 1, label: '饼图'},
        {value: 2, label: '柱状图'},
        {value: 3, label: '折线图'}],
      rules: {
        name: [
          { required: true, message: '请输入报表名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择报表类型', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    report: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 预览
    onPreview () {
      // this.rendering = true
      let chart = this.$refs['chart']
      echarts.dispose(chart)
      setTimeout(() => {
        if (!this.getAxisData()) return
        let option = {} // 指定图表的配置项和数据
        switch (this.data.type) {
          case 1:
            option = {
              title: {
                text: this.data.name
              },
              tooltip: {
                show: true
              },
              legend: {
                show: false
              },
              xAxis: {
                show: false
              },
              yAxis: {
                show: false
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: this.report.xyData
              }]
            }
            break
          case 2:
            option = {
              title: {
                text: this.data.name
              },
              legend: {
                show: true
              },
              xAxis: {
                show: true,
                data: this.report.xData
              },
              yAxis: {
                show: true
              },
              series: [{
                type: 'bar',
                barGap: '30%',
                barMaxWidth: '50%',
                data: this.report.yData
              }
              ]
            }
            break
          case 3:
            option = {
              title: {
                text: this.data.name
              },
              legend: {
                show: true,
                data: this.report.xData
              },
              xAxis: {
                show: true,
                data: this.report.xData
              },
              yAxis: {
                show: true
              },
              series: [{
                type: 'line',
                smooth: true,
                data: this.report.yData
              }
              ]
            }
            break
        }
        let myChart = echarts.init(chart)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      }, 0)
    },
    // 获取 X Y 轴的数据
    getAxisData () {
      if (!this.data.name) {
        this.$message.error(`请输入图表名称`)
        return false
      }
      if (!this.data.type) {
        this.$message.error(`请选择图表类型`)
        return false
      }
      let xMinColumn = /^\D+(?=\d)/.exec(this.data.xMin)[0].toUpperCase()
      let xMaxColumn = /^\D+(?=\d)/.exec(this.data.xMax)[0].toUpperCase()
      if (xMinColumn !== xMaxColumn) {
        this.$message.error('X 轴 起点跟终点不在同一列')
        return false
      }
      let xMinRowBegin = /\d+/.exec(this.data.xMin)[0] - 1
      let xMinRowEnd = /\d+/.exec(this.data.xMax)[0] - 1
      if (xMinRowBegin >= xMinRowEnd) {
        this.$message.error('X 轴 起点必须在终点之前')
        return false
      }
      let yMinColumn = /^\D+(?=\d)/.exec(this.data.yMin)[0].toUpperCase()
      let yMAxColumn = /^\D+(?=\d)/.exec(this.data.yMax)[0].toUpperCase()

      if (yMinColumn !== yMAxColumn) {
        this.$message.error('Y 轴 起点跟终点不在同一列')
        return false
      }
      let yMinRowBegin = /\d+/.exec(this.data.yMin)[0] - 1
      let yMinRowEnd = /\d+/.exec(this.data.yMax)[0] - 1
      if (yMinRowBegin >= yMinRowEnd) {
        this.$message.error('Y 轴 起点必须在终点之前')
        return false
      }
      if (xMinRowBegin !== yMinRowBegin || xMinRowEnd !== yMinRowEnd) {
        this.$message.error('X轴和Y轴的范围必须一致')
        return false
      }
      // console.log(this.report.reportDataContent)
      let xData = []
      let yData = []
      let xyData = []
      this.report.reportDataContent.map((item, index) => {
        if (index >= xMinRowBegin && index <= xMinRowEnd) {
          xData.push(item[xMinColumn])
          yData.push(item[yMinColumn])
          xyData.push({name: item[xMinColumn], value: item[yMinColumn]})
        }
      })
      this.report.xData = xData
      this.report.yData = yData
      this.report.xyData = xyData
      // console.log(xData, yData, xyData)
      return true
    },
    // 删除
    onDelete () {
      this.$emit('delete', this.data)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w320 {width: 312px;}
  .w150{width: 150px;}
  .mtb20 {margin: 20px 0;}
  .wrap{
    display: flex;
    border-top:1px solid #f5f5f5;
    border-bottom:1px solid #f5f5f5;
    background: #f5f5f5;
    margin: 5px 0;
  }
  .form {
    padding-top: 20px;
  }
  .chart{
    width: 500px;
    height: 400px;
    margin-left: 20px;
  }
</style>
