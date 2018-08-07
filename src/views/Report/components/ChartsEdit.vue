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
    onSave () {},
    // 取消
    onCancel () {
      this.$confirm('确定要放弃保存吗?', '提示').then(() => {
        history.back()
      }).catch(() => {})
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
