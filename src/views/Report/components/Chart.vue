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
        <el-select v-model="data.xMin" placeholder="请选择">
          <el-option
            v-for="item in report.axisXKeys"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        -
        <el-select v-model="data.xMax" placeholder="请选择">
          <el-option
            v-for="item in report.axisXKeys"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="纵轴(y)" prop="unit">
        <el-select v-model="data.yMin" placeholder="请选择">
          <el-option
            v-for="item in report.axisYKeys"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        -
        <el-select v-model="data.yMax" placeholder="请选择">
          <el-option
            v-for="item in report.axisYKeys"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="onPreview"  type="primary">预览</el-button>
        <el-button size="small" @click="onDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
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
      let chart = this.$refs['chart']
      var myChart = echarts.init(chart)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.data.name
        },
        tooltip: {},
        legend: {
          data: ['销量', '成本']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '成本',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
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
    width: 400px;
    height: 400px;
    margin-left: 20px;
  }
</style>
