<template>
  <div class="navBarWrap">
    <router-link to="/index" class="logoBox">
      <img class="logo" src="../../assets/logo.png" alt="Logo" />
    </router-link>
    <el-dropdown  class="userBox" trigger="click" @command="handleCommand">
      <div class="userInfo el-dropdown-link">
        <img src="../../assets/photo.png" alt="">
        <span>{{userInfo.username}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="menuDropWrap">
        <!--<router-link to="/index/editPassword">-->
        <el-dropdown-item command="toChangePws">修改密码</el-dropdown-item>
        <!--</router-link>-->
        <el-dropdown-item command="toLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
       class="changePwsDialog"
       title="修改密码"
       :visible.sync="changeDialogVisible"
       :close-on-click-modal="false"
       width="400px"
       center>
      <el-form class="formBox" ref="ruleForm" :rules="formRules" :model="formData" size="small" label-width="80px">

        <el-form-item  label="旧密码" class="inputItem" prop="oldPassword">
          <el-input v-model="formData.oldPassword" :maxlength="20" type="password" placeholder="请输入" auto-complete="off"> </el-input>
        </el-form-item>
        <el-form-item  label="新密码" class="inputItem" prop="newPassword">
          <el-input v-model="formData.newPassword" :maxlength="20" type="password" placeholder="请输入" auto-complete="off"> </el-input>
        </el-form-item>
        <el-form-item  label="再次输入" class="inputItem" prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" :maxlength="20" type="password" placeholder="请输入" auto-complete="off"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: -30px">
        <el-button type="primary"  @click="onSubmit" :loading="saveLoading">确 定</el-button>
        <el-button plain @click="changeDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'navbar',
  data () {
    let validatePass = (rule, value, callback) => {
      if (this.formData.confirmPassword !== '') {
        this.$refs.ruleForm.validateField('confirmPassword')
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.formData.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      currentPath: this.$route.path,
      changeDialogVisible: false,
      saveLoading: false,
      formData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        oldPassword: [
          {
            required: true, message: '请输入旧密码', trigger: 'blur'
          }
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请再次输入', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    // 处理 dropdown 菜单
    handleCommand (command) {
      switch (command) {
        case 'toChangePws':
          this.toChangePws()
          break
        case 'toLogout':
          this.toLogout()
          break
        default:
          console.log('none')
      }
    },
    // 修改密码
    toChangePws () {
      this.formData.oldPassword = ''
      this.formData.newPassword = ''
      this.formData.confirmPassword = ''
      this.changeDialogVisible = true
    },
    // 修改密码
    onSubmit () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.saveLoading = true
          let res = await this.$post('admin/user/editPwd.do', this.formData)
          this.saveLoading = false
          if (parseInt(res.code) === 1) {
            this.$message.success('修改成功')
            setTimeout(async () => {
              this.toLogout()
            }, 1500)
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    },
    // 退出登录
    toLogout () {
      this.$store.dispatch('ClearLogout')
      location.reload()
    }
  }
}
</script>

<style  lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .navBarWrap{
    position: relative;
    background: #2e3448;
    color: #fff;
    height: 80px;
    .logoBox{
      display: inline-block;
      width: 260px;
      height: 80px;
      margin-left: 26px;
      vertical-align: top;
      text-align: center;
      .logo{
        margin-top: 10px;
        height: 60px;
      }
    }
    /*.navBox{
      display: inline-block;
      border: none;
      li{
        position: relative;
        display: inline-block;
        padding: 0 20px ;
        line-height: 56px;
        height: 57px;
        cursor: pointer;
        text-align: center;
        border-bottom: 3px solid transparent;
        font-size: $font-min-title;
        &.is-active{
          background-color: #4E89EB !important;
          &:after{
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -4px;
            border: 6px solid transparent;
            border-bottom: 6px solid #fff;
          }
        }
        &:hover{
          background-color: #3872D2 !important;
        }
      }
    }*/
    /*.navBox{
      display: inline-block;
      border: none;
      li{
        position: relative;
        display: inline-block;
        margin: 6px 20px 0;
        padding: 0;
        line-height: 40px;
        height: 40px;
        cursor: pointer;
        text-align: center;
        border-bottom: 1px solid transparent;
        font-size: $font-min-title;
        !*&.is-active{
          background-color: #4E89EB !important;
          &:after{
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -4px;
            border: 6px solid transparent;
            border-bottom: 6px solid #fff;
          }
        }*!
        &:hover {
          background-color: $color-primary !important;
          color: #fff !important;
        }
      }
    }*/
    .userBox{
      position: absolute;
      top: 0;
      right: 30px;
      line-height: 80px;
      .userInfo{
        cursor: pointer;
        color: #fff;
        img{
          display: inline-block;
          width: 50px;
          height: 50px;
          margin: 15px 10px 0;
          border-radius: 50%;
          vertical-align: top;
        }
        span{
          line-height: 60px;
          font-size: $font-size-base;
        }
      }
      .menuDropWrap{
        li {
          padding: 0 40px !important;
        }
      }
    }
  }
</style>
