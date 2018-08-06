<template>
  <el-upload class="articleContentImg uploadWrap" :data="uploadReqData" :disabled="uploading" :show-file-list="false"
             :before-upload="beforePicUpload"
             :on-success="handleUploadSuccess"
             :on-error="handleUploadError"
             accept=".jpeg,.jpg,.png"
             action="/backend/mobileUpload/uploadImg.do">
    <div class="uploadContent" v-loading="uploading" element-loading-text="文件上传中...">
      <div class="imgBox" v-if="formData.image">
        <img v-if="formData.image" :src="formData.image" class="avatar">
        <div class="mask">
          <div style="line-height: 20px">
            <i class="el-icon-upload" style="font-size: 30px"></i>
            <p class="el-upload-text">点击上传图片</p>
          </div>
        </div>
      </div>
      <i class="el-icon-upload" style="font-size: 30px" v-if="!formData.image"></i>
      <div class="el-upload__text" style="line-height: 20px" v-if="!formData.image">点击上传图片</div>
    </div>
    <div class="el-upload__tip" slot="tip" style="line-height: 20px">仅限上传jpg/png格式图片，建议上传尺寸240*180，1M以内</div>
  </el-upload>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      formData: {
        image: ''
      },
      uploading: false,
      uploadReqData: {
        from: 'banner'
      }
    }
  },
  methods: {
    // -- 上传图片
    beforePicUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 1M!')
        return false
      }
      let fileType = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!fileType) {
        this.$message.error('上传的图片仅支持jpg/png格式！')
        return false
      }
      this.uploading = true
      return true
    },
    handleUploadSuccess (res) {
      this.uploading = false
      if (parseInt(res.code) === 1) {
        this.formData.image = res.data.url
      } else {
        this.formData.image = ''
        this.$message.error(res.message)
      }
    },
    handleUploadError () {
      this.$message.error('上传失败！')
      this.uploading = false
      this.formData.image = ''
    },
    beforeClose () {
      this.$emit('input', false)
    },
    // 保存
    toSave () {}
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .uploadWrap{
    min-width: 240px;
    min-height: 180px;
    .uploadContent {
      height: 100%;
      min-height: 180px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .imgBox {
      width: 100%;
      min-height: 180px;
      max-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img{
        width: 100%;
        height: auto;
        vertical-align: middle;
      }
      .mask{
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.3);
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-icon-upload{
          margin: 0;
          color: #fff !important;
          vertical-align: top;
        }
        .el-upload-text{
          color: #fff;
          margin: 0;
          em{
            color: $color-primary;
            font-weight: bold;
            font-style: normal;
          }
        }
      }
      &:hover{
        .mask {
          opacity: 1;
        }
      }
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  .articleContentImg{
    &.uploadWrap{
      .el-upload {
        width: 240px;
        vertical-align: top;
        border: 1px dashed #e6e6e6;
        border-radius: 5px;
        &:hover{
          border-color: #3c89ff;
        }
      }
    }
  }
</style>
