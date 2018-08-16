<template>
  <!--<div class="loginWrap">
    <div class="main">
      <h1 class="title">株洲商务粮食局报表管理后台</h1>
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
          <img class="codeImg" :src="loginForm.codePicUrl"  alt="验证码" @click="getVerifyCode"> &lt;!&ndash; :src="loginForm.codePicUrl"&ndash;&gt;
        </el-form-item>
        <el-form-item>
          <el-button style="width:320px;margin-top:30px;" type="primary" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>-->
  <div class="loginWrap">
    <div class="svgBox">
      <img class="img" src="./assets/login.png" alt="">
      <svg class="svgImg" xmlns="http://www.w3.org/2000/svg" width="1526" height="1080" viewBox="0 0 1526 1080">
        <defs>
          <linearGradient id="a" x1="86.021%" x2="2.059%" y1="102.517%" y2="-11.725%">
            <stop offset="0%" stop-color="#9DBFFF"/>
            <stop offset="100%" stop-color="#6785FF"/>
          </linearGradient>
        </defs>
        <path fill="url(#a)" fill-rule="evenodd" d="M1026.187 0c35.176 34.942 53.75 74.616 55.724 119.023 10.162 228.68-168.592 426.493-118.8 568.29 49.79 141.796 142.064 185.445 531.692 376.156 11.683 5.718 21.795 11.228 30.338 16.531H0V0h1026.187z"/>
      </svg>
    </div>

    <div class="main">
      <h1 class="title">株洲商务粮食局报表管理后台</h1>
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
          <el-button style="width:320px;margin-top:30px;" type="primary" :loading="loading" @click="handleLogin">
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
        validToken: null
        // rememberPas: false
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入账号'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'}
        ],
        validCode: [
          {required: true, trigger: 'blur', message: '请输入图形验证码'}
        ]
      },
      loading: false
    }
  },
  created () {
    this.getVerifyCode()
  },
  mounted () {
    // this.getUserInfo()
  },
  methods: {
    async getVerifyCode () {
      this.loginForm.validToken = new Date().getTime()
      let res = await this.$post('common/getValidateCode.do', {validToken: this.loginForm.validToken})
      if (parseInt(res.code) === 1) {
        this.loginForm.codePicUrl = res.data.base64Img
      } else {
        this.$message.error(res.message)
      }
    },
    // getUserInfo () { // 获得之前记住密码保存的账号信息
    //   let userLoginInfo = localStorage.getItem('userLoginInfo')
    //   if (userLoginInfo && userLoginInfo.length > 10) {
    //     userLoginInfo = JSON.parse(userLoginInfo)
    //     this.loginForm.username = decodeURI(userLoginInfo.username)
    //     this.loginForm.password = decodeURI(userLoginInfo.password)
    //   }
    // },
    handleLogin () {
      this.loginForm.username = this.loginForm.username.trim()
      this.loginForm.password = this.loginForm.password.trim()
      this.loginForm.validCode = this.loginForm.validCode.trim()
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let reqData = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            validCode: this.loginForm.validCode,
            validToken: this.loginForm.validToken
          }
          this.loading = true
          let res = await this.$post('admin/user/login.do', reqData)
          this.loading = false
          if (parseInt(res.code) === 1) {
            // 下面是保存token信息npm
            this.$store.dispatch('SetTokenInfo', res.data)
            // if (this.loginForm.rememberPas) { // 记住密码
            //   let userLoginInfo = {
            //     username: encodeURI(this.loginForm.username),
            //     password: encodeURI(this.loginForm.password)
            //   }
            //   localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo))
            // } else {
            //   localStorage.removeItem('userLoginInfo')
            // }
            this.$router.push('/')
          } else {
            this.getVerifyCode()
            this.loginForm.validCode = ''
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
    position: relative;
    height: 100vh;
    width:100%;
    min-height: 750px;
    min-width: 1200px;
    overflow: hidden;
    background: #fff;
    /*background: #fff url("./assets/bg.png") no-repeat left center;*/
    /*background-size: auto 100%;*/
    display: flex;
    align-items: center;
    /*justify-content: flex-end;*/
  }
  .svgBox{
    position: absolute;
    height: 100%;
    width: auto;
    min-width: 1200px;
    min-height: 750px;
    left: 0;
    top: 0;
    z-index: 1;
    transition: left 0.2s;
    .svgImg{
      height: 100%;
      width: auto;
      min-height: 870px;
      min-width: 1060px;
    }
    .img{
      position: absolute;
      top: 26%;
      right: 560px;
      height: 47%;
      width: auto;
      margin: 0;
    }
  }
  .main{
    width:450px;
    margin-left: 1000px;
    z-index: 10;
    transition: left 0.2s;
    /*margin-right: 300px;*/
    .title{
      font-size: 32px;
      line-height: 50px;
      color: #000;
      font-weight: normal;
      margin: 0 0 20px 0;
    }
    .el-form{
      width: 322px;
      .el-form-item__label{
        margin-bottom: 0;
      }
    }
    .codeImg{
      /*background: #ccc;*/
      width: 90px;
      height: auto;
      max-height: 40px;
      vertical-align: top;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 1521px){
    /*.loginWrap {*/
      /*background-position: left center;*/
    /*}*/
    .main{
      margin-left: 1100px;
    }
  }
  @media screen and (max-width: 1450px) {
    .svgBox{
      left: -250px;
    }
    .main{
      margin-left: 750px ;
    }
  }
</style>
<!--<style scoped rel="stylesheet/scss" lang="scss">
  @import '~@/styles/common.scss';
  .loginWrap {
    height:100%;
    width:100%;
    min-height: 100vh;
    min-width: 100vw;
    /*background: #fff url("./assets/bg.png") no-repeat left center;*/
    background-size: auto 100%;
    display: flex;
    align-items: center;
    /*justify-content: flex-end;*/
  }
  .main{
    width:450px;
    margin-left: 900px;
    /*margin-right: 300px;*/
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
      /*background: #ccc;*/
      width: 90px;
      height: auto;
      max-height: 40px;
      vertical-align: top;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 1521px){
    .loginWrap {
      background-position: left center;
    }
    .main{
      margin-left: 1100px;
    }
  }
  @media screen and (max-width: 1250px) {
    .loginWrap {
      background-position: -120px center;
    }
    .main{
      margin-left: 780px ;
    }
  }
</style>-->

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
