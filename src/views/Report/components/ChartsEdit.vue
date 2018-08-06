<template>
  <div class="wrap">
    <div class="mtb20">
      <el-button class="w150" type="primary" icon="el-icon-plus" @click="addCharts">添加图表</el-button>
    </div>

    <Chart v-for="(item,index) in charts"
           :key="index"
           :data="item"
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
    return {
      charts: [
        {
          value4: '',
          name: '',
          subTitle: '',
          unit: '',
          remark: '',
          textarea: ''
        }
      ]
    }
  },
  methods: {
    // 添加图标
    addCharts () {
      this.charts.push({
        value4: '',
        name: '',
        subTitle: '',
        unit: '',
        remark: '',
        textarea: ''
      })
    },
    // 保存
    onSave () {},
    // 取消
    onCancel () {
      this.$confirm('确定要放弃保存吗?', '提示').then(() => {
        history.back()
      }).catch(() => {})
    },
    // 删除图表
    deleteChart (item) {
      this.charts = this.charts.filter(i => i !== item)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {width: 400px;}
  .w150{width: 150px;}
  .mtb20 {margin: 20px 0;}
</style>
