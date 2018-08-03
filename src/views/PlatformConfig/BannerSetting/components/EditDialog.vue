<template>
  <el-dialog class="bannerEditWrap" center title="编辑" v-if="value" :visible="value" width="600px" @close="beforeClose"  :close-on-click-modal="false">
    <el-form :model="formData" :rules="formRules" label-width="120px" class="v-form" @submit.native.prevent>
      <el-form-item label="图片" prop="image">
        <el-upload class="uploadWrap" :data="uploadReqData" :disabled="uploading" :show-file-list="false"
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
          <div class="el-upload__tip" slot="tip" style="line-height: 20px">仅限上传jpg/png格式图片，建议上传尺寸750*400，1M以内</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称" prop="image">
        <el-input v-model="formData.name" size="small" :maxlength="20"> </el-input>
      </el-form-item>
      <el-form-item label="是否链接" prop="image">
        <el-radio v-model="formData.radio" :label="1">是</el-radio>
        <el-radio v-model="formData.radio" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="跳转链接" prop="image" v-if="formData.radio">
        <el-input v-model="formData.name" size="small" :maxlength="100"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="beforeClose">取 消</el-button>
      <el-button type="primary" @click="toSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'edit-dialog',
  props: {
    value: false
  },
  data () {
    return {
      formData: {
        image: ''
      },
      formRules: {
        image: [{required: true, message: '请上传图片', trigger: 'blur, change'}]
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
    min-width: 375px;
    min-height: 200px;
    .uploadContent {
      height: 100%;
      min-height: 200px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .imgBox {
      width: 100%;
      min-height: 200px;
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
  .el-form{
    min-height: 420px;
    .el-input{
      width: 375px;
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  .bannerEditWrap{
    .uploadWrap{
      .el-upload {
        width: 375px;
        /*height: 100%;*/
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
