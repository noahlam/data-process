<template>
  <div class="wrap">
    <div class="chart" ref="chart" v-show="!isConverted"></div>
    <img ref="chartImg" class="img" v-show="isConverted" />
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      isConverted: false
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    report: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted () {
    this.onPreview()
  },
  methods: {
    // 预览
    onPreview () {
      let chart = this.$refs['chart']
      let chartImg = this.$refs['chartImg']
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
                show: true,
                formatter: v => {
                  let name = v.name + ''
                  if (name.length > 20) name = name.substr(0, 20) + '...'
                  let value = v.value + ''
                  if (value.length > 20) value = value.substr(0, 20) + '...'
                  return `<div style="max-width: 100px; white-space: normal;">${name} : ${value}</div>`
                }
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
                radius: '60%',
                animation: false,
                data: this.report.xyData,
                label: {
                  show: true,
                  interval: 0,
                  formatter: v => {
                    let n = v.name + ' ' + v.value
                    let arr = []
                    n = n.substr(0, 20)
                    for (let i = 0; i < n.length; i += 10) {
                      arr.push(n.substr(i, 10))
                    }
                    return arr.join('\n')
                  }
                }
              }]
            }
            break
          case 2:
            option = {
              title: {
                text: this.data.name
              },
              tooltip: {
                show: true,
                formatter: v => {
                  let name = v.name + ''
                  if (name.length > 20) name = name.substr(0, 20) + '...'
                  let value = v.value + ''
                  if (value.length > 20) value = value.substr(0, 20) + '...'
                  return `<div style="max-width: 100px; white-space: normal;">${name} : ${value}</div>`
                }
              },
              legend: {
                show: true
              },
              xAxis: {
                show: true,
                data: this.report.xData,
                axisLabel: {
                  interval: 0,
                  show: true,
                  formatter: v => {
                    let arr = []
                    let n = v.substr(0, 12)
                    for (let i = 0; i < n.length; i += 4) {
                      arr.push(n.substr(i, 4))
                    }
                    return arr.join('\n')
                  }
                }
              },
              yAxis: {
                show: true
              },
              grid: { // 控制图的大小，调整下面这些值就可以，
                show: true,
                left: '15%'
              },
              series: [{
                animation: false,
                label: {
                  normal: {
                    show: true,
                    position: 'top'
                  }
                },
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
              tooltip: {
                show: true,
                formatter: v => {
                  let name = v.name + ''
                  if (name.length > 20) name = name.substr(0, 20) + '...'
                  let value = v.value + ''
                  if (value.length > 20) value = value.substr(0, 20) + '...'
                  return `<div style="max-width: 100px; white-space: normal;">${name} : ${value}</div>`
                }
              },
              legend: {
                show: true,
                data: this.report.xData
              },
              xAxis: {
                show: true,
                data: this.report.xData,
                axisLabel: {
                  show: true,
                  interval: 0,
                  formatter: v => {
                    let arr = []
                    let n = v.substr(0, 12)
                    for (let i = 0; i < n.length; i += 4) {
                      arr.push(n.substr(i, 4))
                    }
                    return arr.join('\n')
                  }
                }
              },
              yAxis: {
                show: true
              },
              grid: {
                show: true,
                left: '15%'
              },
              series: [{
                animation: false,
                label: {
                  normal: {
                    show: true,
                    position: 'top'
                  }
                },
                type: 'line',
                smooth: true,
                symbolSize: 10,
                data: this.report.yData
              }
              ]
            }
            break
        }
        let myChart = echarts.init(chart)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        let url = myChart.getDataURL()
        chartImg.src = url
        this.isConverted = true
        this.$nextTick(() => {
          this.$emit('renderOk')
        })
      }, 0)
    },
    // 获取 X Y 轴的数据
    getAxisData () {
      let xMinColumn = /^\D+(?=\d)/.exec(this.data.xMin)[0].toUpperCase()
      let xMinRowBegin = /\d+/.exec(this.data.xMin)[0] - 1
      let xMinRowEnd = /\d+/.exec(this.data.xMax)[0] - 1
      let yMinColumn = /^\D+(?=\d)/.exec(this.data.yMin)[0].toUpperCase()
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
      return true
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .wrap {
    margin: 5px 0;
  }

  .chart {
    width: 1000px;
    height: 400px;
    /*display: none;*/
  }
  .img {
    flex-shrink: 0;
    width: 1000px;
    height: 400px;
  }
</style>
