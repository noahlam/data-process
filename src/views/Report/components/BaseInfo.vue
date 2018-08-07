<template>
  <div class="wrap">

    <el-form :model="data" :rules="rules" ref="ruleForm" label-width="100px">

      <el-form-item label="报表名称" prop="name">
        <el-input v-model="data.name" class="w400"></el-input>
      </el-form-item>

      <el-form-item label="报表类型" prop="type">
        <el-select v-model="data.value4" clearable placeholder="请选择"  class="w400">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="副标题" prop="subTitle">
        <el-input v-model="data.subTitle"  class="w400"></el-input>
      </el-form-item>

      <el-form-item label="单位" prop="unit">
        <el-input v-model="data.unit"  class="w400"></el-input>
      </el-form-item>

      <el-form-item label="备注/说明" prop="reamrk">
        <el-input type="textarea" v-model="data.reamrk" class="w400"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="gotoNext">下一步</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>

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
    // 下一步
    gotoNext () {},
    // 取消
    onCancel () {
      this.$confirm('确定要放弃保存吗?', '提示').then(() => {
        history.back()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {width: 400px;}
</style>
