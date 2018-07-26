<template>
  <div class="v-wrap typeWrap" v-loading="mainLoading">
    <div class="v-title-box">
      <h3 class="v-title">接口文档设置</h3>
    </div>
    <div class="uploadWrap">
      <span>上传附件：</span>
      <el-upload
         class="uploadBox"
         action="common/mobileUpload/uploadFile.do"
         :data="fileData"
         name="file"
         :on-success="uploadSuccess"
         :on-preview="filePreview"
         :on-remove="handleRemove"
         :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </div>
    <div>
      <tinymce :height="200" v-model="content"> </tinymce>
    </div>
    <div class="btnWrap">
      <el-button class="v-button" type="primary" :loading="saveLoading" @click="toSaveData">保 存</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import {longPost} from '@/utils/fetch'
export default {
  name: 'interface-doc-setting',
  components: { Tinymce },
  data () {
    return {
      fileList: [],
      fileData: {
        from: 'admin'
      },
      content: '',
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
    // 上传成功
    uploadSuccess (response, file, fileList) {
      if (response && parseInt(response.code) === 1) {
        this.fileList = []
        this.fileList.push({
          name: file.name,
          url: response.url
        })
      } else {
        let text = response && response.message ? response.message : '上传失败'
        this.$message.error(text)
      }
    },
    // 下载附件
    filePreview (file) {
      window.location.href = file.url
    },
    // 删除附件
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    // 保存
    async toSaveData () {
      let resData = {
        fileUrl: '',
        fileName: '',
        content: ''
      }
      if (this.fileList && this.fileList.length) {
        resData.fileUrl = this.fileList[0].url
        resData.fileName = this.fileList[0].name
      }
      if (this.content && this.content !== '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
        '</head>\n' +
        '<body>\n' +
        '\n' +
        '</body>\n' +
        '</html>') {
        resData.content = this.content
      }
      let formData = new FormData()
      for (let item in resData) {
        formData.append(item, resData[item])
      }
      formData.append('token', this.$store.getters.userInfo.token)
      formData.append('userId', this.$store.getters.userInfo.userId)
      let res = await longPost('admin/mobileSetting/setInterfaceDoc.do', formData)
      if (parseInt(res.code) === 1) {
        this.$message.success('保存成功')
      } else {
        this.$message.error(res.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .uploadWrap{
    margin: 20px 0 0;
    span{
      font-size: $font-min-title;
      color: $text-second;
      line-height: 32px;
      vertical-align: top;
    }
  }
  .uploadBox{
    display: inline-block;
    height: 120px;
    width: 400px;
    margin-left: 20px;
    vertical-align: top;
  }
  .btnWrap{
    margin-top: 30px;
    text-align: center;
  }

</style>
