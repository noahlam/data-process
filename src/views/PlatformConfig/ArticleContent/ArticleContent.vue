<template>
  <div class="v-wrap articeContent">
    <div class="v-title-box">
      <h3 class="v-title">文章内容</h3>
    </div>
    <el-form :model="formData" :rules="formRules" label-width="90px" class="v-form" @submit.native.prevent>
      <el-form-item label="文章标题" prop="name">
        <el-input v-model="formData.name" :maxlength="50" style="width: 350px"> </el-input>
      </el-form-item>
      <el-form-item label="封面">
        <ImgUpload />
      </el-form-item>
      <el-form-item label="文章内容">
        <tinymce :height="200" v-model="formData.content"> </tinymce>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import ImgUpload from './components/ImgUpload'
export default{
  components: {ImgUpload, Tinymce},
  data () {
    return {
      formData: {},
      formRules: {
        name: [{required: true, message: '请上传图片', trigger: 'blur, change'}]
      },
      saveLoading: false,
      mainLoading: false
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      this.mainLoading = true
      let res = await this.$post('admin/mobileSetting/getInterfaceDoc.do')
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        if (res.fileName) {
          this.fileList.push({
            name: res.fileName,
            url: res.fileUrl
          })
        }
        this.content = res.content || ''
      } else {
        this.$message.error(res.message)
      }
    },
    toSaveData () {
      alert(1)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
</style>
