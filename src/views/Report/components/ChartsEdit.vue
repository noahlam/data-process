<template>
  <div class="wrap">
    <div class="mtb20">
      <el-button class="w150" type="primary" icon="el-icon-plus">添加图表</el-button>
    </div>

    <Chart></Chart>

  </div>
</template>
<script>
import Chart from './Chart'
export default {
  components: {Chart},
  data () {
    return {
      data: {
        value4: '',
        name: '',
        subTitle: '',
        unit: '',
        remark: '',
        textarea: ''
      }
    }
  },
  methods: {
    // 保存
    onSave () {}
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {width: 400px;}
  .w150{width: 150px;}
  .mtb20 {margin: 20px 0;}
</style>
