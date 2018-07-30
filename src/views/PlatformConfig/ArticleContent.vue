<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box"></div>
    <div>
      <i>*</i><span style="margin-right:20px;">文章标题</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:400px;">
      </el-input>
    </div>
    <div class="uploadWrap">
        <span style="margin-right:45px;">封面</span>
        <el-upload
          class="uploadBox"
          action="common/mobileUpload/uploadFile.do"
          :data="fileData"
          name="file"
          :on-success="uploadSuccess"
          :on-preview="filePreview"
          :on-remove="handleRemove"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传图片</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
    </div>
    <div style="margin-bottom:10px;">
      <span>文章内容</span>
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
export default{
  components: { Tinymce },
  data () {
    return {
      fileList: [],
      fileData: {
        from: 'admin'
      },
      content: '',
      saveLoading: false,
      mainLoading: false,
      input10: ''
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
    toSaveData () {
      alert(1)
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
    height: 60px;
    width: 400px;
    margin-left: 20px;
    vertical-align: top;
  }
  .btnWrap{
    margin-top: 30px;
    text-align: center;
  }
  .listWrap{
    .mainBtn{
      padding: 20px 0 20px;
      border-top: 1px solid $border-base;
    }
    .showLongContent{
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
    .dialogContent{
      margin: 0 10px;
    }
  }
  .formWrap{
    padding: 40px 0 10px;
  }
  .refuseDialog{
    p{
      margin: 6px 0 0;
      text-align: right;
      color: $color-danger;
    }
    h4{
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 6px;
    }

  }
  .addButton{
    margin-top:10px;
    margin-bottom:10px;
  }
  i{
    color:red;
    margin-right:5px;
  }
  span{
    font-size:16px;
    color:#666;
  }
</style>
