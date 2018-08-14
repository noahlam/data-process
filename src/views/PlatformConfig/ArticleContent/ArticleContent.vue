<template>
  <div class="v-wrap articleContent">
    <div class="v-title-box">
      <h3 class="v-title">文章内容</h3>
    </div>
    <el-form :model="formData" :rules="formRules" v-loading="mainLoading" ref="formDataRef" label-width="90px" class="v-form" @submit.native.prevent>
      <el-form-item label="文章标题" prop="articleTitle">
        <div class="box">
          <el-input v-model="formData.articleTitle" :maxlength="50" style="width: 350px"> </el-input>
          <Print :content="formData.articleContent" :formData="formData"/>
        </div>
      </el-form-item>
      <el-form-item label="封面">
        <ImgUpload ref="imgRef" :formData="formData"/>
      </el-form-item>
      <el-form-item label="文章内容">
        <tinymce id="tinymce" :height="200" v-model="formData.articleContent"> </tinymce>
      </el-form-item>
      <el-form-item label="">
        <el-button class="v-button" type="primary" :loading="saveLoading" @click="toSaveData">保 存</el-button>
        <el-button class="v-button" @click="$router.go(-1)">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import ImgUpload from './components/ImgUpload'
import Print from './components/Print'
export default{
  components: {ImgUpload, Tinymce, Print},
  data () {
    return {
      articleId: this.$route.query.articleId || null,
      formData: {
        articleTitle: '',
        articleImage: '',
        image: '',
        articleContent: ''
      },
      formRules: {
        articleTitle: [{required: true, message: '请填写文章标题', trigger: 'blur'}]
      },
      saveLoading: false,
      mainLoading: false
    }
  },
  created () {
    if (this.articleId) {
      this.getDetail()
    }
  },
  methods: {
    async getDetail () {
      this.mainLoading = true
      let res = await this.$post('admin/article/detail.do', {articleId: this.articleId})
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.formData.image = res.data.articleImage || ''
        this.formData.articleTitle = res.data.articleTitle || ''
        this.formData.articleContent = res.data.articleContent || ''
      } else {
        this.$message.error(res.message)
      }
    },
    toSaveData () {
      if (!this.$refs.imgRef.toSave()) {
        return false
      }
      this.formData.articleTitle = this.formData.articleTitle.trim()
      this.$refs.formDataRef.validate(async valid => {
        if (!valid) {
          return false
        }
        // 下面是保存
        let reqData = {
          articleTitle: this.formData.articleTitle,
          articleImage: this.formData.image,
          articleContent: this.formData.articleContent
          // articleContent: this.formData.articleContent.replace(/['  ']/g, '&nbsp;')
        }
        let url = 'admin/article/add.do'
        if (this.articleId) {
          reqData.articleId = this.articleId
          url = 'admin/article/edit.do'
        }
        this.saveLoading = true
        let res = await this.$post(url, reqData)
        this.saveLoading = false
        if (parseInt(res.code) === 1) {
          this.$message.success('保存成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .box{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
