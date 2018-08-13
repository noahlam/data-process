<template>
  <div class="wrap">

    <el-form :model="data" :rules="rules" ref="ruleForm" label-width="100px">

      <el-form-item label="报表名称" prop="reportFormName">
        <el-input v-model="data.reportFormName" class="w400"></el-input>
      </el-form-item>

      <el-form-item label="报表类型" prop="reportFormTypeId">
        <el-select v-model="data.reportFormTypeId" clearable placeholder="请选择"  class="w400">
          <el-option
            v-for="item in types"
            :key="item.reportFormTypeId"
            :label="item.reportFormTypeName"
            :value="item.reportFormTypeId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="副标题" prop="reportFormTitle">
        <el-input v-model="data.reportFormTitle"  class="w400"></el-input>
      </el-form-item>

      <el-form-item label="单位" prop="reportFormUnit">
        <el-input v-model="data.reportFormUnit"  class="w400"></el-input>
      </el-form-item>

      <el-form-item label="备注/说明" prop="reportFormRemark">
        <el-input type="textarea" v-model="data.reportFormRemark" class="w400"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="gotoNext">下一步</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>
<script>
export default {
  data () {
    return {
      rules: {
        reportFormName: [
          { required: true, message: '请输入报表名称', trigger: 'blur' }
        ],
        reportFormTypeId: [
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
    types: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 下一步
    async gotoNext () {
      // 表单验证不通过
      if (!await this.$validate(this.$refs.ruleForm)) return
      this.$emit('next', '2')
    },
    // 保存
    async onSave () {
      if (!await this.$validate(this.$refs.ruleForm)) return
      this.$emit('save')
    },
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
