<template>
  <el-dialog class="reportTypeEditWrap" center title="编辑" v-if="value" :visible="value" width="450px" :before-close="beforeClose"  :close-on-click-modal="false">
    <el-form :model="formData" :rules="formRules" label-width="56px" ref="reportTypeEditRef" class="v-form" @submit.native.prevent>
      <el-form-item label="名称" prop="reportFormTypeName">
        <el-input v-model="formData.reportFormTypeName" size="small" :maxlength="50" placeholder="请填写报表类型名称"> </el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-upload class="uploadWrap" :data="uploadReqData" :disabled="uploading" :show-file-list="false"
                   :before-upload="beforePicUpload"
                   :on-success="handleUploadSuccess"
                   :on-error="handleUploadError"
                   accept=".jpeg,.jpg,.png"
                   action="/common/upload/uploadImg.do">
          <div class="uploadContent" v-loading="uploading">
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
          <div class="el-upload__tip" slot="tip" style="line-height: 20px">仅限上传jpg/png格式图片，建议上传尺寸300*180，1M以内</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="beforeClose">取 消</el-button>
      <el-button type="primary" @click="toSave" :loading="saveLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'edit-dialog',
  props: {
    value: false,
    itemInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formData: {
        reportFormTypeId: null,
        reportFormTypeName: '',
        image: ''
      },
      formRules: {
        reportFormTypeName: [{required: true, message: '请填写报表类型', trigger: 'blur'}],
        image: [{required: true, message: '请上传图片', trigger: 'blur, change'}]
      },
      saveLoading: false,
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
    toSave () {
      if (this.uploading) {
        this.$message.warning('图片正在上传中，请稍候保存！')
        return false
      }
      this.$refs.reportTypeEditRef.validate(async valid => {
        if (!valid) {
          return false
        }
        let reqData = {
          reportFormTypeName: this.formData.reportFormTypeName,
          reportFormTypeImage: this.formData.image
        }
        let url = 'admin/reportFormType/add.do'
        if (this.formData.reportFormTypeId) {
          reqData.reportFormTypeId = this.formData.reportFormTypeId
          url = 'admin/ reportFormType/edit.do'
        }
        this.saveLoading = true
        let res = await this.$post(url, reqData)
        this.saveLoading = false
        if (parseInt(res.code) === 1) {
          this.$message.success('保存成功')
          this.$emit('success', true)
          this.beforeClose()
        }
      })
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue) {
        this.formData.reportFormTypeName = this.itemInfo ? this.itemInfo.reportFormTypeName : ''
        this.formData.image = this.itemInfo ? this.itemInfo.reportFormTypeImage : ''
        this.formData.reportFormTypeId = this.itemInfo ? this.itemInfo.reportFormTypeId : null
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .uploadWrap{
    min-width: 150px;
    min-height: 90px;
    .uploadContent {
      height: 100%;
      min-height: 90px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .imgBox {
      width: 100%;
      height: 90px;
      /*max-height: 100px;*/
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img{
        width: 100%;
        height: 100%;
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
  .reportTypeEditWrap{
    .uploadWrap{
      .el-upload {
        width: 150px;
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
