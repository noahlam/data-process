<template>
  <div class="loginWrap">
  <!--    <section>
      <div class="box">
        <div class="rightPart">
          <h2>用户登录</h2>
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                   class="card-box login-form">
            <el-form-item prop="username">
              <el-input name="text" type="text" @keyup.enter.native="handleLogin" :maxlength="20" v-model="loginForm.username" autoComplete="on"
                        placeholder="账号"> </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" type="password" @keyup.enter.native="handleLogin" :maxlength="20" v-model="loginForm.password" autoComplete="on" placeholder="密码"> </el-input>
            </el-form-item>
            <el-form-item prop="validCode" class="codeBox">
              <el-input name="validCode" type="text" @keyup.enter.native="handleLogin" :maxlength="20" v-model="loginForm.validCode" autoComplete="on" class="codeInput" placeholder="请输入验证码"> </el-input>
              <img :src="loginForm.codePicUrl" alt="图形验证码" @click="getVerifyCode">
              <el-button type="text" @click="getVerifyCode">换一张</el-button>
            </el-form-item>
            <el-form-item class="checkBox">
              <el-checkbox v-model="loginForm.rememberPas">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="loginBtn" :loading="loading" @click.native.prevent="handleLogin">
                登 录
              </el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
      </section>-->
    <div class="main">
      <h1 class="title">株洲商务局报表管理后台</h1>
      <el-form autoComplete="on" label-position="top" :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input name="text" type="text" @keyup.enter.native="handleLogin" :maxlength="20"
                    v-model="loginForm.username" autoComplete="on" placeholder="账号"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" :maxlength="20"
                    v-model="loginForm.password" autoComplete="on" placeholder="密码"> </el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="validCode" class="codeInput">
          <el-input style="width:220px;" name="validCode" type="text" @keyup.enter.native="handleLogin"
                    :maxlength="20" v-model="loginForm.validCode" autoComplete="on" placeholder="请输入验证码"> </el-input>
          <img class="codeImg" :src="loginForm.codePicUrl"  alt="验证码" @click="getVerifyCode"> <!-- :src="loginForm.codePicUrl"-->
        </el-form-item>
        <el-form-item>
          <el-button style="width:320px;margin-top:30px;" type="primary" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-index',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        validCode: '',
        codePicUrl: '',
        validToken: null,
        rememberPas: false
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入账号'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'}
        ],
        validCode: [
          {required: true, trigger: 'blur', message: '请输入验证码'}
        ]
      },
      loading: false
    }
  },
  created () {
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    async getVerifyCode () {
      this.loginForm.validToken = new Date().getTime()
      let res = await this.$post('common/mobileCommon/getValidateCode.do', {validToken: this.loginForm.validToken})
      if (parseInt(res.code) === 1) {
        this.loginForm.codePicUrl = res.data.base64Img
      } else {
        this.$message.error(res.message)
      }
    },
    getUserInfo () { // 获得之前记住密码保存的账号信息
      let userLoginInfo = localStorage.getItem('userLoginInfo')
      if (userLoginInfo && userLoginInfo.length > 10) {
        userLoginInfo = JSON.parse(userLoginInfo)
        this.loginForm.username = decodeURI(userLoginInfo.username)
        this.loginForm.password = decodeURI(userLoginInfo.password)
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true

          let reqData = {
            username: this.loginForm.username,
            password: this.loginForm.password
            // validCode: this.loginForm.validCode,
            // validToken: this.loginForm.validToken
          }
          let res = await this.$post('admin/mobileUser/login.do', reqData)
          this.loading = false
          console.log(res)
          if (parseInt(res.code) === 1) {
            this.$store.dispatch('SetTokenInfo', res)
            if (this.loginForm.rememberPas) { // 记住密码
              let userLoginInfo = {
                username: encodeURI(this.loginForm.username),
                password: encodeURI(this.loginForm.password)
              }
              localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo))
            } else {
              localStorage.removeItem('userLoginInfo')
            }
            this.$router.push('/')
            // 下面是保存token信息
          } else {
            // this.getVerifyCode()
            // this.loginForm.validCode = ''
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import '~@/styles/common.scss';
  .loginWrap {
    height:100%;
    width:100%;
    min-height: 100vh;
    min-width: 100vw;
    background:url("./assets/background.png") no-repeat right center;
    background-size: auto 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .main{
    width:450px;
    margin-right: 200px;
    .title{
      font-size: 32px;
      line-height: 50px;
      color: #000;
      font-weight: normal;
    }
    .el-form{
      width: 322px;
      .el-form-item__label{
        margin-bottom: 0;
      }
    }
    .codeImg{
      background: #ccc;
      width: 90px;
      height: auto;
      max-height: 40px;
      vertical-align: top;
      cursor: pointer;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .loginWrap{
    .el-form-item__label{
      padding: 0;
      font-size: 16px;
      color: rgba(102, 102, 102, 0.8);
      &:before{
        content: '' !important;
      }
    }
  }
</style>
<!--
<style scoped rel="stylesheet/scss" lang="scss">
  @import '~@/styles/common.scss';
  .login-wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $background-color;
    header{
      height: 100px;
      background: $color-primary;
      .head-bar{
        height: 80px;
        width: 1000px;
        margin: 10px auto;
        display: flex;
        align-items: center;
        img {
          box-sizing: content-box;
          width: 200px;
          /*padding: 0 50px;*/
          /*height: 60px;*/
          /*background: #fff;*/
        }
        h1{
          padding-left: 20px;
          height: 100%;
          line-height: 80px;
          color: #fff;
          border-left: 1px solid #fff;
          font-weight: normal;
          font-size: $font-sub-title;

        }
      }
    }
    section{
      width: 1000px;
      height: 500px;
      margin: 10px auto;
      background: #fff;
      border-top: 2px solid $color-primary;

      .box {
        height: 500px;
        margin: 0 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;

      }
      .leftPart{
        width: 420px;
        img{
          width: 100%;
          border-radius: 4px;
        }
      }
      .rightPart{
        width: 320px;
        h2 {
          font-size: $font-min-title;
          color: $color-primary;
          font-weight: normal;
          text-align: center;
          margin-bottom: 30px;
        }
        .codeBox{
          display: flex;
          align-items: center;
          .codeInput {
            width: 180px;
          }
          img {
            width: 80px;
            height: auto;
            margin: 0 0 0 6px;
            vertical-align: top;
            cursor: pointer;
          }
        }
        .checkBox{
          margin-top: -14px;
          height: 22px;
        }
        .loginBtn{
          box-sizing: border-box;
          width: 100%;
        }

      }
    }
    footer{
      height: 100px;
      background: #eaeaea;
      text-align: center;
      line-height: 100px;
      font-size: $font-sub-title;
      color: $text-primary;
    }
  }

</style>
-->
