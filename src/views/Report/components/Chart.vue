<template>
  <div class="wrap">
    <el-form :model="data" :rules="rules" ref="ruleForm" label-width="100px" style="width: 420px;">

      <el-form-item label="图表名称" prop="name">
        <el-input v-model="data.name" class="w320"></el-input>
      </el-form-item>

      <el-form-item label="图表选择" prop="type">
        <el-select v-model="value4" clearable placeholder="请选择"  class="w320">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="数据源" ></el-form-item>

      <el-form-item label="横轴(x)" prop="unit">
        <el-input v-model="data.unit"  class="w150"></el-input>
        -
        <el-input v-model="data.unit"  class="w150"></el-input>
      </el-form-item>

      <el-form-item label="纵轴(y)" prop="unit">
        <el-input v-model="data.unit"  class="w150"></el-input>
        -
        <el-input v-model="data.unit"  class="w150"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onReview">预览</el-button>
        <el-button @click="onDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <div class="chart"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {value: '选项1', label: '黄金糕'},
        {value: '选项2', label: '双皮奶'},
        {value: '选项3', label: '蚵仔煎'},
        {value: '选项4', label: '龙须面'},
        {value: '选项5', label: '北京烤鸭'}],
      data: {
        value4: '',
        name: '',
        subTitle: '',
        unit: '',
        remark: '',
        textarea: ''
      },
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
  methods: {
    // 预览
    onReview () {},
    // 删除
    onDelete () {}
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w320 {width: 312px;}
  .w150{width: 150px;}
  .mtb20 {margin: 20px 0;}
  .wrap{display: flex;}
  .chart{
    width: 400px;
    height: 400px;
    margin-left: 20px;
  }
</style>
